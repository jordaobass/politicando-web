import { z } from "zod";

/** Schema do formulário de login. */
export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido"),
  senha: z.string().min(1, "Informe sua senha"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Regras da senha (usadas no schema e na validação em tempo real do cadastro).
 * Mantê-las aqui garante que o checklist exibido e a validação fiquem em sincronia.
 */
// Regra do cartão US-AUTH-01: mín. 8 caracteres, 1 maiúscula e 1 número.
export const REGRAS_SENHA = [
  { id: "tamanho", rotulo: "Pelo menos 8 caracteres", testar: (s: string) => s.length >= 8 },
  { id: "maiuscula", rotulo: "Uma letra maiúscula", testar: (s: string) => /[A-Z]/.test(s) },
  { id: "numero", rotulo: "Um número", testar: (s: string) => /[0-9]/.test(s) },
] as const;

const senhaValida = z
  .string()
  .refine((s) => REGRAS_SENHA.every((r) => r.testar(s)), "A senha não atende às regras");

/** Schema do formulário de cadastro (inclui aceite LGPD obrigatório). */
export const registrarSchema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.email("Informe um e-mail válido"),
  senha: senhaValida,
  lgpd: z.boolean().refine((v) => v === true, {
    message: "É necessário aceitar os termos para continuar",
  }),
});

export type RegistrarFormValues = z.infer<typeof registrarSchema>;
