"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, LockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CORES_COMPARACAO } from "@/components/comparar/comparacao-radar";
import type { CandidaturaDetalhe, ScoreCategoria } from "@/lib/types";

/** Eixo institucional não entra no comparativo (spec lista 8 temas). */
const EIXO_FORA = "Instituições e Democracia";
/** Quantos temas o usuário não autenticado vê antes do gate (spec US-COMP-02). */
const TEMAS_LIVRES = 3;

/**
 * Comparação por tema (US-COMP-02): cards colapsados por padrão, cada um com a barra de score
 * (0–5) dos dois candidatos (A azul, B laranja) e o valor; ao expandir, mostra a justificativa de
 * cada candidato. Sem login, só os 3 primeiros temas ficam visíveis; o resto entra em blur + gate.
 */
export function ComparacaoCategorias({
  a,
  b,
  autenticado,
}: {
  a: CandidaturaDetalhe;
  b: CandidaturaDetalhe;
  autenticado: boolean;
}) {
  const categorias = categoriasComparaveis(a, b);
  const mapaA = new Map(a.scores.map((s) => [s.categoria, s]));
  const mapaB = new Map(b.scores.map((s) => [s.categoria, s]));

  if (categorias.length === 0) return null;

  return (
    <section className="space-y-3" data-testid="comparacao-temas">
      <h2 className="text-lg font-semibold text-foreground">Comparação por tema</h2>
      <ul className="space-y-3">
        {categorias.map((cat, i) => (
          <li key={cat}>
            <CardTema
              categoria={cat}
              a={{ nome: a.politico.nomeUrna, score: mapaA.get(cat) }}
              b={{ nome: b.politico.nomeUrna, score: mapaB.get(cat) }}
              bloqueado={!autenticado && i >= TEMAS_LIVRES}
            />
          </li>
        ))}
      </ul>

      {!autenticado && categorias.length > TEMAS_LIVRES && <GateTemas />}
    </section>
  );
}

function CardTema({
  categoria,
  a,
  b,
  bloqueado,
}: {
  categoria: string;
  a: { nome: string; score?: ScoreCategoria };
  b: { nome: string; score?: ScoreCategoria };
  bloqueado: boolean;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card",
        bloqueado && "pointer-events-none select-none blur-sm",
      )}
      aria-hidden={bloqueado}
    >
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        disabled={bloqueado}
        aria-expanded={aberto}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span className="w-32 shrink-0 font-semibold text-foreground sm:w-40">{categoria}</span>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <BarraTema cor={CORES_COMPARACAO.a} valor={a.score?.engajamento} />
          <BarraTema cor={CORES_COMPARACAO.b} valor={b.score?.engajamento} />
        </div>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            aberto && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {aberto && (
        <div className="grid gap-5 border-t border-border p-4 sm:grid-cols-2">
          <LadoJustificativa nome={a.nome} cor={CORES_COMPARACAO.a} score={a.score} />
          <LadoJustificativa nome={b.nome} cor={CORES_COMPARACAO.b} score={b.score} />
        </div>
      )}
    </div>
  );
}

/** Barra horizontal de score 0–5 com o valor numérico ao lado, na cor do candidato. */
function BarraTema({ cor, valor }: { cor: string; valor?: number | null }) {
  const v = valor ?? 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{ width: `${(v / 5) * 100}%`, backgroundColor: cor }}
        />
      </div>
      <span
        className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums"
        style={{ color: cor }}
      >
        {v.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
      </span>
    </div>
  );
}

function LadoJustificativa({
  nome,
  cor,
  score,
}: {
  nome: string;
  cor: string;
  score?: ScoreCategoria;
}) {
  const texto = score?.justificativa || score?.posicaoSintese;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: cor }} />
        <span className="text-sm font-medium text-foreground">{nome}</span>
      </div>
      <p className="text-sm text-muted-foreground">{texto || "Análise não disponível"}</p>
    </div>
  );
}

/** Gate exibido abaixo dos temas bloqueados, para quem não está autenticado. */
function GateTemas() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-8 text-center">
      <LockIcon className="size-8 text-muted-foreground" aria-hidden="true" />
      <p className="max-w-sm text-sm text-muted-foreground">
        Crie sua conta gratuita para ver a comparação completa em todos os temas.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/login?aba=registrar">Criar conta grátis</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Fazer login</Link>
        </Button>
      </div>
    </div>
  );
}

/** Temas na ordem do perfil (A primeiro, exclusivos de B ao final), sem o eixo institucional. */
function categoriasComparaveis(a: CandidaturaDetalhe, b: CandidaturaDetalhe): string[] {
  const nomes = a.scores.map((s) => s.categoria);
  for (const s of b.scores) if (!nomes.includes(s.categoria)) nomes.push(s.categoria);
  return nomes.filter((c) => c !== EIXO_FORA);
}
