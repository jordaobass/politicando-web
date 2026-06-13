"use client";

import { BookmarkIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useSalvarComparacao } from "@/hooks/use-api";
import { useSessao } from "@/hooks/use-sessao";
import { ApiError } from "@/lib/api";

/** Salva a comparação atual nas comparações do usuário (cartão US-AUTH-06). Some quando deslogado. */
export function BotaoSalvarComparacao({ a, b }: { a: string; b: string }) {
  const { autenticado, sessao } = useSessao();
  const mutation = useSalvarComparacao(sessao?.token ?? null);

  if (!autenticado) return null;

  async function salvar() {
    try {
      await mutation.mutateAsync({ a, b });
      toast.success("Comparação salva no seu perfil.");
    } catch (erro) {
      if (erro instanceof ApiError && erro.status === 409) {
        toast.info("Essa comparação já está salva.");
        return;
      }
      toast.error("Não foi possível salvar a comparação.");
    }
  }

  return (
    <Button
      variant="outline"
      onClick={salvar}
      disabled={mutation.isPending}
      data-testid="salvar-comparacao"
    >
      <BookmarkIcon className="size-4" aria-hidden="true" />
      Salvar comparação
    </Button>
  );
}
