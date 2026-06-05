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
export const REGRAS_SENHA = [
  { id: "tamanho", rotulo: "Pelo menos 6 caracteres", testar: (s: string) => s.length >= 6 },
  { id: "letra", rotulo: "Uma letra", testar: (s: string) => /[a-zA-Z]/.test(s) },
  { id: "numero", rotulo: "Um número", testar: (s: string) => /[0-9]/.test(s) },
  { id: "simbolo", rotulo: "Um símbolo", testar: (s: string) => /[^a-zA-Z0-9]/.test(s) },
] as const;

const senhaValida = z
  .string()
  .refine((s) => REGRAS_SENHA.every((r) => r.testar(s)), "A senha não atende às regras");

/** Schema do formulário de cadastro. */
export const registrarSchema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.email("Informe um e-mail válido"),
  senha: senhaValida,
});

export type RegistrarFormValues = z.infer<typeof registrarSchema>;
