"use client";

import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategorias } from "@/hooks/use-api";

export interface ValoresOrdenacao {
  /** Slug da categoria; vazio = ordenar por nome. */
  por: string;
  /** true = maior pontuação primeiro. */
  desc: boolean;
}

interface OrdenacaoCandidatosProps {
  valores: ValoresOrdenacao;
  onChange: (valores: ValoresOrdenacao) => void;
}

const POR_NOME = "nome";

/** Seletor de ordenação: por nome (A–Z) ou pela pontuação de uma das categorias temáticas. */
export function OrdenacaoCandidatos({ valores, onChange }: OrdenacaoCandidatosProps) {
  const { data: categorias } = useCategorias();
  const ordenaPorScore = valores.por !== "";

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="ordenar-por" className="text-sm text-muted-foreground">
        Ordenar por
      </label>
      <Select
        value={valores.por || POR_NOME}
        onValueChange={(v) =>
          onChange({ por: v === POR_NOME ? "" : String(v), desc: valores.desc })
        }
      >
        <SelectTrigger id="ordenar-por" className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={POR_NOME}>Nome (A–Z)</SelectItem>
          {(categorias ?? []).map((categoria) => (
            <SelectItem key={categoria.slug} value={categoria.slug}>
              {categoria.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {ordenaPorScore && (
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onChange({ por: valores.por, desc: !valores.desc })}
          aria-label={
            valores.desc ? "Maior pontuação primeiro" : "Menor pontuação primeiro"
          }
          title={valores.desc ? "Maior pontuação primeiro" : "Menor pontuação primeiro"}
        >
          {valores.desc ? (
            <ArrowDownWideNarrow className="size-4" />
          ) : (
            <ArrowUpWideNarrow className="size-4" />
          )}
        </Button>
      )}
    </div>
  );
}
