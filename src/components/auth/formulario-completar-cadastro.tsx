"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSessao } from "@/hooks/use-sessao";
import { completarCadastro } from "@/lib/api";
import {
  completarCadastroSchema,
  MENSAGEM_IDADE_MINIMA,
  type CompletarCadastroFormValues,
} from "@/lib/schemas";

/**
 * Etapa complementar pós-OAuth (cartão US-AUTH-02): novo usuário Google informa a data de
 * nascimento antes de liberar o acesso. Saúda com o nome retornado pelo Google.
 */
export function FormularioCompletarCadastro() {
  const router = useRouter();
  const { usuario, autenticado, carregado, entrar, sessao } = useSessao();

  // Sem sessão (acesso direto à rota): volta ao login.
  useEffect(() => {
    if (carregado && !autenticado) router.replace("/login");
  }, [carregado, autenticado, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CompletarCadastroFormValues>({
    resolver: zodResolver(completarCadastroSchema),
    mode: "onChange",
    defaultValues: { dataNascimento: "" },
  });

  async function aoEnviar(valores: CompletarCadastroFormValues) {
    if (!sessao?.token) return;
    try {
      const atualizado = await completarCadastro(valores.dataNascimento, sessao.token);
      entrar({ ...sessao, usuario: atualizado });
      toast.success(`Bem-vindo, ${atualizado.nome}!`);
      router.push("/quiz");
    } catch {
      toast.error("Não foi possível concluir o cadastro. Tente novamente.");
    }
  }

  const nome = usuario?.nome ?? "";

  return (
    <div className="mx-auto max-w-md space-y-6 px-4 py-16" data-testid="completar-cadastro">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Falta só um passo{nome ? `, ${nome}` : ""}!
        </h1>
        <p className="text-muted-foreground">
          Informe sua data de nascimento para concluir seu cadastro.
        </p>
      </div>

      <form onSubmit={handleSubmit(aoEnviar)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="comp-nascimento" className="text-base">
            Data de nascimento
          </Label>
          <Input
            id="comp-nascimento"
            type="date"
            autoComplete="bday"
            aria-invalid={Boolean(errors.dataNascimento)}
            className="h-12 text-base"
            {...register("dataNascimento")}
          />
          {errors.dataNascimento ? (
            <p className="text-sm text-destructive">{errors.dataNascimento.message}</p>
          ) : (
            <p className="text-sm text-muted-foreground">{MENSAGEM_IDADE_MINIMA}</p>
          )}
        </div>

        <Button
          type="submit"
          className="h-12 w-full text-base transition-transform hover:scale-[1.01]"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2Icon className="size-5 animate-spin" aria-hidden="true" />
              Concluindo…
            </>
          ) : (
            "Concluir cadastro"
          )}
        </Button>
      </form>
    </div>
  );
}
