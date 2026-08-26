"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CampoSenha } from "@/components/auth/campo-senha";
import { ChecklistSenha } from "@/components/auth/checklist-senha";
import { useRegistrar } from "@/hooks/use-api";
import { useSessao } from "@/hooks/use-sessao";
import { ApiError } from "@/lib/api";
import { VERSAO_DOCUMENTOS_LEGAIS } from "@/lib/constantes";
import { paginaDeRetorno } from "@/lib/navegacao";
import {
  MENSAGEM_IDADE_MINIMA,
  registrarSchema,
  type RegistrarFormValues,
} from "@/lib/schemas";

interface FormularioRegistroProps {
  aoConcluir?: () => void;
  /** Abre a aba de login já preenchida com o e-mail (link "Entrar" do erro de e-mail existente). */
  aoIrParaLogin?: (email: string) => void;
}

/** Formulário de cadastro com RHF + Zod, validação em tempo real (cartão US-AUTH-01). */
export function FormularioRegistro({
  aoConcluir,
  aoIrParaLogin,
}: FormularioRegistroProps) {
  const router = useRouter();
  const { entrar } = useSessao();
  const mutation = useRegistrar();
  const [emailExistente, setEmailExistente] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegistrarFormValues>({
    resolver: zodResolver(registrarSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      email: "",
      dataNascimento: "",
      senha: "",
      confirmarSenha: "",
      lgpd: false,
    },
  });

  // useWatch (em vez de watch) é compatível com o React Compiler.
  const senha = useWatch({ control, name: "senha" }) ?? "";

  async function aoEnviar(valores: RegistrarFormValues) {
    setEmailExistente(null);
    try {
      const resposta = await mutation.mutateAsync({
        nome: valores.nome,
        email: valores.email,
        senha: valores.senha,
        dataNascimento: valores.dataNascimento,
        aceiteLgpd: valores.lgpd,
        // Sem a versão do texto aceito, o registro de consentimento não prova
        // COM O QUE a pessoa concordou (LGPD, art. 8º, § 1º).
        consentimentoVersao: VERSAO_DOCUMENTOS_LEGAIS,
      });
      entrar(resposta);
      toast.success(`Bem-vindo, ${resposta.usuario.nome}!`);
      if (aoConcluir) aoConcluir();
      else router.push(paginaDeRetorno("/quiz"));
    } catch (erro) {
      // E-mail já cadastrado (409): mostra mensagem inline com link para a aba de login.
      if (erro instanceof ApiError && erro.status === 409) {
        setEmailExistente(valores.email);
        return;
      }
      toast.error("Não foi possível criar a conta. Tente novamente.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(aoEnviar)}
      className="space-y-4"
      noValidate
      data-testid="formulario-registro"
    >
      <fieldset disabled={mutation.isPending} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="reg-nome" className="text-base">
            Nome completo
          </Label>
          <Input
            id="reg-nome"
            autoComplete="name"
            placeholder="Seu nome"
            aria-invalid={Boolean(errors.nome)}
            className="h-12 text-base"
            {...register("nome")}
          />
          {errors.nome && (
            <p className="text-sm text-destructive">{errors.nome.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-email" className="text-base">
            E-mail
          </Label>
          <Input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            aria-invalid={Boolean(errors.email) || Boolean(emailExistente)}
            className="h-12 text-base"
            {...register("email", { onChange: () => setEmailExistente(null) })}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
          {emailExistente && (
            <p className="text-sm text-destructive" data-testid="erro-email-existente">
              Este email já tem conta.{" "}
              <button
                type="button"
                onClick={() => aoIrParaLogin?.(emailExistente)}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Entrar
              </button>
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-nascimento" className="text-base">
            Data de nascimento
          </Label>
          <Input
            id="reg-nascimento"
            type="date"
            autoComplete="bday"
            aria-invalid={Boolean(errors.dataNascimento)}
            className="h-12 text-base"
            {...register("dataNascimento")}
          />
          {errors.dataNascimento ? (
            <p className="text-sm text-destructive">
              {errors.dataNascimento.message}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">{MENSAGEM_IDADE_MINIMA}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-senha" className="text-base">
            Senha
          </Label>
          <CampoSenha
            id="reg-senha"
            autoComplete="new-password"
            placeholder="Crie uma senha"
            aria-invalid={Boolean(errors.senha)}
            {...register("senha")}
          />
          <ChecklistSenha senha={senha} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-confirmar" className="text-base">
            Confirmação de senha
          </Label>
          <CampoSenha
            id="reg-confirmar"
            autoComplete="new-password"
            placeholder="Repita a senha"
            aria-invalid={Boolean(errors.confirmarSenha)}
            {...register("confirmarSenha")}
          />
          {errors.confirmarSenha && (
            <p className="text-sm text-destructive">
              {errors.confirmarSenha.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          {/*
            Aceite único citando os três documentos, na forma da Cláusula 9.1 do
            Termo de Consentimento, com a manifestação específica sobre opinião
            política em destaque. Caixa separada só para o dado sensível é decisão
            C2 do DECISOES.md, pendente do jurídico do cliente.
          */}
          <label
            htmlFor="reg-lgpd"
            className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm"
          >
            <input
              id="reg-lgpd"
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
              aria-invalid={Boolean(errors.lgpd)}
              {...register("lgpd")}
            />
            <span className="text-muted-foreground">
              Li e aceito o{" "}
              <Link href="/termos-de-uso" className="text-primary underline">
                Termo de Uso
              </Link>
              , a{" "}
              <Link href="/privacidade" className="text-primary underline">
                Política de Privacidade
              </Link>{" "}
              e o{" "}
              <Link href="/consentimento" className="text-primary underline">
                Termo de Consentimento
              </Link>
              , e consinto especificamente com o tratamento das minhas respostas ao
              quiz como dado sensível de opinião política (LGPD, art. 11).
            </span>
          </label>
          {errors.lgpd && (
            <p className="text-sm text-destructive">{errors.lgpd.message}</p>
          )}
        </div>
      </fieldset>

      <Button
        type="submit"
        className="h-12 w-full text-base transition-transform hover:scale-[1.01]"
        disabled={mutation.isPending || !isValid}
      >
        {mutation.isPending ? (
          <>
            <Loader2Icon className="size-5 animate-spin" aria-hidden="true" />
            Criando conta…
          </>
        ) : (
          "Criar conta"
        )}
      </Button>
    </form>
  );
}
