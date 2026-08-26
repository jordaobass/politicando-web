import {
  ATUALIZADO_EM,
  CONTROLADORA,
  ESCOPO_PLATAFORMA,
  type DocumentoLegal,
} from "@/lib/legal/tipos";

/**
 * Termo de Consentimento para Tratamento de Dados Pessoais e Sensíveis —
 * conversão fiel do PDF do cliente (26/08/2026). É o documento citado no
 * aceite do cadastro e no consentimento do quiz sem login (LGPD, art. 11, I).
 */
export const TERMO_CONSENTIMENTO: DocumentoLegal = {
  titulo: "Termo de Consentimento",
  descricao:
    "Consentimento livre, informado e específico para o tratamento dos seus dados, inclusive do dado sensível de opinião política.",
  atualizadoEm: ATUALIZADO_EM,
  abertura: [
    { tipo: "paragrafo", texto: "Bem-vindo(a) ao Politicando!" },
    {
      tipo: "paragrafo",
      texto:
        "Este Termo de Consentimento para Tratamento de Dados Pessoais e Sensíveis (“Termo de Consentimento”) tem por finalidade obter a sua manifestação livre, informada e inequívoca acerca do tratamento dos dados pessoais fornecidos no momento do cadastro na plataforma digital “Politicando” (www.politicando.site).",
    },
    { tipo: "paragrafo", texto: CONTROLADORA },
    {
      tipo: "paragrafo",
      texto:
        "Este documento complementa o Termo de Uso e a Política de Privacidade da Plataforma, nos termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD), sendo de leitura obrigatória antes da conclusão do cadastro.",
    },
    { tipo: "paragrafo", texto: "Estes Termos valem para:" },
    { tipo: "lista", itens: ESCOPO_PLATAFORMA },
  ],
  aviso: {
    titulo: "AVISO IMPORTANTE: LEIA COM ATENÇÃO",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Ao marcar a caixa de consentimento e concluir o cadastro, você declara ter lido e compreendido este Termo, manifestando consentimento livre, informado, inequívoco e específico para o tratamento de seus dados pessoais, inclusive dado pessoal sensível de opinião política, na forma aqui descrita.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Caso você não concorde com o tratamento de dados descrito neste Termo, não deverá concluir o cadastro nem prosseguir com a utilização das funcionalidades que dependam dele, sem prejuízo da possibilidade de uso do Questionário e visualização do Resultado de Afinidade sem cadastro, conforme facultado pelo Termo de Uso.",
      },
      {
        tipo: "destaque",
        texto:
          "Não concorda ou tem dúvidas? Não utilize o serviço até esclarecer todos os pontos.",
      },
    ],
  },
  secoes: [
    {
      id: "figura-da-politicando",
      titulo: "1. FIGURA DA POLITICANDO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "1.1. O Politicando atua como Controlador dos Dados Pessoais e sensíveis tratados por meio da Plataforma, nos termos do art. 5º, inciso VI, da LGPD, sendo responsável pelas decisões referentes à finalidade e aos meios de tratamento dos dados pessoais do Usuário.",
        },
      ],
    },
    {
      id: "finalidade-do-termo",
      titulo: "2. FINALIDADE DESTE TERMO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "2.1. Este Termo de Consentimento tem por finalidade específica informar ao Usuário, de forma clara e destacada, quais dados pessoais são coletados no momento do cadastro, para quais finalidades serão tratados, qual a base legal aplicável a cada dado e quais são os direitos do titular, viabilizando a manifestação de consentimento exigida para o tratamento do Dado de Opinião Política.",
        },
      ],
    },
    {
      id: "dados-no-cadastro",
      titulo: "3. DADOS PESSOAIS TRATADOS NO CADASTRO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "3.1. Para a realização do cadastro na Plataforma, o Politicando trata os seguintes dados pessoais, fornecidos diretamente pelo Usuário:",
        },
        {
          tipo: "lista",
          itens: [
            "Nome completo – utilizado para identificação do Usuário e personalização da experiência na Plataforma;",
            "E-mail – utilizado como Dado de Acesso, para autenticação, recuperação de senha, envio de comunicações e contato com o Usuário;",
            "Senha – utilizada como Dado de Acesso, armazenada de forma criptografada, para autenticação e proteção da conta do Usuário;",
            "Data de Nascimento – utilizada para verificação da idade mínima exigida para o cadastro (16 anos completos) e para assegurar a observância das restrições aplicáveis a usuários entre 16 e 18 anos incompletos, nos termos do art. 14 da LGPD.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "3.2. Além dos dados acima, e de forma indissociável da funcionalidade central da Plataforma, o Politicando trata o seguinte dado pessoal sensível:",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.2.1. Histórico de Respostas ao Questionário e Resultados de Afinidade (Dado de Opinião Política), compreendendo todas as respostas fornecidas pelo Usuário ao Questionário sobre temas políticos, os Resultados de Afinidade gerados pelo Algoritmo em cada consulta, as datas em que o Questionário foi respondido ou refeito e o respectivo histórico de versões, quando o Usuário optar por atualizar suas respostas.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.3. O Histórico de Pesquisa mencionado no item 3.2 constitui Dado Pessoal Sensível relativo à opinião política, nos termos do art. 5º, inciso II, da LGPD, e somente é associado à conta do Usuário cadastrado mediante o consentimento específico tratado na Cláusula 5 deste Termo. Usuários não cadastrados que utilizem apenas o Questionário têm suas respostas tratadas de forma não identificada, conforme detalhado na Política de Privacidade.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.4. Dados de Navegação e Uso: complementarmente aos dados acima, o Politicando poderá tratar, de forma automática, dados técnicos de navegação (como endereço IP, tipo de dispositivo, navegador e registros de acesso), com a finalidade de garantir a segurança, a estabilidade e o correto funcionamento da Plataforma, nos termos do legítimo interesse do Controlador (art. 7º, inciso IX, da LGPD), não se confundindo com o Dado de Opinião Política tratado mediante consentimento.",
        },
      ],
    },
    {
      id: "finalidades",
      titulo: "4. FINALIDADES DO TRATAMENTO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "4.1. Os dados pessoais listados na Cláusula 3 serão tratados pelo Politicando exclusivamente para as seguintes finalidades:",
        },
        {
          tipo: "lista",
          itens: [
            "Viabilizar a criação, a autenticação e a gestão da conta do Usuário na Plataforma;",
            "Verificar o cumprimento da idade mínima exigida para o cadastro e a aplicação das restrições cabíveis a usuários entre 16 e 18 anos incompletos;",
            "Processar as respostas do Usuário ao Questionário por meio do Algoritmo de Afinidade, gerando o Resultado de Afinidade correspondente;",
            "Manter o histórico de respostas e resultados do Usuário, permitindo a consulta, a atualização e a comparação de resultados ao longo do tempo, quando o Usuário assim desejar;",
            "Enviar comunicações informativas, observado o disposto na Cláusula 4 do Termo de Uso, e prestar suporte técnico ao Usuário;",
            "Cumprir obrigações legais e regulatórias aplicáveis, inclusive perante a Justiça Eleitoral e a Autoridade Nacional de Proteção de Dados (ANPD).",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "4.2. Os dados pessoais não serão tratados para finalidades incompatíveis com as informadas neste Termo, sendo qualquer nova finalidade objeto de comunicação prévia ao Usuário e, quando aplicável, de novo consentimento específico.",
        },
      ],
    },
    {
      id: "consentimento-opiniao-politica",
      titulo: "5. CONSENTIMENTO ESPECÍFICO PARA O DADO DE OPINIÃO POLÍTICA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "5.1. Declaro, de forma livre, informada e inequívoca, que consinto com o tratamento, pelo politicando, das minhas respostas ao questionário e do(s) resultado(s) de afinidade delas decorrente(s), incluindo o respectivo histórico de pesquisa, como dado pessoal sensível de opinião política, para a finalidade exclusiva de viabilizar a funcionalidade central da plataforma, nos termos do art. 11, inciso i, da lgpd.",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.2. O consentimento ora manifestado é específico para a finalidade descrita no item 5.1, não autorizando o uso do Dado de Opinião Política para perfilamento comercial, segmentação de publicidade política paga, venda ou cessão a terceiros para fins eleitorais, conforme já vedado pela Cláusula 6.5 do Termo de Uso.",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.3. Este consentimento poderá ser revogado pelo Usuário a qualquer tempo, de forma gratuita e facilitada, mediante solicitação ao canal de suporte indicado na Cláusula 8 deste Termo, nos termos do art. 8º, § 5º, da LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.4. A revogação do consentimento implicará a impossibilidade de utilização da funcionalidade central da Plataforma (cálculo e consulta de afinidade), bem como a exclusão do Histórico de Pesquisa associado à conta, sem prejuízo da manutenção do cadastro básico do Usuário (nome completo, e-mail, senha e data de nascimento) para outras finalidades compatíveis, caso o Usuário assim opte.",
        },
      ],
    },
    {
      id: "compartilhamento",
      titulo: "6. COMPARTILHAMENTO DE DADOS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "6.1. O Politicando não compartilhará o Dado de Opinião Política individualizado de qualquer Usuário, incluindo seu Histórico de Pesquisa, com Candidatos, Partidos, coligações, anunciantes ou terceiros, exceto mediante ordem judicial, requisição de autoridade competente ou consentimento específico e expresso do Usuário para finalidade determinada, conforme já disposto na Cláusula 11.5 do Termo de Uso.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.2. Os dados de Cadastro (nome completo, e-mail, senha e data de nascimento) poderão ser tratados por operadores contratados pelo Politicando para viabilizar a infraestrutura tecnológica da Plataforma (hospedagem, envio de e-mails e suporte), sempre em conformidade com a LGPD e mediante contratos que assegurem o mesmo nível de proteção previsto neste Termo.",
        },
      ],
    },
    {
      id: "retencao",
      titulo: "7. PRAZO DE RETENÇÃO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "7.1. Os dados pessoais tratados com base neste Termo serão mantidos enquanto a conta do Usuário permanecer ativa, sendo eliminados de forma definitiva e segura, conforme o prazo estabelecido na cláusula 8.3 da Política de privacidade, após o cancelamento da conta ou a revogação do consentimento, ressalvadas as hipóteses de conservação exigidas ou autorizadas por lei, nos termos dos arts. 15 e 16 da LGPD e da Cláusula 11.2 do Termo de Uso.",
        },
      ],
    },
    {
      id: "direitos-do-titular",
      titulo: "8. DIREITOS DO TITULAR E CANAL DE CONTATO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "8.1. Nos termos do art. 18 da LGPD, o Usuário poderá, a qualquer tempo e mediante solicitação gratuita, requerer ao Politicando a confirmação da existência de tratamento, o acesso aos dados, a correção de dados incompletos, inexatos ou desatualizados, a anonimização, o bloqueio ou a eliminação de dados desnecessários, a portabilidade dos dados, a eliminação dos dados tratados com base no consentimento, a informação sobre compartilhamento de dados e a revogação do consentimento.",
        },
        {
          tipo: "paragrafo",
          texto:
            "8.2. As solicitações relativas ao exercício destes direitos, inclusive a revogação do consentimento tratado na Cláusula 5, poderão ser encaminhadas ao(à) Encarregado(a) de Proteção de Dados (DPO) do Politicando:",
        },
        {
          tipo: "lista",
          itens: [
            "Encarregado(a): Pedro Weinberg Lima",
            "E-mail de contato: politicandoapp26@gmail.com",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "8.3. Alternativamente, o Usuário poderá utilizar o canal de suporte geral da Plataforma, indicado na Cláusula 15 do Termo de Uso.",
        },
      ],
    },
    {
      id: "aceite",
      titulo: "9. ACEITE",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "9.1. Ao marcar a caixa de consentimento no formulário de cadastro, o Usuário declara ter lido, compreendido e concordado integralmente com este Termo de Consentimento, com o Termo de Uso e com a Política de Privacidade da Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "9.2. Este Termo poderá ser atualizado pelo Politicando sempre que houver alteração relevante nas finalidades ou na forma de tratamento dos dados pessoais, hipótese em que novo consentimento específico poderá ser solicitado ao Usuário, conforme aplicável.",
        },
      ],
    },
  ],
};
