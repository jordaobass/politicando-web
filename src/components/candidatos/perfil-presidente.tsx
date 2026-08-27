"use client";

import { HistoryIcon, WalletIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlocoSemDados, MensagemSemDados } from "@/components/comum/bloco-sem-dados";
import { ScorePorTemaCard } from "@/components/candidatos/score-por-tema-card";
import { PlanoGovernoBloco } from "@/components/candidatos/plano-governo-bloco";
import { formatarCargo } from "@/lib/format";
import type { CandidaturaDetalhe, ExercicioCargo } from "@/lib/types";

const ano = (d?: string | null) => (d ? d.slice(0, 4) : "");

/**
 * Perfil de Presidente conforme a spec do ClickUp (US-PRES-01..06): Score por Tema (0–5),
 * Histórico, Plano de Governo e Financiamento. A identidade (US-PRES-01) fica no hero
 * compartilhado. Todos os blocos ficam SEMPRE na tela (Correções v7, item 4): sem dado
 * suficiente, o bloco mostra a mensagem padrão — é o caso do financiamento, que segue sem
 * integração com a prestação de contas do TSE.
 */
export function PerfilPresidente({ data }: { data: CandidaturaDetalhe }) {
  const exercicios = data.exercicios ?? [];
  const semMandato = data.tipoHistorico === "sem_mandato" || exercicios.length === 0;

  return (
    <div className="space-y-6">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* US-PRES-02 — Score por tema (0–5 + análise colapsável; sem posição ideológica). */}
        <ScorePorTemaCard
          nomeUrna={data.politico.nomeUrna}
          scores={data.scores}
          testid="bloco-score-presidente"
          className="h-full"
        />

        {/* US-PRES-03 — Histórico. */}
        <Card data-testid="bloco-historico" className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HistoryIcon className="size-4 text-primary" aria-hidden="true" />
              Histórico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {semMandato ? (
              <MensagemSemDados />
            ) : (
              <>
                <ul className="space-y-1.5 text-sm">
                  {exercicios.map((e, i) => (
                    <li key={`${e.cargo}-${i}`} className="text-foreground">
                      <span className="font-semibold">{rotuloCargo(e)}</span>
                      <span className="text-muted-foreground">
                        {" "}· {ano(e.inicio)} – {e.atual ? "atual" : ano(e.fim)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground">
                  Dados compilados do mandato (orçamento executado, atos de governo e indicadores)
                  serão exibidos quando disponíveis.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* US-PRES-05 — Plano de governo por tema, do pleito em disputa (gated p/ não autenticado). */}
        <PlanoGovernoBloco plano={data.planoGoverno} className="h-full" />
        {/* US-PRES-06 — Financiamento de Campanha: depende da prestação de contas do TSE, ainda
            sem integração — bloco presente com a mensagem padrão (item 4). */}
        <BlocoSemDados
          titulo="Financiamento de campanha"
          icone={<WalletIcon className="size-4 text-primary" aria-hidden="true" />}
          testid="bloco-financiamento"
          className="h-full"
        />
      </div>
    </div>
  );
}

function rotuloCargo(e: ExercicioCargo): string {
  const cargo = formatarCargo(e.cargo);
  return e.uf && e.uf !== "BR" ? `${cargo} · ${e.uf}` : cargo;
}
