import {
  ATUALIZADO_EM,
  CONTROLADORA,
  ESCOPO_PLATAFORMA,
  type DocumentoLegal,
} from "@/lib/legal/tipos";

/** Política de Cookies — conversão fiel do PDF do cliente (26/08/2026). */
export const POLITICA_COOKIES: DocumentoLegal = {
  titulo: "Política de Cookies",
  descricao:
    "Como o Politicando usa cookies e tecnologias semelhantes, para quais finalidades e como você pode gerenciá-los.",
  atualizadoEm: ATUALIZADO_EM,
  abertura: [
    { tipo: "paragrafo", texto: "Bem-vindo(a) ao Politicando!" },
    {
      tipo: "paragrafo",
      texto:
        'Esta Política de Cookies ("Política") explica, de forma clara e transparente, como a POLITICANDO utiliza cookies e tecnologias semelhantes na plataforma digital "Politicando" (www.politicando.site).',
    },
    { tipo: "paragrafo", texto: CONTROLADORA },
    {
      tipo: "paragrafo",
      texto:
        "Este documento é complementar à Política de Privacidade e ao Termo de Uso da Plataforma, devendo ser interpretado em conjunto com eles, dos quais reproduz, no que couber, as definições e regras já estabelecidas.",
    },
    { tipo: "paragrafo", texto: "Esta política vale para:" },
    { tipo: "lista", itens: ESCOPO_PLATAFORMA },
  ],
  secoes: [
    {
      id: "o-que-sao-cookies",
      titulo: "1. O QUE SÃO COOKIES",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "1.1. Cookies são pequenos arquivos de texto armazenados no navegador ou dispositivo do Usuário quando este acessa um site ou plataforma digital. Eles permitem que o site reconheça o dispositivo do Usuário, memorize informações sobre sua visita e viabilize o funcionamento de determinadas funcionalidades.",
        },
        {
          tipo: "paragrafo",
          texto:
            "1.2. Tecnologias semelhantes, como local storage e session storage, podem ser utilizadas para finalidades equivalentes às dos cookies, sendo também abrangidas por esta Política.",
        },
      ],
    },
    {
      id: "quais-cookies",
      titulo: "2. QUAIS COOKIES A PLATAFORMA UTILIZA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "2.1. A Plataforma utiliza cookies e tecnologias semelhantes com as seguintes finalidades:",
        },
        {
          tipo: "lista",
          itens: [
            "Viabilizar a autenticação e a manutenção da sessão do Usuário cadastrado, permitindo o acesso contínuo às funcionalidades que dependem de Cadastro;",
            "Lembrar preferências de navegação do Usuário, tornando a experiência de uso mais eficiente;",
            "Medir o desempenho, a estabilidade e o correto funcionamento da Plataforma;",
            "Elaborar estatísticas agregadas e não identificadas de uso da Plataforma.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "2.2. Conforme a finalidade, os cookies utilizados podem ser classificados em:",
        },
        {
          tipo: "lista",
          itens: [
            "Cookies necessários/essenciais: indispensáveis para o funcionamento básico da Plataforma, como autenticação e manutenção de sessão do Usuário cadastrado;",
            "Cookies de funcionalidade: utilizados para lembrar preferências de navegação e personalizar a experiência do Usuário;",
            "Cookies de desempenho/estatísticos: utilizados para medir o desempenho da Plataforma e gerar estatísticas agregadas e não identificadas de uso.",
          ],
        },
      ],
    },
    {
      id: "o-que-nao-fazem",
      titulo: "3. O QUE OS COOKIES DA PLATAFORMA NÃO FAZEM",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "3.1. Os cookies utilizados pelo Politicando não têm por finalidade o rastreamento do Usuário para fins de publicidade comportamental, política ou comercial.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.2. Os cookies utilizados pelo Politicando não são utilizados para associar dados de navegação ao Dado de Opinião Política (respostas do Usuário ao Questionário e Resultado de Afinidade), que permanece tratado exclusivamente com base no consentimento específico do titular, nos termos da Política de Privacidade e do Termo de Consentimento.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.3. O Politicando não comercializa nem cede a terceiros, para fins de publicidade, quaisquer dados coletados por meio de cookies.",
        },
      ],
    },
    {
      id: "base-legal",
      titulo: "4. BASE LEGAL",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "4.1. O uso de cookies estritamente necessários ao funcionamento da Plataforma, como os relacionados à autenticação e à manutenção de sessão, fundamenta-se no legítimo interesse do Politicando em assegurar a segurança e o correto funcionamento da Plataforma, nos termos do art. 7º, inciso IX, da Lei nº 13.709/2018 (LGPD).",
        },
        {
          tipo: "paragrafo",
          texto:
            "4.2. Os demais cookies, quando aplicável, poderão ter seu uso condicionado ao consentimento do Usuário, manifestado no momento do primeiro acesso à Plataforma, podendo ser revogado a qualquer tempo por meio das configurações do navegador.",
        },
      ],
    },
    {
      id: "compartilhamento",
      titulo: "5. COMPARTILHAMENTO DE DADOS COLETADOS POR COOKIES",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "5.1. Os dados coletados por meio de cookies poderão ser tratados por Operadores contratados pelo Politicando para viabilizar a infraestrutura tecnológica da Plataforma, tais como provedores de hospedagem em nuvem e ferramentas de monitoramento de desempenho, sempre vinculados por contrato que assegura nível de proteção de dados equivalente ao previsto na Política de Privacidade e na LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.2. Em nenhuma hipótese o Politicando venderá ou cederá onerosamente a terceiros os dados coletados por meio de cookies.",
        },
      ],
    },
    {
      id: "gerenciar",
      titulo: "6. COMO GERENCIAR OU DESABILITAR OS COOKIES",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "6.1. O Usuário poderá gerenciar, bloquear ou desabilitar o uso de cookies diretamente nas configurações de seu navegador de internet.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.2. A desabilitação de determinados cookies poderá impactar o funcionamento de algumas funcionalidades da Plataforma, em especial as que dependem de Cadastro, como a autenticação e a manutenção da sessão do Usuário.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.3. Informações sobre como gerenciar cookies estão disponíveis nas configurações de privacidade dos principais navegadores do mercado (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, entre outros).",
        },
      ],
    },
    {
      id: "alteracoes",
      titulo: "7. ALTERAÇÕES DESTA POLÍTICA DE COOKIES",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "7.1. O Politicando poderá alterar esta Política a qualquer tempo, especialmente para adequação a novas exigências legais, regulatórias ou tecnológicas.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.2. Alterações substanciais serão comunicadas aos Usuários por meio de aviso destacado na Plataforma, sendo responsabilidade do Usuário consultar esta Política periodicamente.",
        },
      ],
    },
    {
      id: "contato",
      titulo: "8. CANAIS DE CONTATO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "8.1. Em caso de dúvidas sobre esta Política de Cookies, o Usuário poderá entrar em contato com o(a) Encarregado(a) pelo Tratamento de Dados Pessoais (DPO):",
        },
        {
          tipo: "lista",
          itens: [
            "Encarregado(a): Pedro Weinberg Lima",
            "E-mail de contato do DPO: politicandoapp26@gmail.com",
          ],
        },
      ],
    },
  ],
};
