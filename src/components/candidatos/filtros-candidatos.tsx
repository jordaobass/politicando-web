"use client";

import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CARGOS, UFS } from "@/lib/constantes";
import { usePartidos } from "@/hooks/use-api";

export interface ValoresFiltro {
  q: string;
  cargos: string[];
  ufs: string[];
  partidos: string[];
}

interface FiltrosCandidatosProps {
  valores: ValoresFiltro;
  onChange: (valores: ValoresFiltro) => void;
}

/**
 * Filtros da listagem: no desktop, sidebar fixa; no mobile, um drawer lateral sobreposto
 * (Sheet) acionado pelo botão "Filtros". O conteúdo (PainelFiltros) é o mesmo nos dois.
 */
export function FiltrosCandidatos({ valores, onChange }: FiltrosCandidatosProps) {
  return (
    <>
      {/* Mobile: botão que abre o painel lateral sobreposto */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium"
              />
            }
          >
            <SlidersHorizontalIcon className="size-4" aria-hidden="true" />
            Filtros
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <PainelFiltros valores={valores} onChange={onChange} />
            <SheetClose
              render={
                <Button className="mt-auto w-full bg-accent text-accent-foreground hover:bg-accent/90" />
              }
            >
              Ver resultados
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: sidebar fixa */}
      <aside className="hidden space-y-6 rounded-xl bg-card p-5 text-sm ring-1 ring-foreground/10 lg:sticky lg:top-20 lg:block">
        <PainelFiltros valores={valores} onChange={onChange} />
      </aside>
    </>
  );
}

/** Conteúdo dos filtros (busca, cargo, estado, partido), reutilizado na sidebar e no drawer. */
function PainelFiltros({ valores, onChange }: FiltrosCandidatosProps) {
  const { data: partidos } = usePartidos();

  function definir<K extends keyof ValoresFiltro>(chave: K, valor: ValoresFiltro[K]) {
    onChange({ ...valores, [chave]: valor });
  }

  return (
    <div className="space-y-6">
      <Secao titulo="Buscar">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="busca-candidato"
            aria-label="Buscar candidato"
            placeholder="Buscar candidato…"
            className="pl-9"
            value={valores.q}
            onChange={(evento) => definir("q", evento.target.value)}
          />
        </div>
      </Secao>

      <Secao titulo="Cargo">
        <ListaCheckboxes
          nome="cargo"
          selecionados={valores.cargos}
          opcoes={CARGOS.map((c) => ({ valor: c.valor, rotulo: c.rotulo }))}
          onMudar={(valores) => definir("cargos", valores)}
        />
      </Secao>

      <Secao titulo="Estado">
        <SeletorMultiplo
          id="filtro-uf"
          placeholder="Todos os estados"
          unidade="estado"
          valores={valores.ufs}
          onMudar={(valores) => definir("ufs", valores)}
          opcoes={UFS.map((uf) => ({ valor: uf, rotulo: uf }))}
        />
      </Secao>

      <Secao titulo="Partido">
        <SeletorMultiplo
          id="filtro-partido"
          placeholder="Todos os partidos"
          unidade="partido"
          valores={valores.partidos}
          onMudar={(valores) => definir("partidos", valores)}
          opcoes={(partidos ?? []).map((p) => ({ valor: p.sigla, rotulo: p.sigla }))}
        />
      </Secao>
    </div>
  );
}

/** Seção rotulada em maiúsculas da sidebar. */
function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {titulo}
      </h2>
      {children}
    </div>
  );
}

interface Opcao {
  valor: string;
  rotulo: string;
}

/** Lista vertical de checkboxes (multisseleção), alternando o valor no array de selecionados. */
function ListaCheckboxes({
  nome,
  selecionados,
  opcoes,
  onMudar,
}: {
  nome: string;
  selecionados: string[];
  opcoes: Opcao[];
  onMudar: (valores: string[]) => void;
}) {
  function alternar(valor: string, marcado: boolean) {
    onMudar(
      marcado ? [...selecionados, valor] : selecionados.filter((v) => v !== valor),
    );
  }

  return (
    <div role="group" aria-label={nome} className="flex flex-col gap-1">
      {opcoes.map((opcao) => {
        const id = `${nome}-${opcao.valor}`;
        return (
          <Label
            key={opcao.valor}
            htmlFor={id}
            className="cursor-pointer gap-2.5 rounded-md px-2.5 py-1.5 font-normal transition-colors hover:bg-muted"
          >
            <Checkbox
              id={id}
              checked={selecionados.includes(opcao.valor)}
              onCheckedChange={(marcado) => alternar(opcao.valor, marcado)}
            />
            {opcao.rotulo}
          </Label>
        );
      })}
    </div>
  );
}

/** Dropdown com multisseleção; o gatilho resume quantos itens estão escolhidos. */
function SeletorMultiplo({
  id,
  placeholder,
  unidade,
  valores,
  onMudar,
  opcoes,
}: {
  id: string;
  placeholder: string;
  unidade: string;
  valores: string[];
  onMudar: (valores: string[]) => void;
  opcoes: Opcao[];
}) {
  return (
    <>
      <Label htmlFor={id} className="sr-only">
        {placeholder}
      </Label>
      <Select
        multiple
        value={valores}
        onValueChange={(v: string[]) => onMudar(v)}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder}>
            {(selecionados: string[]) =>
              selecionados.length === 0
                ? placeholder
                : selecionados.length === 1
                  ? selecionados[0]
                  : `${selecionados.length} ${unidade}s`
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {opcoes.map((opcao) => (
            <SelectItem key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
