"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { Skeleton } from "@/components/ui/skeleton";
import { CartaoCandidato } from "@/components/comum/cartao-candidato";
import { useCandidaturas } from "@/hooks/use-api";

/**
 * Destaques da home: cartões pôster (CartaoCandidato) com a borda na cor do partido.
 * Mobile = slider coverflow; desktop = lado a lado com hover.
 */
export function DestaquesHome() {
  const { data, isLoading } = useCandidaturas({ cargos: ["Presidente"], tamanho: 3 });
  // Embaralha a cada carregamento para não privilegiar sempre o mesmo nome.
  const itens = useMemo(() => embaralhar(data?.itens ?? []), [data?.itens]);

  if (isLoading) {
    return (
      <div className="flex items-end justify-center gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-72 w-44 rounded-2xl sm:w-56" />
        ))}
      </div>
    );
  }

  if (itens.length === 0) return null;

  return (
    <>
      {/* Mobile: slider coverflow (vê os 3, central em destaque) */}
      <div className="w-full sm:hidden">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          initialSlide={1}
          coverflowEffect={{ rotate: 14, stretch: 8, depth: 110, modifier: 1, slideShadows: false }}
          modules={[EffectCoverflow]}
        >
          {itens.map((c) => (
            <SwiperSlide key={c.id} className="!w-44">
              <CartaoCandidato candidato={c} className="shadow-md" />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="mt-3 text-center text-xs text-muted-foreground">clique para saber mais</p>
      </div>

      {/* Desktop: cartões lado a lado */}
      <div className="hidden items-stretch justify-center gap-6 sm:flex">
        {itens.map((c) => (
          <Link key={c.id} href={`/candidatos/${c.id}`} className="group block w-56 shrink-0">
            <CartaoCandidato
              candidato={c}
              comHover
              className="transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl"
            />
          </Link>
        ))}
      </div>
    </>
  );
}

/** Fisher-Yates: devolve uma nova ordem aleatória a cada chamada. */
function embaralhar<T>(lista: T[]): T[] {
  const arr = [...lista];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
