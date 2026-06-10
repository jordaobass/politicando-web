"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EstadoVazio } from "@/components/comum/estados";
import { useMeuUltimoQuiz } from "@/hooks/use-api";
import { useArmazenamento } from "@/hooks/use-storage";
import { CHAVE_RESULTADO_QUIZ } from "@/lib/constantes";

/** Bloco "Meu último quiz": data do último quiz + Ver resultado, ou estado vazio. */
export function UltimoQuiz({ token }: { token: string }) {
  const router = useRouter();
  const { data, isLoading } = useMeuUltimoQuiz(token);
  const [, gravarResultado] = useArmazenamento("session", CHAVE_RESULTADO_QUIZ);

  function verResultado() {
    if (!data) return;
    // Reusa a tela de resultado (lê de sessionStorage) com o último resultado do servidor.
    gravarResultado(JSON.stringify(data.resultado));
    router.push("/quiz/resultado");
  }

  return (
    <Card data-testid="perfil-ultimo-quiz">
      <CardHeader>
        <CardTitle className="text-lg">Meu último quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-16 w-full rounded-lg" />
        ) : !data ? (
          <EstadoVazio
            titulo="Você ainda não fez o quiz"
            descricao="Responda ao quiz para descobrir seus candidatos mais compatíveis."
            acao={
              <Button asChild>
                <Link href="/quiz">Fazer o quiz agora</Link>
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Realizado em{" "}
              <span className="font-medium text-foreground">
                {new Date(data.finalizadoEm).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
            </p>
            <Button onClick={verResultado} data-testid="perfil-ver-resultado">
              Ver resultado
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
