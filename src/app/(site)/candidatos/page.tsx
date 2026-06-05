import type { Metadata } from "next";

import { ListaCandidatos } from "@/components/candidatos/lista-candidatos";

export const metadata: Metadata = {
  title: "Candidatos",
  description:
    "Explore e compare candidatos brasileiros por cargo, UF, partido e nome.",
};

export default function CandidatosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <ListaCandidatos />
    </div>
  );
}
