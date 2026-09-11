/**
 * Medição de audiência (Google Analytics 4).
 *
 * O identificador entra por variável de ambiente — nunca fixo no código — e o site funciona
 * igual sem ele: ausente, nada é carregado e nenhum dado sai do navegador. É assim que a
 * configuração fica opcional por ambiente (produção mede, dev e homologação não sujam o
 * relatório).
 *
 * ⚠️ `NEXT_PUBLIC_*` é resolvido no BUILD, não em tempo de execução: definir a variável no
 * painel do provedor não basta, é preciso reconstruir. Ao investigar "por que não mediu",
 * procure o identificador DENTRO do bundle publicado, não no `.env`.
 */

/**
 * Identificador do fluxo de dados (formato `G-XXXXXXXXXX`), ou `null` quando não configurado.
 * O `.trim() || null` é proposital: variável declarada e vazia vale como ausente — `??` deixaria
 * a string vazia passar e o site pediria `gtag/js?id=` ao Google.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
