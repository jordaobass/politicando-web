"use client";

import Link from "next/link";
import { LogOutIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EstadoVazio } from "@/components/comum/estados";
import { useSessao } from "@/hooks/use-sessao";
import { iniciais } from "@/lib/format";

/** Painel do usuário logado (dados + comparações salvas — placeholder). */
export function PainelPerfil() {
  const { usuario, autenticado, carregado, sair } = useSessao();

  if (!carregado) return null;

  if (!autenticado || !usuario) {
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

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card>
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <Avatar size="lg">
            <AvatarFallback>{iniciais(usuario.nome)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{usuario.nome}</p>
            <p className="text-sm text-muted-foreground">{usuario.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={sair}>
            <LogOutIcon className="size-4" aria-hidden="true" />
            Sair
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comparações salvas</CardTitle>
        </CardHeader>
        <CardContent>
          <EstadoVazio
            titulo="Nenhuma comparação salva"
            descricao="Compare candidatos e salve para acompanhar (em breve)."
            acao={
              <Button asChild variant="outline">
                <Link href="/comparar">Comparar candidatos</Link>
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
