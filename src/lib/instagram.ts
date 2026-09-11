/**
 * Normalização do Instagram declarado ao TSE.
 *
 * O DivulgaCand entrega o campo em caixa alta e como URL inteira, com barra final e
 * parâmetros de rastreio (`?igsh=…`): `HTTPS://WWW.INSTAGRAM.COM/ACACIO.SENADOR?IGSH=DDH2…`.
 * Todos os 382 registros do banco (07/09/2026) estão nesse formato — nenhum é `@handle`.
 * Concatenar esse valor num prefixo, como se fosse handle, produzia
 * `https://instagram.com/HTTPS://WWW.INSTAGRAM.COM/…` — link quebrado (Correções v8, item 1).
 */

/** Handle e URL canônica do perfil, ou `null` quando o valor não dá um perfil utilizável. */
export function perfilInstagram(valor: string | null | undefined) {
  const handle = extrairHandle(valor);
  return handle ? { handle, url: `https://instagram.com/${handle}` } : null;
}

/**
 * Extrai o nome de usuário aceitando as três formas que aparecem na base: URL completa,
 * `@usuario` e o usuário puro. Em minúsculas — o Instagram não diferencia caixa e o dado
 * do TSE vem gritado.
 */
function extrairHandle(valor: string | null | undefined): string | null {
  const bruto = valor?.trim();
  if (!bruto) return null;

  const semProtocolo = bruto.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
  const semDominio = semProtocolo.replace(/^instagram\.com\//i, "");

  // Corta querystring (?igsh=…), fragmento, subcaminho e o @ do handle.
  const handle = semDominio.split(/[?#/]/)[0].replace(/^@/, "").toLowerCase();

  // Sobra o domínio quando o valor era só "instagram.com" ou outra rede — não é perfil.
  return /^[a-z0-9._]{1,30}$/.test(handle) ? handle : null;
}
