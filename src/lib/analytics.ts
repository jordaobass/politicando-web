/**
 * Medição de audiência (Google Analytics 4).
 *
 * O identificador do fluxo de dados é público por natureza — aparece no HTML de qualquer site
 * que mede —, então o do Politicando fica no código: assim o site mede em qualquer build sem
 * depender de alguém preencher a variável no painel do provedor, que foi justamente o que
 * manteve a medição desligada até aqui.
 *
 * ⚠️ `NEXT_PUBLIC_*` é resolvido no BUILD, não em tempo de execução: trocar a variável no
 * painel não basta, é preciso reconstruir. Ao investigar "por que não mediu", procure o
 * identificador DENTRO do bundle publicado, não no `.env`.
 */

/** Fluxo de dados do site público do Politicando. */
const GA_ID_PADRAO = "G-LXNQPW6PPD";

/**
 * Identificador em uso (formato `G-XXXXXXXXXX`), ou `null` quando a medição está desligada.
 *
 * `NEXT_PUBLIC_GA_ID` sobrescreve o padrão — use outro `G-...` para apontar a um fluxo
 * separado (homologação, por exemplo) ou o literal `off` para não carregar nada. Variável
 * declarada e **vazia** cai no padrão de propósito: campo salvo em branco é o erro de
 * configuração mais fácil de cometer, e ele não pode significar "desligue a medição".
 */
const configurado = process.env.NEXT_PUBLIC_GA_ID?.trim() || GA_ID_PADRAO;
export const GA_ID = configurado.toLowerCase() === "off" ? null : configurado;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
