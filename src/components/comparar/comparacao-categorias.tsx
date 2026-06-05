import { categoriasUnidas, CORES_COMPARACAO } from "@/components/comparar/comparacao-radar";
import type { CandidaturaDetalhe, ScoreCategoria } from "@/lib/types";

/** Detalhe por categoria: o motivo (justificativa da IA) da pontuação de cada candidato. */
export function ComparacaoCategorias({
  a,
  b,
}: {
  a: CandidaturaDetalhe;
  b: CandidaturaDetalhe;
}) {
  const categorias = categoriasUnidas(a, b);
  if (categorias.length === 0) return null;

  const mapaA = new Map(a.scores.map((s) => [s.categoria, s]));
  const mapaB = new Map(b.scores.map((s) => [s.categoria, s]));

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Por que cada pontuação?</h2>
      <div className="space-y-3">
        {categorias.map((cat) => (
          <div key={cat} className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 font-semibold text-foreground">{cat}</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <LadoMotivo nome={a.politico.nomeUrna} cor={CORES_COMPARACAO.a} score={mapaA.get(cat)} />
              <LadoMotivo nome={b.politico.nomeUrna} cor={CORES_COMPARACAO.b} score={mapaB.get(cat)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LadoMotivo({
  nome,
  cor,
  score,
}: {
  nome: string;
  cor: string;
  score?: ScoreCategoria;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: cor }} />
        <span className="text-sm font-medium text-foreground">{nome}</span>
        {score?.engajamento != null ? (
          <span className="ml-auto text-lg font-bold tabular-nums" style={{ color: cor }}>
            {score.engajamento.toFixed(1)}
          </span>
        ) : null}
      </div>
      <p className="text-sm text-muted-foreground">
        {score?.posicaoSintese || score?.justificativa || "Sem justificativa registrada para esta categoria."}
      </p>
    </div>
  );
}
