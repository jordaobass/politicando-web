"use client";

import Link from "next/link";
import { FileTextIcon, LockIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MensagemSemDados } from "@/components/comum/bloco-sem-dados";
import { TextoRico } from "@/components/comum/texto-rico";
import { useSessao } from "@/hooks/use-sessao";
import type { PlanoGoverno } from "@/lib/types";

/**
 * Bloco "Plano de governo por tema" (US-PRES-05 / US-GOV-05), compartilhado pelos perfis de
 * Presidente e Governador. O conteúdo é gated por login (decisão E4 do DECISOES.md): sem sessão
 * o eleitor vê o convite para criar conta, não os trechos do plano.
 *
 * O ano exibido é o do pleito em disputa — o backend só devolve o plano da eleição da
 * candidatura, então aqui não há risco de rotular material antigo como proposta atual.
 */
export function PlanoGovernoBloco({
  plano,
  className,
}: {
  plano?: PlanoGoverno | null;
  className?: string;
}) {
  const { autenticado } = useSessao();

  return (
    <Card data-testid="bloco-plano-governo" className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileTextIcon className="size-4 text-primary" aria-hidden="true" />
          Plano de governo por tema
          {plano?.ano ? ` (${plano.ano})` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!autenticado ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <LockIcon className="size-7 text-muted-foreground" aria-hidden="true" />
            <p className="max-w-sm text-sm text-muted-foreground">
              Crie sua conta para ver o plano de governo completo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/login?aba=registrar">Criar conta grátis</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Fazer login</Link>
              </Button>
            </div>
          </div>
        ) : !plano ? (
          /* Bloco nunca some: sem plano do pleito, vale a mensagem padrão (Correções v7, item 4). */
          <MensagemSemDados />
        ) : (
          <ul className="space-y-4">
            {plano.temas.map((t) => (
              <li key={t.eixo} className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{t.eixoNome}</p>
                {t.resumo ? (
                  <TextoRico texto={t.resumo} className="text-sm text-muted-foreground" />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Proposta para este tema não consta no plano de governo.
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
