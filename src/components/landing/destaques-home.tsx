"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { CartaoCandidato } from "@/components/comum/cartao-candidato";
import type { CandidaturaResumo } from "@/lib/types";

/**
 * Destaques da home: lista FIXA dos principais presidenciáveis, com fotos locais
 * (public/destaques) servidas pelo CDN da Vercel — sem chamada à API e sem buscar
 * imagem em origem externa, para a landing abrir instantânea. Os `id` batem com as
 * candidaturas reais do banco, então o link "Ver perfil" continua funcionando.
 */
const DESTAQUES: CandidaturaResumo[] = [
  destaque("de17554a-cb07-4dbb-a804-01094e84e3d2", "Flávio Bolsonaro", "PL", "/destaques/flavio-bolsonaro.jpg"),
  destaque("a4f60847-81ba-4bb8-bf45-0c5f0794e92f", "Lula", "PT", "/destaques/lula.jpg"),
  destaque("b0385683-734d-4395-b5e0-8634a6dc8b42", "Renan Santos", "MISSÃO", "/destaques/renan-santos.jpg"),
];

export function DestaquesHome() {
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
          {DESTAQUES.map((c) => (
            <SwiperSlide key={c.id} className="!w-44">
              <CartaoCandidato candidato={c} className="shadow-md" />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="mt-3 text-center text-xs text-muted-foreground">clique para saber mais</p>
      </div>

      {/* Desktop: cartões lado a lado */}
      <div className="hidden items-stretch justify-center gap-6 sm:flex">
        {DESTAQUES.map((c) => (
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

/** Monta um CandidaturaResumo mínimo para o cartão fixo da landing (foto local). */
function destaque(id: string, nomeUrna: string, partidoSigla: string, fotoUrl: string): CandidaturaResumo {
  return {
    id,
    nomeUrna,
    partidoSigla,
    partidoLogoUrl: null,
    cargo: "Presidente",
    uf: "BR",
    numeroUrna: "",
    fotoUrl,
    origem: "PreCandidato",
    scores: [],
  };
}
