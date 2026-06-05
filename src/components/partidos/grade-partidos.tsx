"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { GradeSkeleton, EstadoErro, EstadoVazio } from "@/components/comum/estados";
import { usePartidos } from "@/hooks/use-api";
import type { Partido } from "@/lib/types";

/** Grid de partidos. */
export function GradePartidos() {
  const { data, isLoading, isError, refetch } = usePartidos();

  if (isLoading) return <GradeSkeleton quantidade={8} />;

  if (isError) {
    return (
      <EstadoErro
        titulo="Não foi possível carregar os partidos"
        descricao="A API pode estar indisponível."
        acao={
          <button
            type="button"
            onClick={() => refetch()}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Tentar de novo
          </button>
        }
      />
    );
  }

  const partidos = data ?? [];
  if (partidos.length === 0) {
    return <EstadoVazio titulo="Nenhum partido cadastrado" />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {partidos.map((partido) => (
        <CardPartido key={partido.id} partido={partido} />
      ))}
    </div>
  );
}

function CardPartido({ partido }: { partido: Partido }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-16 items-center justify-center overflow-hidden rounded-lg bg-muted">
          {partido.logoUrl ? (
            <Image
              src={partido.logoUrl}
              alt={`Logo do ${partido.sigla}`}
              width={64}
              height={64}
              className="size-full object-contain"
              unoptimized
            />
          ) : (
            <span className="text-lg font-bold text-muted-foreground">
              {partido.sigla}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground">{partido.sigla}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {partido.nome}
          </p>
          {partido.numero ? (
            <p className="mt-1 text-xs tabular-nums text-muted-foreground">
              Nº {partido.numero}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
