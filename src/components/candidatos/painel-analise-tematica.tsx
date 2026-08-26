import Link from "next/link";

import { ResumoTema } from "@/components/candidatos/resumo-tema";
import { rotuloPosicao } from "@/lib/format";
import type { ScoreCategoria } from "@/lib/types";

function rotuloEngajamento(engajamento: number): string {
  if (engajamento <= 0) return "Sem atuação";
  if (engajamento < 2) return "Atuação marginal";
  if (engajamento < 3.5) return "Atuação moderada";
  if (engajamento < 4.5) return "Atuação forte";
  return "Protagonista";
}

/** Valor que o scoring grava quando não encontrou evidência para posicionar (ver ScoreElegivel). */
const POSICAO_INDEFINIDA = 50;

/**
 * Sem posição apurada não se desenha a régua: `posicao ?? 50` colocava o marcador no meio e
 * escrevia "Centro", afirmando ao leitor uma posição que ninguém mediu — o mesmo engano que o
 * placeholder causava no match (Correções v6, item 4).
 */
function semPosicaoApurada(posicao: number | null | undefined, sintese?: string | null): boolean {
  if (posicao == null) return true;
  return posicao === POSICAO_INDEFINIDA && !sintese;
}

/**
 * Detalha cada eixo temático com posição (esquerda↔direita), síntese e justificativa da IA.
 * É o equivalente, para cargos sem atuação legislativa (Presidente/Governador), aos cards de
 * projetos e votações que deputados e senadores exibem.
 */
export function PainelAnaliseTematica({ scores }: { scores: ScoreCategoria[] }) {
  const comDados = scores.filter((s) => s.posicao != null || s.posicaoSintese);
  if (comDados.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Ainda não há análise temática para este candidato.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {comDados.map((score) => {
        const engajamento = score.engajamento ?? 0;
        const semPosicao = semPosicaoApurada(score.posicao, score.posicaoSintese);
        return (
          <div key={score.categoria} className="space-y-2 border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-medium text-foreground">{score.categoria}</h3>
              <span className="text-xs text-muted-foreground">
                {/* Engajamento 0 vira rótulo, não "0.0/5": nota zero é lida como avaliação ruim,
                    quando o que existe é ausência de registro. */}
                {engajamento > 0
                  ? `${rotuloEngajamento(engajamento)} · ${engajamento.toFixed(1)}/5`
                  : "Sem atuação registrada"}
              </span>
            </div>

            {semPosicao ? (
              <p
                className="rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground"
                data-testid="sem-historico-tema"
              >
                Sem histórico público suficiente para posicionar o candidato neste
                tema — este eixo não entra no cálculo de match.{" "}
                <Link
                  href="/como-calculamos#secao-sem-historico"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  Entenda
                </Link>
              </p>
            ) : (
              /* Régua progressista ↔ conservador com marcador na posição do candidato. */
              <div className="space-y-1">
                <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-serie-a/40 via-muted to-chart-4/40">
                  <div
                    className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow"
                    style={{ left: `${score.posicao!}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex justify-between text-[0.7rem] text-muted-foreground">
                  <span>Progressista</span>
                  <span className="font-medium text-foreground">
                    {rotuloPosicao(score.posicao!)}
                  </span>
                  <span>Conservador</span>
                </div>
              </div>
            )}

            <ResumoTema sintese={score.posicaoSintese} justificativa={score.justificativa} />
          </div>
        );
      })}
    </div>
  );
}
