"use client";

import { X } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { SeloPartido } from "@/components/comum/selo-partido";
import { BuscaCandidato } from "@/components/comum/busca-candidato";
import { useCandidatura } from "@/hooks/use-api";
import { formatarCargo } from "@/lib/format";

interface SeletorCandidaturaProps {
  rotulo: string;
  valor: string;
  onChange: (id: string) => void;
  /** Id já escolhido na outra coluna (some dos resultados). */
  excluir?: string;
}

/** Escolha de uma candidatura por busca autocomplete (igual à home) + chip do selecionado. */
export function SeletorCandidatura({ rotulo, valor, onChange, excluir }: SeletorCandidaturaProps) {
  const { data, isLoading } = useCandidatura(valor);

  return (
    <div className="space-y-2">
      <Label>{rotulo}</Label>

      {valor ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          {isLoading || !data ? (
            <span className="flex-1 text-sm text-muted-foreground">Carregando…</span>
          ) : (
            <>
              <FotoCandidato
                fotoUrl={data.politico.fotoUrl}
                nome={data.politico.nomeUrna}
                className="size-11 shrink-0 border border-border"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">{data.politico.nomeUrna}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatarCargo(data.cargo)} · {data.uf}
                </p>
              </div>
              <SeloPartido sigla={data.partidoSigla} logoUrl={data.partidoLogoUrl} />
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange("")}
            aria-label={`Trocar ${rotulo}`}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <BuscaCandidato
          tamanho="padrao"
          placeholder="Buscar candidato…"
          excluirId={excluir}
          onSelecionar={(c) => onChange(c.id)}
        />
      )}
    </div>
  );
}
