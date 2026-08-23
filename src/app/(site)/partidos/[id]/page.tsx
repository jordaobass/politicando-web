import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import { DetalhePartido } from "@/components/partidos/detalhe-partido";
import { Button } from "@/components/ui/button";

export default async function PartidoPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <Button asChild variant="ghost" size="sm" className="px-0">
        <Link href="/partidos">
          <ChevronLeftIcon className="size-4" aria-hidden="true" />
          Voltar para partidos
        </Link>
      </Button>
      {/* A seção de candidatos lê cargo/página da query string (useSearchParams). */}
      <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
        <DetalhePartido id={id} />
      </Suspense>
    </div>
  );
}
