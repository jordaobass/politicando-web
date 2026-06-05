import type { ReactNode } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { BadgeOrigem } from "@/components/comum/badge-origem";
import { formatarCargo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { OrigemCandidatura } from "@/lib/types";

const TAMANHOS = { sm: "w-16", md: "w-24", lg: "w-32" } as const;
const TITULOS = { h1: "text-2xl", h2: "text-xl", h3: "text-base", p: "text-base" } as const;

export interface CabecalhoPoliticoProps {
  nomeUrna: string;
  fotoUrl: string | null;
  cargo: string;
  uf: string;
  partidoSigla?: string | null;
  partidoLogoUrl?: string | null;
  origem?: OrigemCandidatura;
  nomeCivil?: string | null;
  /** vertical = foto em cima (cards/colunas); horizontal = foto ao lado (perfil/resultado). */
  orientacao?: "vertical" | "horizontal";
  tamanhoFoto?: keyof typeof TAMANHOS;
  /** Nível de título do nome (h1 no perfil, h3 nos cards). */
  como?: "h1" | "h2" | "h3" | "p";
  /** Conteúdo extra à direita (ex.: botão, % de match). */
  acao?: ReactNode;
}

/**
 * Identidade visual ÚNICA de um político no sistema: foto (retangular, arredondada, inteira)
 * + nome + nome civil + badges (partido, cargo·UF, origem). Reutilizada em lista, comparação,
 * perfil e resultado do quiz para evitar duplicação e manter consistência.
 */
export function CabecalhoPolitico({
  nomeUrna,
  fotoUrl,
  cargo,
  uf,
  partidoSigla,
  partidoLogoUrl,
  origem,
  nomeCivil,
  orientacao = "vertical",
  tamanhoFoto = "md",
  como: Titulo = "h3",
  acao,
}: CabecalhoPoliticoProps) {
  const rotuloCargo = uf && uf !== "BR" ? `${formatarCargo(cargo)} · ${uf}` : formatarCargo(cargo);
  const vertical = orientacao === "vertical";

  return (
    <div
      className={cn(
        "flex gap-3",
        vertical ? "flex-col items-center text-center" : "flex-row items-center text-left",
      )}
    >
      <FotoCandidato
        fotoUrl={fotoUrl}
        nome={nomeUrna}
        circular={false}
        ajuste="contain"
        className={cn(
          "aspect-[3/4] shrink-0 rounded-xl bg-card ring-1 ring-border",
          TAMANHOS[tamanhoFoto],
        )}
      />

      <div className={cn("min-w-0 space-y-1.5", !vertical && "flex-1")}>
        <Titulo className={cn("leading-tight font-semibold text-foreground", TITULOS[Titulo])}>
          {nomeUrna}
        </Titulo>
        {nomeCivil && nomeCivil !== nomeUrna && (
          <p className="text-sm text-muted-foreground">{nomeCivil}</p>
        )}
        <div className={cn("flex flex-wrap items-center gap-1.5", vertical && "justify-center")}>
          {partidoSigla && (
            <Badge variant="outline" className="gap-1 pl-1">
              {partidoLogoUrl && (
                <Image
                  src={partidoLogoUrl}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 object-contain"
                  unoptimized
                />
              )}
              {partidoSigla}
            </Badge>
          )}
          <Badge variant="secondary">{rotuloCargo}</Badge>
          {origem && <BadgeOrigem origem={origem} />}
        </div>
      </div>

      {acao}
    </div>
  );
}
