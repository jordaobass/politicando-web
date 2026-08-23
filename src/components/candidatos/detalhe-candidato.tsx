"use client";

import Link from "next/link";
import {
  CircleCheckBigIcon,
  ClockIcon,
  GitCompareIcon,
  LandmarkIcon,
  ScrollTextIcon,
  WalletIcon,
  SparklesIcon,
  XCircleIcon,
} from "lucide-react";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { TextoRico, textoSimples } from "@/components/comum/texto-rico";
import { BadgeOrigem } from "@/components/comum/badge-origem";
import { BarraScore } from "@/components/comum/barra-score";
import { IconeInstagram } from "@/components/comum/icone-instagram";
import { CardCompatibilidade } from "@/components/candidatos/card-compatibilidade";
import { formatarCargo, formatarReais } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EstadoErro } from "@/components/comum/estados";
import { CartaoContagem } from "@/components/candidatos/atividade/cartao-contagem";
import { PainelPresenca } from "@/components/candidatos/atividade/painel-presenca";
import { PainelGabinete } from "@/components/candidatos/atividade/painel-gabinete";
import { PainelComissoes } from "@/components/candidatos/atividade/painel-comissoes";
import { PerfilGovernador } from "@/components/candidatos/perfil-governador";
import { PerfilPresidente } from "@/components/candidatos/perfil-presidente";
import { PainelAnaliseTematica } from "@/components/candidatos/painel-analise-tematica";
import { ResumoTema } from "@/components/candidatos/resumo-tema";
import { BlocoBloqueado } from "@/components/candidatos/bloco-bloqueado";
import { useAtividade, useCandidatura } from "@/hooks/use-api";
import { useSessao } from "@/hooks/use-sessao";

/** Rótulo amigável do tipo de histórico (US-GOV-01) exibido como badge na identidade. */
const ROTULO_TIPO_HISTORICO: Record<string, string> = {
  ex_presidente: "Mandato como presidente",
  ex_governador: "Mandato como governador",
  mandato_federal: "Mandato federal",
  prefeito: "Mandato como prefeito",
  deputado_estadual: "Mandato estadual",
  sem_mandato: "Sem mandato anterior",
};

