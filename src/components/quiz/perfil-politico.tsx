import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PerfilCategoria } from "@/lib/types";

/** Converte posição (-1..1 ou -100..100) em rótulo e percentual da barra. */
function descreverPosicao(posicao: number) {
  const escala = Math.abs(posicao) <= 1 ? posicao * 100 : posicao;
  const limitado = Math.max(-100, Math.min(100, escala));
  const percentual = (limitado + 100) / 2; // 0..100, sendo 50 o centro
  return { percentual };
}

/** Mostra o perfil político do usuário (posição por categoria). */
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
          const { percentual } = descreverPosicao(item.posicao);
          return (
            <div key={item.categoriaId} className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">
                {item.categoria}
              </p>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute top-0 h-full w-0.5 -translate-x-1/2 bg-border"
                  style={{ left: "50%" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-0 size-2 -translate-x-1/2 rounded-full bg-primary"
                  style={{ left: `${percentual}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
