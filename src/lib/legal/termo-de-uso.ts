import {
  ATUALIZADO_EM,
  CONTROLADORA,
  ESCOPO_PLATAFORMA,
  type DocumentoLegal,
} from "@/lib/legal/tipos";

/** Termos e Condições de Uso — conversão fiel do PDF do cliente (26/08/2026). */
export const TERMO_DE_USO: DocumentoLegal = {
  titulo: "Termos e Condições de Uso",
  descricao:
    "As regras de acesso e uso da plataforma Politicando, do Questionário e do Resultado de Afinidade.",
  atualizadoEm: ATUALIZADO_EM,
  abertura: [
    { tipo: "paragrafo", texto: "Bem-vindo(a) ao Politicando!" },
    {
      tipo: "paragrafo",
      texto:
        "Estes Termos e Condições de Uso (“Termos”) regem seu acesso e uso do site e da plataforma digital (www.politicando.site), conteúdos e serviços, criados, controlados pela Politicando.",
    },
    { tipo: "paragrafo", texto: CONTROLADORA },
    { tipo: "paragrafo", texto: "Estes Termos valem para:" },
    { tipo: "lista", itens: ESCOPO_PLATAFORMA },
    {
      tipo: "paragrafo",
      texto: "Aplicam-se estes Termos sem prejuízo da legislação vigente, em especial:",
    },
    {
      tipo: "lista",
      itens: [
        "Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais, LGPD)",
        "Legislação eleitoral aplicável (Lei nº 9.504/1997)",
        "Resoluções do TSE",
      ],
    },
  ],
  aviso: {
    titulo: "AVISO IMPORTANTE: LEIA COM ATENÇÃO",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Antes de utilizar a plataforma ou se cadastrar, leia este Termo com atenção. Damos destaque especialmente ao tratamento de dados pessoais e de dados pessoais sensíveis, relacionados principalmente à opinião política. Os detalhes sobre finalidade, base legal e prazo de tratamento desses dados estão descritos na Política de Privacidade.",
      },
      {
        tipo: "lista",
        itens: [
          'Ao utilizar o "Questionário", você concorda com as regras deste Termo de Uso no que for aplicável ao uso sem cadastro.',
          'Ao realizar o "Cadastro", você concorda integralmente com este Termo de Uso e com a Política de Privacidade.',
          "O simples uso da plataforma configura concordância tácita do Usuário quanto às regras gerais deste Termo, independentemente de cadastro.",
          "O Politicando não presta consultoria eleitoral, assessoria política, aconselhamento jurídico ou qualquer forma de orientação de voto. O resultado por afinidade gerado pelo algoritmo do Politicando é meramente informativo.",
          "Você está ciente de que o Politicando poderá comunicar às autoridades competentes, incluindo a Justiça Eleitoral e a Autoridade Nacional de Proteção de Dados, atos relacionados ao acesso e uso inadequado do serviço, quando constatados indícios razoáveis e fundamentados de irregularidade, ilegalidade ou tentativa de manipulação do processo eleitoral.",
        ],
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
      id: "quem-somos",
      titulo: "1. QUEM SOMOS E A QUEM SE DESTINA?",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "1.1. O “Politicando” atua como provedor de infraestrutura tecnológica “SaaS” (Software as a Service), fornecendo uma ferramenta digital de comparação de respostas para fins informativos sobre afinidade política entre o Usuário e Candidatos e/ou Partidos participantes do processo eleitoral.",
        },
        {
          tipo: "paragrafo",
          texto:
            '1.2. A plataforma destina-se a qualquer pessoa física maior de 16 (dezesseis) anos, alinhamento este que acompanha a idade mínima de alistamento eleitoral facultativo prevista no art. 14, § 1º, inciso II, alínea "c", da Constituição Federal, observadas as restrições de tratamento de dados de menores previstas na LGPD e detalhadas na Cláusula 3 deste Termo. O Politicando atua como mera FACILITADORA tecnológica e não presta serviços de consultoria política, jurídica, jornalística ou de pesquisa eleitoral registrada.',
        },
        {
          tipo: "paragrafo",
          texto: "1.3. A plataforma Politicando permite ao Usuário:",
        },
        {
          tipo: "lista",
          itens: [
            "Responder ao questionário: Perguntas sobre economia, saúde, segurança, meio ambiente e outros temas públicos.",
            "Ver sua afinidade: O sistema calcula uma porcentagem (%) mostrando com quais candidatos ou partidos você tem mais compatibilidade.",
            "Comparar posições: Dá para ver lado a lado a sua resposta e a posição oficial declarada pelo candidato/partido (com link das fontes, quando disponível).",
            "Visualizar o resultado de afinidade calculado pelo algoritmo, expresso em percentual de compatibilidade com candidatos e/ou partidos cadastrados na base do Politicando;",
            "Comparar suas respostas com as posições públicas declaradas pelos candidatos e/ou partidos, com indicação das fontes utilizadas, quando disponíveis;",
            "Refazer o questionário e atualizar suas respostas a qualquer tempo;",
            "Acessar o Politicando por meio de canal de comunicação, Sugestões e Suporte, no qual o Usuário poderá sugerir atualizações, apresentar críticas, elogios ou reportar eventuais imprecisões nas posições atribuídas a candidatos e/ou partidos.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "1.4. O resultado de afinidade não substitui a análise crítica, individual e pessoal do Usuário sobre os candidatos, tampouco qualquer material oficial produzido pela Justiça Eleitoral, tratando-se de ferramenta complementar e informativa de organização de preferências políticas.",
        },
        {
          tipo: "paragrafo",
          texto:
            "1.5. É de responsabilidade exclusiva do Usuário formar seu próprio convencimento eleitoral, sendo o resultado gerado pelo Politicando apenas um elemento entre outros a serem considerados na decisão de voto.",
        },
      ],
    },
    {
      id: "definicoes",
      titulo: "2. DEFINIÇÕES",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "2.1. As palavras iniciadas em maiúsculas, tanto no singular como no plural, terão o significado atribuído nesta cláusula. Outros termos não relacionados abaixo terão o significado atribuído neste Termo.",
        },
        {
          tipo: "lista",
          itens: [
            "Algoritmo de Afinidade: método computacional proprietário do Politicando que compara, estatisticamente, as respostas do Usuário ao Questionário com as posições previamente cadastradas de Candidatos/Partidos, gerando um resultado percentual de compatibilidade.",
            "ANPD: Autoridade Nacional de Proteção de Dados, órgão da administração pública responsável por zelar, implementar e fiscalizar o cumprimento da LGPD em todo o território nacional.",
            "Banco de Dados: conjunto estruturado de dados pessoais, estabelecido em um ou mais locais, em suporte eletrônico ou físico.",
            "Cadastro do Usuário: registro de informações do Usuário necessárias à utilização da Plataforma.",
            "Candidato/Partido: pessoa física ou jurídica de direito público/privado cujas posições políticas públicas estão cadastradas na base de dados do Politicando para fins de comparação com as respostas do Usuário.",
            "Consentimento: manifestação livre, informada, inequívoca e específica pela qual o titular concorda com o tratamento de seus dados pessoais, inclusive sensíveis, para finalidade determinada.",
            "Controlador: pessoa natural ou jurídica a quem competem as decisões referentes ao tratamento de dados pessoais, nos termos do art. 5º, inciso VI, da LGPD, papel exercido pelo Politicando quanto aos dados coletados na Plataforma.",
            "Dado de Opinião Política: espécie de Dado Pessoal Sensível composta pelas respostas do Usuário ao Questionário e pelo Resultado de Afinidade dele decorrente, tratado exclusivamente com a finalidade de viabilizar a funcionalidade central da Plataforma.",
            "Dado Pessoal: informação relacionada a pessoa natural, identificada ou identificável.",
            "Dado Pessoal Sensível: dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a pessoa natural, nos termos do art. 5º, inciso II, da LGPD.",
            "Dados de Acesso: dados necessários ao acesso à Plataforma, tais como e-mail e senha.",
            "Encarregado (DPO): pessoa indicada pelo Politicando para atuar como canal de comunicação entre o Politicando, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD), nos termos do art. 5º, inciso VIII, e art. 41 da LGPD.",
            "Legislação Eleitoral: conjunto de normas aplicáveis ao processo eleitoral brasileiro, incluindo a Lei nº 9.504/1997, o Código Eleitoral (Lei nº 4.737/1965) e as Resoluções do Tribunal Superior Eleitoral (TSE) vigentes.",
            "LGPD: Lei Geral de Proteção de Dados Pessoais – Lei Federal nº 13.709, de 14 de agosto de 2018, que dispõe sobre o tratamento de dados pessoais, inclusive nos meios digitais, por pessoa natural ou por pessoa jurídica de direito público ou privado.",
            "Operador: pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do Controlador, nos termos do art. 5º, inciso VII, da LGPD, papel eventualmente exercido por provedores de infraestrutura tecnológica contratados pelo Politicando.",
            'Plataforma/Software: ferramenta digital denominada "Politicando", disponível em www.politicando.site, que permite ao Usuário responder a questionário sobre temas políticos e obter resultado de afinidade com candidatos e/ou partidos.',
            "Questionário: conjunto de perguntas predefinidas sobre temas de interesse público e político, respondidas pelo Usuário para fins de cálculo de afinidade.",
            "Resultado de Afinidade: relatório informativo gerado pelo Algoritmo de Afinidade, apresentado ao Usuário ao final do Questionário.",
            "Termo de Uso",
            "Titular do Dado: pessoa natural a quem se referem os dados pessoais objeto de tratamento, sendo, para os fins deste Termo, o Usuário.",
            "Tratamento de Dados: toda operação realizada com dados pessoais, tais como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação, controle, modificação, comunicação, transferência, difusão ou extração.",
            "Usuário: pessoa física que acessa e utiliza a Plataforma, incluindo o Questionário e o Resultado de Afinidade, tenha ou não realizado cadastro.",
          ],
        },
      ],
    },
    {
      id: "cadastro",
      titulo: "3. CADASTRO DO USUÁRIO DO SERVIÇO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "3.1. Para realizar o cadastro na Plataforma, não sendo este necessário para responder ao Questionário e visualizar parte do Resultado de Afinidade, o Usuário deverá informar os seguintes dados pessoais:",
        },
        {
          tipo: "lista",
          itens: ["Nome completo;", "E-mail;", "Senha;", "Data de Nascimento."],
        },
        {
          tipo: "paragrafo",
          texto:
            "3.2. A Data de Nascimento é coletada com a finalidade específica de verificar a idade do Usuário e assegurar o cumprimento das restrições de idade mínima estabelecidas neste Termo, nos termos do art. 14 da LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.3. O Usuário deverá ter no mínimo 16 (dezesseis) anos de idade completos para realizar o cadastro na Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.3.1. Usuários entre 16 (dezesseis) e 18 (dezoito) anos incompletos poderão utilizar a Plataforma na qualidade de eleitores facultativos, sendo vedada a coleta de qualquer dado adicional além dos estritamente necessários ao cadastro e à utilização do Questionário, em observância ao princípio da necessidade e do melhor interesse do menor (art. 6º, III, e art. 14 da LGPD).",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.3.2. É vedado o cadastro de pessoas menores de 16 (dezesseis) anos. Constatado o descumprimento desta vedação, o Politicando procederá à exclusão imediata da conta e dos dados correspondentes, sem prejuízo de outras medidas cabíveis.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.4. Para concluir o cadastro, o Usuário deverá declarar que leu e concorda com a Política de Privacidade e o termo de consentimento, sendo a aceitação deste Termo de Uso presumida pelo uso continuado das funcionalidades da Plataforma, sob pena de impedimento de acesso às funcionalidades que dependam de cadastro.",
        },
        {
          tipo: "paragrafo",
          texto:
            "3.4.1. Conforme o disposto no artigo 5, inciso III da LGPD, as informações coletadas de usuários sem cadastro passam por um processo de anonimização, impedindo a rastreabilidade do titular. Tais dados são eliminados definitivamente no momento do encerramento da sessão na plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            '3.5. Sob pena de se responsabilizar nos termos da legislação vigente, o Usuário concorda em fornecer informações verdadeiras, atualizadas e completas, conforme solicitado no "Cadastro do Usuário".',
        },
        {
          tipo: "paragrafo",
          texto:
            "3.6. É vedada a criação de mais de uma conta pela mesma pessoa física com o objetivo de gerar múltiplos Resultados de Afinidade para fins de manipulação de eventuais estatísticas agregadas divulgadas pelo Politicando.",
        },
      ],
    },
    {
      id: "comunicacoes",
      titulo: "4. COMUNICAÇÕES E NOTÍCIAS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "4.1. Ao realizar o Cadastro e aceitar este Termo de Uso, o Usuário cadastrado autoriza o envio de comunicações pelo Politicando, incluindo e-mails informativos, novidades sobre funcionalidades, atualizações do Questionário e conteúdos relacionados aos serviços oferecidos. O Usuário cadastrado poderá, a qualquer momento, optar por não mais receber tais comunicações, utilizando o link de descadastramento presente em cada e-mail ou entrando em contato com os canais oficiais de suporte.",
        },
        {
          tipo: "paragrafo",
          texto:
            "4.2. O disposto nesta cláusula não se aplica ao Usuário não cadastrado, que, por não fornecer e-mail ou outro dado de contato ao Politicando, não recebe qualquer comunicação individualizada, sendo informado sobre novidades, atualizações e demais avisos exclusivamente por meio de publicação na própria Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "4.3. O Politicando não enviará, em hipótese alguma, comunicações que constituam propaganda eleitoral paga, conteúdo patrocinado por candidato, partido ou coligação, ou qualquer forma de impulsionamento de conteúdo político vedado pela Legislação Eleitoral.",
        },
      ],
    },
    {
      id: "algoritmo",
      titulo: "5. FUNCIONAMENTO DO ALGORITMO DE AFINIDADE POLÍTICA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "5.1. O Usuário reconhece que o Algoritmo de Afinidade constitui ferramenta de apoio informativo e declara estar ciente e de acordo com as seguintes condições:",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.1.1. O Algoritmo compara as respostas do Usuário ao Questionário com as posições previamente cadastradas de Candidatos/Partidos, extraídas de fontes públicas, declarações oficiais, propostas de governo registradas ou outras fontes indicadas pelo Politicando;",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.1.2. O Resultado de Afinidade é expresso em percentual estimado de compatibilidade e não representa garantia de coincidência integral de posições entre o Usuário e o Candidato/Partido indicado;",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.1.3. O Politicando não garante a atualização em tempo real das posições dos Candidatos/Partidos, podendo haver defasagem entre a divulgação de nova posição pública do Candidato/Partido e sua incorporação à base de dados da Plataforma;",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.1.4. O Politicando adota critérios objetivos e uniformes de classificação das posições dos Candidatos/Partidos, buscando minimizar distorções interpretativas, sem prejuízo da possibilidade de o Usuário reportar eventuais imprecisões pelo canal de suporte;",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.1.5. O Resultado de Afinidade não constitui pesquisa eleitoral registrada nos termos do art. 33 da Lei nº 9.504/1997, tratando-se de ferramenta de autoconhecimento e organização de preferências pessoais do próprio Usuário, não se destinando à divulgação pública de tendências de voto.",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.2. O Usuário é o único responsável pela interpretação do Resultado de Afinidade e pela decisão de voto dele eventualmente decorrente, por seus próprios critérios, valores e convicções.",
        },
        {
          tipo: "paragrafo",
          texto:
            "5.3. O Politicando poderá, a seu critério, atualizar, ajustar, recalibrar ou descontinuar o Algoritmo de Afinidade a qualquer momento, inclusive em razão de mudanças no cenário eleitoral, sem que isso gere qualquer dever de indenização aos Usuários.",
        },
      ],
    },
    {
      id: "dados-sensiveis",
      titulo:
        "6. NATUREZA DOS DADOS SENSÍVEIS TRATADOS E BASE LEGAL (QUANDO HÁ CADASTRO)",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "6.1. As respostas fornecidas pelo Usuário ao Questionário, bem como o Resultado de Afinidade delas decorrente, constituem Dado Pessoal Sensível relativo a opinião política, nos termos do art. 5º, inciso II, da LGPD, independentemente de o Usuário estar ou não cadastrado na Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.2. Quando o Questionário é respondido sem Cadastro, as respostas do Usuário e o Resultado de Afinidade são processados exclusivamente em ambiente local do dispositivo do Usuário e/ou em memória temporária de sessão, não sendo armazenados no Banco de Dados do Politicando, nem associados a qualquer identificador pessoal. Nessa hipótese, o tratamento se esgota no ato de exibição do resultado ao Usuário, sendo os dados automaticamente descartados ao final da sessão, sem retenção posterior pelo Politicando.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.3. O armazenamento do Dado de Opinião Política pelo Politicando, com vinculação ao respectivo titular, ocorre exclusivamente quando o Usuário realiza o Cadastro na Plataforma, momento em que passa a existir Tratamento de Dados sujeito às disposições desta cláusula.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.4. O Tratamento do Dado de Opinião Política armazenado em decorrência do Cadastro é fundamentado exclusivamente no consentimento específico, livre, informado e destacado do titular, nos termos do art. 11, inciso I, da LGPD, sendo vedado ao Politicando tratar tais dados com base em qualquer outra hipótese legal, salvo cumprimento de obrigação legal ou regulatória.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.5. Ao realizar o cadastro e optar por salvar suas respostas ao Questionário, o Usuário será solicitado a fornecer consentimento específico e destacado, em campo apartado das demais cláusulas deste Termo, para o armazenamento e tratamento de suas respostas como Dado de Opinião Política, podendo revogá-lo a qualquer tempo, nos termos do art. 8º, § 5º, da LGPD, mediante solicitação aos canais indicados na Cláusula 15, identificando-se por meio dos Dados de Acesso de sua conta.",
        },
        {
          tipo: "paragrafo",
          texto: "6.6. A revogação do consentimento pelo Usuário cadastrado implicará:",
        },
        {
          tipo: "lista",
          itens: [
            "A exclusão do Dado de Opinião Política armazenado, associado ao Cadastro;",
            "A impossibilidade de utilização, a partir de então, da funcionalidade de armazenamento e histórico de resultados vinculados à conta, sem prejuízo da manutenção do Cadastro básico do Usuário para outras finalidades compatíveis;",
            "A possibilidade de o Usuário continuar utilizando o Questionário na modalidade sem armazenamento, nos termos do item 6.2, caso deseje apenas visualizar o Resultado de Afinidade sem que este seja retido pelo Politicando.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "6.7. Por não haver identificador pessoal associado ao Usuário não cadastrado, é vedado a este exercer, em relação às respostas fornecidas na modalidade do item 6.2, direitos de revogação, correção ou exclusão de dados já eliminados automaticamente ao fim da sessão, por inexistir registro correspondente no Politicando.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.8. O Politicando não utilizará o Dado de Opinião Política armazenado para fins de perfilamento comercial, segmentação de publicidade política paga, venda ou cessão a terceiros para fins eleitorais, exceto quando expressamente autorizado pelo Usuário e em estrita conformidade com a Legislação Eleitoral, que veda expressamente o uso de dados pessoais para fins de manipulação do processo eleitoral (art. 9º-A e seguintes da Lei nº 9.504/1997, na redação vigente).",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.9. O Politicando adotará medidas técnicas e administrativas de segurança da informação compatíveis com a natureza sensível dos dados tratados, nos termos do art. 46 da LGPD, incluindo, sempre que tecnicamente viável, pseudonimização ou agregação estatística para eventuais análises internas ou publicações de caráter geral e não individualizado, tanto em relação aos dados armazenados de Usuários cadastrados quanto em relação a eventuais dados agregados e anonimizados extraídos de sessões de Usuários não cadastrados, quando aplicável.",
        },
        {
          tipo: "paragrafo",
          texto:
            "6.10. Encarregado pelo Tratamento de Dados (DPO): nos termos do art. 41 da LGPD, o Politicando indica como canal de comunicação com os titulares de dados e com a ANPD o(a) Encarregado(a) Pedro Weinberg Lima, que pode ser contatado(a) pelo e-mail politicandoapp26@gmail.com, para esclarecimento de dúvidas, solicitações de exercício de direitos do titular ou registro de incidentes relacionados ao tratamento de dados pessoais.",
        },
      ],
    },
    {
      id: "responsabilidades",
      titulo: "7. RESPONSABILIDADES DO USUÁRIO E ISENÇÕES DA PLATAFORMA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "7.1. O Usuário é responsável por todas as informações e dados inseridos, produzidos e disponibilizados no Politicando, incluindo as respostas fornecidas ao Questionário.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.2. O Politicando não realiza qualquer tipo de modificação ou alteração das respostas do Usuário, não sendo, de qualquer forma, responsável pelo conteúdo das informações introduzidas pelo Usuário, na medida em que o serviço prestado se restringe aos descritos neste Termo de Uso.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.3. O Usuário é o único responsável pela interpretação do Resultado de Afinidade e pelas decisões tomadas com base nele, por seus próprios critérios, interesses e convicções políticas.",
        },
        {
          tipo: "lista",
          itens: [
            "A responsabilidade pela decisão de voto e por quaisquer atos políticos ou eleitorais praticados pelo Usuário é exclusiva do próprio Usuário, não havendo qualquer responsabilidade do Politicando.",
            "O Politicando não garante que o Resultado de Afinidade será sempre preciso, completo, atualizado ou adequado ao propósito específico do Usuário, tratando-se de estimativa baseada em metodologia própria e nas informações disponíveis no momento da consulta.",
            "O Politicando não presta consultoria eleitoral, aconselhamento jurídico, jornalístico ou de qualquer outra natureza profissional, cabendo ao Usuário buscar fontes oficiais adicionais (como o portal do TSE) para complementar sua análise antes de tomar decisões de voto.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "7.4. É responsabilidade do Usuário garantir o acesso ao site em dispositivo compatível e com conexão à internet adequada.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.5. É responsabilidade do Usuário toda atividade que ocorrer em sua conta de acesso ao Politicando.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.6. O Usuário é o único responsável pela confidencialidade de seus Dados de Acesso, bem como por todas as atividades realizadas mediante o emprego destes, não sendo possível, em qualquer hipótese, alegar uso indevido por terceiro.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.7. O direito de acesso ao Politicando é restrito ao Usuário cadastrado, sendo permanentemente proibido o compartilhamento ou a divulgação dos Dados de Acesso a terceiros.",
        },
        {
          tipo: "paragrafo",
          texto:
            "7.8. Em nenhuma hipótese o Politicando se responsabilizará por dano indireto, dano material, dano moral, lucros cessantes ou qualquer outro dano e/ou prejuízo atribuído ao uso direto ou indireto da Plataforma, ou a decisões de voto tomadas com base no Resultado de Afinidade.",
        },
        { tipo: "paragrafo", texto: "7.9. O Politicando não se responsabiliza:" },
        {
          tipo: "lista",
          itens: [
            "Pelas condições de uso do dispositivo do Usuário;",
            "Por equipamento infectado ou invadido por ameaça externa;",
            "Por instabilidades de conexão à internet do Usuário;",
            "Por eventual desatualização de posições públicas de Candidatos/Partidos não comunicada tempestivamente ao Politicando;",
            "Por qualquer decisão de voto tomada com base no Resultado de Afinidade, independentemente de consulta a outras fontes.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "7.10. O Politicando poderá apresentar erros ou instabilidades técnicas, que serão prontamente solucionados pela equipe de suporte, cabendo ao Usuário reportar ao suporte os problemas apresentados durante o uso. O Politicando se responsabiliza por disponibilizar a Plataforma e por corrigir as falhas técnicas apresentadas e reportadas pelo Usuário por meio do canal de suporte.",
        },
      ],
    },
    {
      id: "neutralidade",
      titulo: "8. NEUTRALIDADE, TRANSPARÊNCIA METODOLÓGICA E VEDAÇÃO DE MANIPULAÇÃO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "8.1. O Politicando declara buscar atuar com neutralidade político-partidária na elaboração do Questionário e na classificação das posições dos Candidatos/Partidos, adotando metodologia própria, uniforme e objetiva de pontuação, sem favorecer, direta ou indiretamente, qualquer candidatura, partido, coligação ou espectro ideológico.",
        },
        {
          tipo: "paragrafo",
          texto:
            "8.2. O Politicando disponibilizará, em página específica do site, uma explicação geral e acessível da metodologia utilizada pelo Algoritmo de Afinidade (critérios de pontuação, fontes consultadas e forma de atribuição de pesos às respostas), preservado o segredo comercial quanto a aspectos técnicos específicos de implementação, tais como código-fonte, parâmetros internos de calibragem e demais elementos que configurem propriedade intelectual do Politicando.",
        },
        {
          tipo: "paragrafo",
          texto:
            "8.3. É expressamente vedado a qualquer pessoa, incluindo Candidatos, Partidos, coligações, seus representantes ou terceiros contratados:",
        },
        {
          tipo: "lista",
          itens: [
            "Tentar influenciar, mediante pagamento, favor ou qualquer outra vantagem, a metodologia de classificação de posições políticas no Algoritmo de Afinidade;",
            "Utilizar mecanismos automatizados, bots, scripts ou múltiplas contas para distorcer estatísticas agregadas eventualmente divulgadas pelo Politicando;",
            "Reproduzir, extrair ou utilizar o Resultado de Afinidade de terceiros para fins de propaganda eleitoral, doxing ou constrangimento político.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "8.4. A violação das vedações desta cláusula sujeitará o infrator ao bloqueio imediato de acesso, sem prejuízo da responsabilização civil, administrativa e penal cabível, incluindo eventual comunicação ao Ministério Público Eleitoral e à Justiça Eleitoral.",
        },
        {
          tipo: "paragrafo",
          texto:
            "8.5. Reclamações relacionadas a eventual imprecisão na classificação de posições de Candidatos/Partidos poderão ser encaminhadas pelo canal de suporte indicado na Cláusula 15, sendo analisadas pela equipe responsável em prazo razoável.",
        },
      ],
    },
    {
      id: "conduta",
      titulo: "9. DAS REGRAS DE CONDUTA E OUTRAS PROIBIÇÕES NA PLATAFORMA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "9.1. Conduta e Urbanidade: O Politicando preza por um ambiente informativo e respeitoso. Em conformidade com o Marco Civil da Internet (Lei nº 12.965/2014), não é permitido que o Usuário apresente, publique ou disponibilize, em especial nos canais de suporte ou em eventuais áreas de comentário da Plataforma, conteúdos de texto, áudio ou imagem de caráter ameaçador, falso, fraudulento, discriminatório, difamatório, calunioso, injurioso, obsceno, ofensivo, que incite violência política ou que configure discurso de ódio. A violação desta regra sujeita o infrator ao bloqueio imediato do acesso, além da responsabilização civil e penal por crimes contra a honra (arts. 138 a 140 do Código Penal) e crimes eleitorais aplicáveis (arts. 323 e seguintes do Código Eleitoral).",
        },
        {
          tipo: "paragrafo",
          texto:
            "9.2. Proteção da Infraestrutura e Software: Fica expressamente vedado o uso de mineração de dados (data mining), raspagem de dados (scraping), uso de robôs de mensagens (bots), engenharia reversa ou operações massificadas na Plataforma, especialmente quando destinadas a extrair em massa o Resultado de Afinidade de terceiros ou a metodologia do Algoritmo. A tentativa de invasão, extração indevida ou sobrecarga dos servidores configura violação à Lei de Proteção de Propriedade Intelectual de Programa de Computador (Lei nº 9.609/1998) e crime de invasão de dispositivo informático (art. 154-A do Código Penal), sujeitando o infrator à reparação de danos materiais e lucros cessantes causados ao Politicando.",
        },
        {
          tipo: "paragrafo",
          texto:
            "9.3. Pessoalidade da Conta: O uso da Plataforma é estritamente pessoal e intransferível. É proibida toda e qualquer forma de comercialização, aluguel, rateio ou transferência, onerosa ou gratuita, da conta do Usuário para terceiros. O Usuário responderá solidária e objetivamente por quaisquer danos causados por terceiros que acessarem a Plataforma utilizando suas credenciais (arts. 186 e 927 do Código Civil).",
        },
        {
          tipo: "paragrafo",
          texto:
            '9.4. Proteção da Marca e Grupos Paralelos: Não é permitido aos Usuários formar grupos paralelos em aplicativos de mensagens, redes sociais, fóruns ou e-mail utilizando o nome, logotipo ou a marca "Politicando", ou qualquer outra identificação que simule um espaço de comunicação oficial da Plataforma, tampouco divulgar Resultado de Afinidade individual de terceiros sem autorização. O uso indevido da marca configura violação à Lei da Propriedade Industrial (Lei nº 9.279/1996), sujeitando o infrator à imediata exclusão da Plataforma, sem prejuízo da apuração de perdas e danos.',
        },
        {
          tipo: "paragrafo",
          texto:
            "9.5. É vedado utilizar a Plataforma para fins de coleta indevida de dados de terceiros, disparo de mensagens em massa (spam), disseminação de desinformação eleitoral (fake news) ou qualquer prática vedada pela Legislação Eleitoral e pelas Resoluções do TSE vigentes.",
        },
      ],
    },
    {
      id: "propriedade-intelectual",
      titulo: "10. DIREITO DE PROPRIEDADE INTELECTUAL",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "10.1. O Usuário garante que irá respeitar todos os direitos de propriedade intelectual e os decorrentes de marcas, patentes e/ou desenhos industriais, depositados ou registrados, bem como todos os direitos referentes a terceiros que estão ou estiveram disponíveis no Politicando.",
        },
        {
          tipo: "paragrafo",
          texto:
            "10.2. O acesso ao Politicando não garante ao Usuário qualquer direito sobre os nomes, títulos, palavras, frases, marcas, patentes, imagens, dados, informações, metodologia do Algoritmo de Afinidade, dentre outros, que nele estejam ou estiveram disponíveis, sem que haja prévia autorização do Politicando.",
        },
        {
          tipo: "paragrafo",
          texto:
            "10.3. Todos os direitos de propriedade intelectual referentes ao Politicando, incluindo o código-fonte, a base de classificação de posições de Candidatos/Partidos e a metodologia de cálculo do Algoritmo de Afinidade, são de propriedade exclusiva do Politicando, mesmo que novas funcionalidades sejam criadas a partir de solicitação do Usuário.",
        },
        {
          tipo: "paragrafo",
          texto:
            "10.4. O Usuário adquire apenas o direito de uso do Politicando para a finalidade que o software foi concebido, sendo expressamente proibido utilizar mecanismos e métodos para acesso ao código-fonte do software ou à base de dados subjacente ao Algoritmo.",
        },
        {
          tipo: "paragrafo",
          texto:
            "10.5. O Politicando se reserva o direito de modificar, suspender, terminar ou descontinuar a Plataforma, no todo ou em parte, sem necessidade de prévia notificação individual ao Usuário, podendo comunicar a todos os Usuários de forma geral através do site ou da disponibilização de novo Termo de Uso ou de uma nova Política de Privacidade.",
        },
      ],
    },
    {
      id: "confidencialidade",
      titulo: "11. CONFIDENCIALIDADE E PROTEÇÃO DE DADOS PESSOAIS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "11.1. O Politicando tratará os dados pessoais decorrentes do presente Termo em estrita observância ao disposto na legislação aplicável, incluindo a LGPD e a Política de Privacidade da Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "11.2. Retenção e Exclusão de Dados: Após o cancelamento ou encerramento da conta do Usuário, os dados pessoais, incluindo o Dado de Opinião Política, serão eliminados de forma definitiva e segura em prazo razoável, conforme o prazo estabelecido na cláusula 8.3 da Política de privacidade, salvo se a conservação for exigida ou autorizada por lei ou necessária ao cumprimento de obrigação legal ou regulatória (incluindo eventual dever de guarda de registros determinado pela Justiça Eleitoral), nos termos dos arts. 15 e 16 da LGPD.",
        },
        {
          tipo: "paragrafo",
          texto:
            "11.3. Transferência Internacional de Dados: O tratamento de dados pessoais realizado pelo Politicando poderá envolver o armazenamento ou processamento das informações em servidores ou provedores de nuvem localizados fora do território nacional. Nessas hipóteses, a transferência internacional observará as bases legais e as garantias previstas nos arts. 33 a 36 da LGPD, adotando o Politicando cláusulas contratuais, certificações ou outros mecanismos aptos a assegurar nível de proteção adequado aos dados pessoais transferidos, com atenção redobrada quanto ao Dado de Opinião Política.",
        },
        {
          tipo: "paragrafo",
          texto:
            "11.4. Incidentes de Segurança: Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares dos dados, o Politicando comunicará à Autoridade Nacional de Proteção de Dados (ANPD) e aos titulares afetados em prazo razoável, não superior a 5 (cinco) dias úteis contados da ciência do incidente, nos termos do art. 48 da LGPD, informando, no mínimo, a natureza dos dados afetados, as medidas técnicas e de segurança adotadas e os riscos relacionados ao incidente.",
        },
        {
          tipo: "paragrafo",
          texto:
            "11.5. A Politicando não compartilhará o Dado de Opinião Política individualizado de qualquer Usuário com Candidatos, Partidos, coligações, anunciantes ou terceiros, exceto mediante ordem judicial ou requisição de autoridade competente, ou consentimento específico e expresso do Usuário para finalidade determinada.",
        },
      ],
    },
    {
      id: "cancelamento",
      titulo: "12. CANCELAMENTO E EXCLUSÃO DE CONTA",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "12.1. O Usuário cadastrado poderá solicitar o cancelamento de sua conta e a exclusão de seus dados a qualquer tempo, mediante solicitação ao canal de suporte indicado na Cláusula 15 ou diretamente nas configurações da Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "12.2. Usuários não cadastrados. As respostas ao Questionário e o Resultado de Afinidade gerados por Usuário não cadastrado, nos termos do item 6.2, não são armazenados no Banco de Dados do Politicando, sendo descartados automaticamente ao final da sessão. Por essa razão, não há conta, cadastro ou dado armazenado a ser cancelado ou excluído em relação a esses Usuários, não sendo aplicável a esta hipótese o direito de exclusão previsto nesta cláusula, por inexistir registro correspondente.",
        },
        {
          tipo: "paragrafo",
          texto:
            "12.3. O cancelamento da conta implica a exclusão do Cadastro do Usuário e do Dado de Opinião Política associado, ressalvados os dados cuja manutenção seja exigida por lei, conforme item 11.2.",
        },
        {
          tipo: "paragrafo",
          texto:
            "12.4. O Politicando poderá, a seu critério, cancelar o cadastro do Usuário, rescindir o presente Termo ou impedir o acesso à Plataforma, a qualquer tempo, definitiva ou temporariamente, nos seguintes casos, mas não se limitando a:",
        },
        {
          tipo: "lista",
          itens: [
            "Descumprimento de quaisquer disposições deste Termo;",
            "Constatação de idade inferior à mínima exigida na Cláusula 3;",
            "Constatação de fraude, tentativa de fraude ou de manipulação do Algoritmo de Afinidade;",
            "Novo cadastro realizado por Usuário que teve seu cadastro cancelado anteriormente.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "12.5. O Politicando é oferecido, na presente data, de forma gratuita ao Usuário. Caso venha a ser instituído, no futuro, qualquer plano pago ou funcionalidade de assinatura, o Politicando publicará Termo específico com as condições de cobrança, cancelamento e reembolso aplicáveis, o qual deverá ser aceito separadamente pelo Usuário.",
        },
      ],
    },
    {
      id: "cessao",
      titulo: "13. CESSÃO DO CONTRATO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "13.1. É vedado ao Usuário ceder, transferir ou sub-rogar, no todo ou em parte, os direitos e obrigações decorrentes deste Termo, em razão da natureza pessoal e intransferível de sua conta de acesso, conforme já disposto na Cláusula 9.3.",
        },
      ],
    },
    {
      id: "alteracao",
      titulo: "14. ALTERAÇÃO DO TERMO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "14.1. O Politicando se reserva o direito de alterar este Termo e as suas políticas relativas ao serviço a qualquer tempo, especialmente para adequação a novas exigências da Legislação Eleitoral em períodos de eleição.",
        },
        {
          tipo: "paragrafo",
          texto:
            "14.2. Alterações substanciais deste Termo serão comunicadas por meio de aviso destacado na Plataforma, canal aplicável a todos os Usuários, cadastrados ou não. Adicionalmente, aos Usuários cadastrados, tais alterações também serão comunicadas por e-mail, para o endereço informado no Cadastro.",
        },
        {
          tipo: "paragrafo",
          texto:
            "14.3. É de responsabilidade do Usuário acessar o presente Termo e demais políticas frequentemente para se certificar das novas disposições, sendo que a continuidade do uso da Plataforma após a divulgação das alterações corresponde à aceitação das novas condições, nos termos da abertura deste Termo.",
        },
      ],
    },
    {
      id: "suporte",
      titulo: "15. SUPORTE TÉCNICO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "15.1. O Politicando disponibiliza ao Usuário um canal de contato para esclarecer dúvidas, reportar falhas no uso do site e comunicar eventuais imprecisões na classificação de posições de Candidatos/Partidos.",
        },
        {
          tipo: "paragrafo",
          texto:
            "15.2. O Usuário pode enviar e-mail para “politicandoapp26@gmail.com”.",
        },
      ],
    },
    {
      id: "disposicoes-gerais",
      titulo: "16. DISPOSIÇÕES GERAIS",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "16.1. Este Termo será regido e interpretado de acordo com as leis do Brasil, incluindo a Legislação Eleitoral vigente à época da utilização da Plataforma.",
        },
        {
          tipo: "paragrafo",
          texto:
            "16.2. Este Termo é redigido em português, idioma que prevalecerá para todos os fins de interpretação, execução e eventual tradução para outros idiomas, ainda que disponibilizada versão traduzida para fins meramente informativos ou de conveniência do Usuário.",
        },
        {
          tipo: "paragrafo",
          texto:
            '16.3. Qualquer notificação, aviso ou comunicação individual deverá ser realizada por escrito e entregue por e-mail para o endereço de cadastro do Usuário e para o endereço de e-mail "politicandoapp26@gmail.com" do Politicando, aplicando-se exclusivamente às relações com o Usuário cadastrado. Em relação ao Usuário não cadastrado, para o qual não há endereço de contato disponível, as notificações, avisos e comunicações de caráter geral serão válidas e eficazes quando realizadas por meio de publicação destacada na própria Plataforma, nos termos do item 14.2.',
        },
        {
          tipo: "paragrafo",
          texto:
            "16.4. Os casos omissos serão resolvidos de comum acordo, mediante comunicação entre o Politicando e o Usuário, observado, quanto à forma, o disposto no item 16.3.",
        },
        {
          tipo: "paragrafo",
          texto:
            "16.5. A demora ou omissão no exercício de direitos que são assegurados por lei ou por este Termo não constitui renúncia ao exercício desses direitos.",
        },
        {
          tipo: "paragrafo",
          texto:
            "16.6. A nulidade ou invalidade de qualquer das cláusulas do Termo não prejudicará a validade e eficácia das demais, que permanecerão em vigor, devendo ser refeita a cláusula anulada ou invalidada, como ato de boa-fé entre os subscritores do Termo.",
        },
      ],
    },
    {
      id: "foro",
      titulo: "17. FORO",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "17.1. Não sendo possível a solução amigável, qualquer disputa ou controvérsia será submetida ao Poder Judiciário, foro de Belo Horizonte/MG, com renúncia a qualquer outro, por mais privilegiado que seja, ressalvada a competência da Justiça Eleitoral para matérias de sua alçada e o foro do domicílio do consumidor, quando aplicável a legislação consumerista.",
        },
      ],
    },
  ],
};
