"use client";

import { Building2Icon, HistoryIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlocoSemDados, MensagemSemDados } from "@/components/comum/bloco-sem-dados";
import { ScorePorTemaCard } from "@/components/candidatos/score-por-tema-card";
import { PlanoGovernoBloco } from "@/components/candidatos/plano-governo-bloco";
import { PainelGestaoEstadual } from "@/components/candidatos/atividade/painel-gestao-estadual";
import { formatarCargo } from "@/lib/format";
import type { CandidaturaDetalhe, ExercicioCargo } from "@/lib/types";

const ano = (d?: string | null) => (d ? d.slice(0, 4) : "");

/**
 * Perfil de Governador conforme a spec do ClickUp (US-GOV-01..05): Score por Tema (0–5),
 * Histórico, Dados do Mandato Estadual (orçamento executado) e Plano de Governo por Tema.
 * A identidade (US-GOV-01) fica no hero compartilhado de DetalheCandidato.
 * Todos os blocos ficam SEMPRE na tela (Correções v7, item 4): a gestão estadual de quem não
 * governou a UF no exercício aparece com a mensagem padrão em vez de sumir.
 */
export function PerfilGovernador({ data }: { data: CandidaturaDetalhe }) {
  const exercicios = data.exercicios ?? [];
  const mandatoGov = exercicios.find((e) => e.cargo === "Governador") ?? null;
  const outrosCargos = exercicios.filter((e) => e !== mandatoGov);
  const temGestao = Boolean(data.gestaoEstadual && data.gestaoEstadual.eixos.length > 0);

  return (
    <div className="space-y-6">
      {/* Layout em 2 colunas (como no senador): Score | Gestão, depois Histórico | Plano. */}
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* US-GOV-02 — Score por tema (0–5; sem posição ideológica). */}
        <ScorePorTemaCard
          nomeUrna={data.politico.nomeUrna}
          scores={data.scores}
          testid="bloco-score-governador"
          className="h-full"
          rodape="Notas estimadas pela prioridade do orçamento estadual (SICONFI 2025) e pelo plano de governo 2022. Análise preliminar do Politicando."
        />

        {/* US-GOV-04 — Dados do mandato estadual: pareado com o Score (ambos por tema). */}
        {temGestao ? (
          <PainelGestaoEstadual gestao={data.gestaoEstadual!} uf={data.uf} className="h-full" />
        ) : (
          <BlocoSemDados
            titulo="Gestão estadual — orçamento executado por tema"
            icone={<Building2Icon className="size-4 text-primary" aria-hidden="true" />}
            testid="bloco-gestao-estadual"
            className="h-full"
          />
        )}
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* US-GOV-03 — Histórico. */}
        <Card data-testid="bloco-historico" className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HistoryIcon className="size-4 text-primary" aria-hidden="true" />
              Histórico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!mandatoGov && outrosCargos.length === 0 ? (
              <MensagemSemDados />
            ) : (
              <>
                {mandatoGov ? (
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Governador de {mandatoGov.uf} · {ano(mandatoGov.inicio)} –{" "}
                      {mandatoGov.atual ? "atual" : ano(mandatoGov.fim)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Os dados compilados do mandato estão no bloco “Dados do mandato estadual”
                      abaixo.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Sem mandato anterior registrado.</p>
                )}

                {outrosCargos.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-foreground">Outros cargos</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {outrosCargos.map((e, i) => (
                        <li key={`${e.cargo}-${e.uf}-${i}`}>
                          {rotuloCargo(e)} · {ano(e.inicio)} – {e.atual ? "atual" : ano(e.fim)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* US-GOV-05 — Plano de governo por tema (gated p/ não autenticado). */}
        <PlanoGovernoBloco plano={data.planoGoverno} className="h-full" />
      </div>
    </div>
  );
}

function rotuloCargo(e: ExercicioCargo): string {
  const cargo = formatarCargo(e.cargo);
  return e.uf && e.uf !== "BR" ? `${cargo} · ${e.uf}` : cargo;
}
