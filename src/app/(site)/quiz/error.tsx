"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { EstadoErro } from "@/components/comum/estados";

/** Error boundary do fluxo de quiz (rota crítica). */
export default function QuizError({
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
    <div className="mx-auto max-w-2xl px-4 py-16">
      <EstadoErro
        titulo="Algo deu errado no quiz"
        descricao="Tente recarregar. Se o problema persistir, volte mais tarde."
        acao={<Button onClick={reset}>Tentar novamente</Button>}
      />
    </div>
  );
}
