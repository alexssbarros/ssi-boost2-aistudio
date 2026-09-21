import { PilarKey, PilarDetail, PlanCycle } from '../types';

export const PILARES_INFO: Record<PilarKey, PilarDetail> = {
  pilar1: {
    id: 'pilar1',
    nome: 'Estabelecer sua marca profissional',
    short: 'Marca Profissional',
    cor: '#2563eb',
    descricao: 'Complete seu perfil tendo o decisor em mente e publique conteúdos de valor no seu nicho.'
  },
  pilar2: {
    id: 'pilar2',
    nome: 'Localizar as pessoas certas',
    short: 'Pessoas Certas',
    cor: '#059669',
    descricao: 'Identifique os decisores do seu perfil de cliente ideal usando buscas qualificadas e filtros precisos.'
  },
  pilar3: {
    id: 'pilar3',
    nome: 'Interagir oferecendo insights',
    short: 'Oferecer Insights',
    cor: '#d97706',
    descricao: 'Descubra e compartilhe atualizações que geram conversas antes de qualquer tentativa de venda.'
  },
  pilar4: {
    id: 'pilar4',
    nome: 'Criar relacionamentos',
    short: 'Criar Relacionamentos',
    cor: '#7c3aed',
    descricao: 'Fortaleça sua rede estabelecendo confiança contínua com tomadores de decisão de forma personalizada.'
  }
};

