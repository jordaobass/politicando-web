"use client";

import { useState } from "react";
import { LogOutIcon, KeyRoundIcon } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAtualizarNome } from "@/hooks/use-api";
import { esqueciSenha } from "@/lib/api";
import { iniciais } from "@/lib/format";
import type { AuthResponse, Usuario } from "@/lib/types";

interface DadosUsuarioProps {
  usuario: Usuario;
  token: string;
  aoAtualizar: (usuario: Usuario) => void;
  aoSair: () => void;
}

/** Formata uma data ISO (YYYY-MM-DD) para o padrão brasileiro. */
function formatarData(iso?: string | null): string {
  if (!iso) return "—";
  const [ano, mes, dia] = iso.slice(0, 10).split("-");
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : "—";
}

/** Dados do perfil: nome editável, e-mail/data de nascimento (RO), alterar senha e sair. */
export function DadosUsuario({ usuario, token, aoAtualizar, aoSair }: DadosUsuarioProps) {
  const [nome, setNome] = useState(usuario.nome);
  const mutation = useAtualizarNome(token);
  const alterado = nome.trim() !== usuario.nome && nome.trim().length >= 2;

  async function salvar() {
    try {
      const atualizado = await mutation.mutateAsync(nome.trim());
      aoAtualizar(atualizado);
      toast.success("Nome atualizado com sucesso!");
    } catch {
      toast.error("Não foi possível atualizar o nome.");
    }
  }

  async function alterarSenha() {
    try {
      const r = await esqueciSenha(usuario.email);
      toast.success(r.mensagem);
    } catch {
      toast.error("Não foi possível solicitar a alteração de senha.");
    }
  }

  return (
    <Card data-testid="perfil-dados">
      <CardContent className="space-y-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <Avatar size="lg">
            <AvatarFallback>{iniciais(nome || usuario.nome)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="perfil-nome" className="text-base">
            Nome
          </Label>
          <Input
            id="perfil-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-11 text-base"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-base">E-mail</Label>
          <p className="text-sm text-muted-foreground" data-testid="perfil-email">
            {usuario.email}
          </p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-base">Data de nascimento</Label>
          <p className="text-sm text-muted-foreground" data-testid="perfil-nascimento">
            {formatarData(usuario.dataNascimento)}
          </p>
        </div>

        <Button
          onClick={salvar}
          disabled={!alterado || mutation.isPending}
          className="w-full"
          data-testid="perfil-salvar"
        >
          {mutation.isPending ? "Salvando…" : "Salvar"}
        </Button>

        {usuario.podeAlterarSenha && (
          <Button
            variant="outline"
            onClick={alterarSenha}
            className="w-full"
            data-testid="perfil-alterar-senha"
          >
            <KeyRoundIcon className="size-4" aria-hidden="true" />
            Alterar senha
          </Button>
        )}

        <Button variant="ghost" size="sm" onClick={aoSair} className="w-full">
          <LogOutIcon className="size-4" aria-hidden="true" />
          Sair
        </Button>
      </CardContent>
    </Card>
  );
}

/** Mescla o usuário atualizado na sessão existente (mantém tokens). */
export function mesclarUsuario(sessao: AuthResponse, usuario: Usuario): AuthResponse {
  return { ...sessao, usuario };
}
