import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MENSAGEM_SEM_DADOS } from "@/lib/constantes";

/**
 * Estado "sem dado suficiente" de um bloco do perfil (Correções v7, item 4): o bloco NUNCA some —
 * mantém o título no lugar de sempre e diz, com a frase exata pedida pelo cliente, por que está
 * vazio. Duas formas: <MensagemSemDados/> para dentro de um card existente e <BlocoSemDados/>
 * quando o bloco inteiro é o estado vazio.
 */
export function MensagemSemDados({ testid }: { testid?: string }) {
  return (
    <p
      data-testid={testid ?? "mensagem-sem-dados"}
      className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground"
    >
      {MENSAGEM_SEM_DADOS}
    </p>
  );
}

export function BlocoSemDados({
  titulo,
  icone,
  testid,
  className,
}: {
  titulo: string;
  icone?: React.ReactNode;
  testid?: string;
  className?: string;
}) {
  return (
    <Card data-testid={testid} className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icone}
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MensagemSemDados />
      </CardContent>
    </Card>
  );
}
