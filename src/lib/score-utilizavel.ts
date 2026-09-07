import type { ScoreCategoria } from "@/lib/types";

/**
 * Espelho da regra de elegibilidade v2 do backend (`ScoreElegivel.cs` — Correções v7, item 5):
 * um score só sustenta leitura de posição quando tem posição apurada, confiança mínima e não é
 * o placeholder de "sem evidência" (50 sem síntese). Usada pelos blocos do perfil (item 4) para
 * decidir entre conteúdo e a mensagem padrão de "sem dados".
 *
 * Se a regra mudar lá, mudar aqui junto — os testes e2e do perfil cobram a coerência.
 */
export const LIMIAR_CONFIANCA = 0.3;

/** Valor que o scoring grava quando não encontrou evidência para posicionar. */
const POSICAO_INDEFINIDA = 50;

export function scoreUtilizavel(s: ScoreCategoria): boolean {
  if (s.posicao == null) return false;
  if ((s.confianca ?? 0) < LIMIAR_CONFIANCA) return false;
  return s.posicao !== POSICAO_INDEFINIDA || Boolean(s.posicaoSintese);
}

/** O perfil tem análise aproveitável quando ao menos um eixo é utilizável. */
export function temAnaliseUtilizavel(scores: ScoreCategoria[]): boolean {
  return scores.some(scoreUtilizavel);
}
