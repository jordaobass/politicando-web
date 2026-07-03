import { cn } from "@/lib/utils";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { SeloPartido } from "@/components/comum/selo-partido";
import { corPartido } from "@/lib/format";
import type { CandidaturaResumo } from "@/lib/types";

interface CartaoCandidatoProps {
  candidato: CandidaturaResumo;
  /** Ativa zoom da foto + selo "Ver perfil" no hover. Requer um ancestral com a classe `group`. */
  comHover?: boolean;
  className?: string;
  /** Otimiza/cacheia a foto pelo edge da Vercel (usar só em conjuntos pequenos, ex.: landing). */
  otimizarFoto?: boolean;
  /**
   * Cor da borda-topo. Padrão = cor do partido. No comparativo usamos a cor da SÉRIE (A/B) para
   * o cartão bater com a faixa e distinguir os dois lados mesmo quando são do mesmo partido.
   */
  corTopo?: string;
}

/**
 * Cartão "pôster" de candidato: borda colorida no topo (cor do partido), foto 3/4 e
 * faixa com nome + selo do partido. Reutilizável em destaques, listas, etc.
 *
 * O wrapper de navegação (Link) ou de slider (SwiperSlide) fica por conta de quem usa —
 * assim o mesmo cartão serve tanto para o carrossel do mobile quanto para a grade do desktop.
 */
export function CartaoCandidato({ candidato, comHover = false, className, otimizarFoto = false, corTopo }: CartaoCandidatoProps) {
  return (
    <div
      style={{ borderTopColor: corTopo ?? corPartido(candidato.partidoSigla) ?? "var(--border)" }}
      className={cn(
        "overflow-hidden rounded-2xl border-t-4 border-border bg-card shadow-sm",
        className,
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <FotoCandidato
          fotoUrl={candidato.fotoUrl}
          nome={candidato.nomeUrna}
          circular={false}
          otimizar={otimizarFoto}
          prioritaria={otimizarFoto}
          className={cn(
            "size-full",
            comHover && "transition-transform duration-500 group-hover:scale-110",
          )}
        />
        {comHover && (
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-primary/85 via-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="mb-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary shadow">
              Ver perfil
            </span>
          </div>
        )}
      </div>
      <div className="space-y-0.5 bg-card px-3 pt-1.5 pb-3 text-center">
        <p className="truncate font-bold text-foreground">{candidato.nomeUrna}</p>
        <SeloPartido sigla={candidato.partidoSigla} logoUrl={candidato.partidoLogoUrl} />
      </div>
    </div>
  );
}
