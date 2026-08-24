/**
 * URL pública do site, usada por robots.txt, sitemap.xml e metadados.
 *
 * `?.trim() ||` em vez de `??`: variável de ambiente declarada e VAZIA passa direto
 * pelo `??` e viraria `https://.../sitemap.xml` com host em branco.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://politicando.infinitybit.com.br";
