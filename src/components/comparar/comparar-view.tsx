"use client";

import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { SeletorCandidatura } from "@/components/comparar/seletor-candidatura";
import { ColunaCandidato } from "@/components/comparar/coluna-candidato";
import { ComparacaoRadar } from "@/components/comparar/comparacao-radar";
import { ComparacaoCategorias } from "@/components/comparar/comparacao-categorias";
import { BotaoSalvarComparacao } from "@/components/comparar/botao-salvar-comparacao";
import { EstadoErro, EstadoVazio } from "@/components/comum/estados";
import { useComparar } from "@/hooks/use-api";

interface CompararViewProps {
  aInicial?: string;
  bInicial?: string;
}

/** Tela de comparação lado a lado de duas candidaturas. */
export function CompararView({ aInicial = "", bInicial = "" }: CompararViewProps) {
  const [a, setA] = useState(aInicial);
  const [b, setB] = useState(bInicial);

  const habilitado = Boolean(a) && Boolean(b);
  const { data, isLoading, isError } = useComparar(a, b);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <SeletorCandidatura rotulo="Candidato A" valor={a} onChange={setA} excluir={b} />
        <SeletorCandidatura rotulo="Candidato B" valor={b} onChange={setB} excluir={a} />
      </div>

      {!habilitado ? (
        <EstadoVazio
          titulo="Selecione dois candidatos"
          descricao="Escolha um candidato em cada coluna para comparar os scores por categoria."
        />
      ) : isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <Skeleton className="h-96 w-full rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      ) : isError || !data ? (
        <EstadoErro
          titulo="Não foi possível comparar"
          descricao="Verifique a API e tente selecionar os candidatos novamente."
        />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-end">
            <BotaoSalvarComparacao a={a} b={b} />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <ColunaCandidato dado={data.a} />
            <ColunaCandidato dado={data.b} />
          </div>
          <ComparacaoRadar a={data.a} b={data.b} />
          <ComparacaoCategorias a={data.a} b={data.b} />
        </div>
      )}
    </div>
  );
}
