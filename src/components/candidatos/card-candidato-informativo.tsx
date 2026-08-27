import { FotoCandidato } from "@/components/comum/foto-candidato";
import { SeloPartido } from "@/components/comum/selo-partido";
import { formatarCargo } from "@/lib/format";
import { MENSAGEM_SEM_ANALISE } from "@/lib/constantes";
import type { CandidaturaResumo } from "@/lib/types";

/**
 * Card SOMENTE-INFORMATIVO de candidato despublicado por curadoria (Correções v7, item 6):
 * o deputado vinculado ao partido continua visível — foto, nome de urna, nome civil, cargo e
 * estado — mas sem NENHUM caminho para o detalhe (nem link, nem botão): o perfil dele responde
 * 404 no público. O texto é o do card do cliente, com a grafia corrigida (decisão E16).
 */
export function CardCandidatoInformativo({ candidato }: { candidato: CandidaturaResumo }) {
  const rotuloCargo =
    candidato.uf && candidato.uf !== "BR"
      ? `${formatarCargo(candidato.cargo)} · ${candidato.uf}`
      : formatarCargo(candidato.cargo);

  return (
    <div
      data-testid="card-candidato-informativo"
      className="flex h-full flex-col gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-foreground/10"
    >
      <div className="flex items-center gap-3">
        <FotoCandidato
          fotoUrl={candidato.fotoUrl}
          nome={candidato.nomeUrna}
          circular={false}
          posicao="top"
          className="aspect-square w-20 shrink-0 rounded-lg ring-1 ring-border"
        />
        <div className="min-w-0 space-y-0.5">
          <p className="truncate font-bold text-foreground">{candidato.nomeUrna}</p>
          {candidato.nomeCivil && candidato.nomeCivil !== candidato.nomeUrna && (
            <p className="truncate text-xs text-muted-foreground">{candidato.nomeCivil}</p>
          )}
          <SeloPartido
            sigla={candidato.partidoSigla}
            logoUrl={candidato.partidoLogoUrl}
            className="justify-start"
          />
          <p className="text-xs text-muted-foreground">{rotuloCargo}</p>
        </div>
      </div>

      <p className="mt-auto rounded-lg border border-border bg-muted/40 px-3 py-2 text-center text-xs text-muted-foreground">
        {MENSAGEM_SEM_ANALISE}
      </p>
    </div>
  );
}
