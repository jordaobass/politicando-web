"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookieIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useArmazenamento, useHidratado } from "@/hooks/use-storage";
import { CHAVE_COOKIES } from "@/lib/constantes";

/** Rotas em que o banner não aparece (painel admin e a tela de site fechado). */
const ROTAS_SEM_BANNER = ["/admin", "/em-breve"];

/**
 * Barra de consentimento de cookies (Correções v6, item 5).
 *
 * NÃO bloqueia a navegação (decisão E1 do DECISOES.md): a plataforma hoje só usa
 * armazenamento próprio essencial — não há cookie de terceiro nem analytics —,
 * então travar a tela seria atrito sem contrapartida. Também não há "Personalizar":
 * sem categorias de terceiros, não existe o que personalizar.
 *
 * A decisão fica no localStorage e o banner não volta depois de tomada. Se um dia
 * entrar analytics, o carregamento dele passa a depender de `cookiesAceitos()`.
 */
export function BannerCookies() {
  const pathname = usePathname();
  const hidratado = useHidratado();
  const [decisao, gravarDecisao] = useArmazenamento("local", CHAVE_COOKIES);

  const rotaBloqueada = ROTAS_SEM_BANNER.some(
    (rota) => pathname === rota || pathname.startsWith(`${rota}/`),
  );

  // Só renderiza depois da hidratação: no servidor não há como saber a decisão, e
  // renderizar antes causaria mismatch (ou um flash do banner para quem já decidiu).
  if (!hidratado || rotaBloqueada || decisao) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      data-testid="banner-cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <CookieIcon
            className="mt-0.5 size-4 shrink-0 text-accent"
            aria-hidden="true"
          />
          <span>
            Usamos armazenamento próprio para manter sua sessão e lembrar
            preferências. Não usamos cookies de publicidade nem de terceiros.{" "}
            <Link
              href="/cookies"
              className="font-medium text-accent underline underline-offset-4"
            >
              Política de cookies
            </Link>
            .
          </span>
        </p>

        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            onClick={() => gravarDecisao("recusados")}
            data-testid="cookies-recusar"
          >
            Recusar não essenciais
          </Button>
          <Button
            onClick={() => gravarDecisao("aceitos")}
            data-testid="cookies-aceitar"
          >
            Aceitar todos
          </Button>
        </div>
      </div>
    </div>
  );
}
