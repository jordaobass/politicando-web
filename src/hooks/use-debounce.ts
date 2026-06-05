"use client";

import { useEffect, useState } from "react";

/** Retorna um valor com atraso para evitar disparos a cada tecla. */
export function useDebounce<T>(valor: T, atrasoMs = 400): T {
  const [debounced, setDebounced] = useState(valor);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(valor), atrasoMs);
    return () => clearTimeout(id);
  }, [valor, atrasoMs]);

  return debounced;
}
