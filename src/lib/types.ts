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
}

export interface EnviarRespostasRequest {
  sessaoId?: string | null;
  respostas: RespostaQuiz[];
  /**
   * Versão do Termo de Consentimento aceita antes de iniciar o quiz (ex.: "2026-08-17").
   * Obrigatória para quem responde sem login — é o que registra o consentimento do
   * tratamento de opinião política (LGPD art. 11).
   */
  consentimentoVersao?: string | null;
}

export interface PerfilCategoria {
  categoriaId: string;
  categoria: string;
  posicao: number;
}

export interface CompatibilidadeCategoria {
  categoriaId: string;
  categoria: string;
  /** Afinidade de POSIÇÃO entre eleitor e candidato (0–100). É o que entra no match. */
  compatibilidade: number;
  /** Atuação do candidato no tema (0–5). Informativo — não entra no match. */
  engajamento?: number | null;
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
  /** Em quantos temas o match pôde ser apurado (o candidato tinha posição no tema). */
  eixosAvaliados?: number;
  /** Quantos temas o eleitor respondeu — a base de comparação de `eixosAvaliados`. */
  eixosRespondidos?: number;
}

export interface ResultadoQuiz {
  sessaoId: string;
  perfil: PerfilCategoria[];
  resultado: ResultadoCandidato[];
  /** Quantos candidatos entraram no ranking e quantos ficaram fora por falta de dado oficial. */
  cobertura?: CoberturaResultado | null;
}

/**
 * Cobertura do ranking. Quem não tem registro público suficiente fica de fora, mas precisa ser
 * anunciado: sem isso a lista se lê como o universo de candidatos, e o resultado parece favorecer
 * quem já tem mandato quando na verdade só sobre esses existe dado.
 */
export interface CoberturaResultado {
  avaliados: number;
  semDados: number;
  /** Quantos ficaram sem dados, por cargo (ex.: { Senador: 233 }). */
  semDadosPorCargo: Record<string, number>;
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
  nomeCivil?: string | null;
  /**
   * true = despublicada por curadoria (Correções v7, item 6): aparece na página do partido só
   * como card informativo — sem link de perfil (o backend responde 404) e sem comparar.
   */
  somenteInformativo?: boolean;
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

/** Fatia do orçamento estadual num eixo temático (SICONFI) — gestão estadual. */
export interface GestaoEstadualItem {
  eixo: string;
  eixoNome: string;
  percentual: number;
  valorMilhoes: number;
}

/** Bloco "Gestão estadual": execução orçamentária por eixo da UF, num exercício. */
export interface GestaoEstadual {
  ano: number;
  eixos: GestaoEstadualItem[];
}

/** Resumo do plano de governo num eixo temático (US-PRES-05 / US-GOV-05). */
export interface PlanoGovernoTema {
  eixo: string;
  eixoNome: string;
  resumo?: string | null;
}

/**
 * Bloco "Plano de governo por tema": trechos do plano oficial por eixo. O ano é sempre o da
 * eleição da candidatura — o backend não devolve plano de pleito anterior.
 */
export interface PlanoGoverno {
  ano: number;
  temas: PlanoGovernoTema[];
}

export interface CandidaturaDetalhe {
  id: string;
  politico: PoliticoPerfil;
  partidoSigla: string;
  partidoLogoUrl?: string | null;
  cargo: string;
  uf: string;
  /** Ano da eleição desta candidatura (define o pleito do plano de governo exibido). */
  anoEleicao: number;
  origem: OrigemCandidatura;
  situacao: string | null;
  propostasResumo: string | null;
  /** Resumo geral gerado pela análise de IA do candidato. */
  observacaoIa: string | null;
  /** Observação de curadoria (manual): proveniência do score e registro de governo, com fontes. */
  observacaoCuradoria: string | null;
  scores: ScoreCategoria[];
  historicoCandidaturas?: CandidaturaHistorico[];
  exercicios?: ExercicioCargo[];
  filiacoes?: FiliacaoPartido[];
  /** Execução orçamentária por eixo da UF (só Governador). */
  gestaoEstadual?: GestaoEstadual | null;
  /** Número eleitoral (urna). */
  numeroUrna?: number | null;
  /** Total de bens declarados ao TSE. Nulo = não importado; zero = declarou nada. */
  patrimonioDeclarado?: number | null;
  /** Tipo de histórico do candidato (ex_governador, mandato_federal, sem_mandato…). */
  tipoHistorico?: string | null;
  /** Plano de governo por tema (US-PRES-05 / US-GOV-05). */
  planoGoverno?: PlanoGoverno | null;
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
  // Fiscalização e Controle (US-SEN-03): requerimentos/indicações.
  fiscalizacaoTotal: number;
  fiscalizacaoAprovadas: number;
  fiscalizacaoEmTramitacao: number;
  fiscalizacaoRejeitadas: number;
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
  /** Fiscalização e Controle: requerimentos e indicações de autoria (Senado). */
  fiscalizacao: ProposicaoAtividade[];
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
  /** Data de nascimento ISO (YYYY-MM-DD); somente leitura no perfil. */
  dataNascimento?: string | null;
  /** Tem senha definida (conta manual) → exibe "Alterar senha". Conta exclusivamente social = false. */
  podeAlterarSenha?: boolean;
  [chave: string]: unknown;
}

/** Candidato resumido exibido numa comparação salva (cartão US-AUTH-06). */
export interface CandidaturaMini {
  id: string;
  nomeUrna: string;
  partidoSigla?: string | null;
  fotoUrl?: string | null;
}

export interface ComparacaoSalva {
  id: string;
  a: CandidaturaMini;
  b: CandidaturaMini;
}

/** Último quiz do usuário: quando foi feito + o resultado recalculado. */
export interface UltimoQuiz {
  finalizadoEm: string;
  resultado: ResultadoQuiz;
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
  /** Data de nascimento no formato ISO (YYYY-MM-DD); idade mínima de 16 anos. */
  dataNascimento: string;
  aceiteLgpd: boolean;
  /** Versão dos documentos legais aceita no cadastro (ex.: "2026-08-17"). */
  consentimentoVersao?: string | null;
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
  /** Inclui despublicados por curadoria como cards informativos (página do partido — item 6). */
  incluirInformativos?: boolean;
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
