import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const BENEFICIOS = ["Só precisa de um e-mail", "Sem cartão de crédito", "Leva menos de 1 minuto"];

/** Chamada de cadastro ao final da home: texto à esquerda, botão à direita. */
export function AcoesRapidas() {
  return (
    <section id="acoes" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col gap-6 rounded-2xl bg-primary px-6 py-8 text-center text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:text-left">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold sm:text-3xl">Quer ver o resultado completo?</h3>
          <p className="max-w-2xl text-primary-foreground/85">
            Crie sua conta e desbloqueie o resultado completo do teste de compatibilidade e da
            comparação entre candidatos.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/90 sm:justify-start">
            {BENEFICIOS.map((beneficio) => (
              <li key={beneficio} className="inline-flex items-center gap-1.5">
                <CheckIcon className="size-4 text-accent" aria-hidden="true" />
                {beneficio}
              </li>
            ))}
          </ul>
        </div>
        <Button
          asChild
          className="h-12 shrink-0 rounded-xl bg-accent px-8 font-bold text-accent-foreground hover:bg-accent/90"
        >
          <Link href="/login">
            Destrave todas as funções
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
