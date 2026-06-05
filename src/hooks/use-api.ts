"use client";

// Hooks de React Query para data fetching e mutations contra a API.

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  buscarAtividade,
  buscarCandidatura,
  buscarCandidaturas,
  buscarCategorias,
  buscarDashboardAdmin,
  buscarIntegracoesAdmin,
  buscarOpinioes,
  buscarPartidos,
  buscarPerguntas,
  compararCandidaturas,
  enviarRespostas,
  login,
  recalcularScores,
  registrar,
} from "@/lib/api";
import type {
  EnviarRespostasRequest,
  FiltrosCandidatura,
  LoginRequest,
  RegistrarRequest,
} from "@/lib/types";

/** Chaves de cache organizadas por recurso. */
export const chavesQuery = {
  categorias: ["categorias"] as const,
  perguntas: ["quiz", "perguntas"] as const,
  candidaturas: (filtros: FiltrosCandidatura) =>
    ["candidaturas", filtros] as const,
  candidatura: (id: string) => ["candidatura", id] as const,
  atividade: (id: string) => ["candidatura", id, "atividade"] as const,
  opinioes: (id: string) => ["candidatura", id, "opinioes"] as const,
  comparar: (a: string, b: string) => ["comparar", a, b] as const,
  partidos: ["partidos"] as const,
  adminDashboard: ["admin", "dashboard"] as const,
  adminIntegracoes: ["admin", "integracoes"] as const,
};

export function useCategorias() {
  return useQuery({
    queryKey: chavesQuery.categorias,
    queryFn: buscarCategorias,
  });
}

export function usePerguntas() {
  return useQuery({
    queryKey: chavesQuery.perguntas,
    queryFn: buscarPerguntas,
  });
}

export function useEnviarRespostas() {
  return useMutation({
    mutationFn: (body: EnviarRespostasRequest) => enviarRespostas(body),
  });
}

export function useCandidaturas(filtros: FiltrosCandidatura) {
  return useQuery({
    queryKey: chavesQuery.candidaturas(filtros),
    queryFn: () => buscarCandidaturas(filtros),
    placeholderData: (anterior) => anterior,
  });
}

/** Busca incremental (autocomplete): só dispara com 2+ caracteres, limita a 6 itens. */
export function useBuscaCandidatos(q: string) {
  const termo = q.trim();
  return useQuery({
    queryKey: ["busca-candidatos", termo],
    queryFn: () => buscarCandidaturas({ q: termo, tamanho: 6 }),
    enabled: termo.length >= 2,
    placeholderData: (anterior) => anterior,
  });
}

export function useCandidatura(id: string) {
  return useQuery({
    queryKey: chavesQuery.candidatura(id),
    queryFn: () => buscarCandidatura(id),
    enabled: Boolean(id),
  });
}

export function useAtividade(id: string) {
  return useQuery({
    queryKey: chavesQuery.atividade(id),
    queryFn: () => buscarAtividade(id),
    enabled: Boolean(id),
  });
}

export function useOpinioes(id: string) {
  return useQuery({
    queryKey: chavesQuery.opinioes(id),
    queryFn: () => buscarOpinioes(id),
    enabled: Boolean(id),
  });
}

export function useComparar(a: string, b: string) {
  return useQuery({
    queryKey: chavesQuery.comparar(a, b),
    queryFn: () => compararCandidaturas(a, b),
    enabled: Boolean(a) && Boolean(b),
  });
}

export function usePartidos() {
  return useQuery({
    queryKey: chavesQuery.partidos,
    queryFn: buscarPartidos,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
  });
}

export function useRegistrar() {
  return useMutation({
    mutationFn: (body: RegistrarRequest) => registrar(body),
  });
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: chavesQuery.adminDashboard,
    queryFn: () => buscarDashboardAdmin(),
  });
}

export function useAdminIntegracoes() {
  return useQuery({
    queryKey: chavesQuery.adminIntegracoes,
    queryFn: () => buscarIntegracoesAdmin(),
  });
}

export function useRecalcularScores() {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: () => recalcularScores(),
    onSuccess: () => {
      cliente.invalidateQueries({ queryKey: chavesQuery.adminDashboard });
      cliente.invalidateQueries({ queryKey: chavesQuery.adminIntegracoes });
    },
  });
}
