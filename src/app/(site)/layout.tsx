import { Suspense, type ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { BannerCookies } from "@/components/layout/banner-cookies";
import { FooterCondicional } from "@/components/layout/footer-condicional";
import { RegistradorRota } from "@/components/layout/registrador-rota";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

/**
 * Layout do site público: navbar, conteúdo, rodapé (oculto no login), o banner
 * de cookies e a medição de audiência. Os dois moram aqui, e não no layout raiz,
 * porque `/admin` e `/em-breve` estão fora deste grupo de rotas — ficam de fora
 * por construção.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RegistradorRota />
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterCondicional />
      <BannerCookies />
      {/* useSearchParams() exige fronteira de Suspense; sem ela a página inteira vira dinâmica. */}
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
