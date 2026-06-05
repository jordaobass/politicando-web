"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { EstadoErro } from "@/components/comum/estados";

/** Error boundary do painel administrativo. */
export default function AdminError({
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
    <EstadoErro
      titulo="Erro no painel administrativo"
      descricao="Tente novamente em instantes."
      acao={<Button onClick={reset}>Tentar novamente</Button>}
    />
  );
}
