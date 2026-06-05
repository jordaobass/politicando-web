"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UserPlusIcon, MapPinIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EstadoVazio } from "@/components/comum/estados";
import { PerfilPolitico } from "@/components/quiz/perfil-politico";
import { CardResultadoCandidato } from "@/components/quiz/card-resultado-candidato";
import { ModalAutenticacao } from "@/components/auth/modal-autenticacao";
import { useSessao } from "@/hooks/use-sessao";
import { useResultadoQuiz } from "@/hooks/use-resultado-quiz";
import { useArmazenamento } from "@/hooks/use-storage";
import { CHAVE_UF, UFS } from "@/lib/constantes";
import type { ResultadoCandidato } from "@/lib/types";

/** Cargos em ordem de exibição. "BR" = nacional (não depende de UF). */
const CARGOS_ORDENADOS: { valor: string; rotulo: string; nacional: boolean }[] = [
  { valor: "Presidente", rotulo: "Presidente", nacional: true },
  { valor: "Governador", rotulo: "Governador", nacional: false },
  { valor: "Senador", rotulo: "Senador", nacional: false },
  { valor: "DeputadoFederal", rotulo: "Deputado Federal", nacional: false },
  { valor: "DeputadoEstadual", rotulo: "Deputado Estadual", nacional: false },
  { valor: "DeputadoDistrital", rotulo: "Deputado Distrital", nacional: false },
];

const MAX_POR_CARGO = 6;

export function ResultadoView() {
  const { resultado } = useResultadoQuiz();
  const { autenticado } = useSessao();
  const [dispensado, setDispensado] = useState(false);
  const [uf, gravarUf] = useArmazenamento("local", CHAVE_UF);

  const porCargo = useMemo(() => {
    const mapa = new Map<string, ResultadoCandidato[]>();
    for (const c of resultado?.resultado ?? []) {
      const lista = mapa.get(c.cargo) ?? [];
      lista.push(c);
      mapa.set(c.cargo, lista);
    }
    return mapa;
  }, [resultado]);

  const temResultado = Boolean(resultado);
  const modalAberto = temResultado && !autenticado && !dispensado;

  if (!resultado) {
    return (
      <EstadoVazio
        titulo="Nenhum resultado encontrado"
        descricao="Faça o quiz para ver seu perfil e seus matches."
        acao={
          <Button asChild>
            <Link href="/quiz">Fazer o quiz</Link>
          </Button>
        }
      />
    );
  }

  const temCargosEstaduais = CARGOS_ORDENADOS.some(
    (c) => !c.nacional && (porCargo.get(c.valor)?.length ?? 0) > 0,
  );

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <PerfilPolitico perfil={resultado.perfil} />
          {!autenticado && (
            <Card className="bg-accent text-accent-foreground">
              <CardContent className="space-y-3 text-center">
                <UserPlusIcon className="mx-auto size-7" aria-hidden="true" />
                <p className="font-medium">Quer o resultado completo?</p>
                <p className="text-sm text-accent-foreground/80">
                  Crie sua conta para salvar comparações e ver todos os detalhes.
                </p>
                <Button className="w-full" onClick={() => setDispensado(false)}>
                  Criar conta e ver resultado completo
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <section className="space-y-8">
          {resultado.resultado.length === 0 && (
            <EstadoVazio
              titulo="Sem candidatos para exibir"
              descricao="Ainda não há candidatos compatíveis para mostrar."
            />
          )}

          {/* Seletor de UF para os cargos estaduais */}
          {temCargosEstaduais && (
            <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/40 px-4 py-3">
              <MapPinIcon className="size-4 text-muted-foreground" aria-hidden="true" />
              <label htmlFor="uf-eleitor" className="text-sm font-medium">
                Sua UF (para Governador, Senador e Deputados):
              </label>
              <select
                id="uf-eleitor"
                value={uf ?? ""}
                onChange={(e) => gravarUf(e.target.value || null)}
                className="h-9 rounded-md border bg-field px-3 text-sm text-field-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Selecione…</option>
                {UFS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          )}

          {CARGOS_ORDENADOS.map((cargo) => {
            let lista = porCargo.get(cargo.valor) ?? [];
            if (lista.length === 0) return null;
            if (!cargo.nacional) {
              if (!uf) return null; // sem UF escolhida, não mostra cargos estaduais
              lista = lista.filter((c) => c.uf === uf);
              if (lista.length === 0) return null;
            }
            return (
              <SecaoCargo
                key={cargo.valor}
                titulo={cargo.rotulo}
                candidatos={lista.slice(0, cargo.nacional ? lista.length : MAX_POR_CARGO)}
                destaque={cargo.nacional}
              />
            );
          })}

          {temCargosEstaduais && !uf && (
            <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
              Selecione sua UF acima para ver seus candidatos a Governador, Senador e Deputado.
            </p>
          )}
        </section>
      </div>

      <ModalAutenticacao aberto={modalAberto} aoMudarAberto={(aberto) => setDispensado(!aberto)} />
    </>
  );
}

/** Seção de um cargo. Quando `destaque`, o 1º card ganha realce (maior match). */
function SecaoCargo({
  titulo,
  candidatos,
  destaque,
}: {
  titulo: string;
  candidatos: ResultadoCandidato[];
  destaque?: boolean;
}) {
  const [primeiro, ...resto] = candidatos;
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">{titulo}</h2>
      {destaque && primeiro ? (
        <>
          <div className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-primary">
              Seu maior match
            </span>
            <div className="rounded-xl ring-2 ring-primary">
              <CardResultadoCandidato candidato={primeiro} />
            </div>
          </div>
          {resto.length > 0 && (
            <div className="space-y-3">
              {resto.map((c) => (
                <CardResultadoCandidato key={c.candidaturaId} candidato={c} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          {candidatos.map((c) => (
            <CardResultadoCandidato key={c.candidaturaId} candidato={c} />
          ))}
        </div>
      )}
    </div>
  );
}
