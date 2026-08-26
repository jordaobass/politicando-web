"use client";

import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EstadoVazio } from "@/components/comum/estados";
import { DadosUsuario, mesclarUsuario } from "@/components/perfil/dados-usuario";
import { UltimoQuiz } from "@/components/perfil/ultimo-quiz";
import { ComparacoesSalvas } from "@/components/perfil/comparacoes-salvas";
import { useSessao } from "@/hooks/use-sessao";
import type { Usuario } from "@/lib/types";

/** Painel do usuário logado: dados, último quiz e comparações salvas (cartão US-AUTH-06). */
export function PainelPerfil() {
  const { sessao, usuario, autenticado, carregado, entrar, sair } = useSessao();

  if (!carregado) return null;

  if (!autenticado || !usuario || !sessao) {
    return (
      <EstadoVazio
        titulo="Você ainda não entrou"
        descricao="Faça login para ver seus dados e comparações salvas."
        acao={
          <Button asChild>
            <Link href="/login">Entrar</Link>
          </Button>
        }
      />
    );
  }

  function atualizar(atualizado: Usuario) {
    if (sessao) entrar(mesclarUsuario(sessao, atualizado));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <DadosUsuario
        usuario={usuario}
        token={sessao.token}
        aoAtualizar={atualizar}
        aoSair={sair}
      />
      <div className="space-y-6">
        <UltimoQuiz token={sessao.token} />
        {/* Suspense exigido pelo useSearchParams (página das comparações na URL — v7, item 2e). */}
        <Suspense fallback={<Skeleton className="h-40 w-full rounded-xl" />}>
          <ComparacoesSalvas token={sessao.token} />
        </Suspense>
      </div>
    </div>
  );
}
