const ESTATISTICAS = [
  { valor: "+5.000", rotulo: "Candidatos mapeados" },
  { valor: "8", rotulo: "Categorias temáticas" },
  { valor: "27", rotulo: "Unidades federativas" },
  { valor: "5", rotulo: "Cargos cobertos" },
];

/** Seção de estatísticas da plataforma. */
export function SecaoEstatisticas() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
        {ESTATISTICAS.map((item) => (
          <div key={item.rotulo} className="text-center">
            <p className="text-3xl font-bold text-primary sm:text-4xl">
              {item.valor}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{item.rotulo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
