"use client";

import { cn } from "@/lib/utils";
import type { PresencaAtividade } from "@/lib/types";

interface PainelPresencaProps {
  /** Um item por ano do mandato (legislatura) corrente, mais recente primeiro. */
  presencas: PresencaAtividade[];
  /** Cargo — define a unidade: senador é medido por votações nominais, deputado por sessões. */
  cargo?: string | null;
}

/**
 * Presença em plenário sintetizada: um anel grande com o total do mandato (todas as
 * sessões somadas) e até 4 anéis menores com os últimos anos. Cabe num card de meia tela.
 */
export function PainelPresenca({ presencas, cargo }: PainelPresencaProps) {
  // Senador: presença derivada das votações nominais. Demais (deputado): sessões de plenário.
  const unidade = (cargo ?? "").toLowerCase().includes("senador") ? "votações nominais" : "sessões";

  if (presencas.length === 0) {
    return (
      <p className="px-1 py-8 text-center text-sm text-muted-foreground">
        Ainda não há dados de presença em plenário para este parlamentar.
      </p>
    );
  }

  // Total do mandato: soma das sessões de todos os anos (fallback = média dos %).
  const sessoesTotais = presencas.reduce((s, p) => s + p.sessoesTotais, 0);
  const sessoesPresente = presencas.reduce((s, p) => s + p.sessoesPresente, 0);
  const percentualTotal =
    sessoesTotais > 0
      ? Math.round((sessoesPresente / sessoesTotais) * 100)
      : Math.round(presencas.reduce((s, p) => s + p.percentual, 0) / presencas.length);

  // Últimos anos de mandato (já vem do mais recente para o mais antigo).
  const ultimosAnos = presencas.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Gráfico maior — total do mandato */}
      <div className="flex flex-col items-center gap-2">
        <Anel percentual={percentualTotal} tamanho={148} traco={12} />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Total do mandato</p>
          {sessoesTotais > 0 && (
            <p className="text-xs text-muted-foreground tabular-nums">
              {sessoesPresente} de {sessoesTotais} {unidade}
            </p>
          )}
        </div>
      </div>

      {/* 4 gráficos menores — últimos anos */}
      <ul className="flex flex-wrap items-start justify-center gap-3 sm:gap-4">
        {ultimosAnos.map((p) => (
          <li key={p.ano} className="flex flex-col items-center gap-1.5">
            <Anel percentual={p.percentual} tamanho={64} traco={6} />
            <span className="text-xs font-medium text-foreground tabular-nums">{p.ano}</span>
            {p.sessoesTotais > 0 && (
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {p.sessoesPresente}/{p.sessoesTotais}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Anel de progresso (donut) em SVG: trilho cinza + arco colorido pelo nível.
 * A cor do arco vem de `currentColor` (classe de texto), e o número fica no centro.
 */
function Anel({
  percentual,
  tamanho,
  traco,
}: {
  percentual: number;
  tamanho: number;
  traco: number;
}) {
  const valor = Math.max(0, Math.min(100, percentual));
  const raio = (tamanho - traco) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const preenchido = (valor / 100) * circunferencia;

  return (
    <div
      className="relative shrink-0"
      style={{ width: tamanho, height: tamanho }}
      role="meter"
      aria-label="Presença"
      aria-valuenow={valor}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={tamanho}
        height={tamanho}
        viewBox={`0 0 ${tamanho} ${tamanho}`}
        className={cn("-rotate-90", corDoNivel(valor))}
      >
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          strokeWidth={traco}
          className="stroke-muted"
        />
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke="currentColor"
          strokeWidth={traco}
          strokeLinecap="round"
          strokeDasharray={`${preenchido} ${circunferencia}`}
          className="transition-all"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-bold text-foreground tabular-nums"
          style={{ fontSize: tamanho * 0.24 }}
        >
          {valor}%
        </span>
      </div>
    </div>
  );
}

/** Verde forte ≥80%, verde ≥60%, amber ≥40%, vermelho <40% — mesma escala dos níveis de match. */
function corDoNivel(percentual: number): string {
  if (percentual >= 80) return "text-chart-2";
  if (percentual >= 60) return "text-chart-1";
  if (percentual >= 40) return "text-chart-3";
  return "text-chart-4";
}
