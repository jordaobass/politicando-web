import type {
  NivelCompatibilidade,
  StatusProposicao,
  TipoVoto,
} from "@/lib/types";

/** Formata um número decimal (0..1 ou 0..100) como percentual inteiro. */
export function formatarPercentual(valor: number): string {
  const normalizado = valor <= 1 ? valor * 100 : valor;
  return `${Math.round(normalizado)}%`;
}

/** Normaliza compatibilidade para a faixa 0..100 usada nas barras de progresso. */
export function paraEscala100(valor: number): number {
  const normalizado = valor <= 1 ? valor * 100 : valor;
  return Math.max(0, Math.min(100, Math.round(normalizado)));
}

/**
 * Classes (tokens de tema) do badge de nível: Alta=verde, Boa=azul-marinho,
 * Moderada=amber, Baixa=vermelho. Strings literais para o Tailwind detectá-las.
 */
export function classesBadgeNivel(nivel: NivelCompatibilidade): string {
  switch (nivel) {
    case "Alta":
      return "bg-chart-2/15 text-chart-2 border-chart-2/30";
    case "Boa":
      return "bg-chart-1/15 text-chart-1 border-chart-1/30";
    case "Moderada":
      return "bg-chart-3/15 text-chart-3 border-chart-3/30";
    default:
      return "bg-chart-4/15 text-chart-4 border-chart-4/30";
  }
}

/** Classe de preenchimento da barra conforme o nível de compatibilidade. */
export function classeBarraNivel(nivel: NivelCompatibilidade): string {
  switch (nivel) {
    case "Alta":
      return "bg-chart-2";
    case "Boa":
      return "bg-chart-1";
    case "Moderada":
      return "bg-chart-3";
    default:
      return "bg-chart-4";
  }
}

/**
 * Posição ideológica legível a partir da nota 0..100 (0 = esquerda, 50 = centro, 100 = direita).
 * Mesma régua usada no perfil do candidato e no perfil do usuário (eixos alinhados).
 */
export function rotuloPosicao(posicao: number): string {
  if (posicao <= 20) return "Esquerda";
  if (posicao <= 40) return "Centro-esquerda";
  if (posicao < 60) return "Centro";
  if (posicao < 80) return "Centro-direita";
  return "Direita";
}

/** Deriva o nível de compatibilidade a partir do percentual (mesmos cortes do backend). */
export function nivelPorValor(valor: number): NivelCompatibilidade {
  const p = paraEscala100(valor);
  if (p >= 80) return "Alta";
  if (p >= 60) return "Boa";
  if (p >= 40) return "Moderada";
  return "Baixa";
}

/** Cor aproximada de cada partido (chaves sem acento; lookup normaliza). */
const CORES_PARTIDO: Record<string, string> = {
  PT: "#c4122e",
  PL: "#16a34a",
  MDB: "#11a64a",
  PSDB: "#0072c6",
  PDT: "#e2231a",
  PSB: "#e30613",
  PSOL: "#8a1538",
  PP: "#2b5fd0",
  REPUBLICANOS: "#1c3f94",
  UNIAO: "#1f4fd1",
  PODE: "#16a085",
  PODEMOS: "#16a085",
  PCDOB: "#c4122e",
  NOVO: "#ff6a00",
  PSD: "#16a0d8",
  REDE: "#3aaa35",
  CIDADANIA: "#e94e1b",
  PV: "#3aaa35",
  AVANTE: "#ff7f00",
  SOLIDARIEDADE: "#ff5a00",
  PRD: "#1f4fd1",
  MISSAO: "#111827",
};

/** Cor do partido pela sigla, tolerante a acentos/caixa (undefined se desconhecida). */
export function corPartido(sigla?: string | null): string | undefined {
  if (!sigla) return undefined;
  const chave = sigla.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  return CORES_PARTIDO[chave];
}

/**
 * Converte o nome de enum de cargo do backend (ex.: "DeputadoFederal")
 * em texto legível ("Deputado Federal"). Mantém valores já formatados.
 */
export function formatarCargo(cargo: string): string {
  return cargo.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/** Rótulo legível do status de uma proposição. */
export function rotuloStatusProposicao(status: StatusProposicao): string {
  switch (status) {
    case "Aprovada":
      return "Aprovada";
    case "Rejeitada":
      return "Rejeitada";
    case "Arquivada":
      return "Arquivada";
    default:
      return "Em tramitação";
  }
}

/** Classes (tokens de tema) do badge de status da proposição. */
export function classesStatusProposicao(status: StatusProposicao): string {
  switch (status) {
    case "Aprovada":
      return "bg-chart-2/15 text-chart-2 border-chart-2/30";
    case "Rejeitada":
      return "bg-chart-4/15 text-chart-4 border-chart-4/30";
    case "Arquivada":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-chart-3/15 text-chart-3 border-chart-3/30";
  }
}

/** Rótulo legível do voto do parlamentar. */
export function rotuloVoto(voto: TipoVoto): string {
  switch (voto) {
    case "Nao":
      return "Não";
    case "Abstencao":
      return "Abstenção";
    case "Obstrucao":
      return "Obstrução";
    case "Ausente":
      return "Ausente";
    default:
      return "Sim";
  }
}

/** Classes (tokens de tema) do badge de voto. */
export function classesVoto(voto: TipoVoto): string {
  switch (voto) {
    case "Sim":
      return "bg-chart-2/15 text-chart-2 border-chart-2/30";
    case "Nao":
      return "bg-chart-4/15 text-chart-4 border-chart-4/30";
    case "Abstencao":
    case "Obstrucao":
      return "bg-chart-3/15 text-chart-3 border-chart-3/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

/** Formata um valor em reais (BRL). */
export function formatarReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/** Retorna as iniciais de um nome para fallback de avatar. */
export function iniciais(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("");
}
