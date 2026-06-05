import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { REGRAS_SENHA } from "@/lib/schemas";

/** Lista das regras de senha que acende em verde conforme são atendidas (tempo real). */
export function ChecklistSenha({ senha }: { senha: string }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1">
      {REGRAS_SENHA.map((regra) => {
        const ok = regra.testar(senha);
        return (
          <li
            key={regra.id}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              ok ? "font-medium text-accent" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full transition-all duration-300",
                ok ? "scale-100 bg-accent text-accent-foreground" : "scale-90 bg-muted",
              )}
            >
              {ok && <CheckIcon className="size-3" />}
            </span>
            {regra.rotulo}
          </li>
        );
      })}
    </ul>
  );
}
