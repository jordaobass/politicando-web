"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlusIcon, MapPinIcon, LockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EstadoVazio, GradeSkeleton } from "@/components/comum/estados";
import { PerfilPolitico } from "@/components/quiz/perfil-politico";
import { CardResultadoCandidato } from "@/components/quiz/card-resultado-candidato";
import { useResultadoEfetivo } from "@/hooks/use-resultado-quiz";
import { useEstadoNaUrl } from "@/hooks/use-estado-na-url";
import { useArmazenamento } from "@/hooks/use-storage";
import { CHAVE_UF, UFS } from "@/lib/constantes";
import type { CoberturaResultado, ResultadoCandidato } from "@/lib/types";

/** Cargos em ordem de exibição. "nacional" = não depende de UF. */
const CARGOS_ORDENADOS: { valor: string; rotulo: string; nacional: boolean }[] = [
  { valor: "Presidente", rotulo: "Presidente", nacional: true },
  { valor: "Governador", rotulo: "Governador", nacional: false },
  { valor: "Senador", rotulo: "Senador", nacional: false },
  { valor: "DeputadoFederal", rotulo: "Deputado Federal", nacional: false },
  { valor: "DeputadoEstadual", rotulo: "Deputado Estadual", nacional: false },
  { valor: "DeputadoDistrital", rotulo: "Deputado Distrital", nacional: false },
];

/** Visitante vê os 3 primeiros por cargo; o restante fica bloqueado com CTA. */
const VISIVEIS_SEM_LOGIN = 3;

