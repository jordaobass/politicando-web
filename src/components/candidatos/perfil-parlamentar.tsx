"use client";

import {
  CircleCheckBigIcon,
  ClockIcon,
  HistoryIcon,
  ScrollTextIcon,
  SparklesIcon,
  XCircleIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MensagemSemDados } from "@/components/comum/bloco-sem-dados";
import { TextoRico } from "@/components/comum/texto-rico";
import { ScorePorTemaCard } from "@/components/candidatos/score-por-tema-card";
import { CartaoContagem } from "@/components/candidatos/atividade/cartao-contagem";
import { PainelPresenca } from "@/components/candidatos/atividade/painel-presenca";
import { PainelGabinete } from "@/components/candidatos/atividade/painel-gabinete";
import { PainelComissoes } from "@/components/candidatos/atividade/painel-comissoes";
import { BlocoBloqueado } from "@/components/candidatos/bloco-bloqueado";
import { formatarCargo } from "@/lib/format";
import type { AtividadeLegislativa, CandidaturaDetalhe, ExercicioCargo } from "@/lib/types";

const ano = (d?: string | null) => (d ? d.slice(0, 4) : "");

/**
 * Perfil de deputado (federal/estadual/distrital) e senador na MESMA espinha visual de
 * Presidente/Governador (Correções v7, item 3 — prints do cliente: card "Score por tema" 0–5 é o
 * layout correto; a régua Progressista↔Conservador saiu do perfil, revogando a v6 §4.4/E12).
 *
 * Todos os blocos são SEMPRE renderizados (item 4): sem dado suficiente, o bloco fica na tela com
 * a mensagem padrão. Os gates de login dos cartões US-DEP-03/US-SEN-03 permanecem (decisão E13) —
 * mas gate só faz sentido quando HÁ conteúdo a desbloquear; sem dado, vale a mensagem.
 */
