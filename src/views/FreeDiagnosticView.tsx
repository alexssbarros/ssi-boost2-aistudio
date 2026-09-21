import React, { useMemo, useState } from 'react';
import { 
  Award, 
  AlertCircle, 
  Sparkles, 
  Lock, 
  Bot, 
  Zap, 
  Check, 
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  UploadCloud,
  FileCheck,
  ExternalLink,
  Copy,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { PILARES_INFO } from '../data/planData';
import { SSIScores, PilarAnalise, UserAccount, ContextoProfissional, SubscriptionPlan } from '../types';

interface FreeDiagnosticViewProps {
  scores: SSIScores;
  pilarAnalise: PilarAnalise;
  userAccount: UserAccount;
  contexto: ContextoProfissional;
  userPlan: SubscriptionPlan;
  onUpgrade: () => void;
  aiStrategicAnalysis: string;
  isGeneratingAnalysis: boolean;
  onGenerateStrategicAnalysis: () => void;
  uploadedScreenshotUrl?: string;
  savedReportUrl?: string;
  isSavingReport?: boolean;
  onSaveReportToStorage?: () => void;
}

export function FreeDiagnosticView({
  scores,
  pilarAnalise,
  userAccount,
  contexto,
  userPlan,
  onUpgrade,
  aiStrategicAnalysis,
  isGeneratingAnalysis,
  onGenerateStrategicAnalysis,
  uploadedScreenshotUrl,
  savedReportUrl,
  isSavingReport,
  onSaveReportToStorage
}: FreeDiagnosticViewProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const hasActiveSubscription = userPlan === 'monthly' || userPlan === 'annual';

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Síntese geral calibrada estritamente em 80-120 palavras (Conforme Seção 9.1 item 11 do PRD)
  const sinteseGeral = useMemo(() => {
    const total = scores.total;
    const forte = pilarAnalise.maisForte.short;
    const fraco = pilarAnalise.maisFraco.short;
    const cargo = contexto.cargo || 'Executivo de Vendas';
    const publico = contexto.publico || 'Decisores';
    const segmento = contexto.segmento || 'B2B';

    return `Sua pontuação geral do SSI é de ${total} pontos em 100, posicionando sua atuação comercial como ${pilarAnalise.nivel}. Seu pilar mais maduro é ${forte} (${pilarAnalise.maisForte.valor}/25), refletindo consistência nessa dimensão. Contudo, seu principal gargalo concentra-se em ${fraco} (${pilarAnalise.maisFraco.valor}/25), o que limita diretamente o retorno das suas atividades para ${cargo} em ${segmento}. Para engajar ${publico} e atingir seu objetivo de ${contexto.objetivo}, concentrar esforços corretivos nesse pilar prioritário nos próximos 30 dias gerará o maior impacto prático no seu pipeline.`;
  }, [scores, pilarAnalise, contexto]);

  const sintesePalavrasCount = useMemo(() => {
    return sinteseGeral.trim().split(/\s+/).filter(Boolean).length;
  }, [sinteseGeral]);

  // Análise analítica densa do gargalo prioritário calibrada para conter entre 100 e 120 palavras
  const textoAnaliseGargalo = useMemo(() => {
    const id = pilarAnalise.maisFraco.id;
    const valor = pilarAnalise.maisFraco.valor;
    const cargo = contexto.cargo || 'Executivo de Vendas B2B';
    const publico = contexto.publico || 'Diretores de Operações e CEOs';
    const segmento = contexto.segmento || 'Tecnologia e Serviços Corporativos';

    switch (id) {
      case 'pilar1':
        return `Sua pontuação de ${valor}/25 em Estabelecer sua Marca Profissional atua como o principal freio de tração no LinkedIn para ${cargo}. No segmento de ${segmento}, tomadores de decisão como ${publico} decidem em menos de sete segundos se respondem a um contato ou ignoram sua mensagem com base na autoridade percebida no seu perfil. Com essa métrica abaixo da média, mesmo que você localize as contas ideais e envie abordagens personalizadas, a conversão final é drasticamente reduzida por falta de prova social e narrativa comercial clara. Antes de acelerar o volume de prospecção, sua prioridade imediata deve ser transformar seu perfil em uma página de conversão voltada a resolver as dores reais do seu mercado.`;

      case 'pilar2':
        return `Sua pontuação de ${valor}/25 em Localizar as Pessoas Certas representa o maior gargalo operacional na sua rotina como ${cargo}. No ecossistema de ${segmento}, prospectar sem critérios cirúrgicos de segmentação no Sales Navigator dispersa sua energia comercial e consome seu limite semanal de convites com contatos de baixo potencial de compra. Para engajar ${publico}, é imperativo refinar seus filtros por porte de empresa, faturamento e nível hierárquico, garantindo que cada abordagem atinja decisores econômicos ou influenciadores diretos. Enquanto esse pilar estiver defasado, seus esforços de conteúdo e mensagens gerarão baixo retorno sobre o tempo investido. A prioridade imediata é estruturar listas qualificadas de contas prioritárias antes de expandir novas abordagens.`;

      case 'pilar4':
        return `Sua pontuação de ${valor}/25 em Criar Relacionamentos constitui o gargalo crítico que impede a conversão de oportunidades reais para ${cargo}. No mercado de ${segmento}, conectar-se com ${publico} é apenas o primeiro passo; o resultado comercial depende da capacidade de nutrir diálogos consultivos e construir pontes de confiança contínuas com múltiplos influenciadores do comitê de decisão. Pontuações baixas aqui revelam abordagens apressadas, falta de follow-up estruturado ou ausência de mensagens de boas-vindas centradas em valor. Para destravar este indicador, é essencial adotar cadências humanizadas de acompanhamento que demonstrem interesse genuíno pelo negócio do prospect, transformando contatos estáticos na rede em reuniões comerciais produtivas e relacionamentos duradouros de longo prazo.`;

      case 'pilar3':
      default:
        return `Sua pontuação de ${valor}/25 em Interagir Oferecendo Insights é o principal limitador do seu Social Selling como ${cargo}. No segmento de ${segmento}, tomadores de decisão como ${publico} são diariamente abordados por vendedores imediatistas. Quando sua presença não agrega dados relevantes, tendências do setor ou reflexões consultivas no feed e nos comentários, sua mensagem privada chega fria e gera rejeição instantânea. Esse pilar mede exatamente a sua capacidade de construir familiaridade prévia e confiança antes do pitch de vendas. Enquanto esse gargalo persistir, suas taxas de resposta permanecerão reduzidas. A rota de correção imediata exige interações estratégicas em publicações de líderes-chave para abrir portas naturalmente antes de solicitar reuniões.`;
    }
  }, [pilarAnalise, contexto]);

  const contagemGargaloPalavras = useMemo(() => {
    return textoAnaliseGargalo.trim().split(/\s+/).filter(Boolean).length;
  }, [textoAnaliseGargalo]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header com Resultado Geral */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Diagnóstico Resumido Gratuito
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Auditado via SSI Boost
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">
              Análise de Social Selling: {userAccount.nome || userAccount.email || 'Profissional'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Atuação: <strong>{contexto.cargo}</strong> • Foco: <strong>{contexto.objetivo}</strong> • Tempo: <strong>{contexto.tempoDiario} min/dia</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 block">Pontuação Total do SSI</span>
            <div className="text-4xl font-black text-slate-900">
              {scores.total} <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

        {/* Badge de Maturidade */}
        <div className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${pilarAnalise.badgeColor}`}>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>Classificação Geral (Leitura SSI Boost): <strong>{pilarAnalise.nivel}</strong></span>
          </div>
          <button onClick={onUpgrade} className="text-[11px] font-bold underline hover:text-slate-900">
            Ver plano completo de 30 dias
          </button>
        </div>

        {/* Barra de Armazenamento e Nuvem (Firebase Storage) */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/60 to-slate-50 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-900">Armazenamento em Nuvem</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Firebase Storage
                </span>
                {uploadedScreenshotUrl && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium inline-flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Captura Salva
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {savedReportUrl 
                  ? 'Relatório oficial sincronizado e disponível para download e compartilhamento.' 
                  : 'Grave este diagnóstico e capturas no seu Firebase Storage persistente.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {savedReportUrl ? (
              <div className="flex items-center gap-2 flex-wrap">
                <a 
                  href={savedReportUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <FileCheck className="w-3.5 h-3.5" /> Acessar Relatório <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={() => copyUrl(savedReportUrl)}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1 transition"
                  title="Copiar link permanente"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Copiado!' : 'Copiar Link'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={isSavingReport}
                onClick={onSaveReportToStorage}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-60 cursor-pointer"
              >
                {isSavingReport ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Enviando ao Storage...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    Salvar no Firebase Storage
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Síntese Geral (80-120 palavras) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" /> Síntese Geral do Diagnóstico
            </span>
            <span className="text-[10px] text-slate-400 font-mono font-medium">
              {sintesePalavrasCount} palavras
            </span>
          </div>
          <p className="leading-relaxed text-slate-600">
            {sinteseGeral}
          </p>
        </div>

        {/* Matriz dos 4 Pilares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {Object.entries(PILARES_INFO).map(([key, pilar]) => {
            const valor = scores[key as keyof SSIScores];
            const pct = Math.round((valor / 25) * 100);
            const isWorst = pilarAnalise.maisFraco.id === key;
            const isBest = pilarAnalise.maisForte.id === key;

            return (
              <div 
                key={key} 
                className={`p-4 rounded-xl border transition ${
                  isWorst 
                    ? 'border-rose-300 bg-rose-50/40 shadow-xs' 
                    : isBest 
                      ? 'border-emerald-300 bg-emerald-50/30' 
                      : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800">{pilar.nome}</span>
                  <span className="text-xs font-black" style={{ color: pilar.cor }}>{valor} / 25</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${pct}%`, backgroundColor: pilar.cor }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span>Aproveitamento: {pct}%</span>
                  {isWorst && <span className="font-bold text-rose-600">🚨 Pilar Prioritário (Gargalo)</span>}
                  {isBest && <span className="font-bold text-emerald-600">⭐ Pilar Mais Forte</span>}
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{pilar.descricao}</p>
              </div>
            );
          })}
        </div>

        {/* Alerta de Gargalo Prioritário (Análise com 100-120 palavras) */}
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-amber-200/70">
            <div className="font-bold flex items-center gap-1.5 text-amber-900 text-xs md:text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              Pilar Prioritário para Correção: {pilarAnalise.maisFraco.nome} ({pilarAnalise.maisFraco.valor}/25)
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-mono">
              {contagemGargaloPalavras} palavras
            </span>
          </div>
          <p className="leading-relaxed text-amber-950/90 font-normal">
            {textoAnaliseGargalo}
          </p>
        </div>

        {/* Auditoria IA On-Demand */}
        <div className={`p-4 rounded-xl border space-y-3 transition-colors ${
          hasActiveSubscription ? 'border-indigo-200 bg-indigo-50/40' : 'border-slate-200 bg-slate-50/70'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`text-xs font-bold flex items-center gap-1.5 ${hasActiveSubscription ? 'text-indigo-950' : 'text-slate-700'}`}>
                  <Sparkles className={`w-4 h-4 ${hasActiveSubscription ? 'text-indigo-600' : 'text-slate-400'}`} /> Auditoria Aprofundada com Gemini 3
                </h4>
                {!hasActiveSubscription && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 border border-slate-300 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Requer Assinatura Ativa
                  </span>
                )}
              </div>
              <p className={`text-[11px] mt-0.5 ${hasActiveSubscription ? 'text-indigo-700' : 'text-slate-500'}`}>
                {hasActiveSubscription 
                  ? `Gere um parecer analítico em tempo real de como o pilar "${pilarAnalise.maisFraco.short}" impacta sua prospecção com ${contexto.publico}.`
                  : `Disponível para assinantes dos planos Mensal ou Anual. Desbloqueia a auditoria executiva completa do seu pilar crítico com IA.`}
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={hasActiveSubscription ? onGenerateStrategicAnalysis : undefined}
                disabled={!hasActiveSubscription || isGeneratingAnalysis}
                title={!hasActiveSubscription ? "Recurso bloqueado: requer assinatura ativa (Mensal ou Anual)" : ""}
                className={`px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition whitespace-nowrap ${
                  hasActiveSubscription
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer disabled:opacity-50'
                    : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed select-none opacity-80'
                }`}
              >
                {!hasActiveSubscription ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Auditoria Bloqueada</span>
                  </>
                ) : (
                  <>
                    <Bot className={`w-3.5 h-3.5 ${isGeneratingAnalysis ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingAnalysis ? 'Analisando...' : aiStrategicAnalysis ? 'Regerar Auditoria IA' : 'Gerar Auditoria IA'}</span>
                  </>
                )}
              </button>
              {!hasActiveSubscription && (
                <button
                  onClick={onUpgrade}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5" /> Ativar Plano
                </button>
              )}
            </div>
          </div>

          {hasActiveSubscription && aiStrategicAnalysis && (
            <div className="mt-2 p-3.5 rounded-lg bg-white border border-indigo-200 text-xs text-slate-800 whitespace-pre-line leading-relaxed shadow-sm">
              {aiStrategicAnalysis}
            </div>
          )}
        </div>

        {/* 3 Recomendações Iniciais (40 a 50 palavras cada, conforme seção 9.1 item 15 do PRD) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              3 Recomendações Iniciais (Próximas 48 Horas):
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Ações Imediatas
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            {/* Recomendação 1 (~46 palavras) */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                1
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <strong className="text-slate-900 text-xs">Reestruturação Cirúrgica do Headline Comercial</strong>
                  <span className="text-[10px] text-slate-400 font-medium font-mono">46 palavras</span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  Elimine termos vagos da sua apresentação principal. Reformule seu título profissional destacando uma proposta clara voltada a {contexto.publico} em {contexto.segmento}, solucionando {contexto.dificuldade}. Essa clareza imediata assegura que os tomadores de decisão identifiquem valor prático antes mesmo de abrirem sua mensagem ou aceitarem o contato.
                </p>
              </div>
            </div>

            {/* Recomendação 2 (~47 palavras) */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                2
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <strong className="text-slate-900 text-xs">Comentários Consultivos em Contas Estratégicas</strong>
                  <span className="text-[10px] text-slate-400 font-medium font-mono">47 palavras</span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  Localize três publicações recentes de líderes de {contexto.segmento} e adicione reflexões analíticas que complementem o debate com pontos de vista práticos. Evite elogios superficiais ou ofertas comerciais precoces; o objetivo central é construir autoridade prévia e familiaridade mútua antes de qualquer envio de mensagem de prospecção.
                </p>
              </div>
            </div>

            {/* Recomendação 3 (~48 palavras) */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                3
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <strong className="text-slate-900 text-xs">Saneamento Imediato de Convites Pendentes</strong>
                  <span className="text-[10px] text-slate-400 font-medium font-mono">48 palavras</span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  Acesse a área de gerenciamento de rede no LinkedIn e cancele todas as solicitações de conexão enviadas há mais de trinta dias sem retorno. Esse acúmulo passivo reduz sua reputação algorítmica, prejudica seu SSI e restringe o limite semanal de novas abordagens qualificadas para alcançar {contexto.publico}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prévia Bloqueada do Plano Completo (Conforme Seção 8.5 do PRD) */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500 bg-white p-6 md:p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/85 to-white backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
            Desbloqueie seu Plano Operacional de 30 Dias
          </h3>
          <p className="text-xs md:text-sm text-slate-600 max-w-lg mt-1.5 mb-5">
            O diagnóstico gratuito mostra o que está travado. O plano completo entrega o caminho operacional dia a dia em {contexto.tempoDiario} minutos diários, com os 8 geradores de copywriting integrados com IA Gemini.
          </p>

          <button 
            onClick={onUpgrade}
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition transform hover:scale-105 flex items-center gap-2"
          >
            Receber meu plano completo <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-slate-500 mt-2 font-medium">
            Assine o plano anual e economize R$ 156 — equivalente a quatro meses grátis.
          </span>
        </div>

        <div className="opacity-30 filter blur-[1px] select-none space-y-4 pointer-events-none">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-slate-100 rounded-xl border border-slate-200"></div>
            <div className="h-24 bg-slate-100 rounded-xl border border-slate-200"></div>
            <div className="h-24 bg-slate-100 rounded-xl border border-slate-200"></div>
          </div>
          <div className="h-32 bg-slate-100 rounded-xl border border-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
