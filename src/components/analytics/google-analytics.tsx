"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { GA_ID } from "@/lib/analytics";
import { useArmazenamento } from "@/hooks/use-storage";
import { CHAVE_COOKIES } from "@/lib/constantes";

/**
 * Google Analytics 4 — carregado SÓ depois do "Aceitar todos" no banner de cookies.
 *
 * Medição de audiência é finalidade não essencial: sob a LGPD, o script não pode ser baixado
 * antes do consentimento. Por isso o componente não usa Consent Mode com o script já em
 * página — enquanto a decisão não for "aceitos", nada é pedido ao Google e nenhum
 * identificador é gravado no navegador. Quem recusa nunca carrega.
 *
 * Mora no layout do grupo `(site)`: `/admin` e `/em-breve` estão fora desse grupo, então o
 * painel interno fica de fora da medição por construção, sem lista de rotas para manter.
 */
export function GoogleAnalytics() {
  const [decisao] = useArmazenamento("local", CHAVE_COOKIES);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // O hook de armazenamento avisa a própria aba ao gravar, então aceitar o banner monta o
  // script na hora — sem recarregar a página.
  const consentido = decisao === "aceitos";
  const ativo = Boolean(GA_ID) && consentido;

  // A visita é registrada aqui, e não pelo `config`, porque numa SPA a troca de rota não
  // recarrega a página: sem isto, o relatório mostraria só a primeira tela de cada sessão.
  useEffect(() => {
    if (!ativo || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [ativo, pathname, searchParams]);

  if (!ativo) return null;

  return (
    <>
      <Script
        id="ga-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
// send_page_view:false — quem envia a visita é o efeito acima, que também cobre a troca de
// rota. Deixar os dois ligados contaria a primeira tela duas vezes.
gtag('config', '${GA_ID}', { send_page_view: false });`}
      </Script>
    </>
  );
}
