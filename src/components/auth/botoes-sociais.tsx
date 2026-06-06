"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { URL_LOGIN_GOOGLE } from "@/lib/api";

/** Logo do Google nas suas 4 cores oficiais. */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/** Logo da Apple, sempre em preto. */
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" focusable="false">
      <path
        fill="#000000"
        d="M16.365 1.43c0 1.14-.42 2.21-1.12 3.01-.84.96-2.2 1.7-3.32 1.61-.14-1.12.43-2.3 1.1-3.04.74-.83 2.04-1.46 3.34-1.58zM20.79 17.2c-.6 1.38-.89 1.99-1.66 3.2-1.07 1.68-2.58 3.78-4.46 3.8-1.67.01-2.1-1.09-4.36-1.08-2.26.01-2.73 1.1-4.4 1.08-1.88-.02-3.31-1.91-4.38-3.59-2.99-4.71-2.29-10.55.67-12.91 1.16-.93 2.55-1.47 3.86-1.47 1.39 0 2.27.98 4.27.98 1.94 0 3.12-.98 4.86-.98 1.18 0 2.43.32 3.32 1.13-2.92 1.6-2.45 5.77.88 6.83-.27.79-.51 1.36-.9 2.01z"
      />
    </svg>
  );
}

const ESTILO_BOTAO =
  "h-12 w-full justify-center gap-3 border-zinc-200 bg-white text-base font-medium text-zinc-800 hover:bg-zinc-50";

/** Botões de login social: Google (OAuth real no backend) e Apple (ainda visual). */
export function BotoesSociais() {
  function entrarComGoogle() {
    // Navegação de página inteira: o fluxo OAuth roda todo no backend e volta em /auth/callback.
    window.location.href = URL_LOGIN_GOOGLE;
  }

  return (
    <div className="grid gap-3">
      <Button type="button" variant="outline" className={ESTILO_BOTAO} onClick={entrarComGoogle}>
        <GoogleIcon />
        Entrar com Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className={ESTILO_BOTAO}
        onClick={() => toast.info("Login com Apple estará disponível em breve.")}
      >
        <AppleIcon />
        Entrar com Apple
      </Button>
    </div>
  );
}
