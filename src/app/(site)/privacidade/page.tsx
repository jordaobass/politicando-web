import type { Metadata } from "next";

import { DocumentoLegalPagina } from "@/components/legal/documento-legal";
import { POLITICA_PRIVACIDADE } from "@/lib/legal/politica-privacidade";

export const metadata: Metadata = {
  title: POLITICA_PRIVACIDADE.titulo,
  description: POLITICA_PRIVACIDADE.descricao,
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return <DocumentoLegalPagina documento={POLITICA_PRIVACIDADE} />;
}
