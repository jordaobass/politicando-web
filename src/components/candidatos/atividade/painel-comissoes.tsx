"use client";

import { useMemo, useState } from "react";
import { UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComissaoAtividade } from "@/lib/types";

const MAX_INICIAL = 5;

/**
 * Atuação em comissões (US-SEN-03): seletor por ano de mandato, contadores de titular/suplente
 * no ano e histórico colapsado (ver mais). Cada item: nome + cargo + período.
 */
export function PainelComissoes({ comissoes }: { comissoes: ComissaoAtividade[] }) {
  const anos = useMemo(
    () => [...new Set(comissoes.map((c) => c.ano).filter((a) => a > 0))].sort((a, b) => b - a),
    [comissoes],
  );
  const [ano, setAno] = useState(anos[0] ?? 0);
  const [verMais, setVerMais] = useState(false);

  const doAno = comissoes.filter((c) => c.ano === ano);
  const titulares = doAno.filter((c) => /titular/i.test(c.participacao)).length;
  const suplentes = doAno.filter((c) => /suplente/i.test(c.participacao)).length;
  const visiveis = verMais ? doAno : doAno.slice(0, MAX_INICIAL);

  if (comissoes.length === 0) {
    return <p className="text-sm text-muted-foreground">Sem comissões registradas.</p>;
  }

  return (
    <div className="space-y-4">
      {anos.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {anos.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAno(a);
                setVerMais(false);
              }}
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                a === ano
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              {a}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
          <p className="text-2xl font-bold text-foreground tabular-nums">{titulares}</p>
          <p className="text-sm text-muted-foreground">como titular</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
          <p className="text-2xl font-bold text-foreground tabular-nums">{suplentes}</p>
          <p className="text-sm text-muted-foreground">como suplente</p>
        </div>
      </div>

      <ul className="space-y-2">
        {visiveis.map((c, i) => (
          <li key={`${c.sigla}-${c.inicio}-${i}`} className="flex items-start gap-3 rounded-lg border border-border px-3 py-2">
            <UsersIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{c.nome}</p>
              <p className="text-xs text-muted-foreground">
                {c.participacao}
                {c.inicio && ` · ${c.inicio} — ${c.ativa || !c.fim ? "até o momento" : c.fim}`}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {doAno.length > MAX_INICIAL && (
        <Button variant="outline" size="sm" className="w-full" onClick={() => setVerMais((v) => !v)}>
          {verMais ? "Ver menos" : `Ver mais (${doAno.length - MAX_INICIAL})`}
        </Button>
      )}
    </div>
  );
}
