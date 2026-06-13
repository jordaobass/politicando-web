"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeftIcon, MailCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { esqueciSenha } from "@/lib/api";

/** Pede o e-mail e dispara o envio do link de redefinição. `aoVoltar` retorna ao login. */
export function FormularioRecuperar({ aoVoltar }: { aoVoltar: () => void }) {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      // Conta exclusivamente social vem com mensagem própria (use o provedor); caso contrário, neutra.
      const resposta = await esqueciSenha(email.trim());
      setMensagem(resposta.mensagem);
    } catch {
      toast.error("Não foi possível processar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (mensagem) {
    return (
      <div className="animate-in fade-in space-y-4 text-center duration-300">
        <MailCheckIcon className="mx-auto size-10 text-accent" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">{mensagem}</p>
        <Button variant="outline" className="h-12 w-full text-base" onClick={aoVoltar}>
          Voltar para o login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={aoEnviar} className="space-y-4" noValidate>
      <p className="text-sm text-muted-foreground">
        Informe seu e-mail e enviaremos um link para redefinir sua senha.
      </p>
      <div className="space-y-1.5">
        <Label htmlFor="rec-email" className="text-base">
          E-mail
        </Label>
        <Input
          id="rec-email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>
      <Button
        type="submit"
        className="h-12 w-full text-base transition-transform hover:scale-[1.01]"
        disabled={enviando}
      >
        {enviando ? "Enviando…" : "Enviar link"}
      </Button>
      <button
        type="button"
        onClick={aoVoltar}
        className="mx-auto flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:underline"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Voltar para o login
      </button>
    </form>
  );
}
