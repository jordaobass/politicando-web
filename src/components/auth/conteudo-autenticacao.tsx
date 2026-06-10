"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { FormularioLogin } from "@/components/auth/formulario-login";
import { FormularioRegistro } from "@/components/auth/formulario-registro";
import { FormularioRecuperar } from "@/components/auth/formulario-recuperar";
import { BotoesSociais } from "@/components/auth/botoes-sociais";

type Aba = "login" | "registrar";

const ABAS: { id: Aba; rotulo: string }[] = [
  { id: "login", rotulo: "Entrar" },
  { id: "registrar", rotulo: "Criar conta" },
];

/**
 * Conteúdo de autenticação (abas, formulários, sociais e alternância), sem o card externo.
 * Reutilizado na página de login e no modal de fim de quiz. `aoConcluir` é chamado no sucesso.
 */
export function ConteudoAutenticacao({
  aoConcluir,
  abaInicial = "login",
}: {
  aoConcluir?: () => void;
  abaInicial?: Aba;
}) {
  const [aba, setAba] = useState<Aba>(abaInicial);
  const [recuperando, setRecuperando] = useState(false);
  // E-mail propagado do cadastro para a aba de login (link "Entrar" do e-mail já cadastrado).
  const [emailLogin, setEmailLogin] = useState("");

  function irParaLogin(email: string) {
    setEmailLogin(email);
    setAba("login");
  }

  // Modo recuperação de senha: oculta abas e sociais.
  if (recuperando) {
    return (
      <div className="animate-in fade-in slide-in-from-right-3 space-y-4 duration-300">
        <h2 className="text-lg font-bold text-foreground">Recuperar senha</h2>
        <FormularioRecuperar aoVoltar={() => setRecuperando(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 border-b border-border">
        {ABAS.map(({ id, rotulo }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={aba === id}
            onClick={() => setAba(id)}
            className={cn(
              "relative pb-3 text-center text-base font-semibold transition-colors",
              aba === id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {rotulo}
            <span
              className={cn(
                "absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-primary transition-transform duration-300",
                aba === id ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>

      <div key={aba} className="animate-in fade-in slide-in-from-right-3 duration-300">
        {aba === "login" ? (
          <FormularioLogin
            aoConcluir={aoConcluir}
            aoEsquecer={() => setRecuperando(true)}
            emailInicial={emailLogin}
          />
        ) : (
          <FormularioRegistro aoConcluir={aoConcluir} aoIrParaLogin={irParaLogin} />
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <BotoesSociais />

      <p className="text-center text-sm text-muted-foreground">
        {aba === "login" ? (
          <>
            Não tem conta?{" "}
            <button
              type="button"
              onClick={() => setAba("registrar")}
              className="font-semibold text-primary transition-colors hover:underline"
            >
              Criar conta
            </button>
          </>
        ) : (
          <>
            Já tem conta?{" "}
            <button
              type="button"
              onClick={() => setAba("login")}
              className="font-semibold text-primary transition-colors hover:underline"
            >
              Entrar
            </button>
          </>
        )}
      </p>
    </div>
  );
}
