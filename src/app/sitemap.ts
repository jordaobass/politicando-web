import type { MetadataRoute } from "next";

import { ROTAS_LEGAIS } from "@/lib/constantes";
import { SITE_URL } from "@/lib/site";

/** Páginas públicas estáveis do site (as dinâmicas de candidato/partido ficam fora). */
const PAGINAS_PUBLICAS = [
  { caminho: "/", prioridade: 1 },
  { caminho: "/quiz", prioridade: 0.9 },
  { caminho: "/candidatos", prioridade: 0.8 },
  { caminho: "/partidos", prioridade: 0.7 },
  { caminho: "/comparar", prioridade: 0.7 },
  { caminho: "/como-calculamos", prioridade: 0.6 },
];

/**
 * /sitemap.xml — inclui as quatro páginas legais: publicidade legal que o buscador
 * não encontra não cumpre a função de dar publicidade.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    ...PAGINAS_PUBLICAS.map((pagina) => ({
      url: `${SITE_URL}${pagina.caminho}`,
      lastModified: agora,
      changeFrequency: "weekly" as const,
      priority: pagina.prioridade,
    })),
    ...ROTAS_LEGAIS.map((rota) => ({
      url: `${SITE_URL}${rota.href}`,
      lastModified: agora,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
