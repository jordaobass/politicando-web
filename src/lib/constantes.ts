// Constantes de domínio reutilizadas em filtros e telas.

/**
 * Cargos disponíveis no filtro. `valor` é o nome do enum CargoTipo do backend
 * (sem espaços — o binder do ASP.NET espera o nome exato); `rotulo` é o texto exibido.
 */
export const CARGOS = [
  { valor: "Presidente", rotulo: "Presidente" },
  { valor: "Governador", rotulo: "Governador" },
  { valor: "Senador", rotulo: "Senador" },
  { valor: "DeputadoFederal", rotulo: "Deputado Federal" },
  { valor: "DeputadoEstadual", rotulo: "Deputado Estadual" },
] as const;

export type Cargo = (typeof CARGOS)[number]["valor"];

/**
 * Cargos exibidos no filtro da listagem: Presidente, Governador, Senador e Deputado Federal
 * (cargos com dados/score na plataforma). Deputado Estadual fica fora (sem ingestão dedicada).
 */
export const CARGOS_FILTRO = CARGOS.filter((c) =>
  ["Presidente", "Governador", "Senador", "DeputadoFederal"].includes(c.valor),
);

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export type UF = (typeof UFS)[number];

/** Valores da escala de respostas do quiz (Likert de -2 a 2). */
export const ESCALA_RESPOSTAS = [
  { valor: 2, rotulo: "Concordo totalmente" },
  { valor: 1, rotulo: "Concordo" },
  { valor: 0, rotulo: "Neutro" },
  { valor: -1, rotulo: "Discordo" },
  { valor: -2, rotulo: "Discordo totalmente" },
] as const;

/** Chave usada para guardar o resultado do quiz no sessionStorage entre /quiz e /quiz/resultado. */
export const CHAVE_RESULTADO_QUIZ = "politicando:resultado-quiz";

/** Chave de armazenamento da sessão de autenticação. */
export const CHAVE_SESSAO = "politicando:sessao";

/** Chave da UF do eleitor (filtro dos cargos estaduais no resultado do quiz). */
export const CHAVE_UF = "politicando:uf";

/** Última página "real" visitada — usada para voltar a ela após o login (returnTo). */
export const CHAVE_ULTIMA_PAGINA = "politicando:ultima-pagina";

/**
 * URL da lista de candidatos (com busca/filtros/página) memorizada por aba — o botão
 * "Voltar para candidatos" do perfil restaura a lista como estava (Correções v7, item 2a).
 */
export const CHAVE_RETORNO_CANDIDATOS = "politicando:retorno-candidatos";

/** Decisão do banner de cookies ("aceitos" | "recusados"); ausente = ainda não decidiu. */
export const CHAVE_COOKIES = "politicando:cookies";

/** Consentimento do quiz sem login (LGPD art. 11) — guarda a versão aceita do termo. */
export const CHAVE_CONSENTIMENTO_QUIZ = "politicando:consentimento-quiz";

/**
 * Versão dos documentos legais em vigor (data de atualização dos PDFs do cliente).
 * Vai junto do consentimento registrado no servidor: sem saber QUAL texto a pessoa
 * aceitou, o registro não prova nada (LGPD, art. 8º, § 1º).
 * O sufixo ".2" distingue esta revisão (PDFs de 26/08 com as seções 8 mantidas e
 * o DPO preenchido) da anterior de mesma data, que havia removido essas seções.
 */
export const VERSAO_DOCUMENTOS_LEGAIS = "2026-08-26.2";

/**
 * Mensagem padrão para bloco de perfil sem dado suficiente (Correções v7, item 4).
 * O texto é EXATAMENTE o pedido pelo cliente — não reformular. Todos os blocos que antes
 * sumiam ou tinham textos de vazio próprios convergem para esta frase.
 */
export const MENSAGEM_SEM_DADOS =
  "Não foram encontrados dados públicos confiáveis para exibir a informação";

/**
 * Texto do card informativo de candidato despublicado por curadoria na página do partido
 * (Correções v7, item 6; grafia corrigida do card do cliente — decisão E16).
 */
export const MENSAGEM_SEM_ANALISE = "Sem dados suficientes para análise";

/**
 * Disclaimer da busca de candidatos (Correções v7, item 7).
 * ⚠️ COPY PROPOSTA, ainda NÃO aprovada pelo dono (decisão C6 do DECISOES.md) — trocar AQUI
 * quando a redação final chegar; é o único ponto do código com este texto.
 */
export const DISCLAIMER_HISTORICO =
  "Exibimos apenas candidatos com histórico de vida pública registrado em plataformas " +
  "oficiais (Câmara, Senado e TSE). Assim mantemos a consistência, a confiança e a " +
  "imparcialidade das análises.";

/**
 * Rotas dos documentos legais. Ficam acessíveis mesmo com o site em modo "em breve"
 * (ver `src/middleware.ts`) e entram no sitemap.
 */
export const ROTAS_LEGAIS = [
  { href: "/termos-de-uso", rotulo: "Termos de uso" },
  { href: "/privacidade", rotulo: "Política de privacidade" },
  { href: "/cookies", rotulo: "Política de cookies" },
  { href: "/consentimento", rotulo: "Termo de consentimento" },
] as const;
