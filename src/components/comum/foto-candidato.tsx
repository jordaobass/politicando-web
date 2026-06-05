"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { UserRoundIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface FotoCandidatoProps {
  fotoUrl: string | null;
  nome: string;
  className?: string;
  /** Tamanho em pixels (quadrado) para o next/image. */
  tamanho?: number;
  /** true = avatar redondo (padrão); false = foto retangular (capa do card). */
  circular?: boolean;
  /** "cover" preenche cortando; "contain" mostra a foto inteira. */
  ajuste?: "cover" | "contain";
  /** Âncora do corte no modo "cover": "top" preserva o rosto em fotos baixas. */
  posicao?: "center" | "top";
  /** Estilos inline (ex.: cor de borda dinâmica por partido). */
  style?: CSSProperties;
}

/**
 * Exibe a foto do candidato com next/image e placeholder quando ausente
 * ou quando o carregamento falha (URLs externas podem estar indisponíveis).
 */
export function FotoCandidato({
  fotoUrl,
  nome,
  className,
  circular = true,
  ajuste = "cover",
  posicao = "center",
  style,
}: FotoCandidatoProps) {
  const [comErro, setComErro] = useState(false);
  const semImagem = !fotoUrl || comErro;

  return (
    <div
      style={style}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-muted text-muted-foreground",
        circular && "rounded-full",
        className,
      )}
    >
      {semImagem ? (
        <UserRoundIcon
          className="size-1/2"
          aria-label={`Foto indisponível de ${nome}`}
        />
      ) : (
        <Image
          src={fotoUrl}
          alt={`Foto de ${nome}`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className={cn(
            ajuste === "contain" ? "object-contain" : "object-cover",
            posicao === "top" && "object-top",
          )}
          onError={() => setComErro(true)}
          unoptimized
        />
      )}
    </div>
  );
}
