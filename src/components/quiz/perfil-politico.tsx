import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rotuloPosicao } from "@/lib/format";
import type { PerfilCategoria } from "@/lib/types";

/**
 * Perfil político do usuário: posição por categoria na régua esquerda↔direita.
 * A nota chega 0..100 (50 = centro), igual à do candidato — a posição do candidato segue
 * alimentando o match, mesmo sem régua no perfil dele (Correções v7, item 3).
 */
export function PerfilPolitico({ perfil }: { perfil: PerfilCategoria[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seu perfil político</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {perfil.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Não há dados de perfil para exibir.
          </p>
        )}
        {perfil.map((item) => {
          const posicao = Math.max(0, Math.min(100, item.posicao));
          return (
            <div key={item.categoriaId} className="space-y-2">
              <h3 className="font-medium text-foreground">{item.categoria}</h3>

              {/* Régua progressista ↔ conservador com marcador na posição do eleitor (mesma do candidato). */}
              <div className="space-y-1">
                <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-serie-a/40 via-muted to-chart-4/40">
                  <div
                    className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow"
                    style={{ left: `${posicao}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex justify-between text-[0.7rem] text-muted-foreground">
                  <span>Progressista</span>
                  <span className="font-medium text-foreground">{rotuloPosicao(posicao)}</span>
                  <span>Conservador</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
