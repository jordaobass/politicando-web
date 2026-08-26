import type { Metadata } from "next";

import { DocumentoLegalPagina } from "@/components/legal/documento-legal";
import { POLITICA_COOKIES } from "@/lib/legal/politica-cookies";

export const metadata: Metadata = {
  title: POLITICA_COOKIES.titulo,
  description: POLITICA_COOKIES.descricao,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <DocumentoLegalPagina documento={POLITICA_COOKIES} />;
}
