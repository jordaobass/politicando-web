"use client";

import { useMemo, useState } from "react";
import { ExternalLinkIcon, FileTextIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { classesStatusProposicao, rotuloStatusProposicao } from "@/lib/format";
import type { ProposicaoAtividade, StatusProposicao } from "@/lib/types";

interface ListaProposicoesProps {
  itens: ProposicaoAtividade[];
  vazio: string;
}

/** Ordem dos chips de status (segue o ciclo de vida: tramitação → resultado final). */
const ORDEM_STATUS: StatusProposicao[] = [
  "EmTramitacao",
  "Aprovada",
  "Rejeitada",
  "Arquivada",
];

type FiltroStatus = StatusProposicao | "todos";

/** Lista de proposições com filtro por status (chips com contagem) e deep-link ao portal. */
export function ListaProposicoes({ itens, vazio }: ListaProposicoesProps) {
  // Conta por status para mostrar o número em cada chip; chip vazio é omitido.
  const contagens = useMemo(() => {
    const mapa = new Map<StatusProposicao, number>();
    for (const item of itens) mapa.set(item.status, (mapa.get(item.status) ?? 0) + 1);
    return mapa;
  }, [itens]);

  const [filtro, setFiltro] = useState<FiltroStatus>("todos");
  const filtrados = useMemo(
    () => (filtro === "todos" ? itens : itens.filter((p) => p.status === filtro)),
    [itens, filtro],
  );

  if (itens.length === 0) {
    return <p className="px-1 py-8 text-center text-sm text-muted-foreground">{vazio}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <ChipFiltro
          ativo={filtro === "todos"}
          rotulo="Todos"
          total={itens.length}
          onClick={() => setFiltro("todos")}
        />
        {ORDEM_STATUS.filter((s) => (contagens.get(s) ?? 0) > 0).map((status) => (
          <ChipFiltro
            key={status}
            ativo={filtro === status}
            rotulo={rotuloStatusProposicao(status)}
            total={contagens.get(status) ?? 0}
            classesAtivo={classesStatusProposicao(status)}
            onClick={() => setFiltro(status)}
          />
        ))}
      </div>

      {filtrados.length === 0 ? (
        <p className="px-1 py-8 text-center text-sm text-muted-foreground">
          Nenhum projeto com este status.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {filtrados.map((p) => (
            <li key={`${p.tipo}-${p.idExterno}`} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1.5">
                  <p className="text-sm font-medium text-foreground">
                    <span className="font-semibold">{p.rotulo}</span>
                    {p.ementa ? ` — ${p.ementa}` : ""}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {p.tema && <Badge variant="secondary">{p.tema}</Badge>}
                    {p.dataApresentacao && (
                      <span className="text-xs text-muted-foreground">{p.dataApresentacao}</span>
                    )}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn("shrink-0", classesStatusProposicao(p.status))}
                >
                  {rotuloStatusProposicao(p.status)}
                </Badge>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <a
                  href={p.urlPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
                  Ver no portal da Câmara
                </a>
                {p.urlInteiroTeor && (
                  <a
                    href={p.urlInteiroTeor}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    <FileTextIcon className="size-3.5" aria-hidden="true" />
                    Inteiro teor
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Chip clicável de filtro: ganha a cor do status quando ativo. */
function ChipFiltro({
  ativo,
  rotulo,
  total,
  classesAtivo,
  onClick,
}: {
  ativo: boolean;
  rotulo: string;
  total: number;
  /** Classes que pintam o chip quando ativo (vindas de classesStatusProposicao). */
  classesAtivo?: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      aria-pressed={ativo}
      className={cn(
        "gap-1.5",
        ativo && classesAtivo,
        ativo && !classesAtivo && "border-primary/40 bg-primary/10 text-foreground",
      )}
    >
      <span>{rotulo}</span>
      <span className="rounded-full bg-background/60 px-1.5 text-xs font-semibold tabular-nums">
        {total}
      </span>
    </Button>
  );
}
