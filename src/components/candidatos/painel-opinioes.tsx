"use client";

import { useMemo, useState } from "react";
import { CheckIcon, MinusIcon, XIcon, HelpCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  CategoriaOpiniao,
  FonteOpiniao,
  OpiniaoCandidato,
  RespostaOpiniao,
} from "@/lib/types";

interface PainelOpinioesProps {
  categorias: CategoriaOpiniao[];
  nomeUrna: string;
}

/**
 * Aba "Opiniões" — replica o estilo da página /policies do brasil.vota:
 * sidebar de categorias (com contagem) à esquerda; à direita, as perguntas
 * da categoria selecionada com a posição do candidato + badge de fonte.
 */
export function PainelOpinioes({ categorias, nomeUrna }: PainelOpinioesProps) {
  // Só categorias com pelo menos uma pergunta cadastrada.
  const visiveis = useMemo(() => categorias.filter((c) => c.perguntas.length > 0), [categorias]);
  const [slugAtivo, setSlugAtivo] = useState<string>(() => visiveis[0]?.slug ?? "");
  const ativa = visiveis.find((c) => c.slug === slugAtivo) ?? visiveis[0];

  if (visiveis.length === 0) {
    return (
      <p className="px-1 py-8 text-center text-sm text-muted-foreground">
        Ainda não há opiniões cadastradas para este candidato.
      </p>
    );
  }

  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]">
      <Sidebar categorias={visiveis} slugAtivo={ativa.slug} onSelecionar={setSlugAtivo} />
      <ListaOpinioes categoria={ativa} nomeUrna={nomeUrna} />
    </div>
  );
}

function Sidebar({
  categorias,
  slugAtivo,
  onSelecionar,
}: {
  categorias: CategoriaOpiniao[];
  slugAtivo: string;
  onSelecionar: (slug: string) => void;
}) {
  return (
    <nav aria-label="Categorias de opiniões" className="min-w-0">
      <ul className="flex gap-1 overflow-x-auto pb-2 sm:flex-col sm:overflow-x-visible sm:pb-0">
        {categorias.map((cat) => {
          const respondidas = cat.perguntas.filter((p) => p.resposta !== "Desconhecida").length;
          const ativo = cat.slug === slugAtivo;
          return (
            <li key={cat.slug} className="shrink-0 sm:shrink">
              <button
                type="button"
                onClick={() => onSelecionar(cat.slug)}
                aria-pressed={ativo}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                  ativo
                    ? "bg-primary/10 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <span className="truncate">{cat.categoria}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-1.5 text-xs font-semibold tabular-nums",
                    ativo ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
                  )}
                  title={`${respondidas} de ${cat.perguntas.length} com posição registrada`}
                >
                  {cat.perguntas.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ListaOpinioes({
  categoria,
  nomeUrna,
}: {
  categoria: CategoriaOpiniao;
  nomeUrna: string;
}) {
  return (
    <section className="min-w-0 space-y-4">
      <header className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl font-semibold text-foreground">{categoria.categoria}</h3>
        <span className="text-xs text-muted-foreground">
          {categoria.perguntas.length} pergunta{categoria.perguntas.length === 1 ? "" : "s"}
        </span>
      </header>

      {/* Largura cheia: perguntas fluem em colunas (1 no mobile, 2 a partir de md). */}
      <ul className="grid gap-3 md:grid-cols-2 [&>li]:h-full">
        {categoria.perguntas.map((opiniao) => (
          <li key={opiniao.perguntaId}>
            <CartaoOpiniao opiniao={opiniao} nomeUrna={nomeUrna} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CartaoOpiniao({
  opiniao,
  nomeUrna,
}: {
  opiniao: OpiniaoCandidato;
  nomeUrna: string;
}) {
  const visual = visualResposta(opiniao.resposta);
  return (
    <article className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-foreground">{opiniao.texto}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn("gap-1", visual.classes)}>
          {visual.icone}
          {visual.rotulo}
        </Badge>
        <Badge variant="secondary" className="text-xs font-normal">
          Fonte: {rotuloFonte(opiniao.fonte, nomeUrna)}
        </Badge>
      </div>
      {opiniao.justificativa && (
        <p className="text-sm text-muted-foreground">{opiniao.justificativa}</p>
      )}
    </article>
  );
}

/** Visual de cada resposta — ícone + rótulo + cor (mesma escala dos níveis). */
function visualResposta(resposta: RespostaOpiniao): {
  rotulo: string;
  icone: React.ReactNode;
  classes: string;
} {
  switch (resposta) {
    case "Favoravel":
      return {
        rotulo: "Favorável",
        icone: <CheckIcon className="size-3.5" aria-hidden="true" />,
        classes: "border-chart-2/30 bg-chart-2/15 text-chart-2",
      };
    case "Contrario":
      return {
        rotulo: "Contrário",
        icone: <XIcon className="size-3.5" aria-hidden="true" />,
        classes: "border-chart-4/30 bg-chart-4/15 text-chart-4",
      };
    case "Neutro":
      return {
        rotulo: "Neutro",
        icone: <MinusIcon className="size-3.5" aria-hidden="true" />,
        classes: "border-chart-3/30 bg-chart-3/15 text-chart-3",
      };
    default:
      return {
        rotulo: "Sem posição declarada",
        icone: <HelpCircleIcon className="size-3.5" aria-hidden="true" />,
        classes: "text-muted-foreground",
      };
  }
}

function rotuloFonte(fonte: FonteOpiniao, nomeUrna: string): string {
  switch (fonte) {
    case "AtividadeLegislativa":
      return "Votações e projetos";
    case "Partido":
      return "Posição do partido";
    case "Ia":
      return "Inferida por IA";
    default:
      return `Curadoria — ${nomeUrna}`;
  }
}
