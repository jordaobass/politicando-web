import { Suspense } from "react";
import type { Metadata } from "next";

import { ListaCandidatos } from "@/components/candidatos/lista-candidatos";
import { GradeSkeleton } from "@/components/comum/estados";

export const metadata: Metadata = {
  title: "Candidatos",
  description:
    "Explore e compare candidatos brasileiros por cargo, UF, partido e nome.",
};

export default function CandidatosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* A lista lê os filtros da query string (useSearchParams), o que exige boundary de
          Suspense para a página continuar sendo pré-renderizada. */}
      <Suspense fallback={<GradeSkeleton />}>
        <ListaCandidatos />
      </Suspense>
    </div>
  );
}
