import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { SeloPartido } from "@/components/comum/selo-partido";
import { BarraScore } from "@/components/comum/barra-score";
import { formatarCargo } from "@/lib/format";
import { registrarCliqueCandidato } from "@/lib/analytics";
import type { CandidaturaResumo } from "@/lib/types";

/**
 * Card de candidato EXCLUSIVO da listagem (/candidatos): foto quadrada alinhada à esquerda
 * com os dados ao lado e as métricas (scores) por categoria em duas colunas abaixo.
 */
export function CardCandidato({ candidato }: { candidato: CandidaturaResumo }) {
  // Os três alvos do card (foto, nome e botão) levam ao mesmo perfil: um handler só, usado
  // nos três, para a métrica não depender de qual deles a pessoa acertou.
  const aoAbrirPerfil = () =>
    registrarCliqueCandidato({
      id: candidato.id,
      nome: candidato.nomeUrna,
      cargo: candidato.cargo,
      origem: "listagem",
    });

  const rotuloCargo =
    candidato.uf && candidato.uf !== "BR"
      ? `${formatarCargo(candidato.cargo)} · ${candidato.uf}`
      : formatarCargo(candidato.cargo);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Foto alinhada à esquerda + dados ao lado */}
        <div className="flex items-center gap-3">
          <Link
            href={`/candidatos/${candidato.id}`}
            aria-label={`Ver perfil de ${candidato.nomeUrna}`}
            className="shrink-0"
            onClick={aoAbrirPerfil}
          >
            <FotoCandidato
              fotoUrl={candidato.fotoUrl}
              nome={candidato.nomeUrna}
              circular={false}
              posicao="top"
              className="aspect-square w-20 rounded-lg ring-1 ring-border"
            />
          </Link>
          <div className="min-w-0 space-y-0.5">
            <Link href={`/candidatos/${candidato.id}`} className="block" onClick={aoAbrirPerfil}>
              <p className="truncate font-bold text-foreground hover:underline">
                {candidato.nomeUrna}
              </p>
            </Link>
            <SeloPartido
              sigla={candidato.partidoSigla}
              logoUrl={candidato.partidoLogoUrl}
              className="justify-start"
            />
            <p className="text-xs text-muted-foreground">{rotuloCargo}</p>
          </div>
        </div>

        {/* Métricas: Engajamento por categoria (0..5, em pontos — mesmo formato do perfil).
            Scores sem engajamento calculado não entram — filtramos para não mostrar barras vazias. */}
        {candidato.scores.some((s) => s.engajamento != null) ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-border pt-3">
            {candidato.scores
              .filter((s) => s.engajamento != null)
              .map((score) => (
                <BarraScore
                  key={score.slug}
                  rotulo={score.categoria}
                  valor={score.engajamento!}
                  escalaMax={5}
                />
              ))}
          </div>
        ) : (
          <p className="border-t border-border pt-3 text-center text-xs text-muted-foreground">
            Scores ainda não calculados.
          </p>
        )}
      </div>

      <div className="mt-auto flex gap-2 border-t border-border p-4">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/candidatos/${candidato.id}`} onClick={aoAbrirPerfil}>
            Ver perfil
          </Link>
        </Button>
        <Button
          asChild
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link href={`/comparar?a=${candidato.id}`}>Comparar</Link>
        </Button>
      </div>
    </div>
  );
}
