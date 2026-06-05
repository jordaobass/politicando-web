"use client";

import { useState } from "react";

import { CardCandidato } from "@/components/candidatos/card-candidato";
import { Paginacao } from "@/components/comum/paginacao";
import {
  FiltrosCandidatos,
  type ValoresFiltro,
} from "@/components/candidatos/filtros-candidatos";
import {
  OrdenacaoCandidatos,
  type ValoresOrdenacao,
} from "@/components/candidatos/ordenacao-candidatos";
import { GradeSkeleton, EstadoErro, EstadoVazio } from "@/components/comum/estados";
import { useCandidaturas } from "@/hooks/use-api";
import { useDebounce } from "@/hooks/use-debounce";

const TAMANHO_PAGINA = 12;

const FILTROS_INICIAIS: ValoresFiltro = {
  q: "",
  cargos: [],
  ufs: [],
  partidos: [],
};

const ORDENACAO_INICIAL: ValoresOrdenacao = { por: "", desc: true };

/**
 * Listagem de candidatos em duas colunas: sidebar de filtros + grade de cards.
 * Todos os filtros (busca, cargo, UF, partido) vão na query da API, preservando a paginação.
 */
export function ListaCandidatos() {
  const [filtros, setFiltros] = useState<ValoresFiltro>(FILTROS_INICIAIS);
  const [ordenacao, setOrdenacao] = useState<ValoresOrdenacao>(ORDENACAO_INICIAL);
  const [pagina, setPagina] = useState(1);
  const buscaDebounced = useDebounce(filtros.q);

  const { data, isLoading, isError, isFetching, refetch } = useCandidaturas({
    q: buscaDebounced || undefined,
    cargos: filtros.cargos.length ? filtros.cargos : undefined,
    ufs: filtros.ufs.length ? filtros.ufs : undefined,
    partidos: filtros.partidos.length ? filtros.partidos : undefined,
    ordenarPor: ordenacao.por || undefined,
    desc: ordenacao.desc,
    pagina,
    tamanho: TAMANHO_PAGINA,
  });

  function aplicarFiltros(valores: ValoresFiltro) {
    setFiltros(valores);
    setPagina(1);
  }

  function aplicarOrdenacao(valores: ValoresOrdenacao) {
    setOrdenacao(valores);
    setPagina(1);
  }

  const itens = data?.itens ?? [];
  const total = data?.total ?? 0;
  const totalPaginas = data
    ? Math.max(1, Math.ceil((data.total || 0) / (data.tamanho || TAMANHO_PAGINA)))
    : 1;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Candidatos
        </h1>
        <p className="text-muted-foreground">
          Explore e compare candidatos brasileiros
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <FiltrosCandidatos valores={filtros} onChange={aplicarFiltros} />

        <div className="space-y-6">
          {isLoading ? (
            <GradeSkeleton quantidade={6} />
          ) : isError ? (
            <EstadoErro
              titulo="Não foi possível carregar os candidatos"
              descricao="Verifique a conexão com a API e tente novamente."
              acao={
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Tentar de novo
                </button>
              }
            />
          ) : itens.length === 0 ? (
            <EstadoVazio
              titulo="Nenhum candidato encontrado"
              descricao="Ajuste os filtros ou a busca para ver mais resultados."
            />
          ) : (
            <>
              <div className="flex justify-end">
                <OrdenacaoCandidatos valores={ordenacao} onChange={aplicarOrdenacao} />
              </div>
              <div
                className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
                aria-busy={isFetching}
              >
                {itens.map((candidato) => (
                  <CardCandidato key={candidato.id} candidato={candidato} />
                ))}
              </div>
              <div className="space-y-3">
                <Paginacao
                  pagina={pagina}
                  totalPaginas={totalPaginas}
                  onMudar={setPagina}
                />
                <p
                  className="text-center text-sm tabular-nums text-muted-foreground"
                  aria-live="polite"
                >
                  {total} {total === 1 ? "candidato encontrado" : "candidatos encontrados"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
