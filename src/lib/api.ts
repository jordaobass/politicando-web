// Cliente HTTP central da aplicação.
// A base URL vem de NEXT_PUBLIC_API_URL (default http://localhost:5080/api).
// Todas as funções de fetch da API ficam aqui para facilitar manutenção e reuso.

import type {
  AdminDashboard,
  AdminIntegracao,
  AtividadeLegislativa,
  AuthResponse,
  CandidaturaDetalhe,
  CandidaturaResumo,
  Categoria,
  CategoriaOpiniao,
  CompararResultado,
  EnviarRespostasRequest,
  FiltrosCandidatura,
  LoginRequest,
  PaginaResultado,
  Partido,
  Pergunta,
  PoliticoPerfil,
  RegistrarRequest,
  ResultadoQuiz,
  Usuario,
  EsqueciSenhaResposta,
} from "@/lib/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5080/api";

/** Erro de requisição HTTP com status para tratamento nas telas. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends RequestInit {
  /** Token de autenticação opcional (Bearer). */
  token?: string | null;
}

/** Executa uma requisição contra a API e desserializa o JSON de resposta. */
async function request<T>(caminho: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const resposta = await fetch(`${API_BASE_URL}${caminho}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!resposta.ok) {
    throw new ApiError(
      resposta.status,
      `Falha na requisição (${resposta.status}) em ${caminho}`,
    );
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return (await resposta.json()) as T;
}

/** Monta uma query string ignorando valores vazios/nulos. */
function montarQuery(
  params: Record<string, string | number | boolean | string[] | undefined | null>,
): string {
  const busca = new URLSearchParams();
  for (const [chave, valor] of Object.entries(params)) {
    if (Array.isArray(valor)) {
      // Arrays viram parâmetros repetidos (?cargos=A&cargos=B), formato que o binder do ASP.NET espera.
      for (const item of valor) {
        if (item !== "") busca.append(chave, String(item));
      }
    } else if (valor !== undefined && valor !== null && valor !== "") {
      busca.set(chave, String(valor));
    }
  }
  const texto = busca.toString();
  return texto ? `?${texto}` : "";
}

// ---------------------------------------------------------------------------
// Categorias e Quiz
// ---------------------------------------------------------------------------

export function buscarCategorias(): Promise<Categoria[]> {
  return request<Categoria[]>("/categorias");
}

export function buscarPerguntas(): Promise<Pergunta[]> {
  return request<Pergunta[]>("/quiz/perguntas");
}

export function enviarRespostas(body: EnviarRespostasRequest): Promise<ResultadoQuiz> {
  return request<ResultadoQuiz>("/quiz/respostas", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ---------------------------------------------------------------------------
// Candidaturas e Políticos
// ---------------------------------------------------------------------------

export function buscarCandidaturas(
  filtros: FiltrosCandidatura = {},
): Promise<PaginaResultado<CandidaturaResumo>> {
  const query = montarQuery({
    cargos: filtros.cargos,
    ufs: filtros.ufs,
    partidos: filtros.partidos,
    q: filtros.q,
    ordenarPor: filtros.ordenarPor,
    desc: filtros.ordenarPor ? filtros.desc : undefined,
    pagina: filtros.pagina,
    tamanho: filtros.tamanho,
  });
  return request<PaginaResultado<CandidaturaResumo>>(`/candidaturas${query}`);
}

export function buscarCandidatura(id: string): Promise<CandidaturaDetalhe> {
  return request<CandidaturaDetalhe>(`/candidaturas/${id}`);
}

export function buscarAtividade(id: string): Promise<AtividadeLegislativa> {
  return request<AtividadeLegislativa>(`/candidaturas/${id}/atividade`);
}

export function buscarOpinioes(id: string): Promise<CategoriaOpiniao[]> {
  return request<CategoriaOpiniao[]>(`/candidaturas/${id}/opinioes`);
}

export function buscarPolitico(id: string): Promise<PoliticoPerfil> {
  return request<PoliticoPerfil>(`/politicos/${id}`);
}

export function compararCandidaturas(a: string, b: string): Promise<CompararResultado> {
  return request<CompararResultado>(`/comparar${montarQuery({ a, b })}`);
}

// ---------------------------------------------------------------------------
// Partidos
// ---------------------------------------------------------------------------

export function buscarPartidos(): Promise<Partido[]> {
  return request<Partido[]>("/partidos");
}

export function buscarPartido(id: string): Promise<Partido> {
  return request<Partido>(`/partidos/${id}`);
}

// ---------------------------------------------------------------------------
// Autenticação
// ---------------------------------------------------------------------------

export function login(body: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function registrar(body: RegistrarRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/registrar", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Solicita o link de redefinição. Resposta neutra; sinaliza conta exclusivamente social. */
export function esqueciSenha(email: string): Promise<EsqueciSenhaResposta> {
  return request<EsqueciSenhaResposta>("/auth/esqueci-senha", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/** Redefine a senha e já autentica o usuário (auto-login, cartão US-AUTH-04). */
export function redefinirSenha(body: {
  email: string;
  token: string;
  novaSenha: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/redefinir-senha", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Renova a sessão (rotaciona o refresh token e devolve um novo JWT de 30 dias). */
export function renovarSessao(refreshToken: string): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

/** Encerra a sessão no servidor revogando o refresh token. */
export function logout(refreshToken: string): Promise<void> {
  return request<void>("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

/** Dados do usuário autenticado — usado pelo callback do login social para montar a sessão. */
export function meuPerfil(token: string): Promise<Usuario> {
  return request<Usuario>("/auth/me", { token });
}

/** URL para iniciar o login com Google (navegação de página inteira; o fluxo é todo no backend). */
export const URL_LOGIN_GOOGLE = `${API_BASE_URL}/auth/google`;

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export function buscarDashboardAdmin(token?: string | null): Promise<AdminDashboard> {
  return request<AdminDashboard>("/admin/dashboard", { token });
}

export function buscarIntegracoesAdmin(token?: string | null): Promise<AdminIntegracao[]> {
  return request<AdminIntegracao[]>("/admin/integracoes", { token });
}

export function recalcularScores(token?: string | null): Promise<void> {
  return request<void>("/admin/scores/recalcular", { method: "POST", token });
}
