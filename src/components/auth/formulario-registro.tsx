"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CampoSenha } from "@/components/auth/campo-senha";
import { ChecklistSenha } from "@/components/auth/checklist-senha";
import { useRegistrar } from "@/hooks/use-api";
import { useSessao } from "@/hooks/use-sessao";
import { registrarSchema, type RegistrarFormValues } from "@/lib/schemas";

/** Formulário de cadastro com RHF + Zod, validação em tempo real. `aoConcluir` para uso em modal. */
export function FormularioRegistro({ aoConcluir }: { aoConcluir?: () => void }) {
  const router = useRouter();
  const { entrar } = useSessao();
  const mutation = useRegistrar();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrarFormValues>({
    resolver: zodResolver(registrarSchema),
    mode: "onChange",
    defaultValues: { nome: "", email: "", senha: "", lgpd: false },
  });

  // useWatch (em vez de watch) é compatível com o React Compiler.
  const senha = useWatch({ control, name: "senha" }) ?? "";

  async function aoEnviar(valores: RegistrarFormValues) {
    try {
      const resposta = await mutation.mutateAsync(valores);
      entrar(resposta);
      toast.success(`Bem-vindo, ${resposta.usuario.nome}!`);
      if (aoConcluir) aoConcluir();
      else router.push("/quiz");
    } catch {
      toast.error("Não foi possível criar a conta. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="reg-nome" className="text-base">
          Nome
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
          aria-invalid={Boolean(errors.email)}
          className="h-12 text-base"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
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
        <label htmlFor="reg-lgpd" className="flex items-start gap-2 text-sm">
          <input
            id="reg-lgpd"
            type="checkbox"
            className="mt-0.5 size-4 rounded border-input accent-primary"
            aria-invalid={Boolean(errors.lgpd)}
            {...register("lgpd")}
          />
          <span className="text-muted-foreground">
            Li e aceito a{" "}
            <a href="/privacidade" className="text-primary underline">
              política de privacidade
            </a>{" "}
            e o tratamento dos meus dados (LGPD).
          </span>
        </label>
        {errors.lgpd && <p className="text-sm text-destructive">{errors.lgpd.message}</p>}
      </div>

      <Button
        type="submit"
        className="h-12 w-full text-base transition-transform hover:scale-[1.01]"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Criando conta…" : "Criar conta"}
      </Button>
    </form>
  );
}
