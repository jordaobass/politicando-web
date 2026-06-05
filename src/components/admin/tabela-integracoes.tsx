"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EstadoErro, EstadoVazio } from "@/components/comum/estados";
import { useAdminIntegracoes } from "@/hooks/use-api";

/** Formata uma data ISO em formato pt-BR; retorna traço quando ausente. */
function formatarData(valor: string | null): string {
  if (!valor) return "—";
  const data = new Date(valor);
  return Number.isNaN(data.getTime())
    ? "—"
    : data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

/** Tabela com o status das integrações de dados. */
export function TabelaIntegracoes() {
  const { data, isLoading, isError, refetch } = useAdminIntegracoes();

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;

  if (isError) {
    return (
      <EstadoErro
        titulo="Não foi possível carregar as integrações"
        descricao="A API administrativa pode estar indisponível."
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
    );
  }

  const integracoes = data ?? [];
  if (integracoes.length === 0) {
    return <EstadoVazio titulo="Nenhuma integração configurada" />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Ativa</TableHead>
            <TableHead>Último status</TableHead>
            <TableHead>Última execução</TableHead>
            <TableHead>Próxima execução</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {integracoes.map((integracao) => (
            <TableRow key={integracao.id}>
              <TableCell className="font-medium">{integracao.nome}</TableCell>
              <TableCell className="text-muted-foreground">
                {integracao.tipo}
              </TableCell>
              <TableCell>
                <Badge variant={integracao.ativa ? "default" : "outline"}>
                  {integracao.ativa ? "Sim" : "Não"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {integracao.ultimoStatus ?? "—"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatarData(integracao.ultimaExecucaoEm)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatarData(integracao.proximaExecucaoEm)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
