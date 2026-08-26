"use client";

import { Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";

import { BuscaCandidato } from "@/components/comum/busca-candidato";
import { lerTexto, useEstadoNaUrl } from "@/hooks/use-estado-na-url";

/**
 * Busca da home: autocomplete grande; ao escolher, navega para o perfil do candidato.
 *
 * O termo digitado vai à URL (?q=) para o back do navegador restaurar a busca — Correções v7,
 * item 2b (revisão da decisão E7 SÓ para o termo: dropdown aberto e item destacado continuam
 * locais). Pelo mesmo motivo o input não é limpo ao escolher um candidato.
 */
function BuscaComTermoNaUrl() {
  const router = useRouter();
  const { params, sincronizar } = useEstadoNaUrl();
  const aoMudarTermo = useCallback((termo: string) => sincronizar({ q: termo }), [sincronizar]);

  return (
    <BuscaCandidato
      tamanho="grande"
      termoInicial={lerTexto(params, "q")}
      aoMudarTermo={aoMudarTermo}
      limparAoSelecionar={false}
      onSelecionar={(c) => router.push(`/candidatos/${c.id}`)}
    />
  );
}

/**
 * `useSearchParams` exige Suspense na landing estática (force-static). O fallback renderiza o
 * mesmo campo sem o espelho na URL — evita buraco/salto de layout no HTML pré-renderizado.
 */
export function BuscaCandidatos() {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <BuscaCandidato
          tamanho="grande"
          limparAoSelecionar={false}
          onSelecionar={(c) => router.push(`/candidatos/${c.id}`)}
        />
      }
    >
      <BuscaComTermoNaUrl />
    </Suspense>
  );
}
