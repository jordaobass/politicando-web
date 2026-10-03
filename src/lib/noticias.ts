import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

/**
 * Notícias são arquivos no repositório (`content/noticias/*.mdx`), não registros de banco.
 *
 * A consequência está dita de propósito: **publicar é commit + deploy**, e quem publica é
 * quem mexe no código. Em troca, a página é 100% estática (nada de fetch no caminho do
 * leitor), o histórico editorial é o próprio git e não existe superfície de escrita para
 * atacar. Quando publicar sem deploy virar requisito, a entidade no backend entra por baixo
 * desta mesma interface.
 *
 * O corpo é **Markdown**, não MDX de verdade: a extensão fica por compatibilidade, mas nada
 * no arquivo vira componente. Conteúdo não executa código.
 */

const DIRETORIO = path.join(process.cwd(), "content", "noticias");

/**
 * Candidato citado na matéria.
 *
 * Referência por nome + cargo, **não** por id: o id da candidatura é diferente em cada
 * ambiente (dev e produção são bancos distintos), então um GUID no texto só funcionaria num
 * deles. O nome de urna é resolvido contra a API na hora de renderizar.
 */
const CandidatoCitado = z.object({
  nome: z.string().min(1),
  cargo: z.string().min(1),
});

const Frontmatter = z.object({
  titulo: z.string().min(1),
  resumo: z.string().min(1),
  publicadoEm: z.coerce.date(),
  atualizadoEm: z.coerce.date().optional(),
  autor: z.string().min(1),
  capa: z.string().min(1).optional(),
  capaAlt: z.string().min(1).optional(),
  /**
   * Crédito da imagem. Não é enfeite: foto de banco livre (Creative Commons) só pode ser
   * publicada COM atribuição, e matéria eleitoral com imagem sem procedência é problema
   * duplo — de licença e de credibilidade.
   */
  capaCredito: z.string().min(1).optional(),
  rascunho: z.boolean().default(false),
  /**
   * Manchete da capa. É decisão editorial, não consequência do relógio: seis matérias
   * publicadas no mesmo dia empatam na data, e sem isto quem vira destaque é o acaso da
   * ordem do diretório. Mais de uma marcada, vale a mais recente.
   */
  destaque: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  // Exigido pelo produto: toda matéria leva a um candidato e ao quiz. Lista vazia é erro de
  // build, não matéria sem link — é a regra virando estrutura, para não depender de lembrar.
  candidatos: z.array(CandidatoCitado).min(1),
  seoTitulo: z.string().optional(),
  seoDescricao: z.string().optional(),
});

export type CandidatoCitado = z.infer<typeof CandidatoCitado>;

export type Noticia = z.infer<typeof Frontmatter> & {
  slug: string;
  /** Corpo em Markdown, já sem o frontmatter. */
  corpo: string;
};

function ehPublicavel(noticia: Noticia): boolean {
  return !noticia.rascunho;
}

/** Slug e nome de arquivo aceitos: minúsculas, números e hífen. Nada de ponto nem barra. */
// Classe simples de propósito: quantificador aninhado aqui seria ReDoS à toa.
const NOME_VALIDO = /^[a-z0-9-]+\.mdx?$/;

async function lerArquivo(arquivo: string): Promise<Noticia> {
  // O nome vem do próprio readdir, mas é validado assim mesmo: o dia em que a origem mudar
  // (uma rota, um parâmetro), a travessia de diretório já está fechada aqui.
  if (!NOME_VALIDO.test(arquivo)) {
    throw new Error(`Nome de arquivo de notícia inválido: ${arquivo}`);
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename -- nome validado acima e restrito a content/noticias
  const bruto = await readFile(path.join(DIRETORIO, arquivo), "utf8");
  const { data, content } = matter(bruto);
  const frontmatter = Frontmatter.safeParse(data);

  if (!frontmatter.success) {
    // Falhar o build é de propósito: matéria com frontmatter quebrado publicada pela metade
    // (sem data, sem candidato, sem resumo) é pior do que build vermelho.
    throw new Error(
      `Frontmatter inválido em content/noticias/${arquivo}: ${frontmatter.error.message}`,
    );
  }

  return { ...frontmatter.data, slug: arquivo.replace(/\.mdx?$/, ""), corpo: content };
}

/** Notícias publicáveis, da mais recente para a mais antiga. */
export async function listarNoticias(): Promise<Noticia[]> {
  let arquivos: string[];
  try {
    arquivos = (await readdir(DIRETORIO)).filter((a) => /\.mdx?$/.test(a));
  } catch {
    // Diretório ainda não existe (seção vazia) — listagem vazia, não erro de servidor.
    return [];
  }

  const noticias = await Promise.all(arquivos.map(lerArquivo));

  return noticias
    .filter(ehPublicavel)
    .sort(
      (a, b) =>
        Number(b.destaque) - Number(a.destaque) ||
        b.publicadoEm.getTime() - a.publicadoEm.getTime() ||
        // Desempate estável pelo slug: sem ele, matérias do mesmo dia trocam de posição
        // conforme a ordem em que o sistema de arquivos devolve os nomes.
        a.slug.localeCompare(b.slug, "pt-BR"),
    );
}

export async function obterNoticia(slug: string): Promise<Noticia | null> {
  const noticias = await listarNoticias();
  return noticias.find((n) => n.slug === slug) ?? null;
}

/**
 * Data por extenso em pt-BR, como o leitor espera ver numa matéria.
 *
 * ⚠️ Formatado em **UTC**, não em America/Sao_Paulo. O frontmatter traz uma data de calendário
 * ("2026-10-02"), que o YAML lê como meia-noite UTC; convertida para o fuso de Brasília, ela
 * volta um dia e a matéria publicada no dia 2 aparece como dia 1 — foi exatamente o que a
 * primeira captura da capa mostrou. Data sem hora não tem fuso: exibe-se como está escrita.
 */
export function formatarData(data: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(data);
}

/**
 * Data curta para a lista de chamadas ("29 ago").
 *
 * O formato pronto do Intl em pt-BR devolve "29 de ago." — preposição e ponto que, repetidos
 * em cada linha da capa, só gastam espaço. Aqui as partes são montadas à mão.
 */
export function formatarDataCurta(data: Date): string {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).formatToParts(data);

  const dia = partes.find((p) => p.type === "day")?.value ?? "";
  const mes = (partes.find((p) => p.type === "month")?.value ?? "").replace(".", "");

  return `${dia} ${mes}`;
}

/** Matérias por página da capa. */
export const TAMANHO_PAGINA = 10;

export interface PaginaDeNoticias {
  /** A manchete da página: só a primeira da primeira página ganha destaque. */
  manchete: Noticia | null;
  chamadas: Noticia[];
  pagina: number;
  totalPaginas: number;
}

/**
 * Fatia a lista para uma página da capa.
 *
 * Página fora do intervalo devolve `null` em vez de lista vazia: a rota precisa responder 404
 * de verdade, e não uma capa em branco com status 200.
 */
export function paginarNoticias(noticias: Noticia[], pagina: number): PaginaDeNoticias | null {
  const totalPaginas = Math.max(1, Math.ceil(noticias.length / TAMANHO_PAGINA));
  if (pagina < 1 || pagina > totalPaginas) return null;

  const fatia = noticias.slice((pagina - 1) * TAMANHO_PAGINA, pagina * TAMANHO_PAGINA);

  return pagina === 1
    ? { manchete: fatia[0] ?? null, chamadas: fatia.slice(1), pagina, totalPaginas }
    : { manchete: null, chamadas: fatia, pagina, totalPaginas };
}
