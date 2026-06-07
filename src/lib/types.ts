// Tipos que espelham os contratos da API .NET (base /api).
// Mantidos centralizados para reuso entre hooks, componentes e telas.

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  icone: string;
  descricao: string;
}

export interface Pergunta {
  id: string;
  texto: string;
  categoriaId: string;
  categoria: string;
  ordem: number;
}

/** Resposta de uma pergunta do quiz. valor varia de -2 (discordo totalmente) a 2 (concordo totalmente). */
export interface RespostaQuiz {
  perguntaId: string;
  valor: number;
  /** Eleitor marcou esta pauta como especialmente importante (dobra o peso no match). */
  importante?: boolean;
}

export interface EnviarRespostasRequest {
  sessaoId?: string | null;
  respostas: RespostaQuiz[];
}

export interface PerfilCategoria {
  categoriaId: string;
  categoria: string;
  posicao: number;
}

export interface CompatibilidadeCategoria {
  categoriaId: string;
  categoria: string;
  compatibilidade: number;
}

export type NivelCompatibilidade = "Alta" | "Boa" | "Moderada" | "Baixa";

export interface ResultadoCandidato {
  candidaturaId: string;
  nomeUrna: string;
  partidoSigla: string;
  partidoLogoUrl?: string | null;
  cargo: string;
  uf: string;
  fotoUrl: string | null;
  compatibilidade: number;
  nivel: NivelCompatibilidade;
  porCategoria: CompatibilidadeCategoria[];
}

export interface ResultadoQuiz {
  sessaoId: string;
  perfil: PerfilCategoria[];
  resultado: ResultadoCandidato[];
}

/**
 * Origem da candidatura, conforme o enum OrigemDado do backend.
 * Chega como o nome do enum (ex.: "PreCandidato") via Origem.ToString().
 */
export type OrigemCandidatura =
  | "Mandatario"
  | "TseHistorico"
  | "PreCandidato"
  | "TseOficial";

/** Score resumido por categoria exibido nos cards da listagem (0..100). */
export interface ScoreResumo {
  categoria: string;
  slug: string;
  /** Posição no eixo (0..100, esq↔dir). É o que casa com o quiz. */
  posicao?: number | null;
  /** Engajamento (0..5): o quanto o candidato prioriza o tema. */
  engajamento?: number | null;
}

export interface CandidaturaResumo {
  id: string;
  nomeUrna: string;
  partidoSigla: string;
  partidoLogoUrl?: string | null;
  cargo: string;
  uf: string;
  numeroUrna: string;
  fotoUrl: string | null;
  origem: OrigemCandidatura;
  scores: ScoreResumo[];
}

export interface PaginaResultado<T> {
  itens: T[];
  total: number;
  pagina: number;
  tamanho: number;
}

export interface PoliticoPerfil {
  id?: string;
  nomeCivil: string;
  nomeUrna: string;
  fotoUrl: string | null;
  biografia: string | null;
  ocupacao: string | null;
  instagram: string | null;
  [chave: string]: unknown;
}

export interface ScoreCategoria {
  categoria: string;
  /** Posição no eixo (0..100, esq↔dir). É o que casa com o quiz. */
  posicao?: number | null;
  /** Engajamento (0..5): o quanto o candidato prioriza o tema. */
  engajamento?: number | null;
  /** Síntese curta da posição (texto). */
  posicaoSintese?: string | null;
  justificativa?: string | null;
  /** Confiança da IA (0..1) — quão sólida é a evidência. */
  confianca?: number;
}

/** Uma candidatura do histórico da pessoa (eleições disputadas). */
export interface CandidaturaHistorico {
  ano: number;
  cargo: string;
  uf: string;
  partidoSigla?: string | null;
  eleito: boolean;
  atual: boolean;
}

/** Um cargo efetivamente exercido (atual = sem data de fim). */
export interface ExercicioCargo {
  cargo: string;
  uf: string;
  inicio: string;
  fim?: string | null;
  atual: boolean;
  legislatura?: number | null;
  casa?: string | null;
}

/** Uma filiação partidária (atual = sem data de fim). */
export interface FiliacaoPartido {
  partidoSigla?: string | null;
  inicio?: string | null;
  fim?: string | null;
  atual: boolean;
}

export interface CandidaturaDetalhe {
  id: string;
  politico: PoliticoPerfil;
  partidoSigla: string;
  partidoLogoUrl?: string | null;
  cargo: string;
  uf: string;
  origem: OrigemCandidatura;
  situacao: string | null;
  propostasResumo: string | null;
  /** Resumo geral gerado pela análise de IA do candidato. */
  observacaoIa: string | null;
  scores: ScoreCategoria[];
  historicoCandidaturas?: CandidaturaHistorico[];
  exercicios?: ExercicioCargo[];
  filiacoes?: FiliacaoPartido[];
}

export interface CompararResultado {
  a: CandidaturaDetalhe;
  b: CandidaturaDetalhe;
}

