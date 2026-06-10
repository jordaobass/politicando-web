"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { meuPerfil } from "@/lib/api";
import { useSessao } from "@/hooks/use-sessao";

/**
 * Retorno do login social: o backend redireciona para cá com o JWT no fragmento (#token=...).
 * Lê o token, busca o perfil em /auth/me, grava a sessão e segue para o perfil.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const { entrar } = useSessao();
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const token = hash.get("token");
      const refreshToken = hash.get("refresh") ?? "";
      if (!token) {
        if (!cancelado) setErro(true);
        return;
      }
      const novo = hash.get("novo") === "1";
      const vinculado = hash.get("vinculado") === "1";
      try {
        const usuario = await meuPerfil(token);
        if (cancelado) return;
        entrar({ token, refreshToken, usuario });

        if (novo) {
          // Novo usuário via Google: falta a data de nascimento (etapa complementar).
          router.replace("/completar-cadastro");
          return;
        }
        if (vinculado) {
          toast.success("Conta vinculada ao Google com sucesso.");
        } else {
          toast.success(`Bem-vindo de volta, ${usuario.nome}!`);
        }
        router.replace("/candidatos");
      } catch {
        if (!cancelado) setErro(true);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [entrar, router]);

  if (erro) {
    return (
      <div className="mx-auto max-w-md space-y-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-foreground">Não foi possível concluir o login</h1>
        <p className="text-muted-foreground">Tente novamente pela tela de login.</p>
        <Link href="/login" className="text-primary underline">
          Voltar para o login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center text-muted-foreground" aria-live="polite">
      Concluindo seu login…
    </div>
  );
}
