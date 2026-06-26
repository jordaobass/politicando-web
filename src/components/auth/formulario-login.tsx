"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CampoSenha } from "@/components/auth/campo-senha";
import { useLogin } from "@/hooks/use-api";
import { useSessao } from "@/hooks/use-sessao";
import { paginaDeRetorno } from "@/lib/navegacao";
import { loginSchema, type LoginFormValues } from "@/lib/schemas";

/** Formulário de login com RHF + Zod. `aoConcluir` para uso em modal; `aoEsquecer` abre a recuperação. */
export function FormularioLogin({
  aoConcluir,
  aoEsquecer,
  emailInicial = "",
}: {
  aoConcluir?: () => void;
  aoEsquecer?: () => void;
  /** Pré-preenche o e-mail (vindo do link "Entrar" no cadastro de e-mail já existente). */
  emailInicial?: string;
}) {
  const router = useRouter();
  const { entrar } = useSessao();
  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: emailInicial, senha: "" },
  });

  async function aoEnviar(valores: LoginFormValues) {
    try {
      const resposta = await mutation.mutateAsync(valores);
      entrar(resposta);
      toast.success(`Bem-vindo de volta, ${resposta.usuario.nome}!`);
      if (aoConcluir) aoConcluir();
      else router.push(paginaDeRetorno("/candidatos"));
    } catch {
      toast.error("Não foi possível entrar. Verifique suas credenciais.");
    }
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="login-email" className="text-base">
          E-mail
        </Label>
        <Input
          id="login-email"
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
        <Label htmlFor="login-senha" className="text-base">
          Senha
        </Label>
        <CampoSenha
          id="login-senha"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={Boolean(errors.senha)}
          {...register("senha")}
        />
        {errors.senha && (
          <p className="text-sm text-destructive">{errors.senha.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="h-12 w-full text-base transition-transform hover:scale-[1.01]"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Entrando…" : "Entrar"}
      </Button>

      <button
        type="button"
        onClick={aoEsquecer ?? (() => toast.info("Recuperação de senha disponível em breve."))}
        className="mx-auto block text-sm font-semibold text-primary transition-colors hover:underline"
      >
        Esqueci minha senha
      </button>
    </form>
  );
}
