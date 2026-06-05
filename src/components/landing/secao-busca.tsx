import Link from "next/link";

import { BuscaCandidatos } from "@/components/landing/busca-candidatos";

/** Terceira seção da home: busca de candidatos estilo Google, grande e centralizada. */
export function SecaoBusca() {
  return (
    <section
      id="busca"
      className="scroll-mt-20 border-t border-border bg-secondary/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-3xl space-y-8 px-4 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Encontre seu candidato
          </h2>
          <p className="text-lg text-muted-foreground">
            Digite o nome e acesse o perfil completo.
          </p>
        </div>

        <BuscaCandidatos />

        <p className="text-sm text-muted-foreground">
          <Link
            href="/candidatos"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Veja a lista completa de candidatos
          </Link>
        </p>
      </div>
    </section>
  );
}
