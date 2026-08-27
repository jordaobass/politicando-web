"use client";

import { SparklesIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarraScore } from "@/components/comum/barra-score";
import { MensagemSemDados } from "@/components/comum/bloco-sem-dados";
import { ResumoTema } from "@/components/candidatos/resumo-tema";
import { temAnaliseUtilizavel } from "@/lib/score-utilizavel";
import type { ScoreCategoria } from "@/lib/types";

/** Eixo institucional não entra no score por tema do perfil (spec lista 8 temas). */
const EIXO_FORA = "Instituições e Democracia";

/**
 * Card "Score por tema" (barra 0–5 + análise colapsável) — o layout que o cliente marcou como
 * CORRETO nos prints do card Correções v7 (item 3). Compartilhado pelos perfis de Presidente,
 * Governador e parlamentares (antes duplicado em `perfil-presidente` e `perfil-governador`).
 *
 * Sem nenhum score utilizável (elegibilidade v2, item 5), o card permanece na tela com a
 * mensagem padrão de "sem dados" (item 4) — nunca some nem inventa nota.
 */
export function ScorePorTemaCard({
  nomeUrna,
  scores,
  testid,
  rodape,
  className,
}: {
  nomeUrna: string;
  scores: ScoreCategoria[];
  testid: string;
  /** Nota de rodapé sobre a proveniência das notas (ex.: SICONFI no governador). */
  rodape?: string;
  className?: string;
}) {
  const visiveis = scores.filter((s) => s.categoria !== EIXO_FORA);

  return (
    <Card data-testid={testid} className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <SparklesIcon className="size-4 text-primary" aria-hidden="true" />
          Score por tema
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          O quanto {nomeUrna} prioriza cada tema, de 0 a 5, pela análise de IA.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!temAnaliseUtilizavel(visiveis) ? (
          <MensagemSemDados />
        ) : (
          <>
            <div className="space-y-3">
              {visiveis.map((s) => (
                <div key={s.categoria} className="space-y-1.5">
                  <BarraScore rotulo={s.categoria} valor={s.engajamento ?? 0} escalaMax={5} />
                  {/* Análise da IA colapsável (fechada por padrão), padrão dos perfis. */}
                  <ResumoTema sintese={s.posicaoSintese} justificativa={s.justificativa} />
                </div>
              ))}
            </div>
            {rodape && (
              <p className="border-t border-border pt-3 text-xs text-muted-foreground">{rodape}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
