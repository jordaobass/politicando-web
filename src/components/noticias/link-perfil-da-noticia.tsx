"use client";

import Link from "next/link";

import { registrarCliqueCandidato } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

/**
 * Link para o perfil marcando a origem "noticia" no GA.
 *
 * Existe como componente de cliente só por causa do clique: o bloco que o contém é servidor
 * (resolve o candidato na API em tempo de build/revalidação). É assim que dá para medir o
 * funil notícia → perfil → quiz sem transformar a página inteira em cliente.
 */
export function LinkPerfilDaNoticia({
  id,
  nome,
  cargo,
}: {
  id: string;
  nome: string;
  cargo: string;
}) {
  return (
    <Button asChild size="sm" variant="outline">
      <Link
        href={`/candidatos/${id}`}
        onClick={() => registrarCliqueCandidato({ id, nome, cargo, origem: "noticia" })}
      >
        Ver o perfil
      </Link>
    </Button>
  );
}
