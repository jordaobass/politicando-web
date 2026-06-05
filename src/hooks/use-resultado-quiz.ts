"use client";

import { useArmazenamento, useHidratado } from "@/hooks/use-storage";
import { CHAVE_RESULTADO_QUIZ } from "@/lib/constantes";
import type { ResultadoCandidato, ResultadoQuiz } from "@/lib/types";

interface EstadoResultadoQuiz {
  /** true após a primeira tentativa de leitura no cliente (evita flash de blur). */
  carregado: boolean;
  resultado: ResultadoQuiz | null;
}

function parsear(bruto: string | null): ResultadoQuiz | null {
  if (!bruto) return null;
  try {
    return JSON.parse(bruto) as ResultadoQuiz;
  } catch {
    return null;
  }
}

/**
 * Lê o resultado do quiz guardado em sessionStorage. Retorna {carregado:false}
 * no primeiro render (SSR/hidratação) e {carregado:true, resultado} após montar.
 */
export function useResultadoQuiz(): EstadoResultadoQuiz {
  const [bruto] = useArmazenamento("session", CHAVE_RESULTADO_QUIZ);
  // `carregado` só fica true após a hidratação — evita flash de blur no SSR.
  const carregado = useHidratado();

  return { carregado, resultado: parsear(bruto) };
}

/** Atalho: devolve o resultado do quiz para uma candidatura específica (ou null). */
export function useCompatibilidadeCandidato(candidaturaId: string): {
  carregado: boolean;
  candidato: ResultadoCandidato | null;
} {
  const { carregado, resultado } = useResultadoQuiz();
  const candidato = resultado?.resultado.find((r) => r.candidaturaId === candidaturaId) ?? null;
  return { carregado, candidato };
}
