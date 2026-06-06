"use client";

import Link from "next/link";
import { LockIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Gate de bloco fechado para quem não está logado (cartões US-DEP-03 / US-SEN-03).
 * Não exibe nenhum conteúdo do bloco — só o título e os CTAs de acesso.
 */
export function BlocoBloqueado({ titulo }: { titulo: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{titulo}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
        <LockIcon className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="max-w-sm text-sm text-muted-foreground">
          Crie sua conta gratuita para desbloquear esta informação do candidato.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/login?aba=registrar">Desbloquear informações</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Já tenho conta</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
