"use client";

import { useEffect, useState } from "react";
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
import { ComparacaoRadar, CORES_COMPARACAO } from "@/components/comparar/comparacao-radar";
import { ComparacaoCategorias } from "@/components/comparar/comparacao-categorias";
import { RegistroCuradoria } from "@/components/comparar/registro-curadoria";
import { BotaoSalvarComparacao } from "@/components/comparar/botao-salvar-comparacao";
import { EstadoErro } from "@/components/comum/estados";
import { CARGOS, UFS } from "@/lib/constantes";
import { useCandidatura, useComparar } from "@/hooks/use-api";
import { useEstadoNaUrl } from "@/hooks/use-estado-na-url";
import { useSessao } from "@/hooks/use-sessao";
import type { CandidaturaResumo } from "@/lib/types";

/** Cargos comparáveis (US-COMP-01). Só Presidente é nacional; o resto se elege por estado. */
const CARGOS_COMPARACAO = CARGOS.filter((c) =>
  ["Presidente", "Governador", "Senador", "DeputadoFederal"].includes(c.valor),
);

/**
 * Senador entrou aqui nas Correções v8 (item 2): a bancada é estadual como a de governador e
 * deputado federal, mas o cargo estava fora da regra — sem o campo de estado, a lista de
 * candidatos vinha do país inteiro.
 */
const exigeEstado = (cargo: string) => cargo !== "" && cargo !== "Presidente";

interface CompararViewProps {
  aInicial?: string;
  bInicial?: string;
  cargoInicial?: string;
  ufAInicial?: string;
  ufBInicial?: string;
}

type Pendente = { tipo: "cargo" | "ufA" | "ufB"; valor: string };

