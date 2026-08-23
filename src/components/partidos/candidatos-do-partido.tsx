"use client";

import { useEffect, useState } from "react";

import { CardCandidato } from "@/components/candidatos/card-candidato";
import { Paginacao } from "@/components/comum/paginacao";
import { GradeSkeleton, EstadoErro, EstadoVazio } from "@/components/comum/estados";
import { Button } from "@/components/ui/button";
import { CARGOS_FILTRO } from "@/lib/constantes";
import { useCandidaturas } from "@/hooks/use-api";
import { lerNumero, lerTexto, useEstadoNaUrl } from "@/hooks/use-estado-na-url";

const TAMANHO_PAGINA = 12;

/**
 * Candidatos associados ao partido (Correções v6, item 2).
 *
 * Usa o endpoint público de candidaturas com filtro por sigla — nenhum backend novo. Partido
 * grande passa de 500 candidaturas, então a paginação não é opcional; o filtro por cargo evita
 * que o usuário precise paginar dezenas de vezes para achar o cargo que lhe interessa.
 */
export function CandidatosDoPartido({ sigla }: { sigla: string }) {
  const { params, sincronizar } = useEstadoNaUrl();
  const [cargo, setCargo] = useState(() => lerTexto(params, "cargo"));
  const [pagina, setPagina] = useState(() => lerNumero(params, "pagina", 1));

  useEffect(() => {
    sincronizar({ cargo, pagina: pagina === 1 ? null : pagina });
  }, [sincronizar, cargo, pagina]);

  const { data, isLoading, isError, refetch } = useCandidaturas({
    partidos: [sigla],
    cargos: cargo ? [cargo] : undefined,
    pagina,
    tamanho: TAMANHO_PAGINA,
  });

  const itens = data?.itens ?? [];
  const total = data?.total ?? 0;
  const totalPaginas = data
    ? Math.max(1, Math.ceil((data.total || 0) / (data.tamanho || TAMANHO_PAGINA)))
    : 1;

  function filtrarPorCargo(valor: string) {
    setCargo(valor);
    setPagina(1);
  }

  return (
    <section className="space-y-4" aria-labelledby="titulo-candidatos-partido">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="titulo-candidatos-partido" className="text-lg font-semibold text-foreground">
          Candidatos do {sigla}
        </h2>
        {!isLoading && !isError && (
          <span className="text-sm text-muted-foreground tabular-nums">
            {total} {total === 1 ? "candidato" : "candidatos"}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={cargo === "" ? "default" : "outline"}
          size="sm"
          onClick={() => filtrarPorCargo("")}
          aria-pressed={cargo === ""}
        >
          Todos
        </Button>
        {CARGOS_FILTRO.map((c) => (
          <Button
            key={c.valor}
            variant={cargo === c.valor ? "default" : "outline"}
            size="sm"
            onClick={() => filtrarPorCargo(c.valor)}
            aria-pressed={cargo === c.valor}
          >
            {c.rotulo}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <GradeSkeleton quantidade={6} />
      ) : isError ? (
        <EstadoErro
          titulo="Não foi possível carregar os candidatos do partido"
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
          titulo="Nenhum candidato registrado"
          descricao={
            cargo
              ? "Este partido não tem candidato publicado para o cargo selecionado."
              : "Este partido ainda não tem candidatos publicados nesta eleição."
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {itens.map((candidato) => (
              <CardCandidato key={candidato.id} candidato={candidato} />
            ))}
          </div>
          <Paginacao pagina={pagina} totalPaginas={totalPaginas} onMudar={setPagina} />
        </>
      )}
    </section>
  );
}
