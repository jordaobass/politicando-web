import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

import { ResultadoView } from "@/components/quiz/resultado-view";
import { GradeSkeleton } from "@/components/comum/estados";
import { UFS } from "@/lib/constantes";

export const metadata: Metadata = {
  title: "Seu resultado",
  description: "Veja seu perfil político e a compatibilidade com os candidatos.",
};

/**
 * Estado provável de quem está acessando, só para PRÉ-SELECIONAR o seletor de UF — a pessoa
 * troca à vontade e a escolha dela sempre vence.
 *
 * Vem do cabeçalho que a Vercel injeta na borda a partir do IP. Não guardamos o IP nem
 * gravamos a inferência: ela vive só nesta resposta, e por isso não cria cookie novo (a
 * Política de Cookies publicada lista apenas os essenciais). Fora da Vercel — container de
 * desenvolvimento, por exemplo — o cabeçalho não existe e o seletor abre vazio como antes.
 */
async function ufProvavel(): Promise<string | null> {
  const cabecalhos = await headers();
  if (cabecalhos.get("x-vercel-ip-country") !== "BR") return null;
  const regiao = cabecalhos.get("x-vercel-ip-country-region")?.trim().toUpperCase();
  return regiao && (UFS as readonly string[]).includes(regiao) ? regiao : null;
}

export default async function ResultadoPage() {
  const ufSugerida = await ufProvavel();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Seu resultado
        </h1>
        <p className="text-muted-foreground">
          Aqui está seu perfil político e os candidatos com maior afinidade.
        </p>
      </div>
      <Suspense fallback={<GradeSkeleton quantidade={1} />}>
        <ResultadoView ufSugerida={ufSugerida} />
      </Suspense>
    </div>
  );
}
