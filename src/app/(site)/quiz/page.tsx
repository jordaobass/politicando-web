import type { Metadata } from "next";

import { IniciarQuiz } from "@/components/quiz/iniciar-quiz";

export const metadata: Metadata = {
  title: "Quiz de afinidade",
  description:
    "Responda às perguntas e descubra seu perfil político e a compatibilidade com os candidatos.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Quiz de afinidade
        </h1>
        <p className="text-muted-foreground">
          Não há respostas certas ou erradas — diga apenas o quanto você
          concorda com cada afirmação.
        </p>
      </div>
      <IniciarQuiz />
    </div>
  );
}
