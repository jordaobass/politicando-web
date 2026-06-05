"use client";

import { useCallback, useSyncExternalStore } from "react";

import { CHAVE_SESSAO } from "@/lib/constantes";
import type { AuthResponse, Usuario } from "@/lib/types";

// Store externa simples sobre o localStorage para a sessão (mock do protótipo).
// Em produção isto seria substituído por cookies httpOnly / provedor de auth real.

type Ouvinte = () => void;

const ouvintes = new Set<Ouvinte>();

function notificar() {
  for (const ouvinte of ouvintes) ouvinte();
}

function inscrever(ouvinte: Ouvinte) {
  ouvintes.add(ouvinte);
  // Sincroniza entre abas via evento storage.
  window.addEventListener("storage", ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
    window.removeEventListener("storage", ouvinte);
  };
}

function lerBruto(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CHAVE_SESSAO);
}

function lerSnapshotServidor(): string | null {
  return null;
}

/** Gerencia a sessão do usuário em localStorage (mock de autenticação). */
export function useSessao() {
  const bruto = useSyncExternalStore(inscrever, lerBruto, lerSnapshotServidor);

  let sessao: AuthResponse | null = null;
  try {
    sessao = bruto ? (JSON.parse(bruto) as AuthResponse) : null;
  } catch {
    sessao = null;
  }

  const entrar = useCallback((dados: AuthResponse) => {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(dados));
    notificar();
  }, []);

  const sair = useCallback(() => {
    localStorage.removeItem(CHAVE_SESSAO);
    notificar();
  }, []);

  const usuario: Usuario | null = sessao?.usuario ?? null;

  return {
    sessao,
    usuario,
    autenticado: Boolean(sessao),
    carregado: true,
    entrar,
    sair,
  };
}
