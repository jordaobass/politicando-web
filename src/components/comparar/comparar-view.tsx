"use client";

import { useState } from "react";
import { BookmarkIcon, ListIcon } from "lucide-react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectSimples } from "@/components/comum/select-simples";
import { SeletorCandidaturaFiltrado } from "@/components/comparar/seletor-candidatura-filtrado";
import { ColunaCandidato } from "@/components/comparar/coluna-candidato";
import { ComparacaoRadar } from "@/components/comparar/comparacao-radar";
import { ComparacaoCategorias } from "@/components/comparar/comparacao-categorias";
import { RegistroCuradoria } from "@/components/comparar/registro-curadoria";
import { BotaoSalvarComparacao } from "@/components/comparar/botao-salvar-comparacao";
import { EstadoErro } from "@/components/comum/estados";
import { CARGOS, UFS } from "@/lib/constantes";
import { useCandidatura, useComparar } from "@/hooks/use-api";
import { useSessao } from "@/hooks/use-sessao";
import type { CandidaturaResumo } from "@/lib/types";

/** Cargos comparáveis (US-COMP-01). Estado só é exigido por Governador e Deputado Federal. */
const CARGOS_COMPARACAO = CARGOS.filter((c) =>
  ["Presidente", "Governador", "Senador", "DeputadoFederal"].includes(c.valor),
);
const exigeEstado = (cargo: string) => cargo === "Governador" || cargo === "DeputadoFederal";

interface CompararViewProps {
  aInicial?: string;
  bInicial?: string;
}

