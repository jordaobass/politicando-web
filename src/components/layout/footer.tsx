import Image from "next/image";
import Link from "next/link";

import { ROTAS_LEGAIS } from "@/lib/constantes";

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
    ],
  },
  {
    titulo: "Legal",
    // Vinham apontando para "/" — links quebrados até as páginas existirem (v6, item 5).
    links: ROTAS_LEGAIS,
  },
];

/** Rodapé global (tema navy) com colunas institucionais. */
export function Footer() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-lg font-bold">
            <Image
              src="/logo-vertical-verde.png"
              alt="Politicando"
              width={512}
              height={551}
              className="h-12 w-auto"
            />
          </p>
          <p className="text-sm text-primary-foreground/70">
            Match eleitoral para as Eleições 2026. Sem vínculo oficial com o TSE.
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
          O Politicando é uma plataforma independente e apartidária. As análises
          são geradas por inteligência artificial com base em dados públicos e não
          representam indicação, endorsement ou posição política de qualquer
          natureza.
        </p>
      </div>
    </footer>
  );
}
