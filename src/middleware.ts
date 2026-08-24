import { NextResponse, type NextRequest } from "next/server";

/**
 * Modo "em breve": quando COMING_SOON=true, todo o site público é reescrito
 * para a página /em-breve. O painel /admin e a API /api ficam de fora (o
 * matcher já os exclui) para seguir gerenciando conteúdo por trás do muro.
 *
 * Para desligar: remover a variável (ou COMING_SOON=false) e redeployar.
 */
export function middleware(request: NextRequest) {
  if (process.env.COMING_SOON !== "true") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/em-breve";
  // Rewrite (não redirect): mantém a URL original no navegador e responde 200
  // com a tela de "em breve" em qualquer rota do site público.
  return NextResponse.rewrite(url);
}

export const config = {
  // Roda em tudo, EXCETO: /admin, /api, internos do Next, a própria /em-breve,
  // as quatro páginas legais e arquivos estáticos (caminho com ponto: .ico, .txt...).
  //
  // As páginas legais ficam de fora de propósito: documento que rege o uso da
  // plataforma (e o consentimento já dado por quem entrou antes) precisa continuar
  // público mesmo com o site fechado em modo "em breve".
  matcher: [
    "/((?!admin|api|_next|em-breve|termos-de-uso|privacidade|cookies|consentimento|.*\\.).*)",
  ],
};
