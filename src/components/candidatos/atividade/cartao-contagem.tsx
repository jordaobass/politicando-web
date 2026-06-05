"use client";

import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

interface CartaoContagemProps {
  rotulo: string;
  valor: string | number;
  icone: ComponentType<LucideProps>;
  /** Quando informado, o cartão vira botão que muda para a aba indicada. */
  onClick?: () => void;
  /** Realça o número (ex.: presença em verde). */
  destaque?: boolean;
}

/**
 * Cartão-CTA com a contagem de uma categoria de atividade ("quanto de cada").
 * Clicável para saltar à aba correspondente.
 */
export function CartaoContagem({
  rotulo,
  valor,
  icone: Icone,
  onClick,
  destaque,
}: CartaoContagemProps) {
  const conteudo = (
    <>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icone className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block text-xl leading-none font-bold tabular-nums",
            destaque ? "text-chart-2" : "text-foreground",
          )}
        >
          {valor}
        </span>
        <span className="mt-1 block truncate text-xs text-muted-foreground">
          {rotulo}
        </span>
      </span>
    </>
  );

  const classes =
    "flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left";

  if (!onClick) {
    return <div className={classes}>{conteudo}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        classes,
        "transition-colors hover:border-primary/40 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
      )}
    >
      {conteudo}
    </button>
  );
}
