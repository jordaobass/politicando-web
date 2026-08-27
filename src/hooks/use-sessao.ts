"use client";

import { useCallback, useSyncExternalStore } from "react";

import { logout } from "@/lib/api";
import { CHAVE_SESSAO, CHAVE_RESULTADO_QUIZ } from "@/lib/constantes";
import type { AuthResponse, Usuario } from "@/lib/types";

// Store externa simples sobre o localStorage para a sessão.
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
    // Revoga o refresh token no servidor (fire-and-forget) antes de limpar a sessão local.
    try {
      const atual = JSON.parse(localStorage.getItem(CHAVE_SESSAO) ?? "null") as AuthResponse | null;
      if (atual?.refreshToken) void logout(atual.refreshToken);
    } catch {
      // sessão corrompida — segue direto para a limpeza local
    }
    localStorage.removeItem(CHAVE_SESSAO);
    // Limpa o resultado do quiz em cache: sem isso, a compatibilidade continua visível após o
    // logout (a tela de resultado lê de sessionStorage). Correção do bug "vejo compat. deslogado".
    sessionStorage.removeItem(CHAVE_RESULTADO_QUIZ);
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
