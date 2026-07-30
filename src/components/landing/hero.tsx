import Link from "next/link";
import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DestaquesHome } from "@/components/landing/destaques-home";

const GARANTIAS = ["Gratuito", "Leva menos de 3 minutos", "Sem viés partidário"];

/** Hero em tela cheia: pergunta central + principais nomes + CTA grande para o quiz. */
export function Hero() {
  return (
    <section className="relative -mt-14 flex min-h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden border-b border-border bg-gradient-to-b from-secondary to-background px-4 pt-20 pb-16 text-center">
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
        Vote com base em{" "}
        <span className="text-accent">fatos</span>, não em{" "}
        <span className="text-destructive line-through decoration-2">promessas</span>.
      </h1>

      <p className="max-w-xl text-lg text-muted-foreground">
        <span className="font-bold text-primary">Politicando</span> te ajuda a descobrir seu{" "}
        <br className="sm:hidden" />
        <span className="font-bold text-primary">candidato ideal</span>
      </p>

      <DestaquesHome />

      <Button
        asChild
        className="h-16 rounded-xl bg-accent px-10 text-lg font-bold text-accent-foreground shadow-xl shadow-accent/30 transition-transform hover:scale-[1.03] hover:bg-accent/90"
      >
        <Link href="/quiz">
          Faça o teste agora
          <ArrowRightIcon className="size-5" aria-hidden="true" />
        </Link>
      </Button>

      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {GARANTIAS.map((item) => (
          <li key={item} className="inline-flex items-center gap-1.5">
            <CheckIcon className="size-4 text-accent" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#comparacao"
        className="absolute bottom-5 flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Ver mais opções abaixo"
      >
        veja mais
        <ChevronDownIcon className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
