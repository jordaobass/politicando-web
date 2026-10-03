import type { Metadata } from "next";
import Link from "next/link";

import { Chamada } from "@/components/noticias/chamada";
import { Manchete } from "@/components/noticias/manchete";
import { PaginacaoNoticias } from "@/components/noticias/paginacao-noticias";
import { Button } from "@/components/ui/button";
import { formatarData, listarNoticias, paginarNoticias } from "@/lib/noticias";
import { SITE_URL } from "@/lib/site";

const TITULO = "Notícias";
const DESCRICAO =
  "Checagens e análises sobre os candidatos das Eleições 2026, com fonte e evidência em cada afirmação.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: `${SITE_URL}/noticias` },
  openGraph: {
    type: "website",
    title: `${TITULO} | Politicando`,
    description: DESCRICAO,
    url: `${SITE_URL}/noticias`,
  },
};

export default async function NoticiasPage() {
  const noticias = await listarNoticias();
  const pagina = paginarNoticias(noticias, 1);

  // A linha de edição mostra a revisão mais recente da SEÇÃO, não a data da manchete: desde
  // que cada matéria passou a ser datada pela sabatina que ela checa, a manchete pode ser de
  // agosto e ainda assim ter sido revista ontem.
  const revisadoEm = noticias.reduce<Date | null>((maisRecente, noticia) => {
    const data = noticia.atualizadoEm ?? noticia.publicadoEm;
    return !maisRecente || data > maisRecente ? data : maisRecente;
  }, null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/*
        Cabeçalho no formato de cabeçalho de jornal: título, a frase que diz o que a seção é
        e, abaixo do fio, a linha de edição com a data da matéria mais recente. A data vai
        DEPOIS do título de propósito — rótulo decorativo acima de cabeçalho é ruído.
      */}
      <header className="border-b border-border pb-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {TITULO}
            </h1>
            <p className="mt-2 max-w-prose text-muted-foreground">{DESCRICAO}</p>
          </div>
          <Button asChild>
            <Link href="/quiz">Fazer o quiz</Link>
          </Button>
        </div>

        {revisadoEm && (
          <p className="mt-5 border-t border-border pt-3 text-xs text-muted-foreground">
            Checagem e análise · Eleições 2026 — atualizado em{" "}
            <time dateTime={revisadoEm.toISOString()}>{formatarData(revisadoEm)}</time>
          </p>
        )}
      </header>

      {!pagina || !pagina.manchete ? (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Nenhuma matéria publicada ainda.
        </p>
      ) : (
        <>
          <div className="mt-8">
            <Manchete noticia={pagina.manchete} />
          </div>

          {pagina.chamadas.length > 0 && (
            // O fio de cada chamada é o `border-t` do próprio item; o `border-b` aqui fecha
            // o último, para a lista não terminar em aberto.
            <ul className="mt-10 border-b border-border">
              {pagina.chamadas.map((noticia) => (
                <Chamada key={noticia.slug} noticia={noticia} />
              ))}
            </ul>
          )}

          <PaginacaoNoticias pagina={pagina.pagina} totalPaginas={pagina.totalPaginas} />
        </>
      )}
    </div>
  );
}