const CLASSE_SELECT =
  "h-9 rounded-md border bg-field px-3 text-sm text-field-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ResultadoView() {
  const router = useRouter();
  const { params, sincronizar } = useEstadoNaUrl();
  const cargoParam = params.get("cargo");
  const ufParam = params.get("uf");
  const { resultado, autenticado, carregado } = useResultadoEfetivo();
  const [ufLocal, gravarUfLocal] = useArmazenamento("local", CHAVE_UF);

  // Aba e UF vivem na URL (Correções v7, item 2d): abrir um perfil e voltar mantém as duas.
  // O localStorage segue como espelho da UF — vira o default da próxima visita.
  const [cargoAba, setCargoAba] = useState(cargoParam ?? "");
  const uf = ufParam && ufParam !== "BR" ? ufParam : ufLocal;

  function trocarAba(valor: string) {
    setCargoAba(valor);
    sincronizar({ cargo: valor });
  }

  function gravarUf(valor: string | null) {
    gravarUfLocal(valor);
    sincronizar({ uf: valor });
  }

  // Chegando de "Ver meu resultado" de um candidato: pré-seleciona a UF dele uma vez (cargos
  // estaduais). Depois o usuário pode trocar livremente. Item 8 do card Correções v3.
  const ufAplicada = useRef(false);
  useEffect(() => {
    if (ufAplicada.current) return;
    if (ufParam && ufParam !== "BR") gravarUfLocal(ufParam);
    ufAplicada.current = true;
  }, [ufParam, gravarUfLocal]);

  const porCargo = useMemo(() => {
    const mapa = new Map<string, ResultadoCandidato[]>();
    for (const c of resultado?.resultado ?? []) {
      const lista = mapa.get(c.cargo) ?? [];
      lista.push(c);
      mapa.set(c.cargo, lista);
    }
    return mapa;
  }, [resultado]);

  // Ainda carregando (hidratação/busca do servidor): não pisca o estado-vazio.
  if (!carregado) {
    return <GradeSkeleton quantidade={1} />;
  }

  // Sem resultado: mensagem/ações conforme o estado (item 5 do card Correções v2).
  if (!resultado) {
    return autenticado ? (
      <EstadoVazio
        titulo="Você ainda não realizou o quiz"
        descricao="Gostaria de fazer agora?"
        acao={
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/quiz">Sim, fazer o quiz</Link>
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Não, voltar
            </Button>
          </div>
        }
      />
    ) : (
      <EstadoVazio
        titulo="Você ainda não realizou o quiz e não tem cadastro"
        descricao="O que gostaria de fazer?"
        acao={
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/login?aba=registrar">Fazer cadastro</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/quiz">Fazer o quiz</Link>
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Voltar
            </Button>
          </div>
        }
      />
    );
  }

  const cargosDisponiveis = CARGOS_ORDENADOS.filter(
    (c) => (porCargo.get(c.valor)?.length ?? 0) > 0,
  );

  // Aba ativa: o cargo escolhido (estado inicializado pela URL), se disponível; senão o primeiro.
  const cargoAtivo =
    (cargoAba && cargosDisponiveis.some((c) => c.valor === cargoAba) && cargoAba) ||
    cargosDisponiveis[0]?.valor;

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="space-y-6">
        <PerfilPolitico perfil={resultado.perfil} />
        {!autenticado && <CardCadastro />}
      </div>

      <section className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Estes são os{" "}
          <strong className="font-semibold text-foreground">
            candidatos mais alinhados com suas respostas
          </strong>
          . Escolha o cargo para explorar.
        </p>

        {cargosDisponiveis.length === 0 ? (
          <EstadoVazio
            titulo="Sem candidatos para exibir"
            descricao="Ainda não há candidatos compatíveis para mostrar."
          />
        ) : (
          <Tabs value={cargoAtivo} onValueChange={trocarAba}>
            {/* No celular os quatro cargos não cabem numa linha e quebram para a segunda. A
                altura precisa do prefixo `group-data-horizontal` para vencer o `h-8` da
                variante — sem ele a lista fica presa em 32px e a segunda linha invade o
                conteúdo abaixo. O espaçamento vertical dá lugar ao sublinhado da aba ativa,
                que fica 5px abaixo do rótulo. */}
            <TabsList
              variant="line"
              className="grid h-auto w-full grid-cols-2 justify-start gap-x-4 gap-y-3 group-data-horizontal/tabs:h-auto sm:flex sm:flex-wrap sm:gap-x-1"
            >
              {cargosDisponiveis.map((c) => (
                <TabsTrigger
                  key={c.valor}
                  value={c.valor}
                  className="h-auto min-h-9 w-fit justify-start px-2 py-1.5 sm:flex-none sm:justify-center"
                >
                  {c.rotulo}
                </TabsTrigger>
              ))}
            </TabsList>

            {cargosDisponiveis.map((c) => (
              <TabsContent key={c.valor} value={c.valor} className="space-y-4 pt-2">
                {c.nacional ? (
                  <ListaCargo
                    candidatos={porCargo.get(c.valor) ?? []}
                    autenticado={autenticado}
                  />
                ) : (
                  <ConteudoEstadual
                    rotulo={c.rotulo}
                    candidatos={porCargo.get(c.valor) ?? []}
                    uf={uf}
                    gravarUf={gravarUf}
                    autenticado={autenticado}
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        {resultado.cobertura && resultado.cobertura.semDados > 0 && (
          <AvisoSemDados cobertura={resultado.cobertura} />
        )}
      </section>
    </div>
  );
}

/** Conteúdo de um cargo estadual: exige UF; filtra a lista pela UF do eleitor. */
function ConteudoEstadual({
  rotulo,
  candidatos,
  uf,
  gravarUf,
  autenticado,
}: {
  rotulo: string;
  candidatos: ResultadoCandidato[];
  uf: string | null;
  gravarUf: (valor: string | null) => void;
  autenticado: boolean;
}) {
  if (!uf) {
    return (
      <div className="space-y-3 rounded-lg border border-dashed bg-muted/30 px-4 py-8 text-center">
        <MapPinIcon className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          Selecione seu estado para ver os candidatos a {rotulo}.
        </p>
        <select
          aria-label="Selecione seu estado"
          defaultValue=""
          onChange={(e) => gravarUf(e.target.value || null)}
          className={CLASSE_SELECT}
        >
          <option value="">Selecione…</option>
          {UFS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const lista = candidatos.filter((c) => c.uf === uf);
  return (
    <div className="space-y-4">
      <AvisoEstado uf={uf} gravarUf={gravarUf} />
      {lista.length === 0 ? (
        <EstadoVazio
          titulo={`Sem candidatos a ${rotulo} em ${uf}`}
          descricao="Troque o estado acima ou refaça o quiz."
        />
      ) : (
        <ListaCargo candidatos={lista} autenticado={autenticado} />
      )}
    </div>
  );
}

/** Aviso discreto do estado em exibição, com opção de trocar. */
function AvisoEstado({
  uf,
  gravarUf,
}: {
  uf: string;
  gravarUf: (valor: string | null) => void;
}) {
  const idUf = useId();

  // Combo sempre visível: troca de estado em 1 clique (sem o passo "Altere aqui" → select).
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 px-4 py-2.5 text-sm">
      <MapPinIcon className="size-4 text-muted-foreground" aria-hidden="true" />
      <label htmlFor={idUf} className="text-muted-foreground">
        Exibindo candidatos de
      </label>
      <select
        id={idUf}
        value={uf}
        onChange={(e) => gravarUf(e.target.value || null)}
        className={CLASSE_SELECT}
      >
        {UFS.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Lista de candidatos de um cargo. Autenticado vê todos; visitante vê os 3
 * primeiros e o restante fica bloqueado com CTA de cadastro.
 */
function ListaCargo({
  candidatos,
  autenticado,
}: {
  candidatos: ResultadoCandidato[];
  autenticado: boolean;
}) {
  const visiveis = autenticado ? candidatos : candidatos.slice(0, VISIVEIS_SEM_LOGIN);
  const bloqueados = autenticado ? [] : candidatos.slice(VISIVEIS_SEM_LOGIN);
  const [primeiro, ...resto] = visiveis;

  return (
    <div className="space-y-3">
      {primeiro && (
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            Seu maior match
          </span>
          <div className="rounded-xl ring-2 ring-primary">
            <CardResultadoCandidato candidato={primeiro} />
          </div>
        </div>
      )}
      {resto.map((c) => (
        <CardResultadoCandidato key={c.candidaturaId} candidato={c} />
      ))}
      {bloqueados.length > 0 && <ListaBloqueada candidatos={bloqueados} />}
    </div>
  );
}

const ROTULO_CARGO: Record<string, string> = {
  Presidente: "presidente",
  Governador: "governador",
  Senador: "senador",
  DeputadoFederal: "deputado federal",
  DeputadoEstadual: "deputado estadual",
};

/**
 * Quem não tem registro público suficiente fica fora do ranking. Sumir em silêncio faria a lista
 * parecer o universo de candidatos e daria vantagem a quem já tem mandato, que é sobre quem existe
 * dado oficial. Aqui a ausência é declarada, com o motivo.
 */
function AvisoSemDados({ cobertura }: { cobertura: CoberturaResultado }) {
  const porCargo = Object.entries(cobertura.semDadosPorCargo)
    .filter(([, quantidade]) => quantidade > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div
      className="space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground"
      data-testid="aviso-sem-dados"
    >
      <p>
        <strong className="text-foreground">
          {cobertura.semDados.toLocaleString("pt-BR")} candidatos ficaram fora deste ranking
        </strong>{" "}
        porque ainda não há dados oficiais suficientes para avaliá-los. Não é uma avaliação
        negativa: significa que não encontramos registro público de atuação para posicioná-los nos
        temas.
      </p>
      {porCargo.length > 0 && (
        <p>
          {porCargo
            .map(([cargo, n]) => `${n.toLocaleString("pt-BR")} para ${ROTULO_CARGO[cargo] ?? cargo}`)
            .join(", ")}
          .
        </p>
      )}
      <p>
        <Link
          href="/como-calculamos#secao-sem-historico"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Entenda por que alguns candidatos não são avaliados
        </Link>
      </p>
    </div>
  );
}

/**
 * Restante para visitantes: a lista REAL continua, porém borrada e não interativa — deixa claro
 * que há muito mais para ver. Acima, uma mensagem discreta de cadastro (não um bloco de CTA grande).
 */
function ListaBloqueada({ candidatos }: { candidatos: ResultadoCandidato[] }) {
  const n = candidatos.length;
  return (
    <div className="space-y-3 pt-1">
      <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-sm text-muted-foreground">
        <LockIcon className="size-4 shrink-0" aria-hidden="true" />
        <span>
          Mais {n} candidato{n > 1 ? "s" : ""} ordenado{n > 1 ? "s" : ""} por afinidade.
        </span>
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          Crie sua conta para ver todos.
        </Link>
      </p>
      <div aria-hidden="true" className="pointer-events-none select-none space-y-3 blur-[3px]">
        {candidatos.map((c) => (
          <CardResultadoCandidato key={c.candidaturaId} candidato={c} />
        ))}
      </div>
    </div>
  );
}

/** CTA de cadastro na coluna do perfil (visitantes). */
function CardCadastro() {
  return (
    <Card className="bg-accent text-accent-foreground">
      <CardContent className="space-y-3 text-center">
        <UserPlusIcon className="mx-auto size-7" aria-hidden="true" />
        <p className="font-medium">Quer o resultado completo?</p>
        <p className="text-sm text-accent-foreground/80">
          Crie sua conta para ver todos os candidatos e salvar suas comparações.
        </p>
        <Button asChild className="w-full">
          <Link href="/login">Criar conta</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
