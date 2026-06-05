import type { ReactNode } from "react";

interface CabecalhoPaginaProps {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}

/** Cabeçalho padrão das páginas internas. */
export function CabecalhoPagina({
  titulo,
  descricao,
  acao,
}: CabecalhoPaginaProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {titulo}
        </h1>
        {descricao && (
          <p className="max-w-2xl text-muted-foreground">{descricao}</p>
        )}
      </div>
      {acao}
    </div>
  );
}
