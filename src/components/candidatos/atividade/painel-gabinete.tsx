"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { formatarReais } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { GabineteAtividade } from "@/lib/types";

/**
 * Cota mensal do CEAP (Cota para o Exercício da Atividade Parlamentar) por UF — em R$.
 * Valores de referência (Câmara dos Deputados); variam por ano e devem ser revisados
 * periodicamente. Usados só para estimar a economia (cota não utilizada).
 */
const COTA_CEAP_MENSAL: Record<string, number> = {
  AC: 44632.46, AL: 40944.1, AP: 43570.12, AM: 44557.93, BA: 39428.57,
  CE: 41676.8, DF: 30788.66, ES: 37423.91, GO: 35611.4, MA: 41676.8,
  MT: 38871.86, MS: 37318.72, MG: 36092.71, PA: 42500.79, PB: 41846.21,
  PR: 38871.86, PE: 40965.69, PI: 41676.8, RJ: 35759.97, RN: 42305.08,
  RS: 40361.16, RO: 43954.01, RR: 45612.53, SC: 39877.15, SP: 37043.53,
  SE: 40139.26, TO: 36092.71,
};

interface PainelGabineteProps {
  /** Gastos por ano, do mais recente para o mais antigo (índice 0 = mais recente). */
  gabinetes: GabineteAtividade[];
  /** UF da candidatura — define o teto da cota (Câmara) para estimar a economia. */
  uf?: string | null;
  /** Cargo — só calculamos "economia" para deputado federal (cota CEAP conhecida). */
  cargo?: string | null;
}

/**
 * Gastos do mandato (CEAP) como carrossel por ano: economia estimada, gasto total e
 * principais despesas. Setas navegam para anos anteriores.
 */
export function PainelGabinete({ gabinetes, uf, cargo }: PainelGabineteProps) {
  const anos = gabinetes.filter((g) => g.total > 0);
  const [indice, setIndice] = useState(0);

  if (anos.length === 0) {
    return (
      <p className="px-1 py-8 text-center text-sm text-muted-foreground">
        Ainda não há dados de gastos do mandato para este parlamentar.
      </p>
    );
  }

  const i = Math.min(indice, anos.length - 1);
  const gabinete = anos[i];

  // Teto da cota no período: cota mensal da UF × meses decorridos no ano de referência.
  // Só para deputado federal — a cota do Senado é outra e ainda não está tabelada.
  const ehDeputado = (cargo ?? "").toLowerCase().includes("deputado");
  const cotaMensal = ehDeputado && uf ? COTA_CEAP_MENSAL[uf.toUpperCase()] : undefined;
  const agora = new Date();
  const meses = gabinete.ano < agora.getFullYear() ? 12 : Math.max(1, agora.getMonth() + 1);
  const cotaPeriodo = cotaMensal ? cotaMensal * meses : undefined;
  const economia = cotaPeriodo !== undefined ? Math.max(0, cotaPeriodo - gabinete.total) : undefined;
  const percentualUsado =
    cotaPeriodo !== undefined ? Math.min(100, Math.round((gabinete.total / cotaPeriodo) * 100)) : undefined;

  // Principais despesas: tipos com gasto > 0, maiores primeiro; excedente vira "Outras".
  const TOP = 6;
  const comGasto = gabinete.porTipo.filter((t) => t.total > 0).sort((a, b) => b.total - a.total);
  const principais = comGasto.slice(0, TOP);
  const outras = comGasto.slice(TOP);
  const totalOutras = outras.reduce((s, t) => s + t.total, 0);
  const maior = principais[0]?.total ?? 1;

  return (
    <div className="space-y-5">
      {/* Carrossel de anos: ‹ ano mais antigo · › ano mais recente */}
      <div className="flex items-center justify-between gap-2">
        <SetaAno
          direcao="anterior"
          aoClicar={() => setIndice(i + 1)}
          desabilitada={i >= anos.length - 1}
        />
        <div className="text-center">
          <p className="text-lg font-bold text-foreground tabular-nums">{gabinete.ano}</p>
          <p className="text-[11px] text-muted-foreground">
            {i + 1} de {anos.length} {anos.length === 1 ? "ano" : "anos"}
          </p>
        </div>
        <SetaAno direcao="proximo" aoClicar={() => setIndice(i - 1)} desabilitada={i <= 0} />
      </div>

      {/* Economia estimada + gasto total (economia só quando a cota é conhecida) */}
      {economia !== undefined ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-chart-2/30 bg-chart-2/10 p-3">
            <p className="text-xs text-muted-foreground">Economia estimada</p>
            <p className="text-2xl font-bold text-chart-2 tabular-nums">
              {formatarReais(economia)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Gasto em {gabinete.ano}</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {formatarReais(gabinete.total)}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
          <p className="text-xs text-muted-foreground">Gasto em {gabinete.ano}</p>
          <p className="text-3xl font-bold text-foreground tabular-nums">
            {formatarReais(gabinete.total)}
          </p>
        </div>
      )}

      {/* % da cota usada */}
      {percentualUsado !== undefined && cotaPeriodo !== undefined && (
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-muted-foreground">
              Cota usada{uf ? ` (${uf.toUpperCase()})` : ""}
            </span>
            <span className="font-semibold tabular-nums text-foreground">{percentualUsado}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-chart-1 transition-all"
              style={{ width: `${percentualUsado}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Cota CEAP de {formatarReais(cotaPeriodo)} no período ({meses}{" "}
            {meses === 1 ? "mês" : "meses"}).
          </p>
        </div>
      )}

      {/* Principais gastos por tipo */}
      <div className="space-y-2.5">
        <p className="text-sm font-medium text-foreground">Principais gastos</p>
        <ul className="space-y-2.5">
          {principais.map((t) => (
            <li key={t.tipo} className="space-y-1">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-muted-foreground">{capitalizar(t.tipo)}</span>
                <span className="shrink-0 font-semibold tabular-nums text-foreground">
                  {formatarReais(t.total)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-chart-1 transition-all"
                  style={{ width: `${(t.total / maior) * 100}%` }}
                />
              </div>
            </li>
          ))}
          {totalOutras > 0 && (
            <li className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-muted-foreground">Outras ({outras.length})</span>
              <span className="shrink-0 font-semibold tabular-nums text-foreground">
                {formatarReais(totalOutras)}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

/** Botão-seta do carrossel de anos. */
function SetaAno({
  direcao,
  aoClicar,
  desabilitada,
}: {
  direcao: "anterior" | "proximo";
  aoClicar: () => void;
  desabilitada: boolean;
}) {
  const Icone = direcao === "anterior" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={aoClicar}
      disabled={desabilitada}
      aria-label={direcao === "anterior" ? "Ano anterior" : "Ano seguinte"}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card transition-colors",
        desabilitada
          ? "cursor-not-allowed opacity-40"
          : "hover:border-primary/40 hover:bg-muted",
      )}
    >
      <Icone className="size-4" aria-hidden="true" />
    </button>
  );
}

/** "PASSAGEM AÉREA - SIGEPA" -> "Passagem aérea - sigepa" (visual mais leve). */
function capitalizar(texto: string): string {
  const t = texto.toLocaleLowerCase("pt-BR");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
