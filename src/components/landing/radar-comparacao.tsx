interface SerieRadar {
  nome: string;
  cor: string;
  valores: number[];
}

interface RadarComparacaoProps {
  categorias: string[];
  series: SerieRadar[];
}

const TAM = 320;
const CX = 160;
const CY = 160;
const R = 100;
const NIVEIS = [0.25, 0.5, 0.75, 1];

function ponto(valor: number, indice: number, n: number) {
  const angulo = (-90 + (360 / n) * indice) * (Math.PI / 180);
  const raio = R * (valor / 100);
  return { x: CX + raio * Math.cos(angulo), y: CY + raio * Math.sin(angulo) };
}

function poligono(valores: number[], n: number) {
  return valores
    .map((v, i) => {
      const p = ponto(v, i, n);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Gráfico "estrela" (radar) comparando candidatos por categoria, com os polígonos
 * sobrepostos. Cada série tem uma cor; o preenchimento translúcido mostra a sobreposição.
 */
export function RadarComparacao({ categorias, series }: RadarComparacaoProps) {
  const n = categorias.length;

  return (
    <svg
      viewBox={`-32 -8 ${TAM + 64} ${TAM + 16}`}
      className="w-full max-w-sm"
      role="img"
      aria-label="Comparação de candidatos por categoria"
    >
      {/* Teia de fundo */}
      {NIVEIS.map((nivel) => (
        <polygon
          key={nivel}
          points={poligono(categorias.map(() => nivel * 100), n)}
          className="fill-none stroke-border"
          strokeWidth={1}
        />
      ))}
      {/* Eixos */}
      {categorias.map((cat, i) => {
        const p = ponto(100, i, n);
        return (
          <line key={cat} x1={CX} y1={CY} x2={p.x} y2={p.y} className="stroke-border" strokeWidth={1} />
        );
      })}
      {/* Polígonos das séries (sobrepostos) */}
      {series.map((s) => (
        <polygon
          key={s.nome}
          points={poligono(s.valores, n)}
          fill={s.cor}
          fillOpacity={0.28}
          stroke={s.cor}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      ))}
      {/* Vértices */}
      {series.map((s) =>
        s.valores.map((v, i) => {
          const p = ponto(v, i, n);
          return <circle key={`${s.nome}-${i}`} cx={p.x} cy={p.y} r={3.5} fill={s.cor} />;
        }),
      )}
      {/* Rótulos das categorias */}
      {categorias.map((cat, i) => {
        const p = ponto(125, i, n);
        const anchor = Math.abs(p.x - CX) < 6 ? "middle" : p.x > CX ? "start" : "end";
        return (
          <text
            key={cat}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-foreground text-[10px] font-semibold"
          >
            {cat}
          </text>
        );
      })}
    </svg>
  );
}
