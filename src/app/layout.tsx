import type { Metadata } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITULO = "Politicando — Descubra em quem votar";
const DESCRICAO =
  "Plataforma de match eleitoral para as Eleições 2026. Faça o quiz de afinidade e descubra sua compatibilidade com candidatos por categoria temática.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://politicando.infinitybit.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO,
    template: "%s | Politicando",
  },
  description: DESCRICAO,
  applicationName: "Politicando",
  // og:image e twitter:image são anexados automaticamente pelos arquivos
  // opengraph-image.png / twitter-image.png em src/app.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Politicando",
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
