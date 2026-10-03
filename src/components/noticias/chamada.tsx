import Image from "next/image";
import Link from "next/link";

import { formatarDataCurta, type Noticia } from "@/lib/noticias";

/**
 * Chamada da capa: uma linha da lista de matérias, para ser lida em varredura.
 *
 * O que separa uma chamada da outra é o **fio** (`border-t`) e o respiro vertical — não um
 * card. A diferença não é estética: dez cards iguais empilhados dão o mesmo peso visual a
 * dez matérias e obrigam o leitor a comparar tudo; a lista com fio deixa o olho descer pelos
 * títulos e parar só no que interessa.
 *
 * Renderiza `<li>` — precisa estar dentro de um `<ul>`/`<ol>`.
 */
export function Chamada({ noticia }: { noticia: Noticia }) {
  const citados = noticia.candidatos.map((candidato) => candidato.nome).join(" · ");

  return (
    <li className="border-t border-border">
      {/* O link cobre a linha inteira (miniatura + texto): alvo de toque generoso no celular
          sem precisar de botão, e um único destino em vez de dois links para a mesma matéria. */}
      <Link
        href={`/noticias/${noticia.slug}`}
        className="group flex gap-4 rounded-md py-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:gap-5 sm:py-5"
      >
        {/* Matéria sem capa não reserva o espaço da miniatura: buraco alinhado em metade das
            linhas chama mais atenção do que a falta da foto. */}
        {noticia.capa && (
          <div className="relative aspect-[1200/630] w-28 shrink-0 overflow-hidden rounded-md bg-muted sm:w-40">
            <Image
              src={noticia.capa}
              alt={noticia.capaAlt ?? ""}
              fill
              // Larguras fixas e pequenas — o `sizes` exato evita baixar a imagem de 1200px
              // para exibir em 112px, que é o desperdício típico da lista com miniatura.
              sizes="(max-width: 640px) 112px, 160px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Data curta ("29 ago") porque a data por extenso, repetida dez vezes, vira ruído e
              ainda rouba a largura do título — que é o que a pessoa está lendo. */}
          <p className="text-xs text-muted-foreground">
            <time dateTime={noticia.publicadoEm.toISOString()}>
              {formatarDataCurta(noticia.publicadoEm)}
            </time>
            {citados && ` · ${citados}`}
          </p>

          <h3 className="mt-1 text-base font-semibold leading-snug text-foreground group-hover:underline sm:text-lg">
            {noticia.titulo}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-pretty text-muted-foreground">
            {noticia.resumo}
          </p>
        </div>
      </Link>
    </li>
  );
}
