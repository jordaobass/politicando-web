import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import { DetalheCandidato } from "@/components/candidatos/detalhe-candidato";
import { Button } from "@/components/ui/button";

export default async function CandidatoPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ de?: string }>;
}) {
  const { id } = await props.params;
  const { de } = await props.searchParams;
  // "de" carrega a origem quando o perfil é aberto a partir da comparação (só aceita rota interna).
  const voltarComparacao = typeof de === "string" && de.startsWith("/comparar") ? de : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <Button asChild variant="ghost" size="sm" className="px-0">
        <Link href={voltarComparacao ?? "/candidatos"}>
          <ChevronLeftIcon className="size-4" aria-hidden="true" />
          {voltarComparacao ? "Voltar para comparação" : "Voltar para candidatos"}
        </Link>
      </Button>
      <DetalheCandidato id={id} />
    </div>
  );
}
