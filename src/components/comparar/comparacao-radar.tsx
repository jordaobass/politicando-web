import { Card, CardContent } from "@/components/ui/card";
import { RadarComparacao } from "@/components/landing/radar-comparacao";
import type { CandidaturaDetalhe } from "@/lib/types";

/**
 * Cores das séries A e B (radar, legenda, barras, detalhe), via tokens de tema (`--serie-a/b`).
 * Resolvem por var() no claro/escuro, garantindo contraste AA do valor como texto nos dois temas.
 */
export const CORES_COMPARACAO = { a: "var(--serie-a)", b: "var(--serie-b)" } as const;

/** Eixo institucional fica fora do comparativo (spec lista 8 temas). */
const EIXO_FORA = "Instituições e Democracia";

/** Lista de categorias na ordem de A, completada com as exclusivas de B (sem o eixo institucional). */
export function categoriasUnidas(a: CandidaturaDetalhe, b: CandidaturaDetalhe): string[] {
  const nomes = a.scores.map((s) => s.categoria);
  for (const s of b.scores) if (!nomes.includes(s.categoria)) nomes.push(s.categoria);
  return nomes.filter((c) => c !== EIXO_FORA);
}

function valoresPor(categorias: string[], dado: CandidaturaDetalhe): number[] {
  // Radar usa o Engajamento (0..5, em pontos como no perfil/lista), escalado para a régua 0..100
  // do gráfico (×20). Sem engajamento calculado, fica 0 (sem atuação no tema).
  const mapa = new Map(dado.scores.map((s) => [s.categoria, s.engajamento]));
  return categorias.map((c) => (mapa.get(c) ?? 0) * 20);
}

/** Gráfico estrela com as posições de A e B sobrepostas + legenda. */
export function ComparacaoRadar({ a, b }: { a: CandidaturaDetalhe; b: CandidaturaDetalhe }) {
  const categorias = categoriasUnidas(a, b);
  if (categorias.length === 0) return null;

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4">
        <RadarComparacao
          categorias={categorias}
          series={[
            { nome: a.politico.nomeUrna, cor: CORES_COMPARACAO.a, valores: valoresPor(categorias, a) },
            { nome: b.politico.nomeUrna, cor: CORES_COMPARACAO.b, valores: valoresPor(categorias, b) },
          ]}
        />
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          {[
            { nome: a.politico.nomeUrna, cor: CORES_COMPARACAO.a },
            { nome: b.politico.nomeUrna, cor: CORES_COMPARACAO.b },
          ].map((s) => (
            <span key={s.cor} className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-full" style={{ backgroundColor: s.cor }} />
              {s.nome}
            </span>
          ))}
        </div>
        <p className="max-w-prose text-center text-sm text-muted-foreground">
          O gráfico mostra o nível de engajamento de cada candidato nos 8 temas avaliados, numa
          escala de 0 a 5. Quanto maior a área, maior o envolvimento com aquele tema. Isso não
          indica posição ideológica.
        </p>
      </CardContent>
    </Card>
  );
}
