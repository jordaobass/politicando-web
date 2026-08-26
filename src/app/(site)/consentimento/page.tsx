import type { Metadata } from "next";

import { DocumentoLegalPagina } from "@/components/legal/documento-legal";
import { TERMO_CONSENTIMENTO } from "@/lib/legal/termo-consentimento";

export const metadata: Metadata = {
  title: TERMO_CONSENTIMENTO.titulo,
  description: TERMO_CONSENTIMENTO.descricao,
  alternates: { canonical: "/consentimento" },
};

export default function ConsentimentoPage() {
  return <DocumentoLegalPagina documento={TERMO_CONSENTIMENTO} />;
}
