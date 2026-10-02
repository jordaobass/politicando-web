import Link from "next/link";

import type { CandidatoCitado } from "@/lib/noticias";
import type { CandidaturaResumo, PaginaResultado } from "@/lib/types";
import { formatarCargo } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { FotoCandidato } from "@/components/comum/foto-candidato";
import { LinkPerfilDaNoticia } from "@/components/noticias/link-perfil-da-noticia";

/**
 * Base da API para fetch **no servidor**.
 *
 * No navegador o site fala com `/api` (mesma origem, resolvido pelo rewrite). No servidor
 * não existe origem relativa: é preciso o endereço real do backend. `?.trim() ||` em vez de
 * `??` porque variável declarada e VAZIA passa pelo `??` e viraria `fetch("/api/...")`.
 */
function baseDaApi(): string {
  const interno = process.env.BACKEND_INTERNAL_URL?.trim();
  if (interno) return `${interno.replace(/\/$/, "")}/api`;
  return process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5080/api";
}

/**
 * Resolve o candidato citado pelo nome de urna + cargo.
 *
 * Falha de rede, backend fora do ar durante o build ou candidato despublicado por curadoria
 * devolvem `null` — e o bloco simplesmente não aparece. Matéria publicada não pode quebrar
 * porque um perfil saiu do ar meses depois.
 */
async function resolverCandidatura(citado: CandidatoCitado): Promise<CandidaturaResumo | null> {
  const query = new URLSearchParams({ q: citado.nome, cargos: citado.cargo, tamanho: "5" });

  try {
    const resposta = await fetch(`${baseDaApi()}/candidaturas?${query}`, {
      // Revalida de hora em hora: foto, partido e situação mudam; o texto da matéria, não.
      next: { revalidate: 3600 },
    });
    if (!resposta.ok) return null;

    const pagina = (await resposta.json()) as PaginaResultado<CandidaturaResumo>;
    const exatos = pagina.itens.filter(
      (c) => c.nomeUrna.localeCompare(citado.nome, "pt-BR", { sensitivity: "base" }) === 0,
    );

    // Só vale quando não há dúvida: dois homônimos no mesmo cargo viram bloco nenhum, nunca
    // o candidato errado ilustrando a matéria.
    const unico = exatos.length === 1 ? exatos[0] : pagina.itens.length === 1 ? pagina.itens[0] : null;
    return unico?.somenteInformativo ? null : unico;
  } catch {
    return null;
  }
}

function Cartao({ candidato }: { candidato: CandidaturaResumo }) {
  const uf = candidato.uf && candidato.uf !== "BR" ? ` · ${candidato.uf}` : "";

  return (
    <li className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
      <FotoCandidato
        fotoUrl={candidato.fotoUrl}
        nome={candidato.nomeUrna}
        tamanho={64}
        className="size-16 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{candidato.nomeUrna}</p>
        <p className="truncate text-sm text-muted-foreground">
          {formatarCargo(candidato.cargo)}
          {uf} · {candidato.partidoSigla}
        </p>
      </div>
      <div className="flex gap-2">
        <LinkPerfilDaNoticia
          id={candidato.id}
          nome={candidato.nomeUrna}
          cargo={candidato.cargo}
        />
        <Button asChild size="sm">
          <Link href="/quiz">Ver meu match</Link>
        </Button>
      </div>
    </li>
  );
}

/**
 * Versão sem perfil resolvido: a API não respondeu na hora de gerar a página (é o caso do
 * build em container, que não enxerga o backend) ou o nome ficou ambíguo.
 *
 * O link **não** some: cai na busca da lista de candidatos. O requisito é que a matéria
 * sempre leve ao candidato e ao quiz — e requisito que depende de a API estar de pé no
 * momento do build não é requisito cumprido.
 */
function CartaoSimples({ citado }: { citado: CandidatoCitado }) {
  return (
    <li className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{citado.nome}</p>
        <p className="truncate text-sm text-muted-foreground">{formatarCargo(citado.cargo)}</p>
      </div>
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href={`/candidatos?q=${encodeURIComponent(citado.nome)}`}>Ver o perfil</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/quiz">Ver meu match</Link>
        </Button>
      </div>
    </li>
  );
}

/**
 * Bloco "citados nesta matéria": a ponte obrigatória entre a notícia e o produto.
 *
 * Vem do frontmatter, não do texto — assim nenhuma matéria é publicada sem levar o leitor
 * ao perfil de quem ela trata e ao quiz.
 */
export async function BlocoCandidatoCitado({ citados }: { citados: CandidatoCitado[] }) {
  const resolvidos = await Promise.all(citados.map(resolverCandidatura));

  return (
    <aside className="mt-10 rounded-xl border border-border bg-muted/40 p-5">
      <h2 className="text-sm font-semibold text-muted-foreground">Citados nesta matéria</h2>
      <ul className="mt-3 space-y-3">
        {citados.map((citado, indice) => {
          const candidato = resolvidos[indice];
          return candidato ? (
            <Cartao key={candidato.id} candidato={candidato} />
          ) : (
            <CartaoSimples key={`${citado.nome}-${citado.cargo}`} citado={citado} />
          );
        })}
      </ul>
    </aside>
  );
}
