"use client";

import { useState } from "react";
import { LogOutIcon, KeyRoundIcon } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAtualizarPerfil } from "@/hooks/use-api";
import { esqueciSenha } from "@/lib/api";
import { iniciais } from "@/lib/format";
import {
  calcularIdade,
  IDADE_MINIMA,
  MENSAGEM_IDADE_MINIMA,
} from "@/lib/schemas";
import type { AuthResponse, Usuario } from "@/lib/types";

interface DadosUsuarioProps {
  usuario: Usuario;
  token: string;
  aoAtualizar: (usuario: Usuario) => void;
  aoSair: () => void;
}

/** Dados do perfil: nome e data de nascimento editáveis, e-mail (RO), alterar senha e sair. */
export function DadosUsuario({ usuario, token, aoAtualizar, aoSair }: DadosUsuarioProps) {
  const [nome, setNome] = useState(usuario.nome);
  const [nascimento, setNascimento] = useState(usuario.dataNascimento?.slice(0, 10) ?? "");
  const mutation = useAtualizarPerfil(token);

  const nomeValido = nome.trim().length >= 2;
  const nascimentoOriginal = usuario.dataNascimento?.slice(0, 10) ?? "";
  // Idade só é exigida quando há data informada; campo vazio mantém o valor atual.
  const nascimentoValido = nascimento === "" || calcularIdade(nascimento) >= IDADE_MINIMA;
  const mudou = nome.trim() !== usuario.nome || nascimento !== nascimentoOriginal;
  const podeSalvar = mudou && nomeValido && nascimentoValido;

  async function salvar() {
    try {
      const atualizado = await mutation.mutateAsync({
        nome: nome.trim(),
        dataNascimento: nascimento || null,
      });
      aoAtualizar(atualizado);
      toast.success("Nome atualizado com sucesso!");
    } catch {
      toast.error("Não foi possível atualizar o perfil.");
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
          <Label htmlFor="perfil-nascimento" className="text-base">
            Data de nascimento
          </Label>
          <Input
            id="perfil-nascimento"
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            aria-invalid={!nascimentoValido}
            className="h-11 text-base"
          />
          {!nascimentoValido && (
            <p className="text-sm text-destructive">{MENSAGEM_IDADE_MINIMA}</p>
          )}
        </div>

        <Button
          onClick={salvar}
          disabled={!podeSalvar || mutation.isPending}
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
