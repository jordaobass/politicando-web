"use client";

import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Input de senha com botão de mostrar/ocultar. Encaminha a ref para o RHF. */
export const CampoSenha = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  function CampoSenha({ className, ...props }, ref) {
    const [visivel, setVisivel] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visivel ? "text" : "password"}
          className={cn("h-12 pr-11 text-base", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {visivel ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
        </button>
      </div>
    );
  },
);