// ---------------------------------------------------------------------------
// Atividade legislativa (perfil do parlamentar)
// ---------------------------------------------------------------------------

/** Status agrupado da proposição (espelha o enum StatusProposicao do backend). */
export type StatusProposicao =
  | "EmTramitacao"
  | "Aprovada"
  | "Rejeitada"
  | "Arquivada";

/** Voto do parlamentar (espelha o enum TipoVoto do backend). */
export type TipoVoto = "Sim" | "Nao" | "Abstencao" | "Obstrucao" | "Ausente";

export interface ResumoAtividade {
  projetosTotal: number;
  projetosAprovados: number;
  projetosEmTramitacao: number;
  projetosRejeitados: number;
  votacoes: number;
  relatorias: number;
  presencaPercentual: number | null;
}

export interface ProposicaoAtividade {
  idExterno: string;
  rotulo: string; // "PL 1234/2026"
  tipo: string;
  numero: number;
  ano: number;
  ementa: string;
  tema: string | null;
  dataApresentacao: string | null;
  status: StatusProposicao;
  situacao: string | null;
  urlPortal: string;
  urlInteiroTeor: string | null;
}

export interface VotoAtividade {
  descricao: string;
  tema: string | null;
  data: string | null;
  voto: TipoVoto;
  urlPortal: string;
}

export interface PresencaMes {
  mes: string;
  percentual: number;
}

export interface PresencaAtividade {
  ano: number;
  percentual: number;
  sessoesTotais: number;
  sessoesPresente: number;
  porMes: PresencaMes[];
}

export interface GabineteTipo {
  tipo: string;
  total: number;
  quantidade: number;
}

export interface GabineteMes {
  mes: string;
  total: number;
}

export interface GabineteAtividade {
  ano: number;
  total: number;
  porTipo: GabineteTipo[];
  porMes: GabineteMes[];
  urlPortal: string | null;
}

export interface ComissaoAtividade {
  nome: string;
  sigla: string;
  casa: string | null;
  participacao: string; // "Titular" / "Suplente" / ...
  inicio: string | null;
  fim: string | null; // null = "até o momento"
  ativa: boolean;
  ano: number;
}

export interface AtividadeLegislativa {
  resumo: ResumoAtividade;
  projetos: ProposicaoAtividade[];
  votacoes: VotoAtividade[];
  relatorias: ProposicaoAtividade[];
  /** Um item por ano do mandato (legislatura) corrente, do mais recente para o mais antigo. */
  presencas: PresencaAtividade[];
  /** Gastos da Cota Parlamentar por ano, do mais recente para o mais antigo (carrossel). */
  gabinetes: GabineteAtividade[];
  /** Atuação em comissões (Senado), da mais recente para a mais antiga. */
  comissoes: ComissaoAtividade[];
  portalNome: string | null;
  portalUrl: string | null;
}

/** Resposta do candidato a uma pergunta do quiz (espelha RespostaOpiniao do backend). */
export type RespostaOpiniao = "Desconhecida" | "Favoravel" | "Contrario" | "Neutro";

/** Origem da posição (espelha FonteOpiniao do backend). */
export type FonteOpiniao = "AtividadeLegislativa" | "Partido" | "Ia" | "Manual";

export interface OpiniaoCandidato {
  perguntaId: string;
  texto: string;
  resposta: RespostaOpiniao;
  fonte: FonteOpiniao;
  justificativa: string | null;
}

/** Grupo de opiniões de uma categoria (uma "seção" da aba Opiniões). */
export interface CategoriaOpiniao {
  categoriaId: string;
  categoria: string;
  slug: string;
  ordem: number;
  perguntas: OpiniaoCandidato[];
}

export interface Partido {
  id: string;
  sigla: string;
  nome: string;
  numero: number;
  logoUrl: string | null;
  siteOficial?: string | null;
  programaUrl?: string | null;
  programaResumo?: string | null;
}

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  [chave: string]: unknown;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  usuario: Usuario;
}

export interface EsqueciSenhaResposta {
  mensagem: string;
  contaSocial: boolean;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegistrarRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface FiltrosCandidatura {
  cargos?: string[];
  ufs?: string[];
  partidos?: string[];
  q?: string;
  /** Slug da categoria para ordenar pela pontuação; vazio/ausente = ordena por nome. */
  ordenarPor?: string;
  /** true = maior pontuação primeiro (padrão); false = menor primeiro. */
  desc?: boolean;
  pagina?: number;
  tamanho?: number;
}

export interface AdminDashboard {
  totalCandidatos: number;
  candidatosSemFoto: number;
  quizCompletados: number;
  scoresCalculados: number;
  comparacoes: number;
  usuarios: number;
}

export interface AdminIntegracao {
  id: string;
  nome: string;
  tipo: string;
  ativa: boolean;
  ultimoStatus: string | null;
  ultimaExecucaoEm: string | null;
  proximaExecucaoEm: string | null;
}
