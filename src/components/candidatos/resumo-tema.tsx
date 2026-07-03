"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Resumo da IA por tema (síntese + justificativa), colapsável e fechado por padrão.
 * Usado de forma consistente em todos os perfis — presidente, governador, deputado e senador
 * (card "Correções v2", itens 2 e 3). Não renderiza nada quando não há resumo.
 */
export function ResumoTema({
  sintese,
  justificativa,
}: {
  sintese?: string | null;
  justificativa?: string | null;
}) {
  const [aberto, setAberto] = useState(false);
  const id = useId();

  if (!sintese && !justificativa) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls={id}
        className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDownIcon
          className={cn("size-3.5 transition-transform motion-reduce:transition-none", aberto && "rotate-180")}
          aria-hidden="true"
        />
        {aberto ? "Ocultar análise" : "Ver análise"}
      </button>
      {aberto && (
        <div id={id} className="space-y-1 pt-1.5">
          {sintese && <p className="text-sm font-medium text-foreground">{sintese}</p>}
          {justificativa && <p className="text-sm text-muted-foreground">{justificativa}</p>}
        </div>
      )}
    </div>
  );
}
