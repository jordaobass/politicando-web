"use client";

import Link from "next/link";
import { LockIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompatibilidadeCandidato } from "@/hooks/use-resultado-quiz";
import { useSessao } from "@/hooks/use-sessao";
import {
  classeBarraNivel,
  classesBadgeNivel,
  formatarPercentual,
  paraEscala100,
} from "@/lib/format";

interface Props {
  candidaturaId: string;
  nomeUrna: string;
}

/**
 * Bloco de match (cartões US-DEP-02 / US-SEN-02), em 3 estados:
 *  1. fez o quiz → percentual real + "Ver detalhes" (verde);
 *  2. logado sem quiz → incentivo + "Fazer o teste" (azul);
 *  3. não logado → valor ofuscado + "Fazer o quiz" (azul).
 */
export function CardCompatibilidade({ candidaturaId, nomeUrna }: Props) {
  const { carregado, candidato } = useCompatibilidadeCandidato(candidaturaId);
  const { autenticado } = useSessao();

  // Pré-hidratação: não decide o estado para evitar flicker.
  if (!carregado) {
    return (
      <Card>
        <CardContent>
          <div className="h-24 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    );
  }

  // Estado 1 — fez o quiz: percentual real + nível.
  if (candidato) {
    const escala = paraEscala100(candidato.compatibilidade);
    return (
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-accent tabular-nums">
                  {formatarPercentual(candidato.compatibilidade)}
                </span>
                <Badge variant="outline" className={classesBadgeNivel(candidato.nivel)}>
                  {candidato.nivel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                compatível com você · Baseado nas suas respostas do quiz
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/quiz/resultado">Ver detalhes</Link>
            </Button>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${classeBarraNivel(candidato.nivel)}`}
              style={{ width: `${escala}%` }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Estado 2 — logado, sem quiz: incentivo a fazer o teste.
  if (autenticado) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-foreground">Descubra sua compatibilidade</p>
            <p className="text-sm text-muted-foreground">
              Quiz gratuito em menos de 3 minutos, sem viés partidário.
            </p>
          </div>
          <Button asChild className="bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90">
            <Link href="/quiz">Fazer o teste</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Estado 3 — não logado: valor ofuscado (blur) + CTA "Fazer o quiz".
  return (
    <Card>
      <CardContent className="flex flex-col items-stretch gap-2 p-2 sm:flex-row">
        <div className="relative flex-1 overflow-hidden rounded-md border border-dashed border-border bg-muted/30 px-4 py-2">
          <div aria-hidden className="flex select-none items-center gap-3 blur-md">
            <span className="text-2xl font-bold text-primary tabular-nums">78%</span>
            <Badge variant="outline" className="border-chart-1/30 bg-chart-1/15 text-chart-1">
              Boa
            </Badge>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span className="block h-full w-3/4 rounded-full bg-chart-1" />
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/55 px-3 text-center backdrop-blur-[2px]">
            <LockIcon className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground">
              Descubra sua compatibilidade com {nomeUrna}
            </p>
          </div>
        </div>
        <Button
          asChild
          className="h-auto bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/quiz">Fazer o quiz</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
