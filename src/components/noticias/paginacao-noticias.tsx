import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Paginação da capa de notícias.
 *
 * São **links de verdade** (`<a href>`), não botão de "carregar mais": o buscador precisa
 * conseguir seguir cada página do arquivo. Por isso o componente é de servidor e não tem
 * estado — a página atual vem da URL, nunca de `useState`.
 */

/** Quantas vizinhas da página atual aparecem de cada lado. */
const VIZINHAS = 1;

/**
 * Endereço de uma página.
 *
 * A página 1 é a própria capa (`/noticias`). `/noticias/pagina/1` não existe de propósito:
 * duas URLs com o mesmo conteúdo é conteúdo duplicado para o buscador.
 */
function hrefDaPagina(numero: number): string {
  return numero === 1 ? "/noticias" : `/noticias/pagina/${numero}`;
}

/**
 * Monta a régua de páginas, com `null` marcando cada intervalo omitido.
 *
 * Sempre entram a primeira, a última, a atual e as vizinhas dela. O resto vira `…` — numa
 * seção com 40 páginas, imprimir os 40 números empurra o conteúdo para fora da tela e não
 * ajuda ninguém a chegar em nenhum lugar.
 *
 * Exceção deliberada: quando o buraco é de UMA página só (salto de 2), o número entra no
 * lugar do `…`. Esconder atrás de reticências um destino que está a um clique de distância
 * ocupa o mesmo espaço e tira a opção do leitor — "1 … 3" é pior que "1 2 3".
 */
function montarRegua(pagina: number, totalPaginas: number): (number | null)[] {
  const escolhidas = new Set<number>([1, totalPaginas]);
  for (let n = pagina - VIZINHAS; n <= pagina + VIZINHAS; n += 1) {
    if (n >= 1 && n <= totalPaginas) escolhidas.add(n);
  }

  const ordenadas = [...escolhidas].sort((a, b) => a - b);
  const regua: (number | null)[] = [];

  ordenadas.forEach((numero, indice) => {
    if (indice > 0) {
      const salto = numero - ordenadas[indice - 1];
      if (salto === 2) regua.push(numero - 1);
      else if (salto > 2) regua.push(null);
    }
    regua.push(numero);
  });

  return regua;
}

/**
 * Alvo de toque confortável (40px) e foco de teclado visível em todos os itens clicáveis —
 * paginação é navegação, e navegação tem de funcionar sem mouse.
 */
const ITEM =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-md px-3 text-sm transition-colors";

const ITEM_LINK = cn(
  ITEM,
  "border border-border text-foreground hover:border-primary/40 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
);

/** Página atual: peso e contraste maiores, e sem borda de "clicável". */
const ITEM_ATUAL = cn(ITEM, "bg-primary font-semibold text-primary-foreground");

/** Extremo indisponível (Anterior na primeira, Próxima na última): presente, mas apagado. */
const ITEM_INERTE = cn(ITEM, "border border-border text-muted-foreground opacity-50");

export function PaginacaoNoticias({
  pagina,
  totalPaginas,
}: {
  pagina: number;
  totalPaginas: number;
}) {
  // Uma página só não tem para onde navegar. Paginação decorativa só ocupa espaço e sugere
  // ao leitor (e ao buscador) que existe mais conteúdo do que existe.
  if (totalPaginas <= 1) return null;

  const regua = montarRegua(pagina, totalPaginas);
  const temAnterior = pagina > 1;
  const temProxima = pagina < totalPaginas;

  return (
    <nav
      aria-label="Paginação"
      className="mt-10 border-t border-border pt-6 text-center"
    >
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          {/* Extremo desabilitado é <span>, nunca link morto nem href="#": link que não leva
              a lugar nenhum engana o leitor de tela e desperdiça rastreamento do buscador. */}
          {temAnterior ? (
            <Link
              href={hrefDaPagina(pagina - 1)}
              rel="prev"
              aria-label="Página anterior"
              className={ITEM_LINK}
            >
              Anterior
            </Link>
          ) : (
            <span className={ITEM_INERTE}>Anterior</span>
          )}
        </li>

        {regua.map((numero, indice) =>
          numero === null ? (
            // Reticências são texto, não link. `aria-hidden` porque "horizontal ellipsis"
            // lido em voz alta não informa nada a quem navega por áudio.
            <li
              // Chave pela página que vem DEPOIS do salto: é estável e única sem recorrer ao
              // índice do array.
              key={`salto-antes-de-${regua[indice + 1]}`}
              aria-hidden="true"
              className={cn(ITEM, "text-muted-foreground")}
            >
              …
            </li>
          ) : (
            <li key={numero}>
              {numero === pagina ? (
                // A página atual não é link — já estamos nela. `aria-current` é o que diz
                // isso a quem usa leitor de tela; a cor sozinha não diria.
                <span aria-current="page" className={ITEM_ATUAL}>
                  {numero}
                </span>
              ) : (
                <Link
                  href={hrefDaPagina(numero)}
                  aria-label={`Página ${numero}`}
                  className={ITEM_LINK}
                >
                  {numero}
                </Link>
              )}
            </li>
          ),
        )}

        <li>
          {temProxima ? (
            <Link
              href={hrefDaPagina(pagina + 1)}
              rel="next"
              aria-label="Próxima página"
              className={ITEM_LINK}
            >
              Próxima
            </Link>
          ) : (
            <span className={ITEM_INERTE}>Próxima</span>
          )}
        </li>
      </ul>
    </nav>
  );
}
