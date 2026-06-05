import type { Metadata } from "next";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import { PainelPerfil } from "@/components/perfil/painel-perfil";

export const metadata: Metadata = {
  title: "Meu perfil",
  description: "Seus dados e comparações salvas.",
};

export default function PerfilPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <CabecalhoPagina
        titulo="Meu perfil"
        descricao="Gerencie seus dados e acompanhe suas comparações."
      />
      <PainelPerfil />
    </div>
  );
}
