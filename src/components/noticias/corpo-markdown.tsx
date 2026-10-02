import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Corpo da matéria em Markdown.
 *
 * Sem `rehype-raw` e sem `dangerouslySetInnerHTML`: HTML escrito no arquivo é ignorado, não
 * executado. O conteúdo é de quem tem commit no repositório, mas uma matéria não precisa do
 * poder de injetar script — e um dia o texto pode vir de outro lugar.
 *
 * Os estilos são explícitos porque o projeto não usa o plugin de typography do Tailwind:
 * cada elemento recebe a classe que casa com os tokens do site.
 */
export function CorpoMarkdown({ children }: { children: string }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 scroll-mt-24 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-lg font-semibold text-foreground">{children}</h3>
          ),
          p: ({ children }) => <p className="text-muted-foreground">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/40 bg-muted/40 py-2 pl-4 pr-3 text-foreground">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          hr: () => <hr className="my-10 border-border" />,
          // Tabela rola dentro do próprio quadro: o corpo da página nunca rola na horizontal.
          table: ({ children }) => (
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[520px] border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-border">{children}</thead>,
          tr: ({ children }) => <tr className="border-b border-border/60">{children}</tr>,
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold text-foreground">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 align-top text-muted-foreground">{children}</td>
          ),
          a: ({ href, children }) => {
            const destino = href ?? "#";
            const interno = destino.startsWith("/");

            if (interno) {
              return (
                <Link href={destino} className="font-medium text-primary underline underline-offset-2">
                  {children}
                </Link>
              );
            }

            return (
              <a
                href={destino}
                target="_blank"
                // noopener/noreferrer: link de matéria aponta para fora o tempo todo.
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
