"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, Loader2Icon, SearchIcon, XIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { SeloPartido } from "@/components/comum/selo-partido";
import { useCandidaturas } from "@/hooks/use-api";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { formatarCargo } from "@/lib/format";
import type { CandidaturaResumo } from "@/lib/types";

interface SeletorFiltradoProps {
  rotulo: string;
  /** Cargo (enum do backend) já selecionado; usado para filtrar a busca. */
  cargo: string;
  /** UF do filtro (undefined quando o cargo não exige estado). */
  uf?: string;
  selecionado: CandidaturaResumo | null;
  onSelecionar: (candidato: CandidaturaResumo | null) => void;
  /** Id já escolhido na outra coluna (some dos resultados). */
  excluirId?: string;
}

/**
 * Seleção de candidato restrita ao cargo/UF do comparativo (US-COMP-01). Ao focar com cargo
 * (e estado, quando aplicável) definidos, a lista aparece imediatamente sem digitar; digitar
 * filtra por nome. Só é montado pela tela quando os filtros já habilitam a busca.
 */
export function SeletorCandidaturaFiltrado({
  rotulo,
  cargo,
  uf,
  selecionado,
  onSelecionar,
  excluirId,
}: SeletorFiltradoProps) {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const termoDebounced = useDebounce(termo, 250);

  const { data, isFetching } = useCandidaturas({
    cargos: [cargo],
    ufs: uf ? [uf] : undefined,
    q: termoDebounced.trim() || undefined,
    // Alto o bastante para listar todos do cargo/UF (dep. federal máx. ~70 num estado) e o scroll
    // percorrer a lista inteira — sem obrigar a buscar por nome (correção do card v2). A busca
    // por nome continua estreitando os resultados.
    tamanho: 100,
  });
  const itens = (data?.itens ?? []).filter((c) => c.id !== excluirId);

  useEffect(() => {
    function aoClicarFora(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setAberto(false);
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  if (selecionado) {
    return (
      <div className="space-y-2">
        <Label>{rotulo}</Label>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          <FotoCandidato
            fotoUrl={selecionado.fotoUrl}
            nome={selecionado.nomeUrna}
            className="size-11 shrink-0 border border-border"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-foreground">{selecionado.nomeUrna}</p>
            <p className="truncate text-xs text-muted-foreground">
              {formatarCargo(selecionado.cargo)}
              {selecionado.uf && selecionado.uf !== "BR" ? ` · ${selecionado.uf}` : ""}
            </p>
          </div>
          <SeloPartido sigla={selecionado.partidoSigla} logoUrl={selecionado.partidoLogoUrl} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSelecionar(null)}
            aria-label={`Trocar ${rotulo}`}
          >
            <XIcon className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label>{rotulo}</Label>
      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="text"
          value={termo}
          placeholder="Buscar candidato…"
          aria-label={rotulo}
          onFocus={() => setAberto(true)}
          onChange={(e) => {
            setTermo(e.target.value);
            setAberto(true);
          }}
          className="h-11 w-full rounded-xl border border-border bg-card pr-9 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <ChevronDownIcon
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />

        {aberto && (
          <div className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-border bg-card p-1 shadow-lg">
            {isFetching && itens.length === 0 ? (
              <p className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" aria-hidden="true" /> Buscando…
              </p>
            ) : itens.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">Nenhum candidato encontrado.</p>
            ) : (
              itens.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onSelecionar(c);
                    setAberto(false);
                    setTermo("");
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left",
                    "hover:bg-muted focus:bg-muted focus:outline-none",
                  )}
                >
                  <FotoCandidato
                    fotoUrl={c.fotoUrl}
                    nome={c.nomeUrna}
                    className="size-9 shrink-0 border border-border"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{c.nomeUrna}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {formatarCargo(c.cargo)}
                      {c.uf && c.uf !== "BR" ? ` · ${c.uf}` : ""}
                    </p>
                  </div>
                  <SeloPartido sigla={c.partidoSigla} logoUrl={c.partidoLogoUrl} />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
