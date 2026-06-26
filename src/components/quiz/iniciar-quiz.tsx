"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GradeSkeleton } from "@/components/comum/estados";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { useSessao } from "@/hooks/use-sessao";
import { useMeuUltimoQuiz } from "@/hooks/use-api";

/**
 * Porta de entrada do quiz (item #7 do card de correções). Para o usuário AUTENTICADO que já
 * tem um resultado salvo, exibe um aviso antes da 1ª pergunta avisando que refazer vai
 * sobrescrever o resultado anterior (Continuar / Cancelar). Visitante e quem nunca fez o quiz
 * entram direto.
 */
export function IniciarQuiz() {
  const router = useRouter();
  const { sessao, autenticado } = useSessao();
  const { data: ultimo, isLoading } = useMeuUltimoQuiz(sessao?.token ?? null);
  const [confirmado, setConfirmado] = useState(false);

  // Espera o "meu último quiz" carregar (logado) para não piscar o quiz antes do aviso.
  if (autenticado && isLoading) {
    return <GradeSkeleton quantidade={1} />;
  }

  const precisaConfirmar = autenticado && Boolean(ultimo) && !confirmado;

  if (precisaConfirmar) {
    // Fechar (Cancelar, ESC ou clique fora) volta para a tela anterior, sem iniciar o quiz.
    return (
      <Dialog open onOpenChange={(aberto) => !aberto && router.back()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Refazer o quiz?</DialogTitle>
            <DialogDescription>
              Você já tem um resultado salvo. Refazer o quiz vai substituir o resultado anterior
              por um novo ao final.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={() => setConfirmado(true)}>Continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <QuizRunner />;
}
