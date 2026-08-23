"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Mantém o estado de uma listagem (busca, filtros, ordenação, página) na query string.
 *
 * Motivo: estado que só vive em `useState` morre quando o componente desmonta — o usuário
 * abre um candidato, volta pelo navegador e a lista reaparece do zero (Correções v6, item 3).
 * Na URL, back/forward, reload e link compartilhado passam a restaurar a mesma lista.
 *
 * Só entra aqui o que define o CONTEÚDO exibido. Microestado de interação (dropdown aberto,
 * item destacado) continua local — decisão E7 do DECISOES.md.
 */

/** Valores aceitos na query. `null`/`undefined`/vazio removem o parâmetro. */
type ValorUrl = string | string[] | number | boolean | null | undefined;

const SEPARADOR_LISTA = ",";

function ehVazio(valor: ValorUrl): boolean {
  if (valor === null || valor === undefined || valor === "") return true;
  return Array.isArray(valor) && valor.length === 0;
}

function serializar(valor: Exclude<ValorUrl, null | undefined>): string {
  return Array.isArray(valor) ? valor.join(SEPARADOR_LISTA) : String(valor);
}

/** Texto simples; ausente vira "". */
export function lerTexto(params: URLSearchParams, chave: string): string {
  return params.get(chave) ?? "";
}

/** Lista separada por vírgula; ausente vira []. */
export function lerLista(params: URLSearchParams, chave: string): string[] {
  const bruto = params.get(chave);
  if (!bruto) return [];
  return bruto.split(SEPARADOR_LISTA).filter(Boolean);
}

/** Número inteiro; ausente ou inválido cai no padrão (protege contra `?pagina=abc`). */
export function lerNumero(params: URLSearchParams, chave: string, padrao: number): number {
  const numero = Number(params.get(chave));
  return Number.isFinite(numero) && numero > 0 ? Math.trunc(numero) : padrao;
}

/** Booleano explícito ("true"/"false"); qualquer outra coisa cai no padrão. */
export function lerBooleano(params: URLSearchParams, chave: string, padrao: boolean): boolean {
  const bruto = params.get(chave);
  if (bruto === "true") return true;
  if (bruto === "false") return false;
  return padrao;
}

export function useEstadoNaUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  /**
   * Grava os valores na query. Usa `replace` (não `push`) para que um único back saia da
   * listagem em vez de desfazer filtro por filtro. Valor vazio é REMOVIDO — assim a URL
   * limpa volta a ser `/candidatos`, sem parâmetros default pendurados.
   */
  const sincronizar = useCallback(
    (valores: Record<string, ValorUrl>) => {
      const atual = params.toString();
      const proximos = new URLSearchParams(atual);

      for (const [chave, valor] of Object.entries(valores)) {
        if (ehVazio(valor)) proximos.delete(chave);
        else proximos.set(chave, serializar(valor as Exclude<ValorUrl, null | undefined>));
      }

      const query = proximos.toString();
      if (query === atual) return; // nada mudou: evita entrada de histórico redundante
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return { params, sincronizar };
}
