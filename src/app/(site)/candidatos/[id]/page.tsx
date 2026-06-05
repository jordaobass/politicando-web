import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import { DetalheCandidato } from "@/components/candidatos/detalhe-candidato";
import { Button } from "@/components/ui/button";

export default async function CandidatoPage(
  props: PageProps<"/candidatos/[id]">,
) {
  const { id } = await props.params;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <Button asChild variant="ghost" size="sm" className="px-0">
        <Link href="/candidatos">
          <ChevronLeftIcon className="size-4" aria-hidden="true" />
          Voltar para candidatos
        </Link>
      </Button>
      <DetalheCandidato id={id} />
    </div>
  );
}
