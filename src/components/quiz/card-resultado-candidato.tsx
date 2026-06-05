import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CabecalhoPolitico } from "@/components/comum/cabecalho-politico";
import { formatarPercentual, classesBadgeNivel } from "@/lib/format";
import type { ResultadoCandidato } from "@/lib/types";

/** Card de candidato com o percentual de match obtido no quiz (identidade única). */
export function CardResultadoCandidato({
  candidato,
}: {
  candidato: ResultadoCandidato;
}) {
  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardContent>
        <Link href={`/candidatos/${candidato.candidaturaId}`} className="block">
          <CabecalhoPolitico
            nomeUrna={candidato.nomeUrna}
            fotoUrl={candidato.fotoUrl}
            cargo={candidato.cargo}
            uf={candidato.uf}
            partidoSigla={candidato.partidoSigla}
            orientacao="horizontal"
            tamanhoFoto="sm"
            acao={
              <div className="flex flex-col items-end gap-1">
                <span className="text-2xl font-bold text-primary tabular-nums">
                  {formatarPercentual(candidato.compatibilidade)}
                </span>
                <Badge variant="outline" className={classesBadgeNivel(candidato.nivel)}>
                  {candidato.nivel}
                </Badge>
              </div>
            }
          />
        </Link>
      </CardContent>
    </Card>
  );
}
