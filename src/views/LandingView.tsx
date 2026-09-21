import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  ChevronDown, 
  BarChart3, 
  Target, 
  Compass, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { PILARES_INFO } from '../data/planData';
import { FAQ_ITEMS } from '../data/faqData';
import { SubscriptionPlan } from '../types';

interface LandingViewProps {
  onStart: () => void;
  onSelectPlan: (plan: SubscriptionPlan) => void;
  onOpenFaq?: () => void;
}

export function LandingView({ onStart, onSelectPlan, onOpenFaq }: LandingViewProps) {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 pt-12 md:pt-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Metodologia Sales Navigator + IA Gemini 3
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Transforme seu SSI em um <span className="text-blue-600">plano de ação.</span>
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Envie a captura do seu Social Selling Index. A IA analisa os quatro pilares e cria um plano personalizado para fortalecer sua presença e suas ações comerciais no LinkedIn.
        </p>

        <p className="text-xs text-slate-500 font-medium">
          🔒 Sem senha, cookies, scraping ou automações na sua conta do LinkedIn.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            Analisar meu SSI gratuitamente <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Commercial Banner */}
        <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs">
          <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Assine o plano anual e economize R$ 156 — equivalente a quatro meses grátis.</span>
        </div>
      </section>

      {/* Como Funciona em 3 Passos (Conforme Seção 8.1 do PRD) */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Metodologia Prática</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Como o SSI Boost Funciona em 3 Passos</h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto">
            Sem acesso invasivo à sua conta. Você mantém controle soberano dos dados em cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Envie ou Digite sua Pontuação</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Capture a tela do seu SSI no Sales Navigator ou preencha as 5 notas. A IA extrai e valida os números.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Confirme e Defina seu Contexto</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Valide as pontuações e responda 7 perguntas curtas sobre seu segmento, público-alvo (ICP) e tempo diário.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Receba o Diagnóstico & Plano</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Descubra seu gargalo crítico e desbloqueie o cronograma de 30 dias com 8 geradores de copywriting com IA.
            </p>
          </div>
        </div>
      </section>

      {/* Os 4 Pilares do SSI */}
      <section id="secao-pilares" className="max-w-5xl mx-auto px-4 space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Como o SSI é Calculado no Sales Navigator</h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
            A pontuação oficial varia de 0 a 100, dividida em quatro pilares de 25 pontos cada, mensurando suas atividades em contas individuais e de equipe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(PILARES_INFO).map(([key, p]) => (
            <div key={key} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs" style={{ backgroundColor: p.cor }}>
                25
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{p.nome}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demonstração do Resultado com Dados Fictícios Claramente Identificados */}
      <section className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">
                Demonstração Ilustrativa • Dados Fictícios
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Exemplo de Diagnóstico Gerado pela Plataforma</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Score Simulado:</span>
              <span className="text-2xl font-black text-blue-400 block">58 / 100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">1. Marca</span>
              <strong className="text-blue-400 text-sm">18 / 25</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">2. Pessoas Certas</span>
              <strong className="text-emerald-400 text-sm">12 / 25</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">3. Insights (Gargalo)</span>
              <strong className="text-amber-400 text-sm">11 / 25</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">4. Relacionamentos</span>
              <strong className="text-purple-400 text-sm">17 / 25</strong>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
            "Sua pontuação de 11/25 no pilar de Insights atua como o principal freio de tração no LinkedIn. Decisores B2B raramente respondem a contatos frios sem prévia familiaridade de autoridade no feed..."
          </p>
        </div>
      </section>

      {/* Comparação Gratuito vs Completo */}
      <section id="secao-precos" className="max-w-4xl mx-auto px-4 space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Oferta & Comparativo de Acesso</h2>
          <p className="text-xs md:text-sm text-slate-600">
            Comece grátis para diagnosticar seus gargalos ou assine a plataforma para desbloquear a execução diária.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Gratuito */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Degustação</span>
              <h3 className="text-xl font-bold text-slate-900">Gratuito</h3>
              <div className="text-3xl font-black text-slate-900">R$ 0</div>
              <p className="text-xs text-slate-500">Diagnóstico resumido para identificar seu gargalo imediato.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Pontuação total e 4 pilares</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Classificação geral Leitura SSI</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Pilar mais forte e prioritário</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 3 recomendações iniciais</li>
                <li className="flex items-center gap-2 text-slate-400">✖ Plano de 30 dias bloqueado</li>
                <li className="flex items-center gap-2 text-slate-400">✖ 8 Geradores IA bloqueados</li>
                <li className="flex items-center gap-2 text-slate-400">✖ Simulador de Decisor bloqueado</li>
              </ul>
            </div>
            <button
              onClick={onStart}
              className="w-full py-2.5 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              Começar Gratuitamente
            </button>
          </div>

          {/* Card Mensal */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Flexível</span>
              <h3 className="text-xl font-bold text-slate-900">Mensal</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">R$ 39</span>
                <span className="text-xs text-slate-500">/ mês</span>
              </div>
              <p className="text-xs text-slate-500">Acesso completo com renovação mensal sem fidelidade.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Diagnóstico completo</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Plano de 30 dias em 4 ciclos</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Checklist de 10, 15 ou 30 min</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 8 Geradores de Copy com IA</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Simulador de Decisor B2B</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('monthly')}
              className="w-full py-2.5 rounded-xl border border-blue-600 font-bold text-xs text-blue-600 hover:bg-blue-50 transition"
            >
              Assinar Mensal (R$ 39)
            </button>
          </div>

          {/* Card Anual */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/50 to-white border-2 border-blue-600 shadow-xl flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[10px] tracking-wide uppercase">
              Melhor Custo-Benefício
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">Economia de R$ 156</span>
              <h3 className="text-xl font-bold text-slate-900">Anual (Pro)</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">R$ 26</span>
                <span className="text-xs text-slate-500">/ mês</span>
              </div>
              <p className="text-xs text-slate-600">R$ 312 cobrados anualmente (4 meses grátis vs. mensal).</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> <strong>Todos os recursos da plataforma</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Histórico contínuo de medições</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Acesso aos 8 geradores com IA</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Economia direta de 33%</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('annual')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition"
            >
              Assinar Anual com 33% OFF
            </button>
          </div>
        </div>

        {/* Banner de Garantia Incondicional de 7 Dias */}
        <div className="p-6 md:p-7 rounded-2xl bg-blue-600 border border-blue-500 text-white shadow-xl shadow-blue-600/25 flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0 text-emerald-300 backdrop-blur-xs shadow-inner">
            <ShieldCheck className="w-8 h-8 text-emerald-300" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
                Garantia Incondicional de 7 Dias • Risco Zero
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 border border-emerald-300 text-[10px] font-black uppercase tracking-wider shadow-xs">
                100% REEMBOLSÁVEL
              </span>
            </div>
            <p className="text-xs text-blue-50 leading-relaxed font-normal">
              Você tem 7 dias completos para testar a plataforma, gerar diagnósticos aprofundados, usar os assistentes de inteligência artificial e executar o plano diário. Se por qualquer motivo você decidir cancelar dentro desse período, devolvemos 100% do seu dinheiro de forma simples e rápida, sem burocracia nem perguntas.
            </p>
          </div>
        </div>

        {/* Seção FAQ - Perguntas Frequentes */}
        <div id="secao-faq" className="pt-6 space-y-6 scroll-mt-24">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> Dúvidas Comuns
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">Perguntas Frequentes (FAQ)</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Respostas diretas sobre o funcionamento, privacidade e metodologia do diagnóstico.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border border-slate-200 p-4 transition-all duration-200 open:shadow-sm open:border-blue-200"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-xs md:text-sm text-slate-800 group-hover:text-blue-600 transition">
                  <span className="pr-4">{faq.pergunta}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 group-open:text-blue-600 transition-transform duration-200 flex-shrink-0" />
                </summary>
                <p className="text-xs text-slate-600 mt-2.5 pt-2.5 border-t border-slate-100 leading-relaxed">
                  {faq.resposta}
                </p>
              </details>
            ))}
          </div>

          {/* Botão e link para o FAQ Completo */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/60 border border-blue-100/90 shadow-2xs">
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" /> Quer ver todas as respostas detalhadas?
              </h4>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Acesse nossa central completa com busca integrada, tópicos sobre segurança de dados, cancelamento e metodologia prática do SSI.
              </p>
            </div>
            <button
              type="button"
              id="btn-ver-faq-completo"
              onClick={onOpenFaq}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm shadow-sm transition transform hover:scale-[1.02] cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <span>Ver FAQ Completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
