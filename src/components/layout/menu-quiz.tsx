"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Item "Quiz" do navbar como submenu (card Correções v2, item 5): abre "Fazer o quiz" e
 * "Meu resultado" (acesso rápido à página de resultado). Fecha ao clicar fora ou com Esc.
 */
export function MenuQuiz({ ativo }: { ativo?: boolean }) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function aoClicarFora(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
    }
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") setAberto(false);
    }
    document.addEventListener("mousedown", aoClicarFora);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("mousedown", aoClicarFora);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10",
          ativo ? "text-white" : "text-primary-foreground/75 hover:text-white",
        )}
      >
        Quiz
        <ChevronDownIcon
          className={cn("size-4 transition-transform motion-reduce:transition-none", aberto && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {aberto && (
        <div
          role="menu"
          className="absolute left-0 z-40 mt-1 min-w-44 overflow-hidden rounded-lg border border-border bg-card py-1 text-foreground shadow-lg"
        >
          <Link
            role="menuitem"
            href="/quiz"
            onClick={() => setAberto(false)}
            className="block px-3 py-2 text-sm hover:bg-muted"
          >
            Fazer o quiz
          </Link>
          <Link
            role="menuitem"
            href="/quiz/resultado"
            onClick={() => setAberto(false)}
            className="block px-3 py-2 text-sm hover:bg-muted"
          >
            Meu resultado
          </Link>
        </div>
      )}
    </li>
  );
}
