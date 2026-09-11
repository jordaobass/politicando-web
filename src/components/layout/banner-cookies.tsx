"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookieIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useArmazenamento, useHidratado } from "@/hooks/use-storage";
import { CHAVE_COOKIES } from "@/lib/constantes";
import { GA_ID } from "@/lib/analytics";

/** Rotas em que o banner não aparece (painel admin e a tela de site fechado). */
const ROTAS_SEM_BANNER = ["/admin", "/em-breve"];

/**
 * Barra de consentimento de cookies (Correções v6, item 5).
 *
 * NÃO bloqueia a navegação (decisão E1 do DECISOES.md): travar a tela seria atrito sem
 * contrapartida, já que nada de terceiro é carregado antes da escolha. Também não há
 * "Personalizar": só existe uma finalidade não essencial, a medição de audiência.
 *
 * O texto acompanha a configuração do ambiente: sem `NEXT_PUBLIC_GA_ID` não há terceiro
 * nenhum, e prometer o contrário seria informação falsa ao titular. Com o identificador
 * configurado, o Google Analytics só é carregado depois do "Aceitar todos" — ver
 * `components/analytics/google-analytics.tsx`, que lê esta mesma decisão.
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
            {GA_ID ? (
              <>
                Usamos armazenamento próprio para manter sua sessão e lembrar
                preferências e, se você aceitar, o Google Analytics para medir a
                audiência. Não usamos cookies de publicidade.{" "}
              </>
            ) : (
              <>
                Usamos armazenamento próprio para manter sua sessão e lembrar
                preferências. Não usamos cookies de publicidade nem de terceiros.{" "}
              </>
            )}
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
