"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Opcao {
  valor: string;
  rotulo: string;
}

interface SelectSimplesProps {
  valor: string;
  onValueChange: (valor: string) => void;
  opcoes: Opcao[];
  placeholder?: string;
  className?: string;
}

/** Select single de uma lista de opções {valor, rotulo} — wrapper enxuto do Select do shadcn. */
export function SelectSimples({
  valor,
  onValueChange,
  opcoes,
  placeholder,
  className,
}: SelectSimplesProps) {
  // O rótulo do valor selecionado é passado como children para que o trigger exiba o texto mesmo
  // quando o valor é definido programaticamente (o Radix só resolve o texto do item após abrir).
  const rotuloSelecionado = opcoes.find((o) => o.valor === valor)?.rotulo;

  return (
    <Select value={valor || undefined} onValueChange={(v) => onValueChange(v ?? "")}>
      <SelectTrigger className={className ?? "h-11 w-full"}>
        <SelectValue placeholder={placeholder}>{rotuloSelecionado}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {opcoes.map((o) => (
          <SelectItem key={o.valor} value={o.valor}>
            {o.rotulo}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
