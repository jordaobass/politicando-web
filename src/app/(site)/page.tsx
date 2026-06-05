import { Hero } from "@/components/landing/hero";
import { AcoesRapidas } from "@/components/landing/acoes-rapidas";
import { SecaoComparacao } from "@/components/landing/secao-comparacao";
import { SecaoBusca } from "@/components/landing/secao-busca";

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
