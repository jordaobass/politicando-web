import type { Metadata } from "next";
import Link from "next/link";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import { CardNoticia } from "@/components/noticias/card-noticia";
import { Button } from "@/components/ui/button";
import { listarNoticias } from "@/lib/noticias";
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <CabecalhoPagina
        titulo={TITULO}
        descricao={DESCRICAO}
        acao={
          <Button asChild>
            <Link href="/quiz">Fazer o quiz</Link>
          </Button>
        }
      />

      {noticias.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Nenhuma matéria publicada ainda.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia, indice) => (
            <CardNoticia key={noticia.slug} noticia={noticia} prioritaria={indice === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
