import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { BlocoCandidatoCitado } from "@/components/noticias/bloco-candidato-citado";
import { CorpoMarkdown } from "@/components/noticias/corpo-markdown";
import { Button } from "@/components/ui/button";
import { formatarData, listarNoticias, obterNoticia, type Noticia } from "@/lib/noticias";
import { SITE_URL } from "@/lib/site";

/** Revalida de hora em hora: o texto é estático, mas o bloco de candidatos vem da API. */
export const revalidate = 3600;

export async function generateStaticParams() {
  const noticias = await listarNoticias();
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await obterNoticia(slug);

  if (!noticia) return { title: "Matéria não encontrada" };

  const url = `${SITE_URL}/noticias/${noticia.slug}`;
  const titulo = noticia.seoTitulo ?? noticia.titulo;
  const descricao = noticia.seoDescricao ?? noticia.resumo;
  const imagem = noticia.capa ? `${SITE_URL}${noticia.capa}` : undefined;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: titulo,
      description: descricao,
      url,
      publishedTime: noticia.publicadoEm.toISOString(),
      modifiedTime: (noticia.atualizadoEm ?? noticia.publicadoEm).toISOString(),
      authors: [noticia.autor],
      tags: noticia.tags,
      ...(imagem ? { images: [{ url: imagem, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descricao,
      ...(imagem ? { images: [imagem] } : {}),
    },
  };
}

/**
 * Dados estruturados da matéria.
 *
 * `NewsArticle` é o que faz o buscador entender data, autor e veículo — sem isso a matéria
 * concorre como página solta. `BreadcrumbList` dá a trilha que aparece no resultado da busca.
 */
function DadosEstruturados({ noticia }: { noticia: Noticia }) {
  const url = `${SITE_URL}/noticias/${noticia.slug}`;

  const json = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: noticia.titulo,
      description: noticia.resumo,
      datePublished: noticia.publicadoEm.toISOString(),
      dateModified: (noticia.atualizadoEm ?? noticia.publicadoEm).toISOString(),
      author: [{ "@type": "Organization", name: noticia.autor }],
      publisher: { "@type": "Organization", name: "Politicando", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: "pt-BR",
      ...(noticia.capa ? { image: [`${SITE_URL}${noticia.capa}`] } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Notícias", item: `${SITE_URL}/noticias` },
        { "@type": "ListItem", position: 3, name: noticia.titulo, item: url },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Conteúdo próprio e serializado por JSON.stringify — não há entrada de usuário aqui.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = await obterNoticia(slug);

  // 404 de verdade (e não página vazia com status 200) para slug que não existe.
  if (!noticia) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <DadosEstruturados noticia={noticia} />

      <nav aria-label="Trilha" className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link href="/" className="hover:underline">
          Início
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <Link href="/noticias" className="hover:underline">
          Notícias
        </Link>
      </nav>

      <header className="mt-4 space-y-3">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {noticia.titulo}
        </h1>
        <p className="text-lg text-muted-foreground">{noticia.resumo}</p>
        <p className="text-sm text-muted-foreground">
          {noticia.autor} ·{" "}
          <time dateTime={noticia.publicadoEm.toISOString()}>
            {formatarData(noticia.publicadoEm)}
          </time>
        </p>
      </header>

      {noticia.capa && (
        <figure className="mt-6">
          <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={noticia.capa}
              alt={noticia.capaAlt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
          {noticia.capaCredito && (
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {noticia.capaCredito}
            </figcaption>
          )}
        </figure>
      )}

      <div className="mt-8">
        <CorpoMarkdown>{noticia.corpo}</CorpoMarkdown>
      </div>

      <BlocoCandidatoCitado citados={noticia.candidatos} />

      <aside className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          E você, concorda com quem na urna?
        </h2>
        <p className="mx-auto mt-1 max-w-prose text-sm text-muted-foreground">
          O quiz compara as suas respostas com as posições registradas de cada candidato e
          mostra o seu percentual de afinidade por tema.
        </p>
        <Button asChild className="mt-4">
          <Link href="/quiz">Descobrir meu match</Link>
        </Button>
      </aside>
    </article>
  );
}
