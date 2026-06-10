import Link from "next/link";
import { VoteIcon } from "lucide-react";

const COLUNAS = [
  {
    titulo: "Navegação",
    links: [
      { href: "/quiz", rotulo: "Quiz" },
      { href: "/candidatos", rotulo: "Candidatos" },
      { href: "/comparar", rotulo: "Comparar" },
      { href: "/partidos", rotulo: "Partidos" },
    ],
  },
  {
    titulo: "Transparência",
    links: [
      { href: "/como-calculamos", rotulo: "Como calculamos" },
      { href: "/como-calculamos", rotulo: "Fontes dos dados" },
      { href: "/como-calculamos", rotulo: "Metodologia" },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { href: "/", rotulo: "Termos de uso" },
      { href: "/", rotulo: "Política de privacidade" },
    ],
  },
];

/** Rodapé global (tema navy) com colunas institucionais e aviso de protótipo. */
export function Footer() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-lg font-bold">
            <VoteIcon className="size-5 text-accent" aria-hidden="true" />
            Politicando
          </p>
          <p className="text-sm text-primary-foreground/70">
            Match eleitoral para as Eleições 2026. Protótipo sem vínculo oficial
            com o TSE.
          </p>
        </div>

        {COLUNAS.map((coluna) => (
          <div key={coluna.titulo} className="space-y-3">
            <p className="text-sm font-semibold text-white">{coluna.titulo}</p>
            <ul className="space-y-2">
              {coluna.links.map((link, i) => (
                <li key={`${link.rotulo}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-white"
                  >
                    {link.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Politicando · Dados de fontes públicas
          (Câmara, Senado, TSE).
        </p>
      </div>
    </footer>
  );
}
