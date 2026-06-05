"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftIcon,
  LayoutDashboardIcon,
  PlugIcon,
  VoteIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const ITENS = [
  { href: "/admin", rotulo: "Dashboard", icone: LayoutDashboardIcon },
  { href: "/admin/integracoes", rotulo: "Integrações", icone: PlugIcon },
];

/** Barra lateral de navegação do painel administrativo. */
export function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-1 border-b bg-sidebar p-4 md:h-screen md:w-60 md:border-r md:border-b-0">
      <Link
        href="/admin"
        className="mb-4 flex items-center gap-2 font-semibold text-sidebar-foreground"
      >
        <VoteIcon className="size-5 text-primary" aria-hidden="true" />
        Politicando
        <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground uppercase">
          Admin
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {ITENS.map((item) => {
          const ativo = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                ativo
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <item.icone className="size-4" aria-hidden="true" />
              {item.rotulo}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="mt-auto flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Voltar ao site
      </Link>
    </aside>
  );
}
