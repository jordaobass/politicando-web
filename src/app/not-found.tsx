import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Página 404 global. */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold text-foreground">
        Página não encontrada
      </h1>
      <p className="max-w-md text-muted-foreground">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Button asChild>
        <Link href="/">Voltar para o início</Link>
      </Button>
    </div>
  );
}
