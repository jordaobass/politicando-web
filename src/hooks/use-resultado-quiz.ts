"use client";

import { useArmazenamento, useHidratado } from "@/hooks/use-storage";
import { useMeuUltimoQuiz } from "@/hooks/use-api";
import { useSessao } from "@/hooks/use-sessao";
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

/**
 * Resultado "efetivo" do quiz: usa o cache da aba (sessionStorage) e, para o usuário LOGADO sem
 * cache (ex.: nova sessão/aba), cai para o último resultado salvo no servidor. Também expõe
 * `autenticado` para a tela decidir a mensagem de estado-vazio (card v2, item 5).
 */
export function useResultadoEfetivo(): {
  carregado: boolean;
  resultado: ResultadoQuiz | null;
  autenticado: boolean;
} {
  const { carregado, resultado } = useResultadoQuiz();
  const { autenticado, sessao } = useSessao();

  const tokenFallback = carregado && !resultado && sessao?.token ? sessao.token : null;
  const { data: ultimo, isLoading } = useMeuUltimoQuiz(tokenFallback);

  return {
    carregado: carregado && !isLoading,
    resultado: resultado ?? ultimo?.resultado ?? null,
    autenticado,
  };
}

/**
 * Atalho: devolve o resultado do quiz para uma candidatura específica (ou null).
 * O cache é por aba (sessionStorage); para o usuário LOGADO, se não houver cache (ex.: nova guia,
 * link "abrir em outra guia"), busca o último resultado do servidor. Correção do card v2.
 *
 * `temResultado` distingue "fez o quiz mas este candidato ficou fora do ranking" (sem dados
 * suficientes — Correções v7, item 5) de "nunca fez o quiz": antes os dois caíam no CTA
 * "Fazer o teste", que mentia para quem já tinha feito.
 */
export function useCompatibilidadeCandidato(candidaturaId: string): {
  carregado: boolean;
  candidato: ResultadoCandidato | null;
  temResultado: boolean;
} {
  const { carregado, resultado } = useResultadoQuiz();
  const { sessao } = useSessao();

  // Fallback servidor só quando: já hidratou, não há cache local e o usuário está logado.
  const tokenFallback = carregado && !resultado && sessao?.token ? sessao.token : null;
  const { data: ultimo, isLoading } = useMeuUltimoQuiz(tokenFallback);

  const efetivo = resultado ?? ultimo?.resultado ?? null;
  const candidato = efetivo?.resultado.find((r) => r.candidaturaId === candidaturaId) ?? null;
  return { carregado: carregado && !isLoading, candidato, temResultado: efetivo !== null };
}
