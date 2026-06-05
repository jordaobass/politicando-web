import Image from "next/image";

import { cn } from "@/lib/utils";

/** Selo do partido: sigla (nome) + logo (quando houver), nessa ordem. Texto suave. */
export function SeloPartido({
  sigla,
  logoUrl,
  className,
}: {
  sigla?: string | null;
  logoUrl?: string | null;
  className?: string;
}) {
  if (!sigla) return null;
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-1.5 text-sm text-muted-foreground",
        className,
      )}
    >
      {sigla}
      {logoUrl && (
        <Image
          src={logoUrl}
          alt=""
          width={18}
          height={18}
          className="size-5 shrink-0 rounded bg-white object-contain p-0.5"
          unoptimized
        />
      )}
    </p>
  );
}
