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

/**
 * Os dois números por tema. Separá-los na explicação é o próprio conserto: a versão anterior
 * desta página dizia que a nota media "intensidade de atuação, não posicionamento", o que fez
 * leitores concluírem que o match ranqueava por engajamento (Correções v6, item 4).
 */
const NUMEROS = [
  {
    titulo: "Afinidade",
    descricao:
      "o quanto a posição do candidato no tema se aproxima da sua, medida na mesma régua de 0 a 100 que o quiz usa para posicionar você.",
    papel: "É este número que entra no seu match.",
  },
  {
    titulo: "Atuação",
    descricao:
      "o quanto o candidato de fato trabalhou o tema — projetos, votos, relatorias e comissões —, numa escala de 0 a 5.",
    papel: "Informativo: não entra no cálculo do match.",
  },
] as const;

/** Passo a passo do match, na ordem em que acontece. */
const ETAPAS_MATCH = [
  "Você responde o quiz. Cada resposta posiciona você entre 0 e 100 no tema da pergunta.",
  "O candidato já tem uma posição de 0 a 100 no mesmo tema, obtida do histórico público dele.",
  "A afinidade no tema é o quanto essas duas posições estão próximas: quanto menor a distância, maior a afinidade.",
  "O match final é a média das afinidades dos temas que você respondeu, com mais peso nos temas em que você respondeu com mais convicção.",
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
          Dois números, duas perguntas diferentes
        </h2>
        <p className="text-muted-foreground">
          Em cada um dos 8 temas que o Politicando avalia, o candidato recebe{" "}
          <strong className="text-foreground">dois</strong> números — eles
          respondem a perguntas distintas e não devem ser lidos como um só:
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
        <dl className="grid gap-3 sm:grid-cols-2">
          {NUMEROS.map((numero) => (
            <div
              key={numero.titulo}
              className="space-y-1.5 rounded-lg border border-border bg-card p-4"
            >
              <dt className="font-semibold text-foreground">{numero.titulo}</dt>
              <dd className="text-sm text-muted-foreground">
                {numero.descricao}
                <span className="mt-2 block font-medium text-foreground">
                  {numero.papel}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Por que separar:</strong> atuar
          muito num tema não diz de que lado o candidato está. Alguém pode ter
          dezenas de projetos sobre economia e defender exatamente o oposto do
          que você pensa. Por isso quem entra na conta do seu match é a{" "}
          <strong className="text-foreground">posição</strong>, e a atuação fica
          ao lado como informação — nunca somada a ela.
        </p>
      </section>

      <section className="space-y-3" data-testid="secao-como-e-o-match">
        <h2 className="text-xl font-semibold text-foreground">
          Como o seu match é calculado
        </h2>
        <ol className="space-y-3">
          {ETAPAS_MATCH.map((etapa, indice) => (
            <li key={etapa} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {indice + 1}
              </span>
              <p className="text-muted-foreground">{etapa}</p>
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground">
          O cálculo é determinístico: as mesmas respostas produzem sempre o mesmo
          resultado. A inteligência artificial não participa dessa conta — ela é
          usada antes, para ler o histórico público e posicionar o candidato em
          cada tema.
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

      <section
        className="space-y-3"
        id="secao-sem-historico"
        data-testid="secao-sem-historico"
      >
        <h2 className="text-xl font-semibold text-foreground">
          E candidatos sem histórico?
        </h2>
        <p className="text-muted-foreground">
          Quem concorre pela primeira vez, sem mandato anterior, costuma não ter
          registro público suficiente para ser posicionado num tema. Nesse caso o
          tema simplesmente{" "}
          <strong className="text-foreground">fica de fora do seu match</strong>,
          em vez de entrar como se o candidato fosse de centro.
        </p>
        <p className="text-muted-foreground">
          Isso é falta de histórico, não avaliação negativa — um estreante não é
          pior nem melhor por não ter passado. Quando um candidato aparece com o
          match apurado em poucos temas, a tela informa em quantos ele foi
          avaliado, para que você saiba sobre o que aquele número está falando.
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
