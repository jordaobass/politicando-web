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

/**
 * Envia um evento ao GA4, se e somente se a medição estiver ativa.
 *
 * `window.gtag` só existe depois do "Aceitar todos" — quem recusa não tem nada carregado, e
 * chamar aqui não pode quebrar a interação do eleitor. Por isso o silêncio é o caminho
 * normal, não um erro: o evento é acessório, a navegação é o produto.
 *
 * Isto NÃO é a fonte de verdade de quais candidatos são mais vistos — essa contagem é feita
 * no backend, que mede todo mundo. Aqui o valor é cruzar o clique com origem de tráfego.
 */
export function registrarEvento(nome: string, parametros?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", nome, parametros);
}

/**
 * Clique que abre o perfil de um candidato.
 *
 * `origem` diz de ONDE o eleitor clicou (listagem, resultado do quiz, comparação) — é o que
 * o GA acrescenta à contagem do backend, que sabe quantas aberturas houve mas não por qual
 * caminho a pessoa chegou.
 */
export function registrarCliqueCandidato(dados: {
  id: string;
  nome: string;
  cargo: string;
  origem: string;
}): void {
  registrarEvento("select_candidato", {
    candidatura_id: dados.id,
    candidato_nome: dados.nome,
    cargo: dados.cargo,
    origem: dados.origem,
  });
}
