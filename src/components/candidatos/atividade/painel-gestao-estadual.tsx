import { Building2Icon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GestaoEstadual } from "@/lib/types";

/**
 * Bloco "Gestão estadual" (perfil de Governador), spec US-GOV-04: para cada eixo temático, o
 * percentual de EXECUÇÃO do orçamento (liquidado sobre a dotação atualizada) no exercício, com o
 * total empenhado como contexto. Fonte SICONFI/Tesouro Nacional.
 */
export function PainelGestaoEstadual({ gestao, uf }: { gestao: GestaoEstadual; uf: string }) {
  return (
    <Card data-testid="bloco-gestao-estadual">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2Icon className="size-4 text-primary" aria-hidden="true" />
          Gestão estadual — orçamento executado por tema
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Quanto do orçamento de cada área {uf} executou em {gestao.ano} (valor liquidado sobre a
          dotação atualizada). Fonte: SICONFI / Tesouro Nacional.
        </p>
        <ul className="space-y-3">
          {gestao.eixos.map((eixo) => (
            <li key={eixo.eixo} className="space-y-1">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="min-w-0 font-medium text-foreground">{eixo.eixoNome}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {eixo.percentual.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}% executado
                </span>
              </div>
              {/* Barra = % de execução (0–100). Decorativa: o valor exato já está no texto acima,
                  então a escondemos do leitor de tela para não duplicar a leitura. */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(100, eixo.percentual)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                R$ {eixo.valorMilhoes.toLocaleString("pt-BR")} mi empenhados
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
