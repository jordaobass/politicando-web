/**
 * URL pública do site, usada por robots.txt, sitemap.xml e metadados.
 *
 * `?.trim() ||` em vez de `??`: variável de ambiente declarada e VAZIA passa direto
 * pelo `??` e viraria `https://.../sitemap.xml` com host em branco.
 *
 * ⚠️ O padrão é o domínio DE PRODUÇÃO de propósito. Medido em 02/10/2026: a variável não
 * estava definida no build da Vercel, e o sitemap e as tags OG do site publicado apontavam
 * para `politicando.infinitybit.com.br` — host que serve o ambiente de desenvolvimento. Ou
 * seja, o site indicava ao buscador que a casa dele era outro endereço. Padrão errado aqui
 * não dá erro em lugar nenhum: só estraga o SEO em silêncio.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.politicando.site";
