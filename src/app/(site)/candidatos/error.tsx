"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { EstadoErro } from "@/components/comum/estados";

/** Error boundary das rotas de candidatos. */
export default function CandidatosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <EstadoErro
        titulo="Erro ao carregar candidatos"
        descricao="Tente novamente em instantes."
        acao={<Button onClick={reset}>Tentar novamente</Button>}
      />
    </div>
  );
}