export function CompararView({
  aInicial = "",
  bInicial = "",
  cargoInicial = "",
  ufAInicial = "",
  ufBInicial = "",
}: CompararViewProps) {
  const { autenticado } = useSessao();
  // Cargo e estados também vêm da URL (Correções v6, item 3): quem escolheu o cargo, abriu um
  // perfil e voltou não pode reencontrar a tela em branco só porque ainda não escolheu ninguém.
  const [cargo, setCargo] = useState(cargoInicial);
  // Estado POR candidato (Correções v5, item 2): permite comparar entre UFs diferentes.
  const [ufA, setUfA] = useState(ufAInicial);
  const [ufB, setUfB] = useState(ufBInicial);
  const [a, setA] = useState<CandidaturaResumo | null>(null);
  const [b, setB] = useState<CandidaturaResumo | null>(null);
  // Troca (cargo/estado) pendente de confirmação quando limparia um candidato já escolhido.
  const [pendente, setPendente] = useState<Pendente | null>(null);

  // Os ids vindos da URL são congelados no primeiro render: o `sincronizar` abaixo atualiza a
  // query, o Server Component re-renderiza com novas props, e sem o congelamento o
  // pré-preenchimento reentraria a cada seleção do usuário.
  const [idsIniciais] = useState({ a: aInicial, b: bInicial });

  // Pré-preenchimento ao chegar do card/perfil ou de uma comparação salva (US-COMP-01, cenário 4).
  // Ajuste de estado na fase de render (padrão React p/ sincronizar dado externo uma vez), sem effect.
  const { data: detalheA } = useCandidatura(idsIniciais.a);
  const { data: detalheB } = useCandidatura(idsIniciais.b);
  const [preenchidoDe, setPreenchidoDe] = useState<string | null>(null);
  if (idsIniciais.a && detalheA && preenchidoDe !== idsIniciais.a) {
    setPreenchidoDe(idsIniciais.a);
    setCargo(detalheA.cargo);
    setUfA(exigeEstado(detalheA.cargo) ? detalheA.uf : "");
    setA(resumoDe(detalheA.id, detalheA.cargo, detalheA.uf, detalheA.politico.nomeUrna,
      detalheA.partidoSigla, detalheA.partidoLogoUrl, detalheA.politico.fotoUrl));
  }
  const [preenchidoBDe, setPreenchidoBDe] = useState<string | null>(null);
  if (idsIniciais.b && detalheB && preenchidoBDe !== idsIniciais.b) {
    setPreenchidoBDe(idsIniciais.b);
    setUfB(exigeEstado(detalheB.cargo) ? detalheB.uf : "");
    setB(resumoDe(detalheB.id, detalheB.cargo, detalheB.uf, detalheB.politico.nomeUrna,
      detalheB.partidoSigla, detalheB.partidoLogoUrl, detalheB.politico.fotoUrl));
  }

  const precisaEstado = exigeEstado(cargo);
  const aHabilitado = Boolean(cargo) && (!precisaEstado || Boolean(ufA));
  const bHabilitado = aHabilitado && Boolean(a) && (!precisaEstado || Boolean(ufB));

  // Reflete a seleção na URL para que, ao abrir um perfil e voltar, a comparação seja
  // restaurada em vez de vir vazia (v6 §3.3, concluído no v7 item 2c: o `replaceState`
  // manual saiu — o hook usa `router.replace` e o congelamento de `idsIniciais` acima
  // impede o pré-preenchimento de reentrar quando o Server Component re-renderiza).
  const { sincronizar } = useEstadoNaUrl();
  useEffect(() => {
    sincronizar({
      cargo,
      ufA,
      ufB,
      a: a?.id ?? null,
      b: b?.id ?? null,
    });
  }, [a, b, cargo, ufA, ufB, sincronizar]);

  /** Troca o cargo: se já houver candidato, confirma (limpa tudo); senão aplica direto. */
  function trocarCargo(valor: string) {
    if (a || b) return setPendente({ tipo: "cargo", valor });
    aplicarCargo(valor);
  }
  function aplicarCargo(valor: string) {
    setCargo(valor);
    setUfA("");
    setUfB("");
  }
  /** Troca o estado de um lado: se aquele candidato já está escolhido, confirma (limpa só ele). */
  function trocarUf(lado: "A" | "B", valor: string) {
    const escolhido = lado === "A" ? a : b;
    if (escolhido) return setPendente({ tipo: lado === "A" ? "ufA" : "ufB", valor });
    (lado === "A" ? setUfA : setUfB)(valor);
  }

  function confirmarTroca() {
    if (!pendente) return;
    if (pendente.tipo === "cargo") {
      setA(null);
      setB(null);
      aplicarCargo(pendente.valor);
    } else if (pendente.tipo === "ufA") {
      setA(null);
      setUfA(pendente.valor);
    } else {
      setB(null);
      setUfB(pendente.valor);
    }
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

      {/* Cargo (compartilhado). O estado agora é por candidato — permite comparar entre UFs. */}
      <div className="max-w-sm space-y-2">
        <Label>Cargo</Label>
        <SelectSimples
          valor={cargo}
          onValueChange={trocarCargo}
          placeholder="Selecione o cargo"
          opcoes={CARGOS_COMPARACAO.map((c) => ({ valor: c.valor, rotulo: c.rotulo }))}
        />
      </div>

      {/* Cada candidato tem seu próprio estado (quando o cargo exige) + seletor. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ColunaSelecao
          rotulo="Candidato A"
          cargo={cargo}
          precisaEstado={precisaEstado}
          uf={ufA}
          onUf={(v) => trocarUf("A", v)}
          habilitado={aHabilitado}
          textoDesabilitado={
            !cargo ? "Selecione o cargo primeiro" : "Selecione o estado do Candidato A"
          }
          selecionado={a}
          onSelecionar={setA}
          excluirId={b?.id}
        />
        <ColunaSelecao
          rotulo="Candidato B"
          cargo={cargo}
          precisaEstado={precisaEstado}
          uf={ufB}
          onUf={(v) => trocarUf("B", v)}
          habilitado={bHabilitado}
          textoDesabilitado={
            !a ? "Escolha o Candidato A primeiro" : "Selecione o estado do Candidato B"
          }
          selecionado={b}
          onSelecionar={setB}
          excluirId={a?.id}
        />
      </div>

      {a && b && <Resultado aId={a.id} bId={b.id} autenticado={autenticado} />}

      <Dialog open={pendente !== null} onOpenChange={(aberto) => !aberto && setPendente(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Trocar {pendente?.tipo === "cargo" ? "cargo" : "estado"}?</DialogTitle>
            <DialogDescription>
              {pendente?.tipo === "cargo"
                ? "Mudar o cargo vai limpar os dois candidatos selecionados. Deseja continuar?"
                : "Mudar o estado vai limpar o candidato já escolhido nesta coluna. Deseja continuar?"}
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

/** Coluna de seleção de um candidato: estado próprio (quando o cargo exige) + seletor. */
function ColunaSelecao({
  rotulo,
  cargo,
  precisaEstado,
  uf,
  onUf,
  habilitado,
  textoDesabilitado,
  selecionado,
  onSelecionar,
  excluirId,
}: {
  rotulo: string;
  cargo: string;
  precisaEstado: boolean;
  uf: string;
  onUf: (v: string) => void;
  habilitado: boolean;
  textoDesabilitado: string;
  selecionado: CandidaturaResumo | null;
  onSelecionar: (c: CandidaturaResumo | null) => void;
  excluirId?: string;
}) {
  return (
    <div className="space-y-2">
      {precisaEstado && Boolean(cargo) && (
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Estado do {rotulo}</Label>
          <SelectSimples
            valor={uf}
            onValueChange={onUf}
            placeholder="Selecione o estado"
            opcoes={UFS.map((u) => ({ valor: u, rotulo: u }))}
          />
        </div>
      )}
      {habilitado ? (
        <SeletorCandidaturaFiltrado
          rotulo={rotulo}
          cargo={cargo}
          uf={precisaEstado ? uf : undefined}
          selecionado={selecionado}
          onSelecionar={onSelecionar}
          excluirId={excluirId}
        />
      ) : (
        <CampoDesabilitado rotulo={rotulo} texto={textoDesabilitado} />
      )}
    </div>
  );
}

/** Resultado da comparação: cards A/B + temas + radar (US-COMP-02). */
function Resultado({ aId, bId, autenticado }: { aId: string; bId: string; autenticado: boolean }) {
  const { data, isLoading, isError } = useComparar(aId, bId);
  // Passada aos perfis para o botão "Voltar para comparação" (item 6d do card v2).
  const voltarUrl = `/comparar?a=${aId}&b=${bId}`;

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
        <ColunaCandidato dado={data.a} cor={CORES_COMPARACAO.a} voltarUrl={voltarUrl} />
        <ColunaCandidato dado={data.b} cor={CORES_COMPARACAO.b} voltarUrl={voltarUrl} />
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
