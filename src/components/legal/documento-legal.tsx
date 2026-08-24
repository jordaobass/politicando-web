import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";
import type { BlocoLegal, DocumentoLegal } from "@/lib/legal/tipos";

/** Renderiza um bloco de conteúdo do documento (parágrafo, lista ou destaque). */
function Bloco({ bloco }: { bloco: BlocoLegal }) {
  if (bloco.tipo === "lista") {
    return (
      <ul className="ml-5 list-disc space-y-2 text-muted-foreground">
        {bloco.itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (bloco.tipo === "destaque") {
    return (
      <p className="rounded-lg border border-border bg-muted/40 p-4 font-medium text-foreground">
        {bloco.texto}
      </p>
    );
  }

  return <p className="text-muted-foreground">{bloco.texto}</p>;
}

function Blocos({ blocos }: { blocos: BlocoLegal[] }) {
  return (
    <>
      {blocos.map((bloco, indice) => (
        <Bloco key={`${bloco.tipo}-${indice}`} bloco={bloco} />
      ))}
    </>
  );
}

/**
 * Página institucional de um documento legal. Server Component: o texto é
 * estático, então nada disso precisa chegar ao navegador como JavaScript.
 *
 * O índice é gerado das próprias seções — no .docx original ele é uma lista de
 * números de página, que não faz sentido na web; aqui vira navegação por âncora.
 */
export function DocumentoLegalPagina({ documento }: { documento: DocumentoLegal }) {
  return (
    <div
      className="mx-auto max-w-3xl space-y-10 px-4 py-10"
      data-testid="pagina-legal"
    >
      <CabecalhoPagina titulo={documento.titulo} descricao={documento.descricao} />

      <p className="text-sm font-medium text-foreground">
        Última atualização: {documento.atualizadoEm}
      </p>

      <section className="space-y-3" data-testid="abertura-legal">
        <Blocos blocos={documento.abertura} />
      </section>

      {documento.aviso && (
        <section
          className="space-y-3 rounded-lg border border-accent bg-secondary p-5"
          aria-labelledby="aviso-legal"
          data-testid="aviso-legal"
        >
          <h2
            id="aviso-legal"
            className="text-lg font-bold text-secondary-foreground"
          >
            {documento.aviso.titulo}
          </h2>
          <Blocos blocos={documento.aviso.blocos} />
        </section>
      )}

      <nav aria-label="Índice do documento" className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Índice</h2>
        <ol className="ml-5 list-decimal space-y-1.5">
          {documento.secoes.map((secao) => (
            <li key={secao.id}>
              <a
                href={`#${secao.id}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {secao.titulo}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {documento.secoes.map((secao) => (
        <section
          key={secao.id}
          id={secao.id}
          className="scroll-mt-24 space-y-3"
          aria-labelledby={`titulo-${secao.id}`}
        >
          <h2
            id={`titulo-${secao.id}`}
            className="text-xl font-semibold text-foreground"
          >
            {secao.titulo}
          </h2>
          <Blocos blocos={secao.blocos} />
        </section>
      ))}
    </div>
  );
}
