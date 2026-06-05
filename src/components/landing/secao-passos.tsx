import { ClipboardListIcon, SparklesIcon, UsersIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const PASSOS = [
  {
    icone: ClipboardListIcon,
    titulo: "1. Responda o quiz",
    descricao:
      "Posicione-se sobre temas que importam para você — economia, saúde, segurança, meio ambiente e mais.",
  },
  {
    icone: SparklesIcon,
    titulo: "2. Veja seu perfil",
    descricao:
      "Geramos seu perfil político por categoria temática a partir das suas respostas, sem rótulos.",
  },
  {
    icone: UsersIcon,
    titulo: "3. Encontre candidatos",
    descricao:
      "Compare sua afinidade com candidatos e descubra a compatibilidade em cada categoria.",
  },
];

/** Seção "Três passos para tomar uma decisão mais informada". */
export function SecaoPassos() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Três passos para tomar uma decisão mais informada
        </h2>
        <p className="mt-3 text-muted-foreground">
          Leva poucos minutos e é totalmente gratuito.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PASSOS.map((passo) => (
          <Card key={passo.titulo}>
            <CardContent className="space-y-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <passo.icone className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground">{passo.titulo}</h3>
              <p className="text-sm text-muted-foreground">{passo.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
