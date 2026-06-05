import {
  paraEscala100,
  formatarPercentual,
  nivelPorValor,
  classeBarraNivel,
} from "@/lib/format";

interface BarraScoreProps {
  rotulo: string;
  /** Valor em 0..1 ou 0..100 (percentual), ou em 0..escalaMax quando `escalaMax` é informado. */
  valor: number;
  descricao?: string;
  /**
   * Quando informado, a barra vira nota decimal nessa escala (ex.: 5 → exibe "3.5"
   * e preenche valor/5) em vez de percentual.
   */
  escalaMax?: number;
}

/**
 * Barra horizontal de score/compatibilidade por categoria.
 * Usa role=meter para acessibilidade e cor de marca via variável de tema.
 */
export function BarraScore({ rotulo, valor, descricao, escalaMax }: BarraScoreProps) {
  const percentual = escalaMax
    ? Math.max(0, Math.min(100, Math.round((valor / escalaMax) * 100)))
    : paraEscala100(valor);
  const corPreenchimento = classeBarraNivel(nivelPorValor(percentual));
  const rotuloValor = escalaMax ? valor.toFixed(1) : formatarPercentual(valor);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="min-w-0 truncate font-medium text-foreground" title={rotulo}>
          {rotulo}
        </span>
        <span className="shrink-0 tabular-nums text-muted-foreground">
          {rotuloValor}
        </span>
      </div>
      <div
        role="meter"
        aria-label={rotulo}
        aria-valuenow={escalaMax ? valor : percentual}
        aria-valuemin={0}
        aria-valuemax={escalaMax ?? 100}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={`h-full rounded-full transition-all ${corPreenchimento}`}
          style={{ width: `${percentual}%` }}
        />
      </div>
      {descricao && (
        <p className="text-xs text-muted-foreground">{descricao}</p>
      )}
    </div>
  );
}
