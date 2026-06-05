"use client";

import { toast } from "sonner";
import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRecalcularScores } from "@/hooks/use-api";

/** Dispara o recálculo de scores via IA na API administrativa. */
export function BotaoRecalcular() {
  const mutation = useRecalcularScores();

  async function recalcular() {
    try {
      await mutation.mutateAsync();
      toast.success("Recálculo de scores iniciado.");
    } catch {
      toast.error("Não foi possível iniciar o recálculo.");
    }
  }

  return (
    <Button onClick={recalcular} disabled={mutation.isPending}>
      <RefreshCwIcon
        className={mutation.isPending ? "size-4 animate-spin" : "size-4"}
        aria-hidden="true"
      />
      {mutation.isPending ? "Recalculando…" : "Recalcular scores IA"}
    </Button>
  );
}
