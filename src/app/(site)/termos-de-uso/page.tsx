import type { Metadata } from "next";

import { DocumentoLegalPagina } from "@/components/legal/documento-legal";
import { TERMO_DE_USO } from "@/lib/legal/termo-de-uso";

export const metadata: Metadata = {
  title: TERMO_DE_USO.titulo,
  description: TERMO_DE_USO.descricao,
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermosDeUsoPage() {
  return <DocumentoLegalPagina documento={TERMO_DE_USO} />;
}
