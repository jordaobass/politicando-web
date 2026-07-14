"use client";

import { TextoRico } from "@/components/comum/texto-rico";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ExternalLinkIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EstadoErro } from "@/components/comum/estados";
import { buscarPartido } from "@/lib/api";

/** Perfil do partido: identidade + programa (propostas) raspado/curado. */
export function DetalhePartido({ id }: { id: string }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["partido", id],
    queryFn: () => buscarPartido(id),
  });

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-xl bg-muted" />;
  }
  if (isError || !data) {
    return (
      <EstadoErro
        titulo="Não foi possível carregar o partido"
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
          {data.logoUrl ? (
            <Image
              src={data.logoUrl}
              alt={`Logo do ${data.sigla}`}
              width={80}
              height={80}
              className="size-full object-contain"
              unoptimized
            />
          ) : (
            <span className="text-2xl font-bold text-muted-foreground">{data.sigla}</span>
          )}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-foreground">{data.sigla}</h1>
          <p className="text-muted-foreground">{data.nome}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {data.numero ? <span className="tabular-nums">Nº {data.numero}</span> : null}
            {data.siteOficial && (
              <a
                href={data.siteOficial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Site oficial <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Programa e propostas</CardTitle>
        </CardHeader>
        <CardContent>
          {data.programaResumo ? (
            <TextoRico
              texto={data.programaResumo}
              className="text-sm leading-relaxed text-muted-foreground"
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              O programa deste partido ainda não foi cadastrado.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
