"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  // O backend já entrega as perguntas AGRUPADAS por categoria (ordena por Categoria.Ordem);
  // preservamos essa ordem em vez de reordenar por "ordem" global (Correções v3, item 5).
  const ordenadas = useMemo(() => perguntas ?? [], [perguntas]);

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

  function registrar(valor: number) {
    const novas = new Map(respostas);
    novas.set(atual.id, valor);
    setRespostas(novas);

    if (ultima) {
      finalizar(novas);
    } else {
      setIndice((i) => i + 1);
    }
  }

  async function finalizar(mapa: Map<string, number>) {
    const corpo: RespostaQuiz[] = Array.from(mapa.entries()).map(
      ([perguntaId, valor]) => ({ perguntaId, valor }),
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
      </div>

      {enviar.isPending && (
        <p className="text-center text-sm text-muted-foreground">
          Calculando seu resultado…
        </p>
      )}
    </div>
  );
}
