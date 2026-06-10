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

/** Idade mínima de cadastro (cartão US-AUTH-01; sujeita a revisão jurídica LGPD). */
export const IDADE_MINIMA = 16;
export const MENSAGEM_IDADE_MINIMA =
  "Você precisa ter pelo menos 16 anos para se cadastrar";

/** Idade (anos completos) a partir de uma data ISO (YYYY-MM-DD). */
function calcularIdade(dataIso: string): number {
  const nascimento = new Date(dataIso);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}

/** Schema do formulário de cadastro (inclui data de nascimento, confirmação e aceite LGPD). */
export const registrarSchema = z
  .object({
    nome: z.string().min(2, "Informe seu nome"),
    email: z.email("Informe um e-mail válido"),
    dataNascimento: z
      .string()
      .min(1, "Informe sua data de nascimento")
      .refine((s) => !Number.isNaN(Date.parse(s)), "Data inválida")
      .refine((s) => calcularIdade(s) >= IDADE_MINIMA, MENSAGEM_IDADE_MINIMA),
    senha: senhaValida,
    confirmarSenha: z.string().min(1, "Confirme sua senha"),
    lgpd: z.boolean().refine((v) => v === true, {
      message: "É necessário aceitar os termos para continuar",
    }),
  })
  .refine((d) => d.senha === d.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export type RegistrarFormValues = z.infer<typeof registrarSchema>;

/** Schema da etapa complementar de data de nascimento pós-OAuth (cartão US-AUTH-02). */
export const completarCadastroSchema = z.object({
  dataNascimento: z
    .string()
    .min(1, "Informe sua data de nascimento")
    .refine((s) => !Number.isNaN(Date.parse(s)), "Data inválida")
    .refine((s) => calcularIdade(s) >= IDADE_MINIMA, MENSAGEM_IDADE_MINIMA),
});

export type CompletarCadastroFormValues = z.infer<typeof completarCadastroSchema>;
