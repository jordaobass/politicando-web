import type { Metadata } from "next";
import Image from "next/image";

// Estática: é uma tela fixa, prerenderizada no build e servida do cache.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Em breve",
  description:
    "O Politicando está chegando para as Eleições 2026. Em breve você poderá descobrir, com base em fatos, o seu candidato ideal.",
  // Enquanto em modo "em breve", não queremos indexar o site.
  robots: { index: false, follow: false },
};

/**
 * Página única de "em breve". Enquanto a flag COMING_SOON estiver ativa, o
 * middleware reescreve todo o site público para cá (ver src/middleware.ts).
 */
export default function EmBrevePage() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-secondary to-background px-6 text-center">
      <Image
        src="/logo-politicando.jpeg"
        alt="Politicando"
        width={96}
        height={96}
        priority
        className="rounded-2xl shadow-lg shadow-primary/10"
      />

      <div className="flex flex-col items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
          <span
            className="size-2 animate-pulse rounded-full bg-accent"
            aria-hidden="true"
          />
          Eleições 2026
        </span>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
          Estamos chegando <span className="text-accent">em breve</span>
        </h1>

        <p className="max-w-md text-lg text-pretty text-muted-foreground">
          O <span className="font-bold text-primary">Politicando</span> vai te ajudar
          a descobrir, com base em fatos, o seu candidato ideal para as{" "}
          <span className="font-semibold text-foreground">Eleições 2026</span>.
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Vote com base em{" "}
        <span className="font-semibold text-accent">fatos</span>, não em promessas.
      </p>
    </main>
  );
}
