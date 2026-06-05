"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConteudoAutenticacao } from "@/components/auth/conteudo-autenticacao";

interface ModalAutenticacaoProps {
  aberto: boolean;
  aoMudarAberto: (aberto: boolean) => void;
}

/** Modal de login/cadastro — usado ao fim do quiz quando o usuário não está logado. */
export function ModalAutenticacao({ aberto, aoMudarAberto }: ModalAutenticacaoProps) {
  return (
    <Dialog open={aberto} onOpenChange={aoMudarAberto}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Crie sua conta para ver tudo</DialogTitle>
          <DialogDescription>
            Salve seu resultado, compare candidatos e desbloqueie os detalhes completos.
          </DialogDescription>
        </DialogHeader>
        <ConteudoAutenticacao aoConcluir={() => aoMudarAberto(false)} />
      </DialogContent>
    </Dialog>
  );
}
