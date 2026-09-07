"use client";

import { useEffect, useState } from "react";

import { CardCandidato } from "@/components/candidatos/card-candidato";
import { DisclaimerHistorico } from "@/components/candidatos/disclaimer-historico";
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
import {
  lerBooleano,
  lerLista,
  lerNumero,
  lerTexto,
  useEstadoNaUrl,
  useMemorizarUrlRetorno,
} from "@/hooks/use-estado-na-url";
import { CHAVE_RETORNO_CANDIDATOS } from "@/lib/constantes";

const TAMANHO_PAGINA = 12;

const ORDENACAO_INICIAL: ValoresOrdenacao = { por: "", desc: true };

/**
 * Listagem de candidatos em duas colunas: sidebar de filtros + grade de cards.
 * Todos os filtros (busca, cargo, UF, partido) vão na query da API, preservando a paginação.
 *
 * O estado inicial vem da URL e volta para ela a cada mudança (Correções v6, item 3): abrir um
 * candidato e voltar pelo navegador restaura busca, filtros, ordenação e página.
 */
export function ListaCandidatos() {
  const { params, sincronizar } = useEstadoNaUrl();
  // O botão "Voltar para candidatos" do perfil restaura esta URL (Correções v7, item 2a).
  useMemorizarUrlRetorno(CHAVE_RETORNO_CANDIDATOS);
  const [filtros, setFiltros] = useState<ValoresFiltro>(() => ({
    q: lerTexto(params, "q"),
    cargos: lerLista(params, "cargos"),
    ufs: lerLista(params, "ufs"),
    partidos: lerLista(params, "partidos"),
  }));
  const [ordenacao, setOrdenacao] = useState<ValoresOrdenacao>(() => ({
    por: lerTexto(params, "ordenarPor"),
    desc: lerBooleano(params, "desc", ORDENACAO_INICIAL.desc),
  }));
  const [pagina, setPagina] = useState(() => lerNumero(params, "pagina", 1));
  const buscaDebounced = useDebounce(filtros.q);

  // Só o termo JÁ debounced vai para a URL — senão cada tecla digitada viraria uma troca de
  // rota. Valor no padrão é omitido para a URL limpa continuar sendo `/candidatos`.
  useEffect(() => {
    sincronizar({
      q: buscaDebounced,
      cargos: filtros.cargos,
      ufs: filtros.ufs,
      partidos: filtros.partidos,
      ordenarPor: ordenacao.por,
      desc: ordenacao.por && ordenacao.desc !== ORDENACAO_INICIAL.desc ? ordenacao.desc : null,
      pagina: pagina === 1 ? null : pagina,
    });
  }, [
    sincronizar,
    buscaDebounced,
    filtros.cargos,
    filtros.ufs,
    filtros.partidos,
    ordenacao.por,
    ordenacao.desc,
    pagina,
  ]);

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

      {/* Item 7 (Correções v7): a vitrine só exibe quem tem histórico público — dizer isso aqui
          é o que evita a leitura de que candidatos "sumiram" sem explicação. */}
      <DisclaimerHistorico />

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
