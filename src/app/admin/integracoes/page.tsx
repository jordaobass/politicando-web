import type { Metadata } from "next";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import { TabelaIntegracoes } from "@/components/admin/tabela-integracoes";
import { BotaoRecalcular } from "@/components/admin/botao-recalcular";

export const metadata: Metadata = {
  title: "Integrações",
};

export default function AdminIntegracoesPage() {
  return (
    <div className="space-y-8">
      <CabecalhoPagina
        titulo="Integrações"
        descricao="Status das fontes de dados e ações de processamento."
        acao={<BotaoRecalcular />}
      />
      <TabelaIntegracoes />
    </div>
  );
}