/** Perfil completo de uma candidatura (identidade única do político + atividade legislativa). */
export function DetalheCandidato({ id }: { id: string }) {
  const { data, isLoading, isError, refetch } = useCandidatura(id);
  const { data: atividade } = useAtividade(id);
  // Cartões US-*-03: Presença e Gastos ficam fechados (gate) sem login.
  const { autenticado } = useSessao();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <EstadoErro
        titulo="Não foi possível carregar este candidato"
        descricao="Pode ser que a API esteja indisponível ou o candidato não exista."
        acao={
          <Button onClick={() => refetch()} variant="outline">
            Tentar de novo
          </Button>
        }
      />
    );
  }

  const { politico } = data;
  const resumo = atividade?.resumo;
  const gabinetes = (atividade?.gabinetes ?? []).filter((g) => g.total > 0);
  // Chip do hero: prioriza o mandato corrente (2026); cai para o ano mais recente com dado.
  const gabineteRecente = gabinetes.find((g) => g.ano === 2026) ?? gabinetes[0];
  const temGabinete = gabinetes.length > 0;
  const temComissoes = (atividade?.comissoes?.length ?? 0) > 0;
  const ehSenador = (data.cargo ?? "").toLowerCase().includes("senador");
  const ehGovernador = (data.cargo ?? "").toLowerCase().includes("governador");
  const ehPresidente = (data.cargo ?? "").toLowerCase().includes("presidente");
  const tipoHistoricoRotulo = ROTULO_TIPO_HISTORICO[data.tipoHistorico ?? ""] ?? null;
  // Bloco "Score por tema" exibe os 8 temas gerais do card (US-*-03); o eixo
  // institucional fica fora DESTE bloco — segue contando no match e na análise temática.
  const scoresDoScore = data.scores.filter((s) => s.categoria !== "Instituições e Democracia");
  const temAtividade =
    !!resumo &&
    (resumo.projetosTotal > 0 ||
      resumo.votacoes > 0 ||
      resumo.relatorias > 0 ||
      resumo.presencaPercentual !== null ||
      temGabinete);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          {/* Foto à esquerda no tamanho/posição original; TODO o restante (nome, badges,
              chip de gastos, ocupação, bio, instagram, botões) numa única coluna à direita,
              empilhado verticalmente e centralizado em relação à altura da foto. */}
          <div className="flex items-center gap-4">
            <FotoCandidato
              fotoUrl={politico.fotoUrl}
              nome={politico.nomeUrna}
              circular={false}
              ajuste="contain"
              className="aspect-[3/4] w-32 shrink-0 rounded-xl bg-card ring-1 ring-border"
            />

            <div className="min-w-0 flex-1 space-y-3">
              <div>
                <h1 className="text-2xl leading-tight font-semibold text-foreground">
                  {politico.nomeUrna}
                </h1>
                {politico.nomeCivil && politico.nomeCivil !== politico.nomeUrna && (
                  <p className="mt-1 text-sm text-muted-foreground">{politico.nomeCivil}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {data.partidoSigla && (
                  <Badge variant="outline" className="gap-1 pl-1">
                    {data.partidoLogoUrl && (
                      <Image
                        src={data.partidoLogoUrl}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 object-contain"
                        unoptimized
                      />
                    )}
                    {data.partidoSigla}
                  </Badge>
                )}
                <Badge variant="secondary">
                  {data.uf && data.uf !== "BR"
                    ? `${formatarCargo(data.cargo)} · ${data.uf}`
                    : formatarCargo(data.cargo)}
                </Badge>
                {data.numeroUrna != null && <Badge variant="outline">Nº {data.numeroUrna}</Badge>}
                {tipoHistoricoRotulo && <Badge variant="secondary">{tipoHistoricoRotulo}</Badge>}
                {/* Evita badge redundante: o tipo de histórico já comunica o mandato. */}
                {data.origem && !tipoHistoricoRotulo && <BadgeOrigem origem={data.origem} />}
              </div>

              {(gabineteRecente || data.patrimonioDeclarado != null) && (
                <div className="flex flex-wrap items-center gap-2">
                  {gabineteRecente && (
                    <div
                      title="Verba pública mensal que o parlamentar recebe para custear o mandato (passagens, combustível, escritório, divulgação). Nome oficial: Cota Parlamentar — CEAP."
                      className="flex w-fit items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm"
                    >
                      <LandmarkIcon className="size-4 text-primary" aria-hidden="true" />
                      <span className="text-muted-foreground">
                        Gastos do mandato {gabineteRecente.ano}:
                      </span>
                      <span className="font-semibold tabular-nums text-foreground">
                        {formatarReais(gabineteRecente.total)}
                      </span>
                    </div>
                  )}

                  {/* Nulo = o TSE ainda não foi importado para este cargo; zero é declaração válida. */}
                  {data.patrimonioDeclarado != null && (
                    <div
                      title="Soma dos bens que o candidato declarou ao TSE no registro da candidatura."
                      className="flex w-fit items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm"
                    >
                      <WalletIcon className="size-4 text-primary" aria-hidden="true" />
                      <span className="text-muted-foreground">Patrimônio declarado:</span>
                      <span className="font-semibold tabular-nums text-foreground">
                        {formatarReais(data.patrimonioDeclarado)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {(politico.ocupacao || politico.biografia) && (
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  {politico.ocupacao && (
                    <p>
                      <span className="font-medium text-foreground">Ocupação: </span>
                      {politico.ocupacao}
                    </p>
                  )}
                  {politico.biografia && <p>{politico.biografia}</p>}
                </div>
              )}

              {politico.instagram && (
                <Button asChild variant="ghost" size="sm" className="h-auto w-fit px-0">
                  <a
                    href={`https://instagram.com/${politico.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconeInstagram className="size-4" />
                    {politico.instagram}
                  </a>
                </Button>
              )}

              <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
                <Button asChild variant="outline">
                  <Link href={`/comparar?a=${data.id}`}>
                    <GitCompareIcon className="size-4" aria-hidden="true" />
                    Comparar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA principal: card de compatibilidade ocupa toda a largura. Mostra valor real
          se o usuário fez o quiz; caso contrário, valor ofuscado + botão para fazer o quiz. */}
      <CardCompatibilidade
        candidaturaId={data.id}
        nomeUrna={politico.nomeUrna}
        cargo={data.cargo}
        uf={data.uf}
      />

      {ehGovernador ? (
        /* Perfil de Governador nos blocos da spec (US-GOV-02..05). */
        <PerfilGovernador data={data} />
      ) : ehPresidente ? (
        /* Perfil de Presidente nos blocos da spec (US-PRES-02..06). */
        <PerfilPresidente data={data} />
      ) : (
        <>
      {/* Resumo da análise (observação da IA). Para cargos com atividade legislativa ele aparece
          dentro do card "Projetos de lei"; sem atividade (Presidente/Governador), ganha card próprio
          para não sumir da tela. */}
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
                <TextoRico texto={data.propostasResumo} className="mt-1 text-sm text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Score + Projetos de lei (só métricas) — cards visuais lado a lado (sem abas).
          Sem items-start + h-full nos cards => os dois ficam com a mesma altura. */}
      {temAtividade ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="h-full" data-testid="bloco-score">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <SparklesIcon className="size-4 text-primary" aria-hidden="true" />
                Score por tema
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Atuação em cada tema, de 0 (sem evidência) a 5 (protagonista), pela análise de IA.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.propostasResumo && (
                <p className="line-clamp-4 text-sm text-muted-foreground">
                  {textoSimples(data.propostasResumo)}
                </p>
              )}
              {scoresDoScore.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Ainda não há scores calculados para este candidato.
                </p>
              ) : (
                <div className="space-y-3">
                  {scoresDoScore.map((score) => (
                    <div key={score.categoria} className="space-y-1.5">
                      <BarraScore
                        rotulo={score.categoria}
                        /* Engajamento 0..5 (decimal). Quando ainda não calculado, mostra 0. */
                        valor={score.engajamento ?? 0}
                        escalaMax={5}
                      />
                      {/* Resumo da IA por tema, colapsável — consistente com presidente/governador. */}
                      <ResumoTema sintese={score.posicaoSintese} justificativa={score.justificativa} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proposições Legislativas (US-SEN-03 / US-DEP-03): um bloco com os grupos
              Projetos de Lei e — para senadores — Fiscalização e Controle, + um resumo de IA. */}
          {resumo && (
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
                      resumo.projetosTotal + (ehSenador ? resumo.fiscalizacaoTotal : 0) === 0
                        ? `${ehSenador ? "Este senador" : politico.nomeUrna} não possui proposições cadastradas.`
                        : (data.observacaoIa ?? "Resumo temporariamente indisponível.")
                    }
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* Sem atividade legislativa (Presidente/Governador): a substância vem da análise temática —
           posição (esquerda↔direita), síntese e justificativa por eixo. */
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <SparklesIcon className="size-4 text-primary" aria-hidden="true" />
              Posição e atuação por tema
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Onde {politico.nomeUrna} se posiciona em cada tema (esquerda ↔ direita) e o quanto
              prioriza cada um, pela análise de IA.
            </p>
          </CardHeader>
          <CardContent>
            <PainelAnaliseTematica scores={data.scores} />
          </CardContent>
        </Card>
      )}

      {/* Presença + Gastos do mandato — cards de meia tela lado a lado. Fechados sem login. */}
      {temAtividade && atividade && (
        <div className={cn("grid gap-6", temGabinete && "lg:grid-cols-2")}>
          {!autenticado ? (
            <BlocoBloqueado titulo="Presença em plenário" />
          ) : (
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Presença em plenário</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {data.cargo?.toLowerCase().includes("senador")
                    ? "Comparecimento às votações nominais — total do mandato e últimos anos."
                    : "Comparecimento às sessões — total do mandato e últimos anos."}
                </p>
              </CardHeader>
              <CardContent>
                <PainelPresenca presencas={atividade.presencas} cargo={data.cargo} />
              </CardContent>
            </Card>
          )}

          {temGabinete &&
            (!autenticado ? (
              <BlocoBloqueado titulo="Gastos do mandato" />
            ) : (
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Gastos do mandato</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Cota parlamentar (CEAP) — economia estimada e despesas por ano.
                  </p>
                </CardHeader>
                <CardContent>
                  <PainelGabinete gabinetes={gabinetes} uf={data.uf} cargo={data.cargo} />
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* Atuação em comissões (senadores) — largura cheia, fechado sem login. */}
      {temComissoes && atividade &&
        (!autenticado ? (
          <BlocoBloqueado titulo="Atuação em comissões" />
        ) : (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Atuação em comissões</CardTitle>
              <p className="text-sm text-muted-foreground">
                Comissões de {politico.nomeUrna} por ano, como titular ou suplente.
              </p>
            </CardHeader>
            <CardContent>
              <PainelComissoes comissoes={atividade.comissoes} />
            </CardContent>
          </Card>
        ))}
        </>
      )}
    </div>
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
