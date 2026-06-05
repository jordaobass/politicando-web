"use client";

import { ExternalLinkIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { classesVoto, rotuloVoto } from "@/lib/format";
import type { VotoAtividade } from "@/lib/types";

interface ListaVotacoesProps {
  itens: VotoAtividade[];
}

/** Histórico de votos nominais em plenário, com link para a votação no portal. */
export function ListaVotacoes({ itens }: ListaVotacoesProps) {
  if (itens.length === 0) {
    return (
      <p className="px-1 py-8 text-center text-sm text-muted-foreground">
        Ainda não há votações nominais registradas para este parlamentar.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {itens.map((v, i) => (
        <li
          key={`${i}-${v.descricao.slice(0, 24)}`}
          className="flex items-start justify-between gap-3 py-4 first:pt-0 last:pb-0"
        >
          <div className="min-w-0 space-y-1.5">
            <p className="text-sm font-medium text-foreground">{v.descricao}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {v.tema && <Badge variant="secondary">{v.tema}</Badge>}
              {v.data && <span className="text-xs text-muted-foreground">{v.data}</span>}
              <a
                href={v.urlPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
                Ver votação
              </a>
            </div>
          </div>
          <Badge variant="outline" className={cn("shrink-0", classesVoto(v.voto))}>
            {rotuloVoto(v.voto)}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
