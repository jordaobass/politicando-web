import type { Metadata } from "next";

import { CabecalhoPagina } from "@/components/comum/cabecalho-pagina";

export const metadata: Metadata = {
  title: "Como calculamos a pontuação",
  description:
    "Entenda como avaliamos o histórico de cada candidato com base em dados públicos e oficiais.",
};

/** Os 8 temas avaliados pela plataforma (escala de pontuação 0 a 5). */
const TEMAS = [
  "Saúde",
  "Educação",
  "Segurança Pública",
  "Meio Ambiente",
  "Economia",
  "Direitos Humanos",
  "Infraestrutura",
  "Ciência & Tecnologia",
] as const;

/** Tipos de evidência, em ordem de prioridade (maior peso primeiro). */
const EVIDENCIAS = [
  {
    titulo: "Atuação direta",
    descricao:
      "proposições legislativas, votações e participação em comissões relacionadas ao tema",
  },
  {
    titulo: "Declarações formais",
    descricao:
      "discursos oficiais, entrevistas e posicionamentos públicos documentados",
  },
  {
    titulo: "Contexto indireto",
    descricao: "histórico de alianças e coligações",
  },
] as const;

/** Fontes oficiais dos dados utilizados na pontuação. */
const FONTES = [
  { nome: "Câmara dos Deputados", url: "https://dados.camara.leg.br" },
  { nome: "Senado Federal", url: "https://legis.senado.leg.br" },
  {
    nome: "Tribunal Superior Eleitoral (TSE)",
    url: "https://dadosabertos.tse.jus.br",
  },
  { nome: "Portal da Transparência", url: "https://portaldatransparencia.gov.br" },
  { nome: "IBGE", url: "https://ibge.gov.br" },
  { nome: "INPE", url: "https://inpe.br" },
  {
    nome: "Tesouro Nacional (STN SICONFI)",
    url: "https://siconfi.tesouro.gov.br",
  },
] as const;

/**
 * Página pública de transparência (US07): explica, em linguagem leiga, o que é
 * a pontuação, como ela é calculada e quais são as fontes oficiais dos dados.
 */
export default function ComoCalculamosPage() {
  return (
    <div
      className="mx-auto max-w-3xl space-y-10 px-4 py-10"
      data-testid="pagina-como-calculamos"
    >
      <CabecalhoPagina
        titulo="Como calculamos a pontuação"
        descricao="Entenda como avaliamos o histórico de cada candidato com base em dados públicos e oficiais."
      />

      <section className="space-y-3" data-testid="secao-o-que-e">
        <h2 className="text-xl font-semibold text-foreground">
          O que é a pontuação?
        </h2>
        <p className="text-muted-foreground">
          Cada candidato recebe uma pontuação de 0 a 5 em cada um dos 8 temas que
          o Politicando avalia:
        </p>
        <ul className="flex flex-wrap gap-2">
          {TEMAS.map((tema) => (
            <li
              key={tema}
              className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
            >
              {tema}
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground">
          Essa pontuação reflete o quanto o candidato se envolveu com aquele tema
          ao longo do seu histórico político, com base em dados públicos. Quanto
          maior a pontuação, maior foi o engajamento com o tema.
        </p>
        <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Importante:</strong> a pontuação
          não indica se o candidato é a favor ou contra uma causa. Ela mede
          intensidade de atuação, não posicionamento ideológico.
        </p>
      </section>

      <section className="space-y-3" data-testid="secao-como-chegamos">
        <h2 className="text-xl font-semibold text-foreground">
          Como chegamos a esse número?
        </h2>
        <p className="text-muted-foreground">
          Analisamos três tipos de evidência, nessa ordem de prioridade:
        </p>
        <ol className="space-y-3">
          {EVIDENCIAS.map((evidencia, indice) => (
            <li key={evidencia.titulo} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {indice + 1}
              </span>
              <p className="text-muted-foreground">
                <strong className="text-foreground">{evidencia.titulo}:</strong>{" "}
                {evidencia.descricao}
              </p>
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground">
          Quanto mais direta e verificável a evidência, maior o peso na pontuação
          final.
        </p>
      </section>

      <section className="space-y-3" data-testid="secao-sem-historico">
        <h2 className="text-xl font-semibold text-foreground">
          E candidatos sem histórico?
        </h2>
        <p className="text-muted-foreground">
          Candidatos que concorrem pela primeira vez, sem mandato anterior,
          recebem pontuação máxima de 1 em todos os temas. Isso indica que não há
          histórico suficiente para uma avaliação mais aprofundada, e não que o
          candidato é ruim ou bom.
        </p>
      </section>

      <section className="space-y-3" data-testid="secao-fontes">
        <h2 className="text-xl font-semibold text-foreground">Fontes dos dados</h2>
        <p className="text-muted-foreground">
          Todos os dados utilizados são públicos e provenientes de fontes
          oficiais do governo brasileiro:
        </p>
        <ul className="space-y-2">
          {FONTES.map((fonte) => (
            <li key={fonte.url}>
              <a
                href={fonte.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {fonte.nome}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
