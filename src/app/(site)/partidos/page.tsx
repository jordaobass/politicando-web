import type { Metadata } from "next";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import { GradePartidos } from "@/components/partidos/grade-partidos";

export const metadata: Metadata = {
  title: "Partidos",
  description: "Conheça os partidos políticos disponíveis na plataforma.",
};

export default function PartidosPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <CabecalhoPagina
        titulo="Partidos"
        descricao="Os partidos políticos registrados e seus números de legenda."
      />
      <GradePartidos />
    </div>
  );
}
