import { Badge } from "@/components/ui/badge";
import type { CandidaturaDetalhe } from "@/lib/types";

/** "DeputadoFederal" → "Deputado Federal". */
function formatarCargo(cargo: string) {
  return cargo.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/** Ano de uma data ISO ("2023-02-01" → "2023"); null vira "—". */
function ano(data?: string | null) {
  return data ? data.slice(0, 4) : "—";
}

function periodo(inicio?: string | null, fim?: string | null, atual?: boolean) {
  const ini = ano(inicio);
  return atual ? `${ini} – atual` : `${ini} – ${ano(fim)}`;
}

/**
 * Trajetória da pessoa: cargos exercidos, candidaturas (eleições disputadas) e filiações
 * partidárias — o modelo eleição-aware (Político perene × Candidatura/ExercícioCargo).
 */
export function TrajetoriaPolitico({ candidatura }: { candidatura: CandidaturaDetalhe }) {
  const exercicios = candidatura.exercicios ?? [];
  const historico = candidatura.historicoCandidaturas ?? [];
  const filiacoes = candidatura.filiacoes ?? [];

  return (
    <div className="space-y-6">
      {exercicios.length > 0 && (
        <Secao titulo="Cargos exercidos">
          {exercicios.map((e, i) => (
            <LinhaTrajetoria
              key={`ex-${i}`}
              titulo={`${formatarCargo(e.cargo)} · ${e.uf}`}
              detalhe={e.legislatura ? `${e.legislatura}ª legislatura` : (e.casa ?? undefined)}
              periodo={periodo(e.inicio, e.fim, e.atual)}
              destaque={e.atual}
            />
          ))}
        </Secao>
      )}

      {historico.length > 0 && (
        <Secao titulo="Candidaturas">
          {historico.map((h, i) => (
            <LinhaTrajetoria
              key={`cand-${i}`}
              titulo={`${formatarCargo(h.cargo)} · ${h.uf}`}
              detalhe={h.partidoSigla ?? undefined}
              periodo={String(h.ano)}
              tag={
                <Badge variant={h.eleito ? "default" : "secondary"}>
                  {h.eleito ? "Eleito" : "Não eleito"}
                </Badge>
              }
              destaque={h.atual}
            />
          ))}
        </Secao>
      )}

      {filiacoes.length > 0 && (
        <Secao titulo="Filiações partidárias">
          {filiacoes.map((f, i) => (
            <LinhaTrajetoria
              key={`fil-${i}`}
              titulo={f.partidoSigla ?? "—"}
              periodo={periodo(f.inicio, f.fim, f.atual)}
              destaque={f.atual}
            />
          ))}
        </Secao>
      )}
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {titulo}
      </h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function LinhaTrajetoria({
  titulo,
  detalhe,
  periodo,
  tag,
  destaque,
}: {
  titulo: string;
  detalhe?: string;
  periodo: string;
  tag?: React.ReactNode;
  destaque?: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {titulo}
          {destaque && <span className="ml-2 text-xs font-normal text-primary">atual</span>}
        </p>
        {detalhe && <p className="truncate text-xs text-muted-foreground">{detalhe}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {tag}
        <span className="text-xs tabular-nums text-muted-foreground">{periodo}</span>
      </div>
    </li>
  );
}
