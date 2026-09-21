import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ArrowLeft,
  Mail, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface FaqPageProps {
  onBack: () => void;
  onStartAnalysis: () => void;
  onOpenCheckout?: () => void;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string | React.ReactNode;
}

export function FaqPage({ onBack, onStartAnalysis, onOpenCheckout }: FaqPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true
  });

  const faqs: FaqItem[] = useMemo(() => [
    {
      id: 1,
      question: "1. O que é o SSI Boost?",
      answer: "O SSI Boost é uma plataforma de diagnóstico e orientação para profissionais que desejam melhorar sua presença comercial no LinkedIn. A ferramenta analisa os principais fatores relacionados ao seu desempenho e transforma essas informações em recomendações práticas para fortalecer seu perfil, sua autoridade, sua rede de contatos e sua capacidade de gerar oportunidades."
    },
    {
      id: 2,
      question: "2. O que é o SSI?",
      answer: "SSI significa Social Selling Index. É um indicador criado pelo LinkedIn para avaliar como o profissional utiliza a plataforma para construir sua marca, encontrar as pessoas certas, compartilhar conteúdo relevante e desenvolver relacionamentos profissionais.\n\nO SSI Boost utiliza esses pilares como ponto de partida para mostrar o que pode ser melhorado e quais ações devem ser priorizadas."
    },
    {
      id: 3,
      question: "3. O SSI Boost é uma ferramenta oficial do LinkedIn?",
      answer: "Não. O SSI Boost é uma plataforma independente e não possui vínculo, parceria ou representação oficial do LinkedIn ou do Sales Navigator.\n\nNossa proposta é ajudar você a interpretar seus indicadores e transformá-los em um plano de melhoria mais claro e prático."
    },
    {
      id: 4,
      question: "4. Para quem o SSI Boost é indicado?",
      answer: (
        <div className="space-y-2">
          <p>O SSI Boost é especialmente indicado para:</p>
          <ul className="space-y-1.5 pl-2">
            {[
              "Profissionais de vendas e desenvolvimento de negócios;",
              "Consultores e prestadores de serviços;",
              "Empreendedores e fundadores;",
              "Executivos e líderes;",
              "Recrutadores;",
              "Profissionais em busca de recolocação;",
              "Criadores de conteúdo e especialistas;",
              "Pessoas que utilizam o LinkedIn para gerar autoridade, relacionamentos e oportunidades."
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 5,
      question: "5. Como funciona o diagnóstico?",
      answer: "Você fornece as informações solicitadas sobre seu perfil e seu desempenho no LinkedIn. Com base nesses dados, o SSI Boost identifica pontos fortes, oportunidades de melhoria e prioridades de ação.\n\nAo final, você recebe um diagnóstico organizado para entender o que está limitando seus resultados e o que fazer para evoluir."
    },
    {
      id: 6,
      question: "6. O que está incluído no diagnóstico gratuito?",
      answer: "O diagnóstico gratuito oferece uma visão resumida da sua situação atual, destacando os principais pontos fortes e as áreas que mais precisam de atenção.\n\nEle é ideal para conhecer a metodologia do SSI Boost e identificar rapidamente onde podem estar suas maiores oportunidades de melhoria."
    },
    {
      id: 7,
      question: "7. O que recebo no diagnóstico completo?",
      answer: (
        <div className="space-y-2">
          <p>No diagnóstico completo, você recebe uma análise mais aprofundada, com:</p>
          <ul className="space-y-1.5 pl-2">
            {[
              "Avaliação detalhada dos principais pilares;",
              "Identificação dos pontos que prejudicam seu desempenho;",
              "Recomendações personalizadas;",
              "Priorização das ações mais importantes;",
              "Orientações práticas para melhorar o perfil e a atuação no LinkedIn;",
              "Plano de evolução para acompanhar seu progresso."
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="pt-2 text-slate-700 font-medium">
            O objetivo é fazer com que você saiba exatamente onde está, o que precisa melhorar e qual deve ser seu próximo passo.
          </p>
        </div>
      )
    },
    {
      id: 8,
      question: "8. Preciso ter o Sales Navigator?",
      answer: "Você pode utilizar o SSI Boost mesmo que ainda não assine o Sales Navigator. Entretanto, alguns indicadores e informações disponibilizados pelo LinkedIn podem depender do tipo de conta ou das funcionalidades disponíveis para cada usuário.\n\nCaso alguma informação seja necessária para o diagnóstico, o SSI Boost orientará onde encontrá-la ou como prosseguir."
    },
    {
      id: 9,
      question: "9. O SSI Boost faz alterações automaticamente no meu perfil?",
      answer: "Não. O SSI Boost analisa suas informações e apresenta recomendações, mas você mantém o controle sobre todas as alterações realizadas no seu perfil.\n\nA ferramenta pode sugerir melhorias para diferentes partes do perfil e para sua estratégia de atuação, mas nenhuma mudança será publicada sem a sua decisão."
    },
    {
      id: 10,
      question: "10. Preciso fornecer minha senha do LinkedIn?",
      answer: "Não. O SSI Boost nunca solicita a senha da sua conta do LinkedIn.\n\nDesconfie de qualquer serviço ou pessoa que peça sua senha diretamente. As informações necessárias para o diagnóstico devem ser fornecidas somente pelos meios disponibilizados dentro da plataforma."
    },
    {
      id: 11,
      question: "11. Quanto tempo leva para receber o diagnóstico?",
      answer: "O diagnóstico é gerado em poucos minutos após o preenchimento das informações necessárias. O tempo pode variar de acordo com o nível de detalhamento da análise e com os dados fornecidos.\n\nQuanto mais completas e corretas forem as informações, mais útil e personalizado será o resultado."
    },
    {
      id: 12,
      question: "12. Em quanto tempo meu SSI pode melhorar?",
      answer: "Não existe um prazo único, pois a evolução depende da situação inicial do perfil, da frequência de uso do LinkedIn e da aplicação das recomendações.\n\nAlgumas melhorias podem ser percebidas rapidamente, enquanto outras dependem da construção contínua de autoridade, conteúdo, conexões relevantes e relacionamentos profissionais."
    },
    {
      id: 13,
      question: "13. O SSI Boost garante aumento do meu SSI ou geração de vendas?",
      answer: "Não. O SSI Boost fornece diagnóstico, direcionamento e recomendações baseadas nas informações analisadas, mas os resultados dependem da execução das ações e de fatores externos.\n\nA ferramenta não garante uma pontuação específica, número de vendas, entrevistas, conexões ou oportunidades comerciais. Nossa função é aumentar sua clareza e ajudar você a tomar decisões melhores."
    },
    {
      id: 14,
      question: "14. Quanto custa o plano completo?",
      answer: (
        <div className="space-y-3">
          <p>O diagnóstico completo está disponível em duas opções:</p>
          <ul className="space-y-1.5 pl-2">
            <li className="flex items-center gap-2 text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
              <span><strong>Plano mensal:</strong> R$ 39 por mês;</span>
            </li>
            <li className="flex items-center gap-2 text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
              <span><strong>Plano anual:</strong> R$ 312 por ano.</span>
            </li>
          </ul>
          <p className="text-slate-600 bg-blue-50 border border-blue-100 p-2.5 rounded-lg text-sm">
            No plano anual, o valor equivale a <strong>R$ 26 por mês</strong>, proporcionando uma <strong>economia de R$ 156</strong> em comparação com 12 pagamentos mensais.
          </p>
        </div>
      )
    },
    {
      id: 15,
      question: "15. Posso cancelar minha assinatura?",
      answer: "Sim. Você pode cancelar a renovação da assinatura quando quiser. Após o cancelamento, o acesso permanece disponível até o final do período já contratado.\n\nO cancelamento impede novas cobranças, mas não apaga imediatamente os diagnósticos e dados vinculados à conta, salvo quando a exclusão for solicitada conforme as opções disponibilizadas pela plataforma."
    },
    {
      id: 16,
      question: "16. Meus dados estão seguros?",
      answer: "O SSI Boost utiliza as informações fornecidas somente para disponibilizar o diagnóstico, personalizar as recomendações e operar os recursos contratados.\n\nSeus dados não devem ser vendidos a terceiros. Para conhecer todos os detalhes sobre coleta, tratamento, armazenamento e exclusão das informações, consulte a Política de Privacidade da plataforma."
    },
    {
      id: 17,
      question: "17. Posso utilizar o SSI Boost para analisar clientes ou equipes?",
      answer: "O plano individual foi desenvolvido para o acompanhamento do próprio usuário. Profissionais que atendem vários clientes, agências, consultorias e equipes comerciais poderão utilizar um plano específico, com limites e recursos adequados para múltiplos perfis.\n\nEntre em contato para conhecer as opções disponíveis ou registrar interesse no plano para agências e empresas."
    },
    {
      id: 18,
      question: "18. O SSI Boost substitui uma consultoria de LinkedIn?",
      answer: "O SSI Boost oferece uma análise estruturada, rápida e acessível, além de recomendações práticas para orientar sua evolução.\n\nEm situações que exigem acompanhamento individual, execução completa da estratégia, produção recorrente de conteúdo ou treinamento de equipes, o apoio de um consultor especializado também pode ser recomendado."
    },
    {
      id: 19,
      question: "19. Como começo?",
      answer: "Você pode começar gratuitamente, sem precisar contratar um plano. Basta iniciar o diagnóstico resumido e fornecer as informações solicitadas.\n\nDepois de visualizar o resultado inicial, você poderá escolher o diagnóstico completo para receber uma análise aprofundada e um plano personalizado de evolução."
    }
  ], []);

  const toggleItem = (id: number) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    faqs.forEach(f => { all[f.id] = true; });
    setOpenItems(all);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(f => {
      const qMatch = f.question.toLowerCase().includes(q);
      const aMatch = typeof f.answer === 'string' 
        ? f.answer.toLowerCase().includes(q)
        : false;
      return qMatch || aMatch;
    });
  }, [faqs, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb e botão de voltar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition group py-1.5 px-3 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar ao Início
          </button>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Central de Ajuda • 19 respostas oficiais
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center space-y-3.5 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Tire Suas Dúvidas
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perguntas frequentes
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tudo o que você precisa saber sobre o SSI Boost, a metodologia do Social Selling Index, segurança de dados e funcionamento dos diagnósticos.
          </p>
        </div>

        {/* Barra de Busca e Filtro */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar pergunta ou palavra-chave (ex: Sales Navigator, senha, preço, cancelamento)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-semibold">
            <button
              onClick={expandAll}
              className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              Expandir todas
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              Recolher todas
            </button>
          </div>
        </div>

        {/* Lista de Perguntas (Acordeon) */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
              <p className="text-slate-600 font-medium">
                Nenhuma resposta encontrada para "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Limpar busca e ver todas as 19 perguntas
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition duration-150 hover:border-slate-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-500 flex-shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Card Final de Contato e CTA com o texto fornecido */}
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 text-center sm:text-left relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ainda tem alguma dúvida?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Entre em contato com nossa equipe. Teremos prazer em ajudar você a entender como o SSI Boost pode contribuir para seus objetivos profissionais.
            </p>
          </div>

          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center gap-4 justify-start">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Fazer diagnóstico gratuito</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="mailto:contato@ssiboost.com.br?subject=Dúvida%20sobre%20o%20SSI%20Boost"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Falar com nossa equipe</span>
            </a>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Diagnóstico 100% seguro sem senha
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Sem necessidade do Sales Navigator pago
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
