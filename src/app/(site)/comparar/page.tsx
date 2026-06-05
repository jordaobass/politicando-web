import type { Metadata } from "next";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import { CompararView } from "@/components/comparar/comparar-view";

export const metadata: Metadata = {
  title: "Comparar candidatos",
  description: "Compare dois candidatos lado a lado por categoria temática.",
};

export default async function CompararPage(props: {
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const { a, b } = await props.searchParams;
  const aInicial = typeof a === "string" ? a : "";
  const bInicial = typeof b === "string" ? b : "";

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <CabecalhoPagina
        titulo="Comparar candidatos"
        descricao="Escolha dois candidatos e veja a comparação dos scores por categoria temática."
      />
      <CompararView aInicial={aInicial} bInicial={bInicial} />
    </div>
  );
}
