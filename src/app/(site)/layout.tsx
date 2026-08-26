import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { BannerCookies } from "@/components/layout/banner-cookies";
import { FooterCondicional } from "@/components/layout/footer-condicional";
import { RegistradorRota } from "@/components/layout/registrador-rota";

/**
 * Layout do site público: navbar, conteúdo, rodapé (oculto no login) e o banner
 * de cookies. O banner mora aqui, e não no layout raiz, porque `/admin` e
 * `/em-breve` estão fora deste grupo de rotas — ficam de fora por construção.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RegistradorRota />
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterCondicional />
      <BannerCookies />
    </>
  );
}
