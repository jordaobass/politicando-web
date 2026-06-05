import { Badge } from "@/components/ui/badge";
import type { OrigemCandidatura } from "@/lib/types";

/** Rótulo amigável por origem (o backend envia o nome do enum OrigemDado). */
const ROTULO_POR_ORIGEM: Record<OrigemCandidatura, string> = {
  PreCandidato: "Pré-candidato 2026",
  Mandatario: "Mandatário",
  TseOficial: "Oficial",
  TseHistorico: "Histórico",
};

const VARIANTE_POR_ORIGEM: Record<
  OrigemCandidatura,
  "default" | "secondary" | "outline"
> = {
  TseOficial: "default",
  Mandatario: "secondary",
  PreCandidato: "outline",
  TseHistorico: "outline",
};

/** Badge que indica a origem de uma candidatura. */
export function BadgeOrigem({ origem }: { origem: OrigemCandidatura }) {
  return (
    <Badge variant={VARIANTE_POR_ORIGEM[origem] ?? "outline"}>
      {ROTULO_POR_ORIGEM[origem] ?? origem}
    </Badge>
  );
}
