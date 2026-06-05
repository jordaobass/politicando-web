import { TriangleAlertIcon } from "lucide-react";

/** Banner discreto avisando que a plataforma é um protótipo. */
export function BannerPrototipo() {
  return (
    <div className="w-full bg-accent text-accent-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-xs sm:text-sm">
        <TriangleAlertIcon className="size-3.5 shrink-0" aria-hidden="true" />
        <span>
          Protótipo — candidatos oficiais 2026 disponíveis após registro no TSE.
        </span>
      </div>
    </div>
  );
}
