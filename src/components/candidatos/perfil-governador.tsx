"use client";

import Link from "next/link";
import { FileTextIcon, HistoryIcon, LockIcon, SparklesIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarraScore } from "@/components/comum/barra-score";
import { PainelGestaoEstadual } from "@/components/candidatos/atividade/painel-gestao-estadual";
import { formatarCargo } from "@/lib/format";
import { useSessao } from "@/hooks/use-sessao";
import type { CandidaturaDetalhe, ExercicioCargo, ScoreCategoria } from "@/lib/types";

/** Eixo institucional não entra no score por tema do perfil (spec lista 8 temas). */
const EIXO_FORA = "Instituições e Democracia";
const ano = (d?: string | null) => (d ? d.slice(0, 4) : "");

/**
 * Perfil de Governador conforme a spec do ClickUp (US-GOV-01..05): Score por Tema (0–5),
 * Histórico, Dados do Mandato Estadual (orçamento executado) e Plano de Governo por Tema.
 * A identidade (US-GOV-01) fica no hero compartilhado de DetalheCandidato.
 */
export function PerfilGovernador({ data }: { data: CandidaturaDetalhe }) {
  const { autenticado } = useSessao();
  const exercicios = data.exercicios ?? [];
  const mandatoGov = exercicios.find((e) => e.cargo === "Governador") ?? null;
  const outrosCargos = exercicios.filter((e) => e !== mandatoGov);
  const scores = data.scores.filter((s) => s.categoria !== EIXO_FORA);

  return (
    <div className="space-y-6">
      {/* US-GOV-02 — Score por tema (0–5 + justificativa + confiança; sem posição ideológica). */}
      <Card data-testid="bloco-score-governador">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <SparklesIcon className="size-4 text-primary" aria-hidden="true" />
            Score por tema
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            O quanto {data.politico.nomeUrna} prioriza cada tema, de 0 a 5, pela análise de IA.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {scores.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ainda não há score calculado para este candidato.</p>
          ) : (
            <>
              <div className="space-y-3">
                {scores.map((s) => (
                  <BarraScore key={s.categoria} rotulo={s.categoria} valor={s.engajamento ?? 0} escalaMax={5} />
                ))}
              </div>
              <p className="border-t border-border pt-3 text-xs text-muted-foreground">
                Notas estimadas pela prioridade do orçamento estadual (SICONFI 2025) e pelo plano de
                governo 2022. Análise preliminar do Politicando{confiancaMedia(scores) ? ` · confiança média ${confiancaMedia(scores)}%` : ""}.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* US-GOV-03 — Histórico. */}
      <Card data-testid="bloco-historico">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HistoryIcon className="size-4 text-primary" aria-hidden="true" />
            Histórico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mandatoGov ? (
            <div>
              <p className="text-sm font-semibold text-foreground">
                Governador de {mandatoGov.uf} · {ano(mandatoGov.inicio)} – {mandatoGov.atual ? "atual" : ano(mandatoGov.fim)}
              </p>
              <p className="text-sm text-muted-foreground">
                Os dados compilados do mandato estão no bloco “Dados do mandato estadual” abaixo.
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
        </CardContent>
      </Card>

      {/* US-GOV-04 — Dados do mandato estadual (orçamento executado por tema). */}
      {data.gestaoEstadual && data.gestaoEstadual.eixos.length > 0 && (
        <PainelGestaoEstadual gestao={data.gestaoEstadual} uf={data.uf} />
      )}

      {/* US-GOV-05 — Plano de governo por tema (gated p/ não autenticado). */}
      <Card data-testid="bloco-plano-governo">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileTextIcon className="size-4 text-primary" aria-hidden="true" />
            Plano de governo por tema
            {data.planoGoverno?.ano ? ` (${data.planoGoverno.ano})` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!autenticado ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <LockIcon className="size-7 text-muted-foreground" aria-hidden="true" />
              <p className="max-w-sm text-sm text-muted-foreground">
                Crie sua conta para ver o plano de governo completo.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/login?aba=registrar">Criar conta grátis</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/login">Fazer login</Link>
                </Button>
              </div>
            </div>
          ) : !data.planoGoverno ? (
            <p className="text-sm text-muted-foreground">
              Plano de governo não disponível para este candidato.
            </p>
          ) : (
            <ul className="space-y-4">
              {data.planoGoverno.temas.map((t) => (
                <li key={t.eixo} className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{t.eixoNome}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.resumo ?? "Proposta para este tema não consta no plano de governo."}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function rotuloCargo(e: ExercicioCargo): string {
  const cargo = formatarCargo(e.cargo);
  return e.uf && e.uf !== "BR" ? `${cargo} · ${e.uf}` : cargo;
}

/** Confiança média (%) das notas, para a nota de metodologia do bloco de score. */
function confiancaMedia(scores: ScoreCategoria[]): number | null {
  const cs = scores.map((s) => s.confianca).filter((c): c is number => c != null);
  if (cs.length === 0) return null;
  return Math.round((cs.reduce((a, b) => a + b, 0) / cs.length) * 100);
}
