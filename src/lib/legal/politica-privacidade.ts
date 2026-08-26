import {
  ATUALIZADO_EM,
  CONTROLADORA,
  ESCOPO_PLATAFORMA,
  type DocumentoLegal,
} from "@/lib/legal/tipos";

/** Política de Privacidade — conversão fiel do PDF do cliente (26/08/2026). */
export const POLITICA_PRIVACIDADE: DocumentoLegal = {
  titulo: "Política de Privacidade",
  descricao:
    "Como o Politicando trata os dados pessoais dos usuários da plataforma, com quais bases legais e por quanto tempo.",
  atualizadoEm: ATUALIZADO_EM,
  abertura: [
    { tipo: "paragrafo", texto: "Bem-vindo(a) ao Politicando!" },
    {
      tipo: "paragrafo",
      texto:
        'Esta Política de Privacidade ("Política") descreve, de forma clara, transparente e detalhada, como a POLITICANDO, realiza o tratamento dos dados pessoais dos usuários da plataforma digital "Politicando" (www.politicando.site).',
    },
    { tipo: "paragrafo", texto: CONTROLADORA },
    {
      tipo: "paragrafo",
      texto:
        "Este documento é complementar ao Termo de Uso e ao Termo de Consentimento para Tratamento de Dados Pessoais, devendo ser interpretado em conjunto com eles, dos quais reproduz, no que couber, as definições e regras já estabelecidas, notadamente as relativas ao Questionário, ao Algoritmo de Afinidade, ao Resultado de Afinidade e ao Dado de Opinião Política.",
    },
    {
      tipo: "paragrafo",
      texto:
        "O tratamento observa a Lei nº 13.709/2018 (LGPD), a Lei nº 9.504/1997 e as Resoluções do TSE aplicáveis, bem como o Marco Civil da Internet (Lei nº 12.965/2014).",
    },
    { tipo: "paragrafo", texto: "Esta política vale para:" },
    { tipo: "lista", itens: ESCOPO_PLATAFORMA },
  ],
  secoes: [
    {
      id: "definicoes",
      titulo: "1. DEFINIÇÕES",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "1.1. Para os fins desta Política, aplicam-se as definições constantes da Cláusula 2 do Termo de Uso e da Cláusula 3 do Termo de Consentimento, dentre as quais se destacam:",
        },
        {
          tipo: "lista",
          itens: [
            "Algoritmo de Afinidade: método computacional proprietário do Politicando que compara as respostas do Usuário com as posições cadastradas de Candidatos/Partidos;",
            "ANPD: Autoridade Nacional de Proteção de Dados.",
            "Controlador, Operador e Encarregado (DPO): conforme definidos no art. 5º, incisos VI, VII e VIII, da LGPD;",
            "Dado de Opinião Política: as respostas do Usuário ao Questionário e os Resultados de Afinidade delas decorrentes, incluindo o respectivo histórico de pesquisa;",
            "Dado Pessoal: informação relacionada a pessoa natural, identificada ou identificável;",
            "Dado Pessoal Sensível: dado pessoal sobre opinião política, dentre outras categorias previstas no art. 5º, inciso II, da LGPD;",
            "Usuário: pessoa física que acessa e utiliza a Plataforma, tenha ou não realizado Cadastro;",
          ],
        },
      ],
    },
    {
      id: "controladora",
      titulo: "2. IDENTIFICAÇÃO DA CONTROLADORA E OBJETO DESTA POLÍTICA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "2.1. A POLITICANDO SOLUÇÕES DE INTELIGÊNCIA LTDA., inscrita no CNPJ nº 67.662.017/0001-85, com sede em Belo Horizonte/MG, atua como Controlador dos dados pessoais tratados por meio da Plataforma, nos termos do art. 5º, inciso VI, da LGPD, competindo-lhe as decisões referentes à finalidade e aos meios de tratamento.",
        },
        {
          tipo: "paragrafo",
          texto:
            "2.2. Esta Política aplica-se a todo tratamento de dados pessoais realizado na Plataforma, tanto no uso sem Cadastro (respondendo ao Questionário e obtendo o Resultado de Afinidade) quanto no uso com Cadastro (que habilita funcionalidades adicionais).",
        },
        {
          tipo: "paragrafo",
          texto:
            "2.3. Esta Política não substitui, mas complementa, o Termo de Uso e o Termo de Consentimento, prevalecendo estes últimos quanto às condições contratuais de uso e à manifestação de consentimento para o tratamento do Dado de Opinião Política, e a presente Política quanto ao detalhamento técnico-operacional do tratamento.",
        },
      ],
    },
    {
      id: "dados-coletados",
      titulo: "3. DADOS PESSOAIS COLETADOS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "3.1. Caso o Usuário opte por realizar o Cadastro na Plataforma, o “Politicando” coletará os seguintes dados pessoais, fornecidos diretamente pelo Usuário:",
        },
        {
          tipo: "lista",
          itens: [
            "Nome completo, para identificação e personalização da experiência na Plataforma;",
            "E-mail, utilizado como Dado de Acesso, para autenticação, recuperação de senha e envio de comunicações;",
            "Senha, armazenada de forma criptografada, utilizada como Dado de Acesso;",
            "Data de Nascimento, coletada exclusivamente para verificação da idade mínima de 16 (dezesseis) anos e para identificação de Usuários entre 16 e 18 anos incompletos, aos quais se aplicam as restrições da Cláusula 10 desta Política.",
          ],
        },
        {
          tipo: "paragrafo",
          texto: "3.2. Em relação ao Dado Pessoal Sensível de Opinião Política:",
        },
        {
          tipo: "lista",
          itens: [
            "Independentemente de Cadastro, o Politicando trata, para viabilizar a funcionalidade central da Plataforma, as respostas fornecidas pelo Usuário ao Questionário e o(s) Resultado(s) de Afinidade delas decorrente(s), os quais constituem Dado Pessoal Sensível relativo a opinião política, nos termos do art. 5º, inciso II, da LGPD.",
            "Quando o Usuário utiliza o Questionário sem Cadastro, suas respostas são tratadas de forma não identificada, sem vinculação a nome, e-mail ou qualquer outro dado que permita, isoladamente, sua identificação direta pelo Politicando.",
            "Quando o Usuário realiza o Cadastro e presta o consentimento específico e destacado de que trata a Cláusula 5 do Termo de Consentimento, o Dado de Opinião Política passa a ser associado à sua conta, viabilizando o histórico de respostas, a atualização do Questionário e a comparação de resultados ao longo do tempo, conforme itens 1.3.5 e 3.2.1 do Termo de Uso.",
          ],
        },
      ],
    },
    {
      id: "bases-legais",
      titulo: "4. BASES LEGAIS PARA O TRATAMENTO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "4.1. O tratamento dos dados de Cadastro (nome completo, e-mail, senha e data de nascimento) fundamenta-se na execução do contrato firmado por meio da aceitação do Termo de Uso e no cumprimento de obrigações legais e regulatórias, nos termos do art. 7º, incisos V e II, da LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "4.2. O tratamento do Dado de Opinião Política fundamenta-se exclusivamente no consentimento específico, livre, informado e destacado do titular, nos termos do art. 11, inciso I, da LGPD, manifestado por meio do Termo de Consentimento, sendo vedado ao Politicando tratar tal dado com base em qualquer outra hipótese legal, ressalvado o cumprimento de obrigação legal ou regulatória pela Justiça Eleitoral ou pela ANPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "4.3. O tratamento dos dados de navegação e uso fundamenta-se no legítimo interesse do Controlador em assegurar a segurança e o correto funcionamento da Plataforma, nos termos do art. 7º, inciso IX, da LGPD, tendo o Politicando adotado o teste de balanceamento de interesses (legitimate interest assessment) como boa prática de governança em proteção de dados.",
        },
        {
          tipo: "paragrafo",
          texto:
            "4.4. O tratamento de dados necessário ao cumprimento de determinações da Justiça Eleitoral, do Ministério Público Eleitoral ou da ANPD fundamenta-se no cumprimento de obrigação legal ou regulatória pelo Controlador, nos termos do art. 7º, inciso II, da LGPD.",
        },
      ],
    },
    {
      id: "finalidades",
      titulo: "5. FINALIDADES DO TRATAMENTO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "5.1. Os dados pessoais tratados pelo Politicando destinam-se, exclusivamente, às seguintes finalidades:",
        },
        {
          tipo: "lista",
          itens: [
            "Viabilizar a criação, a autenticação, a manutenção e a gestão da conta do Usuário na Plataforma;",
            "Processar as respostas do Usuário ao Questionário por meio do Algoritmo de Afinidade, gerando o Resultado de Afinidade correspondente;",
            "Manter o histórico de respostas e Resultados de Afinidade do Usuário cadastrado, permitindo a consulta, a atualização e a comparação de resultados ao longo do tempo;",
            "Verificar o cumprimento da idade mínima exigida para o Cadastro e aplicar as restrições cabíveis a Usuários entre 16 e 18 anos incompletos;",
            "Enviar comunicações informativas sobre a Plataforma, observado o direito de descadastramento previsto na Cláusula 4 do Termo de Uso;",
            "Garantir a segurança, a estabilidade, a integridade e o correto funcionamento da Plataforma, incluindo a prevenção a fraudes, à criação de múltiplas contas e à manipulação de estatísticas agregadas;",
            "Prestar suporte técnico e atender solicitações do Usuário relacionadas a dúvidas, críticas, elogios ou imprecisões na classificação de posições de Candidatos/Partidos;",
            "Cumprir obrigações legais e regulatórias aplicáveis, inclusive perante a Justiça Eleitoral e a ANPD, incluindo eventual comunicação de indícios de irregularidade, ilegalidade ou manipulação do processo eleitoral, nos termos do Aviso Importante do Termo de Uso.",
            "Os dados pessoais não serão tratados para finalidades incompatíveis com as descritas nesta Política, sendo qualquer nova finalidade objeto de comunicação prévia ao Usuário e, quando aplicável ao Dado de Opinião Política, de novo consentimento específico, nos termos do art. 8º, § 6º, da LGPD.",
          ],
        },
      ],
    },
    {
      id: "compartilhamento",
      titulo: "6. COMPARTILHAMENTO DE DADOS PESSOAIS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "6.1. O Politicando não compartilha o Dado de Opinião Política individualizado de qualquer Usuário com Candidatos, Partidos, coligações, anunciantes ou terceiros, ressalvadas as hipóteses de: (i) ordem judicial ou requisição de autoridade competente; (ii) consentimento específico e expresso do Usuário para finalidade determinada; ou (iii) comunicação de indícios de irregularidade eleitoral às autoridades competentes, nos termos do Aviso Importante do Termo de Uso.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.2. Os dados de Cadastro (nome completo, e-mail, senha e data de nascimento) poderão ser tratados por Operadores contratados pelo Politicando para viabilizar a infraestrutura tecnológica da Plataforma, tais como provedores de hospedagem em nuvem, serviços de envio de e-mail transacional e ferramentas de suporte ao Usuário.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.3. Todo Operador contratado pelo Politicando encontra-se vinculado por contrato que assegura nível de proteção de dados pessoais equivalente ao previsto nesta Política e na LGPD, respondendo o Operador solidariamente pelos danos causados em decorrência do descumprimento das obrigações estabelecidas em tal contrato.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.4. O Politicando poderá divulgar estatísticas agregadas e anonimizadas relativas ao uso da Plataforma, para fins de transparência metodológica ou divulgação institucional, sem que tais estatísticas permitam, direta ou indiretamente, a identificação de qualquer Usuário.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.5. Em nenhuma hipótese o Politicando venderá ou cederá onerosamente dados pessoais de Usuários a terceiros.",
        },
      ],
    },
    {
      id: "transferencia-internacional",
      titulo: "7. TRANSFERÊNCIA INTERNACIONAL DE DADOS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "7.1. O tratamento de dados pessoais pelo Politicando poderá envolver o armazenamento ou processamento das informações em servidores ou provedores de infraestrutura em nuvem localizados fora do território nacional.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.2. Nessas hipóteses, a transferência internacional de dados observará as bases legais e as garantias previstas nos arts. 33 a 36 da LGPD, adotando o Politicando cláusulas contratuais padrão, certificações de segurança da informação ou outros mecanismos aptos a assegurar nível de proteção adequado aos dados transferidos.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.3. Em razão da natureza sensível do Dado de Opinião Política, o Politicando adota atenção redobrada quanto às garantias contratuais e técnicas de proteção quando referido dado for armazenado ou processado no exterior, exigindo de seus Operadores localizados fora do Brasil o mesmo padrão de proteção estabelecido nesta Política.",
        },
      ],
    },
    {
      id: "retencao",
      titulo: "8. PRAZO DE RETENÇÃO E ELIMINAÇÃO DOS DADOS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "8.1. Os dados pessoais tratados pelo Politicando serão mantidos enquanto: (i) a conta do Usuário permanecer ativa; (ii) forem necessários ao cumprimento das finalidades descritas na Cláusula 5 desta Política; ou (iii) forem exigidos por obrigação legal ou regulatória, incluindo eventual dever de guarda de registros determinado pela Justiça Eleitoral, nos termos dos arts. 15 e 16 da LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "8.2. As respostas ao Questionário fornecidas por Usuários não cadastrados não são armazenadas de forma identificada, sendo descartadas ou mantidas apenas de forma agregada e não individualizada, conforme item 3.2.2 desta Política.",
        },
        {
          tipo: "paragrafo",
          texto:
            "8.3. Após o cancelamento da conta do Usuário ou a revogação do consentimento para o tratamento do Dado de Opinião Política, os dados pessoais correspondentes serão eliminados de forma definitiva e segura em prazo razoável, não superior a 15 dias úteis, ressalvadas as hipóteses de conservação exigidas ou autorizadas por lei.",
        },
        {
          tipo: "paragrafo",
          texto:
            "8.4. Encerrado o prazo de retenção, os dados pessoais serão eliminados ou anonimizados, de modo a impedir a identificação, direta ou indireta, do respectivo titular, salvo quando a anonimização for inviável ou desproporcional para os fins de análises estatísticas agregadas de que trata o item 6.4 desta Política.",
        },
      ],
    },
    {
      id: "seguranca",
      titulo: "9. MEDIDAS DE SEGURANÇA DA INFORMAÇÃO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "9.1. O Politicando adota medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão, nos termos do art. 46 da LGPD, com atenção redobrada quanto ao Dado de Opinião Política, em razão de sua natureza sensível.",
        },
        {
          tipo: "paragrafo",
          texto:
            "9.2. Dentre as medidas adotadas, incluem-se, no que for tecnicamente viável: (i) criptografia de senhas e de dados sensíveis em trânsito e em repouso; (ii) controle de acesso lógico restrito a colaboradores e prestadores autorizados, mediante autenticação individual; (iii) pseudonimização ou agregação estatística do Dado de Opinião Política para fins de análises internas ou publicações de caráter geral; (iv) registros de auditoria (logs) de acesso aos sistemas; e (v) rotinas periódicas de teste, avaliação e monitoramento da eficácia das medidas de segurança adotadas.",
        },
        {
          tipo: "paragrafo",
          texto:
            "9.3. Não obstante os esforços empregados, nenhum sistema de segurança da informação é absolutamente inviolável, comprometendo-se o Politicando a agir com diligência para mitigar riscos e a comunicar eventuais incidentes de segurança na forma da Cláusula 14 desta Política.",
        },
      ],
    },
    {
      id: "menores",
      titulo: "10. TRATAMENTO DE DADOS DE USUÁRIOS ENTRE 16 E 18 ANOS INCOMPLETOS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "10.1. Nos termos da Cláusula 3.3.1 do Termo de Uso, é permitido o Cadastro de Usuários com idade entre 16 (dezesseis) e 18 (dezoito) anos incompletos, na qualidade de eleitores facultativos, observado o princípio da necessidade e do melhor interesse do adolescente (art. 6º, inciso III, e art. 14 da LGPD).",
        },
        {
          tipo: "paragrafo",
          texto:
            "10.2. Para esses Usuários, o Politicando coleta exclusivamente os dados estritamente necessários ao Cadastro e à utilização do Questionário, sendo vedada a coleta de qualquer dado adicional, bem como o direcionamento de comunicações de natureza comercial ou publicitária não estritamente informativas sobre a Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "10.3. É vedado o Cadastro de pessoas menores de 16 (dezesseis) anos. Constatado o descumprimento desta vedação, o Politicando procederá à exclusão imediata da conta e dos dados pessoais correspondentes, sem prejuízo de outras medidas cabíveis, conforme item 3.3.2 do Termo de Uso.",
        },
      ],
    },
    {
      id: "direitos-do-titular",
      titulo: "11. DIREITOS DO TITULAR DOS DADOS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "11.1. Nos termos do art. 18 da LGPD, o Usuário, na qualidade de titular dos dados pessoais, poderá exercer, gratuitamente e a qualquer tempo, mediante solicitação ao Encarregado (DPO), os seguintes direitos:",
        },
        {
          tipo: "lista",
          itens: [
            "confirmação da existência de tratamento de seus dados pessoais;",
            "acesso aos dados pessoais tratados pelo Politicando;",
            "correção de dados incompletos, inexatos ou desatualizados;",
            "anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;",
            "portabilidade dos dados pessoais a outro fornecedor de serviço ou produto, observados os segredos comercial e industrial do Politicando;",
            "eliminação dos dados pessoais tratados com base no consentimento, ressalvadas as hipóteses de conservação legal;",
            "informação sobre as entidades públicas e privadas com as quais o Politicando compartilhou dados;",
            "informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa;",
            "revogação do consentimento prestado para o tratamento do Dado de Opinião Política, nos termos do art. 8º, § 5º, da LGPD.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "11.2. As solicitações serão respondidas em prazo razoável, observados os prazos legais aplicáveis, podendo o Politicando solicitar informações adicionais para confirmar a identidade do titular antes de atender à solicitação, como medida de proteção contra fraudes.",
        },
        {
          tipo: "paragrafo",
          texto:
            "11.3. A revogação do consentimento para tratamento do Dado de Opinião Política implicará a impossibilidade de utilização da funcionalidade central da Plataforma (cálculo e consulta de afinidade), sem prejuízo da manutenção do Cadastro básico do Usuário para outras finalidades compatíveis, nos termos da Cláusula 5.4 do Termo de Consentimento.",
        },
        {
          tipo: "paragrafo",
          texto:
            "11.4. O titular que considerar que seus direitos não foram atendidos de forma satisfatória poderá apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
        },
      ],
    },
    {
      id: "cookies",
      titulo: "12. COOKIES E TECNOLOGIAS DE RASTREAMENTO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "12.1. A Plataforma utiliza cookies e tecnologias semelhantes com as finalidades de: (i) viabilizar a autenticação e a manutenção da sessão do Usuário cadastrado; (ii) lembrar preferências de navegação; (iii) medir o desempenho e a estabilidade da Plataforma; e (iv) elaborar estatísticas agregadas e não identificadas de uso.",
        },
        {
          tipo: "paragrafo",
          texto:
            "12.2. Os cookies utilizados pelo Politicando não têm por finalidade o rastreamento do Usuário para fins de publicidade comportamental política ou comercial, tampouco a associação de dados de navegação ao Dado de Opinião Política, que permanece tratado exclusivamente com base no consentimento específico de que trata a Cláusula 4.2 desta Política.",
        },
        {
          tipo: "paragrafo",
          texto:
            "12.3. O Usuário poderá gerenciar ou desabilitar o uso de cookies diretamente nas configurações de seu navegador, sendo certo que a desabilitação de determinados cookies poderá impactar o funcionamento de algumas funcionalidades da Plataforma, em especial as que dependem de Cadastro.",
        },
      ],
    },
    {
      id: "encarregado",
      titulo:
        "13. ENCARREGADO PELO TRATAMENTO DE DADOS PESSOAIS (DPO) E CANAIS DE CONTATO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "13.1. Nos termos do art. 41 da LGPD, o Politicando indica como Encarregado(a) pelo Tratamento de Dados Pessoais (DPO), responsável por atuar como canal de comunicação entre o Politicando, os titulares dos dados e a ANPD:",
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
    {
      id: "incidentes",
      titulo: "14. INCIDENTES DE SEGURANÇA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "14.1. Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares dos dados, o Politicando comunicará à ANPD e aos titulares afetados em prazo razoável, não superior a 5 (cinco) dias úteis contados da ciência do incidente, nos termos do art. 48 da LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "14.2. A comunicação de que trata o item anterior informará, no mínimo: a natureza dos dados pessoais afetados; as medidas técnicas e de segurança utilizadas para a proteção dos dados; os riscos relacionados ao incidente; os motivos da eventual demora na comunicação; e as medidas adotadas para reverter ou mitigar os efeitos do incidente.",
        },
      ],
    },
    {
      id: "alteracoes",
      titulo: "15. ALTERAÇÕES DESTA POLÍTICA DE PRIVACIDADE",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "15.1. O Politicando poderá alterar esta Política a qualquer tempo, especialmente para adequação a novas exigências legais, regulatórias ou eleitorais, ou em razão de mudanças na forma de tratamento dos dados pessoais.",
        },
        {
          tipo: "paragrafo",
          texto:
            "15.2. Alterações substanciais serão comunicadas aos Usuários por e-mail e/ou aviso destacado na Plataforma, com antecedência razoável, podendo o Politicando solicitar novo consentimento específico do Usuário quando a alteração impactar o tratamento do Dado de Opinião Política, nos termos do art. 8º, § 6º, da LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "15.3. É responsabilidade do Usuário consultar esta Política periodicamente, sendo que a continuidade do uso da Plataforma após a divulgação de alterações não substanciais corresponde à aceitação da versão atualizada.",
        },
      ],
    },
    {
      id: "disposicoes-gerais",
      titulo: "16. DISPOSIÇÕES GERAIS E FORO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "16.1. Esta Política será regida e interpretada de acordo com as leis do Brasil, incluindo a LGPD e a Legislação Eleitoral vigente à época da utilização da Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "16.2. Esta Política é redigida em português, idioma que prevalecerá para todos os fins de interpretação e execução, ainda que disponibilizada versão traduzida para fins meramente informativos.",
        },
        {
          tipo: "paragrafo",
          texto:
            "16.3. A nulidade ou invalidade de qualquer disposição desta Política não prejudicará a validade das demais, que permanecerão em vigor, devendo a disposição nula ou inválida ser refeita como ato de boa-fé entre as partes.",
        },
        {
          tipo: "paragrafo",
          texto:
            "16.4. Não sendo possível a solução amigável de eventual controvérsia relacionada a esta Política, fica eleito o foro de Belo Horizonte/MG, com renúncia a qualquer outro, por mais privilegiado que seja, ressalvada a competência da Justiça Eleitoral para matérias de sua alçada e o foro do domicílio do consumidor, quando aplicável a legislação consumerista.",
        },
      ],
    },
  ],
};
