import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { formatarData, type Noticia } from "@/lib/noticias";
import { cn } from "@/lib/utils";

/**
 * Manchete da capa de notícias: a matéria em destaque, uma por página.
 *
 * A hierarquia é construída por **tamanho e espaço**, não por moldura: a manchete não tem
 * card, borda nem sombra — ela é maior que as chamadas, e é só isso que a destaca. Jornal
 * funciona assim, e evita que a capa vire uma grade de cartões todos com o mesmo peso.
 */
export function Manchete({ noticia }: { noticia: Noticia }) {
  // Candidatos citados na linha de meta: só o nome de urna. Repetir o cargo em cada linha da
  // capa gasta a largura que o título precisa, e o cargo já aparece na matéria.
  const citados = noticia.candidatos.map((candidato) => candidato.nome).join(" · ");

  return (
    <article>
      <Link
        href={`/noticias/${noticia.slug}`}
        className="group grid gap-5 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none lg:grid-cols-12 lg:gap-8"
      >
        {noticia.capa && (
          // Meia grade para a imagem, meia para o texto. Com 7/5 a coluna de texto ficava
          // estreita demais para estes títulos longos — a manchete quebrava em sete linhas e
          // passava a altura da foto, desequilibrando o bloco.
          <div className="lg:col-span-6">
            <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={noticia.capa}
                alt={noticia.capaAlt ?? ""}
                fill
                // É a maior imagem acima da dobra na capa — carregar com prioridade é o que
                // evita que o LCP da página seja a manchete aparecendo depois do texto.
                priority
                // O container da capa é `max-w-5xl` (1024px) e esta coluna ocupa metade dele:
                // ~500px no desktop, por mais larga que seja a tela. Declarar `vw` aqui faria
                // o navegador baixar uma imagem maior do que cabe no espaço.
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            {/* Crédito da imagem fica na capa, não só na matéria: foto de banco livre só pode
                ser publicada COM atribuição, e a capa já é publicação. */}
            {noticia.capaCredito && (
              <p className="mt-2 text-xs text-muted-foreground">{noticia.capaCredito}</p>
            )}
          </div>
        )}

        <div
          className={cn(
            "flex flex-col justify-center",
            // Matéria sem capa ocupa a largura inteira em vez de deixar metade da grade vazia.
            noticia.capa ? "lg:col-span-6" : "lg:col-span-12",
          )}
        >
          {/* Linha de meta: data por extenso e quem é citado. É informação de pauta — por isso
              sem caixa alta nem tracking de etiqueta, que transformariam o dado em enfeite. */}
          <p className="text-sm text-muted-foreground">
            <time dateTime={noticia.publicadoEm.toISOString()}>
              {formatarData(noticia.publicadoEm)}
            </time>
            {citados && ` · ${citados}`}
          </p>

          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-balance text-foreground group-hover:underline sm:text-3xl">
            {noticia.titulo}
          </h2>

          {/* Medida travada em ~70 caracteres: no desktop a coluna de texto é estreita, mas no
              tablet ela encheria a tela inteira e a linha ficaria longa demais para ler. */}
          <p className="mt-3 line-clamp-3 max-w-[70ch] text-base text-pretty text-muted-foreground sm:text-lg">
            {noticia.resumo}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Ler a checagem
            <ArrowRightIcon
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
