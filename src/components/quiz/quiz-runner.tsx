"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeftIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GradeSkeleton, EstadoErro } from "@/components/comum/estados";
import { usePerguntas, useEnviarRespostas } from "@/hooks/use-api";
import {
  CHAVE_RESULTADO_QUIZ,
  ESCALA_RESPOSTAS,
} from "@/lib/constantes";
import type { RespostaQuiz } from "@/lib/types";

/** Conduz o fluxo de perguntas do quiz, uma a uma, e envia as respostas. */
export function QuizRunner() {
  const router = useRouter();
  const { data: perguntas, isLoading, isError, refetch } = usePerguntas();
  const enviar = useEnviarRespostas();

  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Map<string, number>>(new Map());
  // Perguntas que o eleitor marcou como "especialmente importantes" (dobram o peso).
  const [importantes, setImportantes] = useState<Set<string>>(new Set());

  const ordenadas = useMemo(
    () => [...(perguntas ?? [])].sort((a, b) => a.ordem - b.ordem),
    [perguntas],
  );

  if (isLoading) {
    return <GradeSkeleton quantidade={1} />;
  }

  if (isError || ordenadas.length === 0) {
    return (
      <EstadoErro
        titulo="Não foi possível carregar o quiz"
        descricao="Verifique se a API está disponível e tente novamente."
        acao={
          <Button onClick={() => refetch()} variant="outline">
            Tentar de novo
          </Button>
        }
      />
    );
  }

  const total = ordenadas.length;
  const atual = ordenadas[indice];
  const progresso = Math.round((indice / total) * 100);
  const ultima = indice === total - 1;

  function registrar(valor: number | null) {
    const novas = new Map(respostas);
    if (valor === null) {
      novas.delete(atual.id);
    } else {
      novas.set(atual.id, valor);
    }
    setRespostas(novas);

    if (ultima) {
      finalizar(novas);
    } else {
      setIndice((i) => i + 1);
    }
  }

  function alternarImportante(perguntaId: string) {
    setImportantes((anterior) => {
      const proximo = new Set(anterior);
      if (proximo.has(perguntaId)) proximo.delete(perguntaId);
      else proximo.add(perguntaId);
      return proximo;
    });
  }

  async function finalizar(mapa: Map<string, number>) {
    const corpo: RespostaQuiz[] = Array.from(mapa.entries()).map(
      ([perguntaId, valor]) => ({
        perguntaId,
        valor,
        importante: importantes.has(perguntaId),
      }),
    );

    try {
      const resultado = await enviar.mutateAsync({
        sessaoId: null,
        respostas: corpo,
      });
      sessionStorage.setItem(CHAVE_RESULTADO_QUIZ, JSON.stringify(resultado));
      router.push("/quiz/resultado");
    } catch {
      toast.error("Não conseguimos calcular seu resultado. Tente novamente.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Pergunta {indice + 1} de {total}
          </span>
          <span className="tabular-nums">{progresso}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Badge variant="secondary">{atual.categoria}</Badge>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              {atual.texto}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => alternarImportante(atual.id)}
            aria-pressed={importantes.has(atual.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
              importantes.has(atual.id)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            <StarIcon
              className={cn("size-4", importantes.has(atual.id) && "fill-current")}
              aria-hidden="true"
            />
            Esta pauta é especialmente importante pra mim
          </button>

          <fieldset className="space-y-2">
            <legend className="sr-only">Escala de concordância</legend>
            {ESCALA_RESPOSTAS.map((opcao) => (
              <Button
                key={opcao.valor}
                variant={
                  respostas.get(atual.id) === opcao.valor
                    ? "default"
                    : "outline"
                }
                className="h-auto w-full justify-start py-3 text-left"
                onClick={() => registrar(opcao.valor)}
                disabled={enviar.isPending}
              >
                {opcao.rotulo}
              </Button>
            ))}
          </fieldset>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setIndice((i) => Math.max(0, i - 1))}
          disabled={indice === 0 || enviar.isPending}
        >
          <ChevronLeftIcon className="size-4" aria-hidden="true" />
          Voltar
        </Button>
        <Button
          variant="link"
          onClick={() => registrar(null)}
          disabled={enviar.isPending}
        >
          {ultima ? "Pular e finalizar" : "Pular esta pergunta"}
        </Button>
      </div>

      {enviar.isPending && (
        <p className="text-center text-sm text-muted-foreground">
          Calculando seu resultado…
        </p>
      )}
    </div>
  );
}
