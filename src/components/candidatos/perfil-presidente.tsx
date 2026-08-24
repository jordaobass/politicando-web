"use client";

import { CalendarClockIcon, HistoryIcon, SparklesIcon, WalletIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarraScore } from "@/components/comum/barra-score";
import { ResumoTema } from "@/components/candidatos/resumo-tema";
import { PlanoGovernoBloco } from "@/components/candidatos/plano-governo-bloco";
import { formatarCargo } from "@/lib/format";
import type { CandidaturaDetalhe, ExercicioCargo } from "@/lib/types";

/** Eixo institucional não entra no score por tema do perfil (spec lista 8 temas). */
const EIXO_FORA = "Instituições e Democracia";
/** Mensagem padrão da spec para blocos que só existem após o registro oficial (ago/2026). */
const POS_REGISTRO = "após o registro oficial da candidatura em agosto de 2026";
const ano = (d?: string | null) => (d ? d.slice(0, 4) : "");

/**
 * Perfil de Presidente conforme a spec do ClickUp (US-PRES-01..06): Score por Tema (0–5),
 * Histórico, Plano de Governo e Financiamento. A identidade (US-PRES-01) fica no hero
 * compartilhado. O financiamento continua indisponível: falta a integração com a prestação de
 * contas do TSE.
 */
export function PerfilPresidente({ data }: { data: CandidaturaDetalhe }) {
  const exercicios = data.exercicios ?? [];
  const semMandato = data.tipoHistorico === "sem_mandato";
  const scores = data.scores.filter((s) => s.categoria !== EIXO_FORA);

  return (
    <div className="space-y-6">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* US-PRES-02 — Score por tema (0–5 + análise colapsável; sem posição ideológica). */}
        <Card data-testid="bloco-score-presidente" className="h-full">
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
              scores.map((s) => (
                <div key={s.categoria} className="space-y-1.5">
                  <BarraScore rotulo={s.categoria} valor={s.engajamento ?? 0} escalaMax={5} />
                  {/* Análise da IA colapsável (fechada por padrão), padrão dos outros perfis;
                      sem a % de confiança (Correções v3, item 9). */}
                  <ResumoTema sintese={s.posicaoSintese} justificativa={s.justificativa} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

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
              <p className="text-sm text-muted-foreground">
                Sem mandato anterior. Não foram encontradas informações de trajetória pública para
                este candidato.
              </p>
            ) : exercicios.length > 0 ? (
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
            ) : (
              <p className="text-sm text-muted-foreground">Sem cargos eletivos anteriores registrados.</p>
            )}
            <p className="text-xs text-muted-foreground">
              Dados compilados do mandato (orçamento executado, atos de governo e indicadores)
              serão exibidos quando disponíveis.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* US-PRES-05 — Plano de governo por tema, do pleito em disputa (gated p/ não autenticado). */}
        <PlanoGovernoBloco plano={data.planoGoverno} className="h-full" />
        {/* US-PRES-06 — Financiamento de Campanha: depende da prestação de contas do TSE, ainda
            sem integração (o endpoint de contas está bloqueado para esta rede). */}
        <BlocoIndisponivel
          testid="bloco-financiamento"
          icone={<WalletIcon className="size-4 text-primary" aria-hidden="true" />}
          titulo="Financiamento de campanha"
          texto={`Dados de financiamento disponíveis ${POS_REGISTRO}.`}
        />
      </div>
    </div>
  );
}

function BlocoIndisponivel({
  testid,
  icone,
  titulo,
  texto,
}: {
  testid: string;
  icone: React.ReactNode;
  titulo: string;
  texto: string;
}) {
  return (
    <Card data-testid={testid} className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icone}
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarClockIcon className="size-4 shrink-0" aria-hidden="true" />
        {texto}
      </CardContent>
    </Card>
  );
}

function rotuloCargo(e: ExercicioCargo): string {
  const cargo = formatarCargo(e.cargo);
  return e.uf && e.uf !== "BR" ? `${cargo} · ${e.uf}` : cargo;
}
