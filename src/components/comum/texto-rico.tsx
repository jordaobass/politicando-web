import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Remove marcadores markdown, virando texto plano — para prévias com `line-clamp` (onde não cabem
 * blocos/parágrafos). Tira **negrito**, `##` títulos, bullets e numeração no início da linha.
 */
export function textoSimples(texto: string): string {
  return texto
    .replace(/\r/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(^|\n)\s*#{1,6}\s+/g, "$1")
    .replace(/(^|\n)\s*[-•*]\s+/g, "$1")
    .replace(/(^|\n)\s*\d+\.\s+/g, "$1")
    .replace(/\n{2,}/g, " — ")
    .replace(/\n/g, " ")
    .trim();
}

/** Renderiza ênfase **negrito** de forma SEGURA (constrói nós React, sem HTML). */
function inline(texto: string): ReactNode[] {
  const partes: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let ultimo = 0;
  let chave = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(texto)) !== null) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    partes.push(
      <strong key={chave++} className="font-semibold text-foreground">
        {m[1]}
      </strong>,
    );
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

/**
 * Renderiza texto com markdown LEVE e SEGURO (item Correções v5): parágrafos (separados por linha
 * em branco), listas com "- "/"• " e ênfase **negrito**. Não usa dangerouslySetInnerHTML — cada
 * trecho vira nó React. Usado nos textos de IA (justificativa, observação, síntese) e no programa
 * do partido, dando formatação consistente em todos os perfis.
 */
export function TextoRico({ texto, className }: { texto: string; className?: string }) {
  const linhas = texto.replace(/\r/g, "").split("\n");
  const blocos: ReactNode[] = [];
  let lista: string[] = [];
  let listaOrdenada = false;
  let paragrafo: string[] = [];
  let chave = 0;

  const fecharLista = () => {
    if (!lista.length) return;
    const itens = lista;
    const ordenada = listaOrdenada;
    lista = [];
    const conteudo = itens.map((item, i) => <li key={i}>{inline(item)}</li>);
    blocos.push(
      ordenada ? (
        <ol key={chave++} className="list-decimal space-y-1 pl-5">
          {conteudo}
        </ol>
      ) : (
        <ul key={chave++} className="list-disc space-y-1 pl-5">
          {conteudo}
        </ul>
      ),
    );
  };
  const fecharParagrafo = () => {
    if (!paragrafo.length) return;
    const texto = paragrafo.join(" ");
    paragrafo = [];
    blocos.push(<p key={chave++}>{inline(texto)}</p>);
  };

  for (const bruta of linhas) {
    const linha = bruta.trim();
    const titulo = /^#{1,6}\s+(.+)$/.exec(linha);
    const bullet = /^([-•*])\s+/.exec(linha);
    const ordenado = /^\d+[.)]\s+(.+)$/.exec(linha);
    if (titulo) {
      fecharParagrafo();
      fecharLista();
      blocos.push(
        <p key={chave++} className="font-semibold text-foreground">
          {inline(titulo[1])}
        </p>,
      );
    } else if (bullet) {
      fecharParagrafo();
      if (listaOrdenada) fecharLista();
      listaOrdenada = false;
      lista.push(linha.slice(bullet[0].length));
    } else if (ordenado) {
      fecharParagrafo();
      if (!listaOrdenada) fecharLista();
      listaOrdenada = true;
      lista.push(ordenado[1]);
    } else if (linha === "") {
      fecharParagrafo();
      fecharLista();
    } else {
      fecharLista();
      paragrafo.push(linha);
    }
  }
  fecharParagrafo();
  fecharLista();

  return <div className={cn("space-y-2.5", className)}>{blocos}</div>;
}