export function PerfilParlamentar({
  data,
  atividade,
  autenticado,
}: {
  data: CandidaturaDetalhe;
  atividade?: AtividadeLegislativa;
  autenticado: boolean;
}) {
  const { politico } = data;
  const resumo = atividade?.resumo;
  const ehSenador = (data.cargo ?? "").toLowerCase().includes("senador");
  const gabinetes = (atividade?.gabinetes ?? []).filter((g) => g.total > 0);
  const temPresenca = (atividade?.presencas?.length ?? 0) > 0;
  const temGabinete = gabinetes.length > 0;
  const temComissoes = (atividade?.comissoes?.length ?? 0) > 0;
  const exercicios = data.exercicios ?? [];
  const totalProposicoes = resumo
    ? resumo.projetosTotal + (ehSenador ? resumo.fiscalizacaoTotal : 0)
    : 0;
  const temAtividade =
    !!resumo &&
    (resumo.projetosTotal > 0 ||
      resumo.votacoes > 0 ||
      resumo.relatorias > 0 ||
      resumo.presencaPercentual !== null ||
      temGabinete);

  return (
    <div className="space-y-6">
      {/* Resumo da análise (observação da IA): sem atividade legislativa ele não teria onde
          aparecer (vive no card de Proposições) — ganha card próprio para não sumir da tela. */}
      {!temAtividade && data.observacaoIa && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <SparklesIcon className="size-4 text-primary" aria-hidden="true" />
              Resumo da análise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <TextoRico texto={data.observacaoIa} className="text-sm text-muted-foreground" />
            {data.propostasResumo && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Propostas: </span>
                <TextoRico
                  texto={data.propostasResumo}
                  className="mt-1 text-sm text-muted-foreground"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Score por tema (0–5 + "Ver análise") — mesmo card da família Presidente/Governador. */}
        <ScorePorTemaCard
          nomeUrna={politico.nomeUrna}
          scores={data.scores}
          testid="bloco-score"
          className="h-full"
        />

        {/* Histórico — mesmo card de exercícios do perfil de Presidente. */}
        <Card data-testid="bloco-historico" className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HistoryIcon className="size-4 text-primary" aria-hidden="true" />
              Histórico
            </CardTitle>
          </CardHeader>
          <CardContent>
            {exercicios.length === 0 ? (
              <MensagemSemDados />
            ) : (
              <ul className="space-y-1.5 text-sm">
                {exercicios.map((e, i) => (
                  <li key={`${e.cargo}-${i}`} className="text-foreground">
                    <span className="font-semibold">{rotuloCargo(e)}</span>
                    <span className="text-muted-foreground">
                      {" "}· {ano(e.inicio)} – {e.atual ? "atual" : ano(e.fim)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Proposições Legislativas (US-SEN-03 / US-DEP-03): grupos + resumo de IA. */}
        <Card className="h-full" data-testid="bloco-proposicoes">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ScrollTextIcon className="size-4 text-primary" aria-hidden="true" />
              Proposições legislativas
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Matérias de autoria de {politico.nomeUrna} e seu desfecho.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            {!resumo ? (
              <MensagemSemDados />
            ) : (
              <>
                <GrupoProposicao
                  titulo="Projetos de Lei"
                  total={resumo.projetosTotal}
                  aprovados={resumo.projetosAprovados}
                  emTramitacao={resumo.projetosEmTramitacao}
                  rejeitados={resumo.projetosRejeitados}
                />

                {ehSenador && (
                  <GrupoProposicao
                    titulo="Fiscalização e Controle"
                    descricao="Requerimentos e indicações (RQS/REQ/IND)."
                    total={resumo.fiscalizacaoTotal}
                    aprovados={resumo.fiscalizacaoAprovadas}
                    emTramitacao={resumo.fiscalizacaoEmTramitacao}
                    rejeitados={resumo.fiscalizacaoRejeitadas}
                  />
                )}

                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="mb-1 flex items-center gap-2 text-sm font-medium text-foreground">
                    <SparklesIcon className="size-4 text-primary" aria-hidden="true" />
                    Resumo
                  </p>
                  <TextoRico
                    texto={
                      totalProposicoes === 0
                        ? `${ehSenador ? "Este senador" : politico.nomeUrna} não possui proposições cadastradas.`
                        : (data.observacaoIa ?? "Resumo temporariamente indisponível.")
                    }
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Presença em plenário — gated sem login QUANDO há dado (E13). */}
        <BlocoAtividade
          titulo="Presença em plenário"
          descricao={
            ehSenador
              ? "Comparecimento às votações nominais — total do mandato e últimos anos."
              : "Comparecimento às sessões — total do mandato e últimos anos."
          }
          temDado={temPresenca}
          autenticado={autenticado}
          className="h-full"
        >
          <PainelPresenca presencas={atividade?.presencas ?? []} cargo={data.cargo} />
        </BlocoAtividade>
      </div>

      {/* Gastos do mandato — largura cheia, gated sem login quando há dado. */}
      <BlocoAtividade
        titulo="Gastos do mandato"
        descricao="Cota parlamentar (CEAP) — economia estimada e despesas por ano."
        temDado={temGabinete}
        autenticado={autenticado}
      >
        <PainelGabinete gabinetes={gabinetes} uf={data.uf} cargo={data.cargo} />
      </BlocoAtividade>

      {/* Atuação em comissões — largura cheia, gated sem login quando há dado. */}
      <BlocoAtividade
        titulo="Atuação em comissões"
        descricao={`Comissões de ${politico.nomeUrna} por ano, como titular ou suplente.`}
        temDado={temComissoes}
        autenticado={autenticado}
      >
        <PainelComissoes comissoes={atividade?.comissoes ?? []} />
      </BlocoAtividade>
    </div>
  );
}

/**
 * Bloco de atividade sempre presente na tela (item 4): sem dado → mensagem padrão;
 * com dado e sem login → gate de cadastro; com dado e logado → conteúdo.
 */
function BlocoAtividade({
  titulo,
  descricao,
  temDado,
  autenticado,
  className,
  children,
}: {
  titulo: string;
  descricao: string;
  temDado: boolean;
  autenticado: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (temDado && !autenticado) return <BlocoBloqueado titulo={titulo} />;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{titulo}</CardTitle>
        {temDado && <p className="text-sm text-muted-foreground">{descricao}</p>}
      </CardHeader>
      <CardContent>{temDado ? children : <MensagemSemDados />}</CardContent>
    </Card>
  );
}

/**
 * Grupo de proposições dentro do bloco "Proposições legislativas": título opcional +
 * grade de 4 contadores (Total/Aprovados/Em tramitação/Rejeitados).
 */
function GrupoProposicao({
  titulo,
  descricao,
  total,
  aprovados,
  emTramitacao,
  rejeitados,
}: {
  titulo: string;
  descricao?: string;
  total: number;
  aprovados: number;
  emTramitacao: number;
  rejeitados: number;
}) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold text-foreground">{titulo}</p>
        {descricao && <p className="text-xs text-muted-foreground">{descricao}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <CartaoContagem rotulo="Total" valor={total} icone={ScrollTextIcon} />
        <CartaoContagem rotulo="Aprovados" valor={aprovados} icone={CircleCheckBigIcon} destaque />
        <CartaoContagem rotulo="Em tramitação" valor={emTramitacao} icone={ClockIcon} />
        <CartaoContagem rotulo="Rejeitados" valor={rejeitados} icone={XCircleIcon} />
      </div>
    </div>
  );
}

function rotuloCargo(e: ExercicioCargo): string {
  const cargo = formatarCargo(e.cargo);
  return e.uf && e.uf !== "BR" ? `${cargo} · ${e.uf}` : cargo;
}
