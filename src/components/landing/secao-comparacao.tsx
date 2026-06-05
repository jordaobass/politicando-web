import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, TrophyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RadarComparacao } from "@/components/landing/radar-comparacao";

const CATEGORIAS = ["Economia", "Saúde", "Educação", "Segurança", "Meio Amb.", "Dir. Hum."];

interface CandidatoFicticio {
  nome: string;
  partido: string;
  foto: string;
  cor: string;
  destaques: string[];
  valores: number[];
}

const CANDIDATO_A: CandidatoFicticio = {
  nome: "Marina Costa",
  partido: "Partido Renovação",
  foto: "/comparacao/cand-a.png",
  cor: "#2563eb",
  destaques: ["Meio ambiente", "Saúde pública", "Educação"],
  valores: [32, 84, 78, 44, 90, 82],
};

const CANDIDATO_B: CandidatoFicticio = {
  nome: "Eduardo Lemos",
  partido: "Aliança Liberal",
  foto: "/comparacao/cand-b.png",
  cor: "#ea580c",
  destaques: ["Economia", "Segurança", "Livre mercado"],
  valores: [84, 48, 54, 88, 34, 40],
};

/**
 * Seção colorida que demonstra a comparação entre candidatos: duas fichas
 * fictícias com seu "status" e um gráfico estrela com as posições sobrepostas.
 */
export function SecaoComparacao() {
  return (
    <section
      id="comparacao"
      className="scroll-mt-20 border-t border-border bg-gradient-to-br from-primary/5 via-secondary to-accent/5 py-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl space-y-2 text-center">
          <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Antes de votar, compare
          </h2>
          <p className="text-muted-foreground">
            Analise o perfil de cada candidato por tema e descubra com quem você se identifica de
            verdade.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 items-start gap-4 lg:mt-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
          <FichaCandidato candidato={CANDIDATO_A} />

          {/* Gráfico estrela com as duas posições sobrepostas (no mobile vai abaixo, full width) */}
          <div className="order-last col-span-2 flex flex-col items-center gap-3 rounded-3xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur lg:order-none lg:col-span-1 lg:gap-4 lg:p-5">
            <RadarComparacao
              categorias={CATEGORIAS}
              series={[
                { nome: CANDIDATO_A.nome, cor: CANDIDATO_A.cor, valores: CANDIDATO_A.valores },
                { nome: CANDIDATO_B.nome, cor: CANDIDATO_B.cor, valores: CANDIDATO_B.valores },
              ]}
            />
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
              {[CANDIDATO_A, CANDIDATO_B].map((c) => (
                <span key={c.nome} className="inline-flex items-center gap-1.5">
                  <span className="size-3 rounded-full" style={{ backgroundColor: c.cor }} />
                  {c.nome}
                </span>
              ))}
            </div>
          </div>

          <FichaCandidato candidato={CANDIDATO_B} />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            asChild
            className="h-14 rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] hover:bg-primary/90"
          >
            <Link href="/comparar">
              Comparar candidatos reais
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Ficha de um candidato: foto com borda colorida, partido, espectro e destaques. */
function FichaCandidato({ candidato }: { candidato: CandidatoFicticio }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-3xl border-t-4 border-border bg-card p-4 text-center shadow-sm lg:gap-4 lg:p-6"
      style={{ borderTopColor: candidato.cor }}
    >
      <div
        className="relative size-20 shrink-0 overflow-hidden rounded-2xl border-4 lg:size-28"
        style={{ borderColor: candidato.cor }}
      >
        <Image src={candidato.foto} alt={candidato.nome} fill className="object-cover" unoptimized />
      </div>

      <div className="space-y-1.5">
        <p className="text-base font-bold text-balance text-foreground lg:text-xl">{candidato.nome}</p>
        <span
          className="inline-block rounded-full px-2.5 py-1 text-xs font-semibold lg:px-3 lg:text-sm"
          style={{ backgroundColor: `${candidato.cor}1a`, color: candidato.cor }}
        >
          {candidato.partido}
        </span>
      </div>

      <div className="w-full space-y-2 text-left">
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <TrophyIcon className="size-3.5" aria-hidden="true" />
          Mais forte em
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {candidato.destaques.map((destaque) => (
            <li
              key={destaque}
              className={cn("rounded-lg px-2.5 py-1 text-xs font-medium text-foreground")}
              style={{ backgroundColor: `${candidato.cor}14` }}
            >
              {destaque}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
