"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsentimentoQuizProps {
  /** Chamado quando a pessoa marca a caixa e confirma. */
  aoConsentir: () => void;
}

/**
 * Aceite específico e destacado para o tratamento de opinião política, exigido
 * antes da 1ª pergunta de quem responde o quiz SEM login (LGPD, art. 11, I —
 * decisão E2 do DECISOES.md).
 *
 * Antes disto o quiz gravava respostas de opinião política de visitantes anônimos
 * sem nenhuma manifestação de consentimento; o banner de cookies não cobre dado
 * sensível, e o aceite do cadastro deixava justamente o fluxo anônimo descoberto.
 */
export function ConsentimentoQuiz({ aoConsentir }: ConsentimentoQuizProps) {
  const [marcado, setMarcado] = useState(false);

  return (
    <Card data-testid="consentimento-quiz">
      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <ShieldCheckIcon
            className="mt-0.5 size-5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Antes de começar: seu consentimento
            </h2>
            <p className="text-sm text-muted-foreground">
              Suas respostas ao quiz revelam opinião política, que a LGPD trata como
              dado pessoal sensível. Por isso precisamos do seu aceite específico
              antes da primeira pergunta — e só para calcular e mostrar o seu
              resultado de afinidade.
            </p>
          </div>
        </div>

        <label
          htmlFor="consentimento-opiniao-politica"
          className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm"
        >
          <input
            id="consentimento-opiniao-politica"
            type="checkbox"
            checked={marcado}
            onChange={(evento) => setMarcado(evento.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
          />
          <span className="text-muted-foreground">
            Consinto, de forma livre e informada, com o tratamento das minhas
            respostas ao questionário e do resultado de afinidade como dado pessoal
            sensível de opinião política, exclusivamente para viabilizar a
            funcionalidade da plataforma. Li o{" "}
            <Link
              href="/consentimento"
              className="font-medium text-accent underline underline-offset-4"
            >
              Termo de Consentimento
            </Link>{" "}
            e a{" "}
            <Link
              href="/privacidade"
              className="font-medium text-accent underline underline-offset-4"
            >
              Política de Privacidade
            </Link>
            .
          </span>
        </label>

        <Button
          className="h-12 w-full text-base"
          disabled={!marcado}
          onClick={aoConsentir}
          data-testid="consentimento-quiz-continuar"
        >
          Começar o quiz
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Sem esse aceite o quiz não é iniciado. Você pode revogá-lo depois pelos
          canais indicados no Termo de Consentimento.
        </p>
      </CardContent>
    </Card>
  );
}
