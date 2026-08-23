import type { Metadata } from "next";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import { CompararView } from "@/components/comparar/comparar-view";

export const metadata: Metadata = {
  title: "Comparar candidatos",
  description: "Compare dois candidatos lado a lado por categoria temática.",
};

export default async function CompararPage(props: {
  searchParams: Promise<{
    a?: string;
    b?: string;
    cargo?: string;
    ufA?: string;
    ufB?: string;
  }>;
}) {
  const { a, b, cargo, ufA, ufB } = await props.searchParams;
  const texto = (valor?: string) => (typeof valor === "string" ? valor : "");
  const aInicial = texto(a);
  const bInicial = texto(b);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <CabecalhoPagina
        titulo="Comparar candidatos"
        descricao="Escolha dois candidatos e veja a comparação dos scores por categoria temática."
      />
      <CompararView
        aInicial={aInicial}
        bInicial={bInicial}
        cargoInicial={texto(cargo)}
        ufAInicial={texto(ufA)}
        ufBInicial={texto(ufB)}
      />
    </div>
  );
}