export const CICLOS_PLANO: PlanCycle[] = [
  {
    ciclo: 1,
    nome: 'Fundação',
    dias: 'Dias 1 a 7',
    foco: 'Perfil, proposta de valor, prova social e clareza de posicionamento para decisores.',
    tarefas: [
      {
        id: 'd1',
        dia: 1,
        titulo: 'Reestruturação do Headline Comercial',
        tempo: 15,
        pilar: 'Marca Profissional',
        desc: 'Substitua cargos genéricos por uma fórmula focada em dor e público: "Ajudo [Público] a alcançar [Resultado]". Remova termos como "Buscando recolocação" ou siglas corporativas internas.',
        motivo: 'O headline é o primeiro dado que o decisor lê em convites, comentários e pesquisas no Sales Navigator.'
      },
      {
        id: 'd2',
        dia: 2,
        titulo: 'Narrativa da Seção "Sobre" Focada no Cliente',
        tempo: 15,
        pilar: 'Marca Profissional',
        desc: 'Escreva um texto estruturado em 4 blocos: Gancho de dor do mercado, Como você resolve, Resultados gerados e Chamada para Conversa (CTA sem atrito).',
        motivo: 'Transforma visitantes passivos em leads qualificados que compreendem sua proposta de valor em menos de 10 segundos.'
      },
      {
        id: 'd3',
        dia: 3,
        titulo: 'Otimização Visual de Banner e Foto de Contraste',
        tempo: 10,
        pilar: 'Marca Profissional',
        desc: 'Substitua a capa padrão por um banner que destaque a proposta comercial e garanta que sua foto de perfil transmita autoridade e nitidez com fundo limpo.',
        motivo: 'Perfis visualmente profissionais recebem até 14 vezes mais visualizações e geram maior retenção de atenção.'
      },
      {
        id: 'd4',
        dia: 4,
        titulo: 'Configuração da Seção "Em Destaque" (Featured)',
        tempo: 15,
        pilar: 'Marca Profissional',
        desc: 'Fixe de 2 a 3 itens estratégicos: um material educativo (PDF ou infográfico), um case de sucesso de cliente ou um post de alta repercussão.',
        motivo: 'Serve como vitrine imediata de autoridade e prova social antes mesmo do decisor rolar a página.'
      },
      {
        id: 'd5',
        dia: 5,
        titulo: 'Experiência Profissional Orientada a Entregas e Métricas',
        tempo: 15,
        pilar: 'Marca Profissional',
        desc: 'Revise suas posições atuais e anteriores, inserindo métricas, percentuais e resultados de impacto em vez de apenas listar responsabilidades operacionais.',
        motivo: 'Decisores C-level avaliam seu histórico em busca de solidez e capacidade comprovada de entrega.'
      },
      {
        id: 'd6',
        dia: 6,
        titulo: 'Mapeamento de Habilidades e Solicitação de 2 Recomendações',
        tempo: 15,
        pilar: 'Marca Profissional',
        desc: 'Reorganize suas competências prioritárias alinhadas ao seu nicho e envie uma mensagem personalizada para 2 ex-clientes ou parceiros solicitando um breve depoimento.',
        motivo: 'Depoimentos de terceiros ativam o gatilho da aprovação social e elevam a pontuação do algoritmo de relevância.'
      },
      {
        id: 'd7',
        dia: 7,
        titulo: 'Auditoria de Visibilidade, URL Customizada e Modo Criador',
        tempo: 10,
        pilar: 'Marca Profissional',
        desc: 'Personalize a URL do seu perfil (remover números aleatórios), revise se o perfil está com visibilidade 100% pública e ative o Modo Criador com suas hashtags centrais.',
        motivo: 'Garante indexação máxima nos motores de busca do LinkedIn e no Google, além de posicionar seus temas de autoridade.'
      }
    ]
  },
  {
    ciclo: 2,
    nome: 'Descoberta',
    dias: 'Dias 8 a 14',
    foco: 'ICP, pesquisa e identificação precisa das pessoas certas no Sales Navigator.',
    tarefas: [
      {
        id: 'd8',
        dia: 8,
        titulo: 'Definição Cirúrgica do Perfil de Cliente Ideal (ICP)',
        tempo: 15,
        pilar: 'Pessoas Certas',
        desc: 'Documente os critérios essenciais: porte da empresa, faturamento estimado, setor econômico exato, geografia e títulos dos tomadores de decisão.',
        motivo: 'Sem critérios claros, buscas no Sales Navigator trazem volume sem qualidade e desperdiçam limite de conexões.'
      },
      {
        id: 'd9',
        dia: 9,
        titulo: 'Mapeamento de 20 Contas-Chave no Sales Navigator',
        tempo: 15,
        pilar: 'Pessoas Certas',
        desc: 'Utilize os filtros de empresa (setor, faturamento, crescimento de pessoal) e salve uma lista com 20 contas prioritárias para o seu pipeline.',
        motivo: 'Trabalhar com contas salvas permite acompanhar alertas de crescimento, contratações e novidades estratégicas da empresa.'
      },
      {
        id: 'd10',
        dia: 10,
        titulo: 'Segmentação de Listas de Leads por Grau de Decisão',
        tempo: 15,
        pilar: 'Pessoas Certas',
        desc: 'Crie listas de leads separando "Decisores Finais (Econômicos)" de "Influenciadores / Usuários Técnicos" dentro das contas salvas.',
        motivo: 'A comunicação com quem assina o cheque precisa ser diferente da abordagem com quem sofre a dor operacional.'
      },
      {
        id: 'd11',
        dia: 11,
        titulo: 'Mapeamento Multicanal de Múltiplos Contatos por Conta',
        tempo: 15,
        pilar: 'Pessoas Certas',
        desc: 'Garanta que cada conta prioritária tenha pelo menos 3 perfis mapeados (ex: Diretor de Operações, Gerente de TI e Coordenador de Projetos).',
        motivo: 'Comitês de compras corporativos modernos envolvem de 3 a 7 pessoas; apostar em um único contato fragiliza a venda.'
      },
      {
        id: 'd12',
        dia: 12,
        titulo: 'Auditoria de "Quem Visualizou seu Perfil"',
        tempo: 10,
        pilar: 'Pessoas Certas',
        desc: 'Acesse o relatório de visualizações do perfil e filtre por profissionais que correspondem ao seu ICP para incluí-los na esteira de abordagem.',
        motivo: 'Visitantes do seu perfil já demonstraram interesse prévio, tendo probabilidade de aceitação de convite 2x maior.'
      },
      {
        id: 'd13',
        dia: 13,
        titulo: 'Mapeamento de Conexões em Comum de 2º Grau',
        tempo: 15,
        pilar: 'Pessoas Certas',
        desc: 'Filtre conexões de 2º grau nas contas-alvo e identifique se contatos próximos em comum podem fazer uma introdução calorosa.',
        motivo: 'Introduções quentes encurtam o ciclo de vendas e eliminam a desconfiança inicial inerente à prospecção fria.'
      },
      {
        id: 'd14',
        dia: 14,
        titulo: 'Filtro de Decisores Ativos (Que publicaram nos últimos 30 dias)',
        tempo: 15,
        pilar: 'Pessoas Certas',
        desc: 'Aplique o filtro de atividade recente do Sales Navigator para priorizar prospectos que interagem e usam a plataforma com frequência.',
        motivo: 'Prospectar usuários inativos no LinkedIn atrasa respostas; concentre energia em quem entra na plataforma semanalmente.'
      }
    ]
  },
  {
    ciclo: 3,
    nome: 'Autoridade',
    dias: 'Dias 15 a 21',
    foco: 'Conteúdo, comentários consultivos e compartilhamento de conhecimento relevante.',
    tarefas: [
      {
        id: 'd15',
        dia: 15,
        titulo: 'Limpeza de Convites Pendentes Antigos (>30 dias)',
        tempo: 10,
        pilar: 'Pessoas Certas',
        desc: 'Acesse "Minha Rede > Gerenciar > Enviados" e retire convites enviados há mais de um mês que nunca foram aceitos.',
        motivo: 'Muitos convites sem resposta sinalizam baixa relevância ao algoritmo, o que diminui o limite semanal concedido à sua conta.'
      },
      {
        id: 'd16',
        dia: 16,
        titulo: 'Mapeamento de 5 Líderes e Criadores do Seu Nicho',
        tempo: 10,
        pilar: 'Oferecer Insights',
        desc: 'Localize 5 perfis influentes que seu público-alvo segue ativamente. Ative o sino de notificações nos perfis deles.',
        motivo: 'Estar presente com velocidade nas discussões mais relevantes do seu setor gera atração orgânica para o seu próprio perfil.'
      },
      {
        id: 'd17',
        dia: 17,
        titulo: 'Rotina de 3 Comentários Consultivos em Posts de Decisores',
        tempo: 15,
        pilar: 'Oferecer Insights',
        desc: 'Deixe comentários estruturados com reflexões práticas ou dados de mercado em publicações recentes de executivos-alvo.',
        motivo: 'Gera reconhecimento e familiaridade prévia com o decisor sem o tom invasivo de um pitch de vendas não solicitado.'
      },
      {
        id: 'd18',
        dia: 18,
        titulo: 'Publicação de Post Educativo: "Erro Comum vs. Solução"',
        tempo: 15,
        pilar: 'Oferecer Insights',
        desc: 'Escreva e publique um post descrevendo um erro frequente que empresas do seu segmento cometem e o método correto para evitá-lo.',
        motivo: 'Demonstra expertise prática e posiciona você como conselheiro confiável, pontuando fortemente no pilar de insights.'
      },
      {
        id: 'd19',
        dia: 19,
        titulo: 'Curadoria Setorial com Opinião Crítica Própria',
        tempo: 10,
        pilar: 'Oferecer Insights',
        desc: 'Compartilhe uma notícia ou relatório de mercado relevante adicionando 3 lições aprendidas e como isso impacta seu público.',
        motivo: 'Mostra que você está atento às tendências da indústria e sabe traduzir dados brutos em decisões operacionais.'
      },
      {
        id: 'd20',
        dia: 20,
        titulo: 'Interação em Grupos e Debates Técnicos do Setor',
        tempo: 15,
        pilar: 'Oferecer Insights',
        desc: 'Participe de discussões em postagens em alta respondendo dúvidas de outros profissionais de maneira generosa e aprofundada.',
        motivo: 'Aumenta a visualização da sua marca por profissionais de 2º e 3º graus altamente alinhados ao seu ecossistema.'
      },
      {
        id: 'd21',
        dia: 21,
        titulo: 'Publicação de Mini-Estudo de Caso / Lição de Projeto',
        tempo: 15,
        pilar: 'Oferecer Insights',
        desc: 'Publique um relato anônimo do tipo "Antes e Depois" de um desafio real que você ajudou a contornar, destacando o aprendizado.',
        motivo: 'Casos reais ativam interesse imediato de compradores que vivenciam os mesmos desafios no momento atual.'
      }
    ]
  },
  {
    ciclo: 4,
    nome: 'Relacionamentos',
    dias: 'Dias 22 a 30',
    foco: 'Conexões, conversas, acompanhamento e fechamento de ciclo com nova medição.',
    tarefas: [
      {
        id: 'd22',
        dia: 22,
        titulo: 'Análise de Reações nos Seus Posts e Mapeamento de Leads',
        tempo: 10,
        pilar: 'Oferecer Insights',
        desc: 'Revise quem curtiu ou comentou suas postagens da semana e salve aqueles que pertencem ao seu perfil de cliente ideal.',
        motivo: 'Quem interagiu com seu conteúdo já passou da fase fria e está muito mais receptivo para iniciar uma conversa direta.'
      },
      {
        id: 'd23',
        dia: 23,
        titulo: 'Disparo de 5 Convites com Nota Hiper-Personalizada',
        tempo: 15,
        pilar: 'Criar Relacionamentos',
        desc: 'Envie 5 convites mencionando um ponto específico do perfil, empresa ou publicação do decisor. Não mencione seu produto ou serviço.',
        motivo: 'A personalização genuína eleva as taxas de aceitação de 20% para mais de 60% e protege a reputação do seu domínio.'
      },
      {
        id: 'd24',
        dia: 24,
        titulo: 'Disparo de mais 5 Convites para Decisores do Pipeline',
        tempo: 15,
        pilar: 'Criar Relacionamentos',
        desc: 'Envie mais uma rodada de 5 convites segmentados para manter o fluxo contínuo de aquisição de novos contatos qualificados.',
        motivo: 'Consistência semanal de convites qualificados é a métrica principal que alimenta o crescimento do pilar de relacionamentos.'
      },
      {
        id: 'd25',
        dia: 25,
        titulo: 'Primeira Mensagem de Boas-Vindas com Entrega de Valor Puro',
        tempo: 15,
        pilar: 'Criar Relacionamentos',
        desc: 'Aos novos contatos que aceitaram sua conexão, envie um agradecimento cordial e compartilhe um link útil ou insight sem pedir reunião.',
        motivo: 'Quebra o estereótipo do vendedor imediatista e estabelece uma fundação de confiança profissional.'
      },
      {
        id: 'd26',
        dia: 26,
        titulo: 'Engajamento Ativo nos Feeds das Novas Conexões',
        tempo: 10,
        pilar: 'Criar Relacionamentos',
        desc: 'Visite a aba de atividades das novas conexões aceitas e curta ou comente em ao menos 3 publicações delas.',
        motivo: 'Mantém seu nome e foto no topo da mente do lead nos primeiros dias após o aceite do convite.'
      },
      {
        id: 'd27',
        dia: 27,
        titulo: 'Mensagem de Follow-up Consultivo com Pergunta Aberta',
        tempo: 15,
        pilar: 'Criar Relacionamentos',
        desc: 'Retome contato com quem recebeu o insight do Dia 25, fazendo uma pergunta contextualizada sobre como lidam com aquela questão internamente.',
        motivo: 'Perguntas abertas e consultivas convidam ao diálogo, abrindo espaço para identificar dores reais do negócio.'
      },
      {
        id: 'd28',
        dia: 28,
        titulo: 'Transição Natural para Convite de Café Virtual / Reunião',
        tempo: 15,
        pilar: 'Criar Relacionamentos',
        desc: 'Para os contatos que responderam engajados ao follow-up, proponha uma conversa rápida de 15 minutos para troca de experiências.',
        motivo: 'A venda acontece na conversa humanizada; propor o bate-papo no momento certo garante reuniões qualificadas na agenda.'
      },
      {
        id: 'd29',
        dia: 29,
        titulo: 'Organização de Tags e Pipeline Social no Sales Navigator',
        tempo: 10,
        pilar: 'Criar Relacionamentos',
        desc: 'Atualize o status dos leads no Sales Navigator (tags de qualificação: Em Contato, Reunião Agendada, Nutrição Futura).',
        motivo: 'Manter a disciplina de CRM social evita esquecimento de follow-ups e perda de oportunidades quentes.'
      },
      {
        id: 'd30',
        dia: 30,
        titulo: 'Fechamento de Ciclo: Nova Captura do SSI e Comparativo',
        tempo: 10,
        pilar: 'Marca Profissional',
        desc: 'Acesse linkedin.com/sales/ssi, capture sua nova pontuação e faça o upload na plataforma para comparar a evolução dos 4 pilares.',
        motivo: 'Valida matematicamente os resultados do esforço de 30 dias e recalibra as metas para os próximos ciclos.'
      }
    ]
  }
];
