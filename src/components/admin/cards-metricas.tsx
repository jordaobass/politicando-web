"use client";

import {
  CalculatorIcon,
  ImageOffIcon,
  ListChecksIcon,
  ScaleIcon,
  UsersIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EstadoErro } from "@/components/comum/estados";
import { useAdminDashboard } from "@/hooks/use-api";
import type { AdminDashboard } from "@/lib/types";

interface Metrica {
  chave: keyof AdminDashboard;
  rotulo: string;
  icone: LucideIcon;
}

const METRICAS: Metrica[] = [
  { chave: "totalCandidatos", rotulo: "Candidatos", icone: UsersIcon },
  { chave: "candidatosSemFoto", rotulo: "Sem foto", icone: ImageOffIcon },
  { chave: "quizCompletados", rotulo: "Quizzes completados", icone: ListChecksIcon },
  { chave: "scoresCalculados", rotulo: "Scores calculados", icone: CalculatorIcon },
  { chave: "comparacoes", rotulo: "Comparações", icone: ScaleIcon },
  { chave: "usuarios", rotulo: "Usuários", icone: UsersRoundIcon },
];

/** Grade de cards com as métricas do dashboard administrativo. */
export function CardsMetricas() {
  const { data, isLoading, isError, refetch } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {METRICAS.map((m) => (
          <Skeleton key={m.chave} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <EstadoErro
        titulo="Não foi possível carregar as métricas"
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

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {METRICAS.map((metrica) => (
        <Card key={metrica.chave}>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <metrica.icone className="size-4" aria-hidden="true" />
              <span className="text-sm">{metrica.rotulo}</span>
            </div>
            <p className="text-3xl font-bold tabular-nums text-foreground">
              {Number(data[metrica.chave] ?? 0).toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
