"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { CHAVE_ULTIMA_PAGINA } from "@/lib/constantes";
import { rotaIgnorada } from "@/lib/navegacao";

/**
 * Grava no sessionStorage a última página "real" visitada (ignorando rotas de auth), para que o
 * login possa devolver o usuário exatamente para onde ele estava. Item #8 do card de correções.
 * Não renderiza nada.
 */
export function RegistradorRota() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || rotaIgnorada(pathname)) return;
    try {
      sessionStorage.setItem(CHAVE_ULTIMA_PAGINA, pathname);
    } catch {
      // sessionStorage indisponível (modo privado/SSR) — ignora silenciosamente.
    }
  }, [pathname]);

  return null;
}
