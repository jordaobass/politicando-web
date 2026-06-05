import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginacaoProps {
  pagina: number;
  totalPaginas: number;
  onMudar: (pagina: number) => void;
}

/** Controle simples de paginação anterior/próxima. */
export function Paginacao({ pagina, totalPaginas, onMudar }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onMudar(pagina - 1)}
        disabled={pagina <= 1}
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
        Anterior
      </Button>
      <span className="text-sm tabular-nums text-muted-foreground">
        Página {pagina} de {totalPaginas}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onMudar(pagina + 1)}
        disabled={pagina >= totalPaginas}
      >
        Próxima
        <ChevronRightIcon className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
