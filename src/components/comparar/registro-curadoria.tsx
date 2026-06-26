"use client";

import { useState } from "react";
import { ChevronDownIcon, FileTextIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { CORES_COMPARACAO } from "@/components/comparar/comparacao-radar";
import type { CandidaturaDetalhe } from "@/lib/types";

/**
 * Registro de governo e proveniência do score (curadoria, US derivada da régua "ato > palavra").
 * Mostra a observação de curadoria de cada candidato lado a lado — com dados oficiais e fontes,
 * tratando os dois pelo mesmo critério. Some quando nenhum dos dois tem nota (não polui a tela).
 */
export function RegistroCuradoria({ a, b }: { a: CandidaturaDetalhe; b: CandidaturaDetalhe }) {
  if (!a.observacaoCuradoria && !b.observacaoCuradoria) return null;

  return (
    <section className="space-y-3" data-testid="registro-curadoria">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">Registro e proveniência</h2>
        <p className="max-w-prose text-sm text-muted-foreground">
          Notas de curadoria com base em dados oficiais e fontes — registro de governo, votos e de
          onde vem o score. Mesmo critério para todos:{" "}
          <strong className="font-semibold text-foreground">ato pesa mais que palavra</strong>.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <NotaCuradoria
          nome={a.politico.nomeUrna}
          cor={CORES_COMPARACAO.a}
          texto={a.observacaoCuradoria}
        />
        <NotaCuradoria
          nome={b.politico.nomeUrna}
          cor={CORES_COMPARACAO.b}
          texto={b.observacaoCuradoria}
        />
      </div>
    </section>
  );
}

function NotaCuradoria({
  nome,
  cor,
  texto,
}: {
  nome: string;
  cor: string;
  texto: string | null;
}) {
  const [aberto, setAberto] = useState(false);

  if (!texto) {
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-border bg-muted/40 p-4">
        <Cabecalho nome={nome} cor={cor} />
        <p className="text-sm text-muted-foreground">Sem observação de curadoria para este candidato.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <FileTextIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <Cabecalho nome={nome} cor={cor} />
        </span>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            aberto && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {aberto && (
        <p className="whitespace-pre-line border-t border-border p-4 text-sm leading-relaxed text-muted-foreground">
          {texto}
        </p>
      )}
    </div>
  );
}

function Cabecalho({ nome, cor }: { nome: string; cor: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: cor }} />
      <span className="truncate text-sm font-medium text-foreground">{nome}</span>
    </span>
  );
}
