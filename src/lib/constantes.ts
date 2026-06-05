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

/** Chave de armazenamento da sessão de autenticação (mock no protótipo). */
export const CHAVE_SESSAO = "politicando:sessao";

/** Chave da UF do eleitor (filtro dos cargos estaduais no resultado do quiz). */
export const CHAVE_UF = "politicando:uf";
