"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ArrowRightIcon, ArrowLeftRightIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CabecalhoPolitico } from "@/components/comum/cabecalho-politico";
import {
  formatarPercentual,
  classesBadgeNivel,
  classeBarraNivel,
  paraEscala100,
  nivelPorValor,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ResultadoCandidato } from "@/lib/types";

/** Card de candidato com o percentual de match obtido no quiz (identidade única). */
export function CardResultadoCandidato({
  candidato,
}: {
  candidato: ResultadoCandidato;
}) {
  const [aberto, setAberto] = useState(false);
  const idTemas = useId();
  const temBreakdown = candidato.porCategoria.length > 0;

  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardContent className="space-y-3">
        <Link href={`/candidatos/${candidato.candidaturaId}`} className="block">
          <CabecalhoPolitico
            nomeUrna={candidato.nomeUrna}
            fotoUrl={candidato.fotoUrl}
            cargo={candidato.cargo}
            uf={candidato.uf}
            partidoSigla={candidato.partidoSigla}
            partidoLogoUrl={candidato.partidoLogoUrl}
            orientacao="horizontal"
            tamanhoFoto="sm"
            acao={
              <div className="flex flex-col items-end gap-1">
                <span className="text-2xl font-bold text-primary tabular-nums">
                  {formatarPercentual(candidato.compatibilidade)}
                </span>
                <Badge variant="outline" className={classesBadgeNivel(candidato.nivel)}>
                  {candidato.nivel}
                </Badge>
              </div>
            }
          />
        </Link>

        {temBreakdown && (
          <div className="border-t pt-2">
            <button
              type="button"
              onClick={() => setAberto((valor) => !valor)}
              aria-expanded={aberto}
              aria-controls={idTemas}
              className="flex w-full items-center justify-between rounded-md px-1 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {aberto ? "Ocultar afinidade" : "Exibir afinidade"}
              <ChevronDownIcon
                className={cn(
                  "size-4 transition-transform motion-reduce:transition-none",
                  aberto && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {aberto && (
              <ul id={idTemas} className="space-y-2.5 pt-2">
                {candidato.porCategoria.map((tema) => (
                  <li key={tema.categoriaId} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground">{tema.categoria}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {formatarPercentual(tema.compatibilidade)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          classeBarraNivel(nivelPorValor(tema.compatibilidade)),
                        )}
                        style={{ width: `${paraEscala100(tema.compatibilidade)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Duas ações lado a lado: "Ver perfil" (primário, azul) e "Comparar" (abre a
            comparação já com este candidato no slot A). */}
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/candidatos/${candidato.candidaturaId}`}>
              Ver perfil
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/comparar?a=${candidato.candidaturaId}`}>
              Comparar
              <ArrowLeftRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
