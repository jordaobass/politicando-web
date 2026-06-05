import type { Metadata } from "next";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import { CardsMetricas } from "@/components/admin/cards-metricas";

export const metadata: Metadata = {
  title: "Dashboard administrativo",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <CabecalhoPagina
        titulo="Dashboard"
        descricao="Visão geral da plataforma: candidatos, quizzes, scores e usuários."
      />
      <CardsMetricas />
    </div>
  );
}
