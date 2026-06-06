"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ConteudoAutenticacao } from "@/components/auth/conteudo-autenticacao";

/** Card de autenticação (página de login): envolve o conteúdo de auth com animação de entrada. */
export function CardAutenticacao({ abaInicial }: { abaInicial?: "login" | "registrar" }) {
  return (
    <Card className="animate-in fade-in zoom-in-95 slide-in-from-bottom-3 overflow-hidden border-border/70 shadow-xl duration-500">
      <CardContent className="p-6 sm:p-8">
        <ConteudoAutenticacao abaInicial={abaInicial} />
      </CardContent>
    </Card>
  );
}
