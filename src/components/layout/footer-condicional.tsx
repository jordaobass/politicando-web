"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";

/** Telas de tela cheia (auth) não exibem o rodapé. */
const SEM_RODAPE = ["/login", "/redefinir-senha"];

/** Renderiza o rodapé, exceto nas telas de autenticação (layout próprio de tela cheia). */
export function FooterCondicional() {
  const pathname = usePathname();
  if (SEM_RODAPE.includes(pathname)) return null;
  return <Footer />;
}