export function CompararView({ aInicial = "", bInicial = "" }: CompararViewProps) {
  const { autenticado } = useSessao();
  const [cargo, setCargo] = useState("");
  const [uf, setUf] = useState("");
  const [a, setA] = useState<CandidaturaResumo | null>(null);
  const [b, setB] = useState<CandidaturaResumo | null>(null);
  // Troca de cargo/estado pendente de confirmação (quando já há candidato escolhido).
  const [pendente, setPendente] = useState<{ campo: "cargo" | "uf"; valor: string } | null>(null);

  // Pré-preenchimento ao chegar do card/perfil: deriva cargo/UF do Candidato A (US-COMP-01, cenário 4).
  // Ajuste de estado na fase de render (padrão React p/ sincronizar dado externo uma vez), sem effect.
  const { data: detalheA } = useCandidatura(aInicial);
  const { data: detalheB } = useCandidatura(bInicial);
  const [preenchidoDe, setPreenchidoDe] = useState<string | null>(null);
  if (aInicial && detalheA && preenchidoDe !== aInicial) {
    setPreenchidoDe(aInicial);
    setCargo(detalheA.cargo);
    setUf(exigeEstado(detalheA.cargo) ? detalheA.uf : "");
    setA(resumoDe(detalheA.id, detalheA.cargo, detalheA.uf, detalheA.politico.nomeUrna,
      detalheA.partidoSigla, detalheA.partidoLogoUrl, detalheA.politico.fotoUrl));
  }
  // Deep-link com os dois (ex.: abrir uma comparação salva): pré-preenche o Candidato B também.
  const [preenchidoBDe, setPreenchidoBDe] = useState<string | null>(null);
  if (bInicial && detalheB && preenchidoBDe !== bInicial) {
    setPreenchidoBDe(bInicial);
    setB(resumoDe(detalheB.id, detalheB.cargo, detalheB.uf, detalheB.politico.nomeUrna,
      detalheB.partidoSigla, detalheB.partidoLogoUrl, detalheB.politico.fotoUrl));
  }

  const temSelecao = Boolean(a || b);
  const buscaHabilitada = Boolean(cargo) && (!exigeEstado(cargo) || Boolean(uf));

  /** Troca de filtro: pede confirmação se já houver candidato; senão aplica direto. */
  function alterarFiltro(campo: "cargo" | "uf", valor: string) {
    if (temSelecao) {
      setPendente({ campo, valor });
      return;
    }
    aplicarFiltro(campo, valor);
  }

  function aplicarFiltro(campo: "cargo" | "uf", valor: string) {
    if (campo === "cargo") {
      setCargo(valor);
      if (!exigeEstado(valor)) setUf("");
    } else {
      setUf(valor);
    }
  }

  function confirmarTroca() {
    if (!pendente) return;
    setA(null);
    setB(null);
    aplicarFiltro(pendente.campo, pendente.valor);
    setPendente(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={autenticado ? "/perfil?aba=comparacoes" : "/login"}>
            <ListIcon className="size-4" aria-hidden="true" />
            Comparações salvas
          </Link>
        </Button>
        {a && b && <BotaoSalvarComparacao a={a.id} b={b.id} />}
        {a && b && !autenticado && (
          <Button asChild size="sm">
            <Link href="/login">
              <BookmarkIcon className="size-4" aria-hidden="true" />
              Salvar
            </Link>
          </Button>
        )}
      </div>

      {/* Filtros: Cargo + Estado (condicional). */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Cargo</Label>
          <SelectSimples
            valor={cargo}
            onValueChange={(v) => alterarFiltro("cargo", v)}
            placeholder="Selecione o cargo"
            opcoes={CARGOS_COMPARACAO.map((c) => ({ valor: c.valor, rotulo: c.rotulo }))}
          />
        </div>
        {exigeEstado(cargo) && (
          <div className="space-y-2">
            <Label>Estado</Label>
            <SelectSimples
              valor={uf}
              onValueChange={(v) => alterarFiltro("uf", v)}
              placeholder="Selecione o estado"
              opcoes={UFS.map((u) => ({ valor: u, rotulo: u }))}
            />
          </div>
        )}
      </div>

      {/* Seleção dos candidatos: A habilita após cargo/UF; B habilita após A. */}
      <div className="grid gap-4 sm:grid-cols-2">
        {buscaHabilitada ? (
          <SeletorCandidaturaFiltrado
            rotulo="Candidato A"
            cargo={cargo}
            uf={exigeEstado(cargo) ? uf : undefined}
            selecionado={a}
            onSelecionar={setA}
            excluirId={b?.id}
          />
        ) : (
          <CampoDesabilitado rotulo="Candidato A" texto="Selecione o cargo e o estado primeiro" />
        )}

        {buscaHabilitada && a ? (
          <SeletorCandidaturaFiltrado
            rotulo="Candidato B"
            cargo={cargo}
            uf={exigeEstado(cargo) ? uf : undefined}
            selecionado={b}
            onSelecionar={setB}
            excluirId={a?.id}
          />
        ) : (
          <CampoDesabilitado rotulo="Candidato B" texto="Escolha o Candidato A primeiro" />
        )}
      </div>

      {a && b && <Resultado aId={a.id} bId={b.id} autenticado={autenticado} />}

      <Dialog open={pendente !== null} onOpenChange={(aberto) => !aberto && setPendente(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Trocar {pendente?.campo === "uf" ? "estado" : "cargo"}?</DialogTitle>
            <DialogDescription>
              Mudar o cargo ou estado vai limpar os candidatos selecionados. Deseja continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendente(null)}>
              Cancelar
            </Button>
            <Button onClick={confirmarTroca}>Sim, continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** Resultado da comparação: cards A/B + temas + radar (US-COMP-02). */
function Resultado({ aId, bId, autenticado }: { aId: string; bId: string; autenticado: boolean }) {
  const { data, isLoading, isError } = useComparar(aId, bId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <EstadoErro
        titulo="Não foi possível comparar"
        descricao="Verifique a API e tente selecionar os candidatos novamente."
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <ColunaCandidato dado={data.a} />
        <ColunaCandidato dado={data.b} />
      </div>
      <ComparacaoCategorias a={data.a} b={data.b} autenticado={autenticado} />
      <RegistroCuradoria a={data.a} b={data.b} />
      <ComparacaoRadar a={data.a} b={data.b} />
    </div>
  );
}

function CampoDesabilitado({ rotulo, texto }: { rotulo: string; texto: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground">{rotulo}</Label>
      <div className="flex h-11 items-center rounded-xl border border-dashed border-border bg-muted/40 px-3 text-sm text-muted-foreground">
        {texto}
      </div>
    </div>
  );
}

function resumoDe(
  id: string,
  cargo: string,
  uf: string,
  nomeUrna: string,
  partidoSigla: string,
  partidoLogoUrl: string | null | undefined,
  fotoUrl: string | null,
): CandidaturaResumo {
  return {
    id,
    nomeUrna,
    partidoSigla,
    partidoLogoUrl: partidoLogoUrl ?? null,
    cargo,
    uf,
    numeroUrna: "",
    fotoUrl,
    origem: "PreCandidato",
    scores: [],
  };
}
