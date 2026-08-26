"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EstadoVazio } from "@/components/comum/estados";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { useComparacoesSalvas, useExcluirComparacao } from "@/hooks/use-api";
import { lerNumero, useEstadoNaUrl } from "@/hooks/use-estado-na-url";
import type { CandidaturaMini, ComparacaoSalva } from "@/lib/types";

function ResumoCandidato({ candidato }: { candidato: CandidaturaMini }) {
  return (
    <div className="flex items-center gap-2">
      <FotoCandidato fotoUrl={candidato.fotoUrl ?? null} nome={candidato.nomeUrna} className="size-10" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{candidato.nomeUrna}</p>
        <p className="text-xs text-muted-foreground">{candidato.partidoSigla ?? "—"}</p>
      </div>
    </div>
  );
}

function ItemComparacao({
  item,
  aoPedirExclusao,
}: {
  item: ComparacaoSalva;
  aoPedirExclusao: (item: ComparacaoSalva) => void;
}) {
  return (
    <li
      className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
      data-testid="comparacao-item"
    >
      <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-2">
        <ResumoCandidato candidato={item.a} />
        <span className="text-xs font-semibold text-muted-foreground">vs</span>
        <ResumoCandidato candidato={item.b} />
      </div>
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/comparar?a=${item.a.id}&b=${item.b.id}`}>Ver comparação</Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => aoPedirExclusao(item)}
          data-testid="comparacao-excluir"
        >
          <Trash2Icon className="size-4" aria-hidden="true" />
          Excluir
        </Button>
      </div>
    </li>
  );
}

/** Bloco "Minhas comparações salvas": lista paginada (10/pág), navegação e exclusão. */
export function ComparacoesSalvas({ token }: { token: string }) {
  // Página na URL (Correções v7, item 2e / v6 §3.5): abrir uma comparação e voltar mantém a página.
  const { params, sincronizar } = useEstadoNaUrl();
  const [pagina, setPagina] = useState(() => lerNumero(params, "pagina", 1));
  const [selecionado, setSelecionado] = useState<ComparacaoSalva | null>(null);
  const { data, isLoading } = useComparacoesSalvas(pagina, token);
  const exclusao = useExcluirComparacao(token);

  function mudarPagina(proxima: number) {
    setPagina(proxima);
    sincronizar({ pagina: proxima === 1 ? null : proxima });
  }

  async function confirmarExclusao() {
    if (!selecionado) return;
    try {
      await exclusao.mutateAsync(selecionado.id);
      toast.success("Comparação excluída.");
    } catch {
      toast.error("Não foi possível excluir a comparação.");
    } finally {
      setSelecionado(null);
    }
  }

  const itens = data?.itens ?? [];
  const totalPaginas = data ? Math.max(1, Math.ceil(data.total / data.tamanho)) : 1;

  return (
    <Card data-testid="perfil-comparacoes">
      <CardHeader>
        <CardTitle className="text-lg">Minhas comparações salvas</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-24 w-full rounded-lg" />
        ) : itens.length === 0 ? (
          <EstadoVazio
            titulo="Você ainda não salvou nenhuma comparação"
            descricao="Compare dois candidatos e salve para acompanhar depois."
            acao={
              <Button asChild variant="outline">
                <Link href="/comparar">Comparar candidatos</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            <ul className="space-y-3">
              {itens.map((item) => (
                <ItemComparacao key={item.id} item={item} aoPedirExclusao={setSelecionado} />
              ))}
            </ul>

            {totalPaginas > 1 && (
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagina <= 1}
                  onClick={() => mudarPagina(pagina - 1)}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {pagina} de {totalPaginas}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagina >= totalPaginas}
                  onClick={() => mudarPagina(pagina + 1)}
                >
                  Próxima
                </Button>
              </div>
            )}
          </div>
        )}

        <Dialog open={selecionado !== null} onOpenChange={(aberto) => !aberto && setSelecionado(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Excluir comparação</DialogTitle>
              <DialogDescription>
                Deseja excluir esta comparação? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelecionado(null)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                disabled={exclusao.isPending}
                onClick={confirmarExclusao}
                data-testid="comparacao-excluir-confirmar"
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
