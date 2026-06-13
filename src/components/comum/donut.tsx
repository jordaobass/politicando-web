/**
 * Donut chart em SVG (trilho + arco) com conteúdo central (ex.: percentual).
 * `valor` é 0..100. A cor do arco vem de `classeCor` (classe text-* do tema).
 */
export function Donut({
  valor,
  tamanho = 112,
  espessura = 10,
  classeCor = "text-accent",
  children,
}: {
  valor: number;
  tamanho?: number;
  espessura?: number;
  classeCor?: string;
  children?: React.ReactNode;
}) {
  const v = Math.max(0, Math.min(100, valor));
  const raio = (tamanho - espessura) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const offset = circunferencia * (1 - v / 100);

  return (
    <div className="relative shrink-0" style={{ width: tamanho, height: tamanho }}>
      <svg width={tamanho} height={tamanho} className="-rotate-90" aria-hidden="true">
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          strokeWidth={espessura}
          className="stroke-muted"
        />
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          strokeWidth={espessura}
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          className={`stroke-current ${classeCor} transition-[stroke-dashoffset] duration-700`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
