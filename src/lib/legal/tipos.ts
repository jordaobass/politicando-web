/**
 * Modelo dos documentos legais da plataforma.
 *
 * O conteúdo vem da conversão fiel dos .docx enviados pelo cliente em 17/08/2026
 * (Termo de Uso, Política de Privacidade, Política de Cookies e Termo de
 * Consentimento). Guardá-lo como dado — e não como JSX — permite renderizar as
 * quatro páginas por um componente único, gerar o índice automaticamente e citar
 * a mesma versão no registro de consentimento exigido pela LGPD.
 *
 * Regra: nada aqui é reescrito. Ajustes de redação são do cliente/jurídico.
 */

/** Bloco de conteúdo dentro de uma seção do documento. */
export type BlocoLegal =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "lista"; itens: string[] }
  /** Trecho que o documento original destaca (caixa de aviso). */
  | { tipo: "destaque"; texto: string };

export interface SecaoLegal {
  /** Âncora estável do link (#id). Não alterar depois de publicada. */
  id: string;
  titulo: string;
  blocos: BlocoLegal[];
}

export interface DocumentoLegal {
  titulo: string;
  descricao: string;
  /** Data impressa no documento original enviado pelo cliente. */
  atualizadoEm: string;
  /** Parágrafos de abertura, antes do índice. */
  abertura: BlocoLegal[];
  /** Caixa "AVISO IMPORTANTE" quando o documento original tiver uma. */
  aviso?: { titulo: string; blocos: BlocoLegal[] };
  secoes: SecaoLegal[];
}

/** Identificação da controladora, repetida na abertura dos quatro documentos. */
export const CONTROLADORA =
  "POLITICANDO SOLUÇÕES DE INTELIGÊNCIA LTDA. CNPJ 67.662.017/0001-85. " +
  "Rua Jornalista Djalma Andrade, n.º 46, Salas 908/909, Bairro Belvedere, " +
  "em Belo Horizonte/MG, CEP 30320-540.";

/** Escopo de aplicação listado na abertura dos quatro documentos. */
export const ESCOPO_PLATAFORMA = [
  "Questionários",
  "Algoritmo de Afinidade",
  "Conteúdos e Informações",
  "Demais Funcionalidades",
];

/** Data de atualização comum aos quatro documentos desta versão. */
export const ATUALIZADO_EM = "17 de agosto de 2026";
