import Image from "next/image";
import Link from "next/link";

import { formatarData, type Noticia } from "@/lib/noticias";

/** Card da listagem: capa, data, título e resumo. O card inteiro é o link. */
export function CardNoticia({ noticia, prioritaria = false }: { noticia: Noticia; prioritaria?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <Link href={`/noticias/${noticia.slug}`} className="block">
        {noticia.capa && (
          <div className="relative aspect-[1200/630] w-full overflow-hidden bg-muted">
            <Image
              src={noticia.capa}
              alt={noticia.capaAlt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={prioritaria}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="space-y-2 p-5">
          <time
            dateTime={noticia.publicadoEm.toISOString()}
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            {formatarData(noticia.publicadoEm)}
          </time>
          <h2 className="text-lg font-semibold leading-snug text-foreground group-hover:underline">
            {noticia.titulo}
          </h2>
          <p className="line-clamp-3 text-sm text-muted-foreground">{noticia.resumo}</p>
        </div>
      </Link>
    </article>
  );
}
