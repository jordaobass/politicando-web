import Link from "next/link";
import { ShieldCheckIcon } from "lucide-react";

import { DISCLAIMER_HISTORICO } from "@/lib/constantes";

/**
 * Disclaimer da vitrine de candidatos (Correções v7, item 7): explica que só aparecem candidatos
 * com histórico de vida pública em plataformas oficiais — coerente com o corte de curadoria do
 * item 6. A copy vive em `lib/constantes.ts` (única fonte) e aguarda aprovação do dono (C6).
 */
export function DisclaimerHistorico() {
  return (
    <div
      data-testid="disclaimer-historico"
      className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground"
    >
      <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <p>
        {DISCLAIMER_HISTORICO}{" "}
        <Link
          href="/como-calculamos"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Como calculamos
        </Link>
      </p>
    </div>
  );
}
