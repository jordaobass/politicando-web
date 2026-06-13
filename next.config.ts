import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build enxuto para container (gera .next/standalone com server.js)
  output: "standalone",
  // Um único domínio público: /api/* é reescrito para o backend (rede interna).
  // Evita CORS e dispensa um segundo subdomínio. O destino vem de BACKEND_INTERNAL_URL
  // (ex.: http://backend:8080 dentro do docker compose); fallback p/ dev local.
  async rewrites() {
    const backend = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:5080";
    return [{ source: "/api/:path*", destination: `${backend}/api/:path*` }];
  },
  images: {
    // Fotos de candidatos e logos de partidos vêm de fontes externas (ex.: TSE).
    // Liberamos qualquer origem HTTPS/HTTP de forma genérica via remotePatterns.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    // Cache das imagens OTIMIZADAS (only as que passam pelo /_next/image — ex.: destaques
    // da landing) no edge da Vercel por 30 dias, para não rebuscar a origem externa lenta.
    minimumCacheTTL: 2_592_000,
  },
};

export default nextConfig;
