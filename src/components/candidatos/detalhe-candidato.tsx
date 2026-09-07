"use client";

import Link from "next/link";
import { GitCompareIcon, LandmarkIcon, WalletIcon } from "lucide-react";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { BadgeOrigem } from "@/components/comum/badge-origem";
import { IconeInstagram } from "@/components/comum/icone-instagram";
import { CardCompatibilidade } from "@/components/candidatos/card-compatibilidade";
import { formatarCargo, formatarReais } from "@/lib/format";
import { EstadoErro } from "@/components/comum/estados";
import { PerfilGovernador } from "@/components/candidatos/perfil-governador";
import { PerfilPresidente } from "@/components/candidatos/perfil-presidente";
import { PerfilParlamentar } from "@/components/candidatos/perfil-parlamentar";
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
  const gabinetes = (atividade?.gabinetes ?? []).filter((g) => g.total > 0);
  // Chip do hero: prioriza o mandato corrente (2026); cai para o ano mais recente com dado.
  const gabineteRecente = gabinetes.find((g) => g.ano === 2026) ?? gabinetes[0];
  const ehGovernador = (data.cargo ?? "").toLowerCase().includes("governador");
  const ehPresidente = (data.cargo ?? "").toLowerCase().includes("presidente");
  const tipoHistoricoRotulo = ROTULO_TIPO_HISTORICO[data.tipoHistorico ?? ""] ?? null;

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
        /* Deputados e senadores na MESMA espinha visual de Presidente/Governador
           (Correções v7, item 3): card "Score por tema" 0–5 — a régua ideológica saiu do perfil. */
        <PerfilParlamentar data={data} atividade={atividade} autenticado={autenticado} />
      )}
    </div>
  );
}
