import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormularioRedefinir } from "@/components/auth/formulario-redefinir";

export const metadata: Metadata = {
  title: "Redefinir senha",
  description: "Defina uma nova senha para sua conta no Politicando.",
};

export default function RedefinirSenhaPage() {
  return (
    <div className="relative flex min-h-[calc(100svh-3.5rem)] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/60 to-background px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex items-center justify-center gap-2.5">
          <Image
            src="/logo-h2-escura.png"
            alt=""
            width={900}
            height={104}
            className="h-12 w-auto"
            unoptimized
          />
        </Link>

        <Card className="border-border/70 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Redefinir senha</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<p className="text-sm text-muted-foreground">Carregando…</p>}>
              <FormularioRedefinir />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
