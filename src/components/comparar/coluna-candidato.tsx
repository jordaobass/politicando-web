import Link from "next/link";

import { CartaoCandidato } from "@/components/comum/cartao-candidato";
import { formatarCargo } from "@/lib/format";
import type { CandidaturaDetalhe, CandidaturaResumo } from "@/lib/types";

/** Coluna de comparação: card pôster (igual ao da home) com link para o perfil.
 *  `cor` = cor da série (A/B) usada na borda-topo, batendo com a faixa do comparativo.
 *  `voltarUrl` = URL da comparação atual, propagada ao perfil (?de=...) p/ "Voltar para comparação". */
export function ColunaCandidato({
  dado,
  cor,
  voltarUrl,
}: {
  dado: CandidaturaDetalhe;
  cor?: string;
  voltarUrl?: string;
}) {
  const resumo: CandidaturaResumo = {
    id: dado.id,
    nomeUrna: dado.politico.nomeUrna,
    partidoSigla: dado.partidoSigla,
    partidoLogoUrl: dado.partidoLogoUrl,
    cargo: dado.cargo,
    uf: dado.uf,
    numeroUrna: "",
    fotoUrl: dado.politico.fotoUrl,
    origem: dado.origem,
    scores: [],
  };

  return (
    <Link
      href={voltarUrl ? `/candidatos/${dado.id}?de=${encodeURIComponent(voltarUrl)}` : `/candidatos/${dado.id}`}
      className="group mx-auto block w-full max-w-xs"
      aria-label={`Ver perfil de ${dado.politico.nomeUrna}`}
    >
      <CartaoCandidato
        candidato={resumo}
        comHover
        corTopo={cor}
        className="transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
      />
      {/* Cargo (+ UF quando aplicável) abaixo do card — spec US-COMP-02 pede cargo no resultado. */}
      <p className="mt-2 text-center text-sm text-muted-foreground">
        {formatarCargo(dado.cargo)}
        {dado.uf && dado.uf !== "BR" ? ` · ${dado.uf}` : ""}
      </p>
    </Link>
  );
}
