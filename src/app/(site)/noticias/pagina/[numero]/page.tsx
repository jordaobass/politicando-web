import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { Chamada } from "@/components/noticias/chamada";
import { PaginacaoNoticias } from "@/components/noticias/paginacao-noticias";
import { listarNoticias, paginarNoticias, TAMANHO_PAGINA } from "@/lib/noticias";
import { SITE_URL } from "@/lib/site";

/**
 * Páginas 2..N do arquivo de notícias.
 *
 * Existem como URL própria — e não como "carregar mais" — porque o buscador precisa seguir
 * link de verdade para encontrar matéria antiga. Tudo é gerado no build: nenhum fetch no
 * caminho do leitor.
 */

const TITULO = "Notícias";
const DESCRICAO =
  "Checagens e análises sobre os candidatos das Eleições 2026, com fonte e evidência em cada afirmação.";

/** Total de páginas a partir do acervo — mesma conta de `paginarNoticias`. */
function contarPaginas(total: number): number {
  return Math.max(1, Math.ceil(total / TAMANHO_PAGINA));
}

/**
 * Lê o parâmetro de rota como número de página.
 *
 * Aceita só a grafia canônica em dígitos: `Number` engoliria `" 2 "`, `"2.0"`, `"+2"` e
 * `"02"`, e cada variação dessas seria uma URL diferente servindo a mesma página — conteúdo
 * duplicado de graça. Devolve `null` também para `"1"`, que mora em `/noticias`.
 */
function interpretarNumero(numero: string): number | null {
  if (!/^[1-9][0-9]*$/.test(numero)) return null;
  const pagina = Number(numero);
  return pagina >= 2 ? pagina : null;
}

export async function generateStaticParams() {
  const noticias = await listarNoticias();
  const totalPaginas = contarPaginas(noticias.length);

  // Começa em 2: a página 1 é `/noticias`. Gerar `/noticias/pagina/1` criaria duas URLs com
  // o mesmo conteúdo, o que é erro de SEO, não conveniência.
  return Array.from({ length: Math.max(0, totalPaginas - 1) }, (_, indice) => ({
    numero: String(indice + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ numero: string }>;
}): Promise<Metadata> {
  const { numero } = await params;
  const pagina = interpretarNumero(numero);

  if (pagina === null) return { title: "Página não encontrada" };

  const url = `${SITE_URL}/noticias/pagina/${pagina}`;
  const titulo = `${TITULO} — página ${pagina}`;
  const descricao = `Página ${pagina} do arquivo de matérias do Politicando. ${DESCRICAO}`;

  return {
    title: titulo,
    description: descricao,
    // Canonical na própria página (e não em `/noticias`): cada página do arquivo tem lista
    // diferente, então cada uma é o original de si mesma.
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${titulo} | Politicando`,
      description: descricao,
      url,
    },
  };
}

export default async function PaginaDoArquivoDeNoticias({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;
  const pagina = interpretarNumero(numero);

  // Número inválido (texto, zero, negativo, "1") → 404 de verdade, não página em branco com
  // status 200, que o buscador indexaria como conteúdo vazio.
  if (pagina === null) notFound();

  const noticias = await listarNoticias();
  const dados = paginarNoticias(noticias, pagina);

  // `null` aqui significa página fora do intervalo (o acervo encolheu, link antigo, chute na
  // URL) — é o gatilho de 404 que o helper já entrega pronto.
  if (!dados) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {TITULO}
        </h1>
        <p className="text-sm text-muted-foreground">
          Página {dados.pagina} de {dados.totalPaginas}
        </p>
        <Link
          href="/noticias"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar para a capa
        </Link>
      </header>

      {/* Sem manchete nas páginas internas: destaque é privilégio da capa. Aqui todas as
          matérias valem o mesmo peso, em lista cronológica. */}
      <ul className="mt-8">
        {dados.chamadas.map((noticia) => (
          <Chamada key={noticia.slug} noticia={noticia} />
        ))}
      </ul>

      <PaginacaoNoticias pagina={dados.pagina} totalPaginas={dados.totalPaginas} />
    </div>
  );
}
