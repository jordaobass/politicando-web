"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSessao } from "@/hooks/use-sessao";

// Release 1 (entrega enxuta): só "Candidatos" navega; os demais aparecem mas ficam
// desabilitados (exibidos, porém não navegáveis).
const LINKS = [
  { href: "/quiz", rotulo: "Quiz", navegavel: false },
  { href: "/candidatos", rotulo: "Candidatos", navegavel: true },
  { href: "/comparar", rotulo: "Comparar", navegavel: false },
  { href: "/partidos", rotulo: "Partidos", navegavel: false },
];

/** Barra de navegação global (tema navy do protótipo) com links e CTA de login. */
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { autenticado, usuario, sair } = useSessao();
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  const primeiroNome = usuario?.nome?.trim().split(/\s+/)[0] || "Perfil";

  function aoSair() {
    sair();
    setAberto(false);
    router.push("/");
  }

  // Esconde a navbar no topo da home; revela ao rolar (ou abrir o menu).
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const ehAtivo = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const escondida = pathname === "/" && !rolou && !aberto;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300",
        escondida ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Image
            src="/logo-politicando.jpeg"
            alt="Politicando"
            width={32}
            height={32}
            className="size-8 rounded-md"
            priority
          />
          Politicando
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) =>
            link.navegavel ? (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10",
                    ehAtivo(link.href)
                      ? "text-white"
                      : "text-primary-foreground/75 hover:text-white",
                  )}
                >
                  {link.rotulo}
                </Link>
              </li>
            ) : (
              <li key={link.href}>
                <span
                  aria-disabled="true"
                  title="Disponível em breve"
                  className="cursor-not-allowed rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/40"
                >
                  {link.rotulo}
                </span>
              </li>
            ),
          )}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {autenticado ? (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="font-semibold text-primary-foreground hover:bg-white/10 hover:text-white"
              >
                <Link href="/perfil">Olá, {primeiroNome}</Link>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={aoSair}
                className="text-primary-foreground/75 hover:bg-white/10 hover:text-white"
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10 hover:text-white"
              >
                <Link href="/login">Entrar</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/login?aba=registrar">Cadastrar</Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-white/10 md:hidden"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((valor) => !valor)}
        >
          {aberto ? <XIcon /> : <MenuIcon />}
        </Button>
      </nav>

      {aberto && (
        <div className="border-t border-white/10 md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {[...LINKS, ...(autenticado ? [{ href: "/perfil", rotulo: `Olá, ${primeiroNome}`, navegavel: true }] : [{ href: "/login", rotulo: "Entrar", navegavel: true }])].map((link) =>
              link.navegavel ? (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setAberto(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10",
                      ehAtivo(link.href)
                        ? "text-white"
                        : "text-primary-foreground/75",
                    )}
                  >
                    {link.rotulo}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <span
                    aria-disabled="true"
                    title="Disponível em breve"
                    className="block cursor-not-allowed rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/40"
                  >
                    {link.rotulo}
                  </span>
                </li>
              ),
            )}
            {autenticado && (
              <li>
                <button
                  type="button"
                  onClick={aoSair}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-primary-foreground/75 transition-colors hover:bg-white/10"
                >
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
