import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * /robots.txt — libera o site público e mantém fora do índice o painel admin,
 * a API e as telas de sessão do usuário (nada delas é conteúdo pesquisável).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/perfil", "/completar-cadastro", "/redefinir-senha"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
