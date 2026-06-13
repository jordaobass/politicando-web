import type { Metadata } from "next";

import { FormularioCompletarCadastro } from "@/components/auth/formulario-completar-cadastro";

export const metadata: Metadata = {
  title: "Concluir cadastro",
  description: "Informe sua data de nascimento para concluir o cadastro.",
};

/** Etapa complementar de data de nascimento após o login via Google (cartão US-AUTH-02). */
export default function CompletarCadastroPage() {
  return <FormularioCompletarCadastro />;
}
