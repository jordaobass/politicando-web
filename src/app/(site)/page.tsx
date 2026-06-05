import { Hero } from "@/components/landing/hero";
import { AcoesRapidas } from "@/components/landing/acoes-rapidas";
import { SecaoComparacao } from "@/components/landing/secao-comparacao";
import { SecaoBusca } from "@/components/landing/secao-busca";

// Landing 100% estática: prerenderizada no build e servida do cache (CDN) —
// reload instantâneo. `force-static` trava a rota como estática e `revalidate=false`
// mantém o HTML cacheado até o próximo deploy (não há dado dinâmico aqui).
export const dynamic = "force-static";
export const revalidate = false;

/** Landing page do Politicando: hero, comparação, busca e ações. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SecaoComparacao />
      <SecaoBusca />
      <AcoesRapidas />
    </>
  );
}
