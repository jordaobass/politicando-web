import type { ReactNode } from "react";
import { CircleAlertIcon, InboxIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

/** Grade de skeletons para listas em carregamento. */
export function GradeSkeleton({ quantidade = 6 }: { quantidade?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: quantidade }).map((_, indice) => (
        <Skeleton key={indice} className="h-48 w-full rounded-xl" />
      ))}
    </div>
  );
}

interface EstadoMensagemProps {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}

/** Estado vazio reutilizável. */
export function EstadoVazio({ titulo, descricao, acao }: EstadoMensagemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card p-12 text-center">
      <InboxIcon className="size-10 text-muted-foreground" aria-hidden="true" />
      <div className="space-y-1">
        <p className="font-medium text-foreground">{titulo}</p>
        {descricao && (
          <p className="text-sm text-muted-foreground">{descricao}</p>
        )}
      </div>
      {acao}
    </div>
  );
}

/** Estado de erro reutilizável (não quebra a página). */
export function EstadoErro({ titulo, descricao, acao }: EstadoMensagemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-12 text-center">
      <CircleAlertIcon
        className="size-10 text-destructive"
        aria-hidden="true"
      />
      <div className="space-y-1">
        <p className="font-medium text-foreground">{titulo}</p>
        {descricao && (
          <p className="text-sm text-muted-foreground">{descricao}</p>
        )}
      </div>
      {acao}
    </div>
  );
}
