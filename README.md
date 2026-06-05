# Politicando — Frontend

[![CI](https://github.com/300-Software/politicando-web/actions/workflows/ci.yml/badge.svg)](https://github.com/300-Software/politicando-web/actions/workflows/ci.yml)

Frontend da plataforma de match eleitoral **Politicando** (Eleições 2026, Brasil).
Conecta eleitores a candidatos por meio de um quiz de afinidade que gera um
percentual de compatibilidade por categoria temática.

> Protótipo — os candidatos oficiais 2026 ficam disponíveis após o registro de
> candidaturas no TSE (previsto para agosto de 2026).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui (base-ui) + cores via variáveis de tema
- React Query (`@tanstack/react-query`) para data fetching e mutations
- React Hook Form + Zod para formulários
- Sonner para toasts

## Configuração

Variável de ambiente da API (já em `.env.local` / `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5080/api
```

## Comandos

```bash
npm run dev        # ambiente de desenvolvimento
npm run build      # build de produção (Turbopack)
npm run lint       # ESLint (inclui regras de segurança e acessibilidade)
npm run typecheck  # checagem de tipos (tsc --noEmit)
```

Abra http://localhost:3000 no navegador.

## Branches e deploy

- **`main`** — produção. Deploy de produção da Vercel sai daqui. Não recebe commit direto.
- **`develop`** — desenvolvimento (branch de integração). Features saem dela e voltam via PR.

Fluxo: `feature/*` → PR para **`develop`** → PR de **`develop`** para **`main`** (release).
O CI (lint + typecheck + build) roda em push para `main`/`develop` e em todo PR; a Vercel
gera _preview_ por PR e _produção_ ao integrar na `main`.

## Estrutura

- `src/app/(site)/` — site público (landing, quiz, candidatos, comparar, partidos, perfil, login)
- `src/app/admin/` — painel administrativo (dashboard e integrações), com layout próprio
- `src/lib/api.ts` — cliente HTTP e funções de fetch da API
- `src/lib/types.ts` — tipos que espelham os contratos da API .NET
- `src/hooks/use-api.ts` — hooks de React Query por recurso
- `src/components/` — componentes de UI (`ui/`), de layout e por domínio

As telas tratam estados de carregamento, vazio e erro, renderizando normalmente
mesmo quando a API está indisponível.
