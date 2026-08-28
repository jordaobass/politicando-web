import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CardAutenticacao } from "@/components/auth/card-autenticacao";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta no Politicando.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ aba?: string }>;
}) {
  const { aba } = await searchParams;
  const abaInicial = aba === "registrar" ? "registrar" : "login";
  return (
    <div className="relative flex min-h-[calc(100svh-3.5rem)] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/60 to-background px-4 py-10">
      {/* Blobs flutuantes de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-flutuar absolute -top-24 -left-20 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-flutuar absolute top-1/3 -right-24 size-80 rounded-full bg-accent/20 blur-3xl [animation-delay:1.5s]" />
        <div className="animate-flutuar absolute -bottom-28 left-1/3 size-72 rounded-full bg-primary/10 blur-3xl [animation-delay:3s]" />
      </div>

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="animate-in fade-in slide-in-from-top-2 mb-6 flex items-center justify-center gap-2.5 duration-500"
        >
          <Image
            src="/logo-h2-escura.png"
            alt="Politicando"
            width={900}
            height={104}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <CardAutenticacao abaInicial={abaInicial} />
      </div>
    </div>
  );
}
