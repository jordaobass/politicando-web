"use client";

import { useCallback, useSyncExternalStore } from "react";

type TipoArmazenamento = "local" | "session";

function obterStorage(tipo: TipoArmazenamento): Storage | null {
  if (typeof window === "undefined") return null;
  return tipo === "local" ? window.localStorage : window.sessionStorage;
}

// Pub/sub para refletir mudanças na MESMA aba — o evento "storage" nativo só
// dispara entre abas diferentes, então notificamos manualmente ao gravar.
const ouvintes = new Set<() => void>();

function notificar() {
  for (const ouvinte of ouvintes) ouvinte();
}

function inscrever(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  window.addEventListener("storage", ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
    window.removeEventListener("storage", ouvinte);
  };
}

/**
 * Lê/grava um valor cru de Web Storage de forma segura para SSR e hidratação
 * (via {@link useSyncExternalStore}: snapshot do servidor é sempre `null`, o do
 * cliente vem do storage real — sem mismatch nem setState dentro de efeito).
 */
/**
 * `false` no servidor/primeiro render e `true` após a hidratação no cliente —
 * sem mismatch de hidratação nem setState em efeito. Útil para revelar conteúdo
 * que depende de Web Storage só depois que o cliente assume o DOM.
 */
export function useHidratado(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useArmazenamento(tipo: TipoArmazenamento, chave: string) {
  const ler = useCallback(
    () => obterStorage(tipo)?.getItem(chave) ?? null,
    [tipo, chave],
  );

  const valor = useSyncExternalStore(inscrever, ler, () => null);

  const gravar = useCallback(
    (novo: string | null) => {
      const storage = obterStorage(tipo);
      if (!storage) return;
      if (novo === null) storage.removeItem(chave);
      else storage.setItem(chave, novo);
      notificar();
    },
    [tipo, chave],
  );

  return [valor, gravar] as const;
}
