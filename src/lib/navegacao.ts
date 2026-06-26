import { CHAVE_ULTIMA_PAGINA } from "@/lib/constantes";

/** Rotas que NÃO devem ser registradas como "última página" nem usadas como retorno pós-login. */
export const ROTAS_NAO_RETORNAVEIS = ["/login", "/completar-cadastro", "/redefinir-senha"];

/** True se a rota é transitória (auth) e não deve virar destino de retorno. */
export function rotaIgnorada(pathname: string): boolean {
  return ROTAS_NAO_RETORNAVEIS.some((r) => pathname.startsWith(r));
}

/**
 * Página para onde voltar após o login: a última página real visitada (gravada por
 * RegistradorRota), ou o <fallback> quando não houver uma válida. Item #8 do card de correções.
 */
export function paginaDeRetorno(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    const destino = sessionStorage.getItem(CHAVE_ULTIMA_PAGINA);
    return destino && !rotaIgnorada(destino) ? destino : fallback;
  } catch {
    return fallback;
  }
}
