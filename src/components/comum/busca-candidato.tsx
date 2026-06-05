"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2Icon, SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatarCargo } from "@/lib/format";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { SeloPartido } from "@/components/comum/selo-partido";
import { useBuscaCandidatos } from "@/hooks/use-api";
import { useDebounce } from "@/hooks/use-debounce";
import type { CandidaturaResumo } from "@/lib/types";

interface BuscaCandidatoProps {
  /** Chamado quando o usuário escolhe um candidato no autocomplete. */
  onSelecionar: (candidato: CandidaturaResumo) => void;
  placeholder?: string;
  /** "grande" = hero da home; "padrao" = campo normal (ex.: comparação). */
  tamanho?: "grande" | "padrao";
  /** Remove um id dos resultados (ex.: o já escolhido na outra coluna). */
  excluirId?: string;
  className?: string;
  autoFocus?: boolean;
}

/**
 * Busca de candidatos estilo "Google": input com autocomplete (foto, nome, cargo/UF, partido).
 * Reutilizada na home (navega pro perfil) e na comparação (preenche um slot).
 */
export function BuscaCandidato({
  onSelecionar,
  placeholder = "Busque por um candidato pelo nome...",
  tamanho = "padrao",
  excluirId,
  className,
  autoFocus,
}: BuscaCandidatoProps) {
  const [termo, setTermo] = useState("");
  const [aberto, setAberto] = useState(false);
  const [destacado, setDestacado] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const termoDebounced = useDebounce(termo, 250);
  const { data, isFetching } = useBuscaCandidatos(termoDebounced);
  const itens = (data?.itens ?? []).filter((c) => c.id !== excluirId);
  const mostrar = aberto && termoDebounced.trim().length >= 2;

  useEffect(() => {
    function aoClicarFora(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  function escolher(candidato: CandidaturaResumo) {
    setAberto(false);
    setTermo("");
    setDestacado(-1);
    onSelecionar(candidato);
  }

  function aoTeclar(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!mostrar || itens.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setDestacado((i) => Math.min(i + 1, itens.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setDestacado((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const alvo = itens[destacado] ?? itens[0];
      if (alvo) escolher(alvo);
    } else if (e.key === "Escape") {
      setAberto(false);
    }
  }

  const grande = tamanho === "grande";

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", grande && "mx-auto max-w-2xl", className)}
    >
      <div className="relative">
        <SearchIcon
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
            grande ? "left-5 size-5" : "left-3.5 size-4",
          )}
          aria-hidden="true"
        />
        <input
          type="search"
          value={termo}
          autoFocus={autoFocus}
          onChange={(e) => {
            setTermo(e.target.value);
            setAberto(true);
            setDestacado(-1);
          }}
          onFocus={() => setAberto(true)}
          onKeyDown={aoTeclar}
          placeholder={placeholder}
          aria-label="Buscar candidato"
          role="combobox"
          aria-expanded={mostrar}
          aria-controls="resultados-busca"
          className={cn(
            "w-full border border-border bg-field text-field-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary/40",
            grande
              ? "h-16 rounded-full pr-14 pl-14 text-base shadow-lg shadow-black/5 focus:shadow-xl"
              : "h-12 rounded-xl pr-10 pl-10 text-sm shadow-sm focus:shadow-md",
          )}
        />
        {isFetching && (
          <Loader2Icon
            className={cn(
              "absolute top-1/2 -translate-y-1/2 animate-spin text-muted-foreground",
              grande ? "right-5 size-5" : "right-3.5 size-4",
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {mostrar && (
        <div
          id="resultados-busca"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-xl"
        >
          {itens.length === 0 ? (
            <p className="px-5 py-6 text-center text-sm text-muted-foreground">
              {isFetching ? "Buscando..." : "Nenhum candidato encontrado."}
            </p>
          ) : (
            <ul className="max-h-80 overflow-auto py-1" role="listbox">
              {itens.map((c, i) => (
                <li key={c.id} role="option" aria-selected={destacado === i}>
                  <button
                    type="button"
                    onMouseEnter={() => setDestacado(i)}
                    onClick={() => escolher(c)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      destacado === i ? "bg-secondary" : "hover:bg-secondary/60",
                    )}
                  >
                    <FotoCandidato
                      fotoUrl={c.fotoUrl}
                      nome={c.nomeUrna}
                      className="size-11 shrink-0 border border-border"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground">{c.nomeUrna}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {formatarCargo(c.cargo)} · {c.uf}
                      </p>
                    </div>
                    <SeloPartido sigla={c.partidoSigla} logoUrl={c.partidoLogoUrl} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
