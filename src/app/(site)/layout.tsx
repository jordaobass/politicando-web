import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { FooterCondicional } from "@/components/layout/footer-condicional";

/** Layout do site público: navbar, conteúdo e rodapé (oculto no login). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterCondicional />
    </>
  );
}
