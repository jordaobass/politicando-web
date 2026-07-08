import type { Metadata } from "next";
import { Suspense } from "react";

import { ResultadoView } from "@/components/quiz/resultado-view";
import { GradeSkeleton } from "@/components/comum/estados";

export const metadata: Metadata = {
  title: "Seu resultado",
  description: "Veja seu perfil político e a compatibilidade com os candidatos.",
};

export default function ResultadoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Seu resultado
        </h1>
        <p className="text-muted-foreground">
          Aqui está seu perfil político e os candidatos com maior afinidade.
        </p>
      </div>
      <Suspense fallback={<GradeSkeleton quantidade={1} />}>
        <ResultadoView />
      </Suspense>
    </div>
  );
}
