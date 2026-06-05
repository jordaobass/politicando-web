"use client";

import { useRouter } from "next/navigation";

import { BuscaCandidato } from "@/components/comum/busca-candidato";

/** Busca da home: autocomplete grande; ao escolher, navega para o perfil do candidato. */
export function BuscaCandidatos() {
  const router = useRouter();
  return (
    <BuscaCandidato
      tamanho="grande"
      onSelecionar={(c) => router.push(`/candidatos/${c.id}`)}
    />
  );
}
