"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useArmazenamento } from "@/hooks/use-storage";
import { CHAVE_RETORNO_CANDIDATOS } from "@/lib/constantes";

/**
 * "Voltar para candidatos" conservando a busca (Correções v7, item 2a): a lista memoriza a
 * própria URL (termo, filtros, ordenação e página) em sessionStorage e este botão volta para
 * ela — em vez do `/candidatos` fixo, que jogava o usuário na busca do zero. O fallback cobre
 * acesso direto ao perfil (link compartilhado, aba nova), quando não há lista para restaurar.
 */
export function BotaoVoltarCandidatos() {
  // useSyncExternalStore por baixo: no servidor lê null e o href fica no fallback.
  const [memorizada] = useArmazenamento("session", CHAVE_RETORNO_CANDIDATOS);
  const href = memorizada?.startsWith("/candidatos") ? memorizada : "/candidatos";

  return (
    <Button asChild variant="ghost" size="sm" className="px-0">
      <Link href={href}>
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
        Voltar para candidatos
      </Link>
    </Button>
  );
}
