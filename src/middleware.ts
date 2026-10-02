import { NextResponse, type NextRequest } from "next/server";

/**
 * Bordas que resolvem geolocalização, em ordem de preferência: a Vercel serve o site
 * publicado; a Cloudflare serve os domínios que saem pelo tunnel (dev).
 *
 * ⚠️ Na Cloudflare os cabeçalhos de UF/cidade só existem com o managed transform
 * "Add visitor location headers" ligado na zona — sem ele vem apenas `cf-ipcountry`.
 */
const BORDAS_GEO = [
  {
    pais: "x-vercel-ip-country",
    regiao: "x-vercel-ip-country-region",
    cidade: "x-vercel-ip-city",
  },
  { pais: "cf-ipcountry", regiao: "cf-region-code", cidade: "cf-ipcity" },
] as const;

/**
 * Repassa a localização da borda para a API em cabeçalhos próprios (`x-geo-*`).
 *
 * **Por que isto existe:** a Vercel entrega país, UF e cidade à FUNÇÃO (este middleware),
 * mas o rewrite externo do `next.config.ts` (`/api/* → backend`) repassa só o país. Medido
 * em 02/10/2026 em produção: 1.959 acessos registrados, todos com país e **nenhuma UF**.
 * Lendo aqui e reemitindo como `x-geo-*` — nomes que o backend já aceita — a UF e a cidade
 * chegam sem depender do que o proxy decide encaminhar.
 *
 * O IP não é lido: a borda já entrega a localização resolvida.
 */
function repassarGeo(request: NextRequest) {
  const headers = new Headers(request.headers);
  const borda = BORDAS_GEO.find((b) => request.headers.get(b.pais));

  const valores = borda
    ? {
        "x-geo-country": request.headers.get(borda.pais),
        "x-geo-region": request.headers.get(borda.regiao),
        "x-geo-city": request.headers.get(borda.cidade),
      }
    : {};

  for (const [nome, valor] of Object.entries(valores)) {
    if (valor) headers.set(nome, valor);
    else headers.delete(nome);
  }

  const resposta = NextResponse.next({ request: { headers } });

  // Diagnóstico sem expor localização: diz só o quanto a borda informou, para dar
  // para provar de fora que esta camada rodou (e não supor que rodou).
  const completude = !borda
    ? "ausente"
    : valores["x-geo-region"] && valores["x-geo-city"]
      ? "completo"
      : "parcial";
  resposta.headers.set("x-geo-detalhe", completude);

  return resposta;
}

/**
 * Modo "em breve": quando COMING_SOON=true, todo o site público é reescrito
 * para a página /em-breve. O painel /admin e a API /api ficam de fora para
 * seguir gerenciando conteúdo por trás do muro.
 *
 * Para desligar: remover a variável (ou COMING_SOON=false) e redeployar.
 */
export function middleware(request: NextRequest) {
  // A API nunca entra no modo "em breve" — só ganha os cabeçalhos de geolocalização.
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return repassarGeo(request);
  }

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
  // Duas entradas: a API (só para repassar geolocalização) e o site público.
  //
  // O site roda em tudo, EXCETO: /admin, /api, internos do Next, a própria /em-breve,
  // as quatro páginas legais e arquivos estáticos (caminho com ponto: .ico, .txt...).
  //
  // As páginas legais ficam de fora de propósito: documento que rege o uso da
  // plataforma (e o consentimento já dado por quem entrou antes) precisa continuar
  // público mesmo com o site fechado em modo "em breve".
  matcher: [
    "/api/:path*",
    "/((?!admin|api|_next|em-breve|termos-de-uso|privacidade|cookies|consentimento|.*\\.).*)",
  ],
};
