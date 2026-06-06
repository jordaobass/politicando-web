"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CampoSenha } from "@/components/auth/campo-senha";
import { ChecklistSenha } from "@/components/auth/checklist-senha";
import { REGRAS_SENHA } from "@/lib/schemas";
import { redefinirSenha } from "@/lib/api";
import { useSessao } from "@/hooks/use-sessao";

/** Form de redefinição: lê email+token da URL, valida a nova senha e confirma. */
export function FormularioRedefinir() {
  const router = useRouter();
  const { entrar } = useSessao();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";

  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const valida = REGRAS_SENHA.every((r) => r.testar(senha));

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!valida) return;
    setEnviando(true);
    try {
      // Auto-login após redefinir (cartão US-AUTH-04): a API já devolve a sessão.
      const sessao = await redefinirSenha({ email, token, novaSenha: senha });
      entrar(sessao);
      toast.success("Senha redefinida com sucesso!");
      router.push("/candidatos");
    } catch {
      toast.error("Link inválido ou expirado.");
    } finally {
      setEnviando(false);
    }
  }

  if (!email || !token) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Link inválido ou incompleto. Solicite a redefinição novamente.
      </p>
    );
  }

  return (
    <form onSubmit={aoEnviar} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="nova-senha" className="text-base">
          Nova senha
        </Label>
        <CampoSenha
          id="nova-senha"
          autoComplete="new-password"
          placeholder="Crie uma nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <ChecklistSenha senha={senha} />
      </div>
      <Button
        type="submit"
        className="h-12 w-full text-base transition-transform hover:scale-[1.01]"
        disabled={enviando || !valida}
      >
        {enviando ? "Redefinindo…" : "Redefinir senha"}
      </Button>
    </form>
  );
}
