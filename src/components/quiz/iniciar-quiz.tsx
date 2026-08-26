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
import { ConsentimentoQuiz } from "@/components/quiz/consentimento-quiz";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { useSessao } from "@/hooks/use-sessao";
import { useArmazenamento, useHidratado } from "@/hooks/use-storage";
import { useMeuUltimoQuiz } from "@/hooks/use-api";
import {
  CHAVE_CONSENTIMENTO_QUIZ,
  VERSAO_DOCUMENTOS_LEGAIS,
} from "@/lib/constantes";

/**
 * Porta de entrada do quiz. Duas guardas antes da 1ª pergunta:
 *
 *  1. Visitante SEM login: aceite específico do tratamento de opinião política
 *     (LGPD art. 11 — Correções v6, item 5). Guarda a VERSÃO aceita: quando o texto
 *     legal muda, o aceite é pedido de novo.
 *  2. Usuário AUTENTICADO que já tem resultado salvo: aviso de que refazer sobrescreve
 *     o resultado anterior (item #7 do card de correções). Quem tem conta já consentiu
 *     no cadastro, então não vê a guarda 1.
 */
export function IniciarQuiz() {
  const router = useRouter();
  const { sessao, autenticado } = useSessao();
  const { data: ultimo, isLoading } = useMeuUltimoQuiz(sessao?.token ?? null);
  const [confirmado, setConfirmado] = useState(false);
  const hidratado = useHidratado();
  const [versaoConsentida, gravarConsentimento] = useArmazenamento(
    "local",
    CHAVE_CONSENTIMENTO_QUIZ,
  );

  // Espera o "meu último quiz" carregar (logado) para não piscar o quiz antes do aviso.
  if (autenticado && isLoading) {
    return <GradeSkeleton quantidade={1} />;
  }

  // Sem hidratar não dá para saber o que há no localStorage — e mostrar o quiz nesse
  // intervalo deixaria o visitante começar a responder antes do aceite.
  if (!autenticado && !hidratado) {
    return <GradeSkeleton quantidade={1} />;
  }

  const consentiu = versaoConsentida === VERSAO_DOCUMENTOS_LEGAIS;

  if (!autenticado && !consentiu) {
    return (
      <ConsentimentoQuiz
        aoConsentir={() => gravarConsentimento(VERSAO_DOCUMENTOS_LEGAIS)}
      />
    );
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
