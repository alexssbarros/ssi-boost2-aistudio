import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Sparkles, 
  Bot, 
  TrendingUp, 
  Flame, 
  Bell, 
  Check, 
  Copy, 
  Sliders, 
  RefreshCw, 
  Briefcase, 
  FileText, 
  Lightbulb, 
  Edit3, 
  MessageSquare, 
  UserCheck, 
  Send, 
  Clock, 
  Target, 
  AlertCircle, 
  UploadCloud, 
  ShieldAlert,
  Layers,
  Zap,
  Loader2,
  ExternalLink,
  FileCheck,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { CICLOS_PLANO } from '../data/planData';
import { 
  SSIScores, 
  PilarAnalise, 
  ContextoProfissional, 
  UserAccount, 
  SubscriptionPlan, 
  HistoricalMeasurement, 
  PitchEvaluation 
} from '../types';

interface SubscriberDashboardViewProps {
  scores: SSIScores;
  pilarAnalise: PilarAnalise;
  contexto: ContextoProfissional;
  userAccount: UserAccount;
  userPlan: SubscriptionPlan;
  completedTasks: string[];
  toggleTask: (taskId: string) => void;
  streakDays: number;
  emailReminders: boolean;
  setEmailReminders: (enabled: boolean) => void;
  activeAssistant: string;
  setActiveAssistant: (id: string) => void;
  runAssistant: (tipo: string, overrideTone?: string, userNote?: string) => Promise<void>;
  generatedOutput: string;
  isGenerating: boolean;
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
  customPromptNote: string;
  setCustomPromptNote: (note: string) => void;
  copyToClipboard: (text: string) => void;
  copiedNotification: boolean;
  historicoSSI: HistoricalMeasurement[];
  onUpdateHistorico?: (newHistory: HistoricalMeasurement[]) => void;
  onNewUpload: () => void;
  onOpenBilling: () => void;
  pitchInput: string;
  setPitchInput: (text: string) => void;
  pitchFeedback: PitchEvaluation | null;
  isEvaluatingPitch: boolean;
  onEvaluatePitch: () => void;
  aiStrategicAnalysis: string;
  isGeneratingAnalysis: boolean;
  onGenerateStrategicAnalysis: () => void;
  uploadedScreenshotUrl?: string;
  savedReportUrl?: string;
  isSavingReport?: boolean;
  onSaveReportToStorage?: () => void;
}

export function SubscriberDashboardView({
  scores,
  pilarAnalise,
  contexto,
  userAccount,
  userPlan,
  completedTasks,
  toggleTask,
  streakDays,
  emailReminders,
  setEmailReminders,
  activeAssistant,
  setActiveAssistant,
  runAssistant,
  generatedOutput,
  isGenerating,
  selectedTone,
  setSelectedTone,
  customPromptNote,
  setCustomPromptNote,
  copyToClipboard,
  copiedNotification,
  historicoSSI,
  onUpdateHistorico,
  onNewUpload,
  onOpenBilling,
  pitchInput,
  setPitchInput,
  pitchFeedback,
  isEvaluatingPitch,
  onEvaluatePitch,
  aiStrategicAnalysis,
  isGeneratingAnalysis,
  onGenerateStrategicAnalysis,
  uploadedScreenshotUrl,
  savedReportUrl,
  isSavingReport,
  onSaveReportToStorage
}: SubscriberDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'diagnostico_completo' | 'plano' | 'assistentes' | 'simulador' | 'evolucao'>('diagnostico_completo');
  const [chartViewMode, setChartViewMode] = useState<'total' | 'pilares'>('total');
  const [copiedReportLink, setCopiedReportLink] = useState(false);
  
  // Estado para adicionar nova medição manual na tabela de histórico
  const [showAddMeasurementModal, setShowAddMeasurementModal] = useState(false);
  const [newMeasureData, setNewMeasureData] = useState(() => {
    return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  });
  const [newMeasureP1, setNewMeasureP1] = useState(18);
  const [newMeasureP2, setNewMeasureP2] = useState(14);
  const [newMeasureP3, setNewMeasureP3] = useState(13);
  const [newMeasureP4, setNewMeasureP4] = useState(18);

  const handleSaveNewMeasurement = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const p1 = Math.min(25, Math.max(0, Number(newMeasureP1) || 0));
    const p2 = Math.min(25, Math.max(0, Number(newMeasureP2) || 0));
    const p3 = Math.min(25, Math.max(0, Number(newMeasureP3) || 0));
    const p4 = Math.min(25, Math.max(0, Number(newMeasureP4) || 0));
    const total = p1 + p2 + p3 + p4;

    const newEntry: HistoricalMeasurement = {
      data: newMeasureData.trim() || 'Hoje',
      total,
      p1,
      p2,
      p3,
      p4
    };

    const updatedList = [...historicoSSI, newEntry];
    if (onUpdateHistorico) {
      onUpdateHistorico(updatedList);
    }
    setShowAddMeasurementModal(false);
  };

  const handleDeleteMeasurement = (indexToDelete: number) => {
    if (historicoSSI.length <= 1) {
      alert('Mantenha pelo menos uma medição registrada no histórico.');
      return;
    }
    const updatedList = historicoSSI.filter((_, idx) => idx !== indexToDelete);
    if (onUpdateHistorico) {
      onUpdateHistorico(updatedList);
    }
  };

  // Limites iniciais de uso (Seção 5.3 do PRD: 60 gerações de assistente/mês)
  const [assistantsUsageCount, setAssistantsUsageCount] = useState(14);
  const maxAssistantsUsage = 60;

  const totalTasksCount = CICLOS_PLANO.reduce((acc, c) => acc + c.tarefas.length, 0);
  const progressPct = Math.round((completedTasks.length / totalTasksCount) * 100);

  const handleAssistantTrigger = (id: string) => {
    setActiveAssistant(id);
    if (assistantsUsageCount < maxAssistantsUsage) {
      setAssistantsUsageCount(prev => prev + 1);
    }
    runAssistant(id);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedReportLink(true);
    setTimeout(() => setCopiedReportLink(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* Barra Superior de Boas-Vindas */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Painel do Assinante • {userAccount.nome || userAccount.email || 'Profissional'}
            </h1>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200">
              Plano {userPlan === 'annual' ? 'Anual (Pro)' : 'Mensal'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {contexto.cargo} • Foco diário: <strong>{contexto.tempoDiario} minutos</strong> • Público: <strong>{contexto.publico}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Pontuação Atual</span>
            <span className="text-2xl font-black text-slate-900">
              {scores.total} <span className="text-xs font-normal text-slate-400">/100</span>
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Plano 30d</span>
            <span className="text-2xl font-black text-emerald-600">{progressPct}%</span>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Sequência</span>
            <span className="text-2xl font-black text-amber-500 flex items-center gap-0.5">
              <Flame className="w-5 h-5 text-amber-500" /> {streakDays}d
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Armazenamento e Nuvem */}
      <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900">Armazenamento em Nuvem</span>
              {uploadedScreenshotUrl && (
                <a 
                  href={uploadedScreenshotUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1 transition"
                >
                  <FileCheck className="w-3 h-3" /> Ver Captura do SSI <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {savedReportUrl 
                ? 'Relatório completo arquivado no seu histórico e disponível para download e auditoria.' 
                : 'Grave esse diagnóstico e capturas no seu histórico'}
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
                <FileCheck className="w-3.5 h-3.5" /> Baixar Relatório <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => copyUrl(savedReportUrl)}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1 transition"
                title="Copiar link permanente"
              >
                {copiedReportLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedReportLink ? 'Copiado!' : 'Copiar Link'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={isSavingReport}
              onClick={onSaveReportToStorage}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-60 cursor-pointer"
            >
              {isSavingReport ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Salvando no Histórico...
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  Salvar Relatório no Histórico
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navegação entre Módulos em Botões Elevados */}
      <div className="bg-slate-100/90 p-2 md:p-2.5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
        <div className="flex items-center justify-between px-2 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Módulos Operacionais do Assinante
          </span>
          <span className="text-[10px] font-semibold text-slate-400 hidden sm:inline">
            Clique para alternar entre as ferramentas
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {/* Botão 1: Diagnóstico Completo */}
          <button
            onClick={() => setActiveTab('diagnostico_completo')}
            className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
              activeTab === 'diagnostico_completo'
                ? 'bg-white border-blue-500/80 shadow-md ring-2 ring-blue-500/20 translate-y-[-1px]'
                : 'bg-white/60 hover:bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                activeTab === 'diagnostico_completo' ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
              }`}>
                <BarChart3 className="w-4 h-4" />
              </div>
              {activeTab === 'diagnostico_completo' && (
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              )}
            </div>
            <div>
              <span className={`block text-xs font-bold leading-tight ${activeTab === 'diagnostico_completo' ? 'text-blue-950' : 'text-slate-800'}`}>
                Diagnóstico Completo
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                Auditoria & Gargalos
              </span>
            </div>
          </button>

          {/* Botão 2: Plano de 30 Dias */}
          <button
            onClick={() => setActiveTab('plano')}
            className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
              activeTab === 'plano'
                ? 'bg-white border-emerald-500/80 shadow-md ring-2 ring-emerald-500/20 translate-y-[-1px]'
                : 'bg-white/60 hover:bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                activeTab === 'plano' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
              }`}>
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {completedTasks.length}/{totalTasksCount}
              </span>
            </div>
            <div>
              <span className={`block text-xs font-bold leading-tight ${activeTab === 'plano' ? 'text-emerald-950' : 'text-slate-800'}`}>
                Plano de 30 Dias
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                Rotinas de {contexto.tempoDiario}min
              </span>
            </div>
          </button>

          {/* Botão 3: 8 Geradores IA */}
          <button
            onClick={() => setActiveTab('assistentes')}
            className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
              activeTab === 'assistentes'
                ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20 translate-y-[-1px]'
                : 'bg-white/60 hover:bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                activeTab === 'assistentes' ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
              }`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5 text-blue-600" /> 8 IA
              </span>
            </div>
            <div>
              <span className={`block text-xs font-bold leading-tight ${activeTab === 'assistentes' ? 'text-blue-950' : 'text-slate-800'}`}>
                8 Geradores de Copy
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                Headline, Posts e Convites
              </span>
            </div>
          </button>

          {/* Botão 4: Simulador de Decisor */}
          <button
            onClick={() => setActiveTab('simulador')}
            className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
              activeTab === 'simulador'
                ? 'bg-white border-indigo-500/80 shadow-md ring-2 ring-indigo-500/20 translate-y-[-1px]'
                : 'bg-white/60 hover:bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                activeTab === 'simulador' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
              }`}>
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                Treino
              </span>
            </div>
            <div>
              <span className={`block text-xs font-bold leading-tight ${activeTab === 'simulador' ? 'text-indigo-950' : 'text-slate-800'}`}>
                Simulador de Decisor
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                Teste seu Pitch com IA
              </span>
            </div>
          </button>

          {/* Botão 5: Histórico & Evolução */}
          <button
            onClick={() => setActiveTab('evolucao')}
            className={`col-span-2 md:col-span-1 p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
              activeTab === 'evolucao'
                ? 'bg-white border-purple-500/80 shadow-md ring-2 ring-purple-500/20 translate-y-[-1px]'
                : 'bg-white/60 hover:bg-white border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                activeTab === 'evolucao' ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
              }`}>
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                +18%
              </span>
            </div>
            <div>
              <span className={`block text-xs font-bold leading-tight ${activeTab === 'evolucao' ? 'text-purple-950' : 'text-slate-800'}`}>
                Histórico & Evolução
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                Comparativo de Medições
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Aba 1: Diagnóstico Completo & Auditoria */}
      {activeTab === 'diagnostico_completo' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Diagnóstico Executivo do Assinante
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                Interpretação Estratégica para "{contexto.objetivo}"
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Análise calibrada para o perfil de <strong>{contexto.cargo}</strong> com público-alvo em <strong>{contexto.publico}</strong>.
              </p>
            </div>

            {/* Auditoria Gemini 3 */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" /> Auditoria Aprofundada com Gemini 3 Flash
                  </h3>
                  <p className="text-[11px] text-indigo-700">
                    Análise em tempo real do seu gargalo crítico ({pilarAnalise.maisFraco.short}: {pilarAnalise.maisFraco.valor}/25) para {contexto.publico}.
                  </p>
                </div>
                <button
                  onClick={onGenerateStrategicAnalysis}
                  disabled={isGeneratingAnalysis}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50 whitespace-nowrap self-start sm:self-auto shadow-xs"
                >
                  <Bot className={`w-3.5 h-3.5 ${isGeneratingAnalysis ? 'animate-spin' : ''}`} />
                  {isGeneratingAnalysis ? 'Gerando Auditoria...' : aiStrategicAnalysis ? 'Atualizar Auditoria' : 'Gerar Auditoria IA'}
                </button>
              </div>

              {aiStrategicAnalysis && (
                <div className="mt-2 p-3.5 rounded-lg bg-white border border-indigo-200 text-xs text-slate-800 whitespace-pre-line leading-relaxed shadow-sm">
                  {aiStrategicAnalysis}
                </div>
              )}
            </div>

            {/* Nota de conformidade da Seção 3.1 e 9.3 do PRD */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Nota de conformidade:</strong> Não prometemos aumento específico de pontuação do SSI nem prazo garantido. A evolução decorre da consistência prática e da qualidade das interações comerciais mantidas pelo usuário.
              </span>
            </div>

            {/* Matriz de Prioridade por Impacto e Esforço (Conforme Seção 9.2 do PRD) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-600" /> Matriz de Prioridade por Impacto e Esforço
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/30 space-y-1">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]">Impacto 1: Alto</span>
                  <p className="font-bold text-slate-900 pt-1">Otimizar Conversão de Convites</p>
                  <p className="text-slate-600">Substituir abordagens genéricas por notas com perguntas consultivas sobre as prioridades de {contexto.publico}.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">Impacto 2: Médio</span>
                  <p className="font-bold text-slate-900 pt-1">Comentários de Autoridade</p>
                  <p className="text-slate-600">Realizar 3 a 5 comentários técnicos por semana em publicações de decisores do seu setor.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/30 space-y-1">
                  <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-[10px]">Impacto 3: Estrutural</span>
                  <p className="font-bold text-slate-900 pt-1">Reestruturação da seção "Sobre"</p>
                  <p className="text-slate-600">Transformar sua biografia em uma narrativa centrada nos problemas que você soluciona para {contexto.segmento}.</p>
                </div>
              </div>
            </div>

            {/* Hábitos a Evitar (Descritos como boas práticas, Conforme Seção 9.2 do PRD) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" /> Hábitos e Padrões a Evitar no LinkedIn
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 flex items-start gap-2">
                  <span className="font-bold text-rose-700">✖</span>
                  <div>
                    <strong>Acúmulo de convites pendentes:</strong> Deixar dezenas de solicitações sem resposta por mais de 30 dias prejudica a taxa de aceitação perante o algoritmo do Sales Navigator.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 flex items-start gap-2">
                  <span className="font-bold text-rose-700">✖</span>
                  <div>
                    <strong>Prospecção de "Copia e Cola":</strong> Mensagens genéricas geram rejeição imediata e reduzem a relevância das suas mensagens privadas.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 flex items-start gap-2">
                  <span className="font-bold text-rose-700">✖</span>
                  <div>
                    <strong>Inconstância de interações:</strong> Concentrar atividades em um único dia e passar semanas inativo anula o ganho de consistência do SSI.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aba 2: Plano de 30 Dias em 4 Ciclos */}
      {activeTab === 'plano' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">Rastreamento do Plano de 30 Dias</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {completedTasks.length} de {totalTasksCount} atividades concluídas
                </span>
              </div>
              <p className="text-slate-500">Cronograma diário calibrado para preencher ~70% de {contexto.tempoDiario} minutos diários.</p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                <input 
                  type="checkbox" 
                  checked={emailReminders} 
                  onChange={(e) => setEmailReminders(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-blue-600" /> Lembrete diário de tarefa por e-mail
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            {CICLOS_PLANO.map((ciclo) => (
              <div key={ciclo.ciclo} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-xs">{ciclo.dias}</span>
                      <h3 className="font-bold text-slate-900 text-sm">Ciclo {ciclo.ciclo}: {ciclo.nome}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{ciclo.foco}</p>
                  </div>
                </div>

                <div className="p-4 divide-y divide-slate-100">
                  {ciclo.tarefas.map((tarefa) => {
                    const isDone = completedTasks.includes(tarefa.id);
                    return (
                      <div 
                        key={tarefa.id}
                        className={`py-3.5 flex items-start gap-3 transition ${isDone ? 'opacity-60 bg-slate-50/50 rounded-lg px-2' : ''}`}
                      >
                        <button
                          onClick={() => toggleTask(tarefa.id)}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition flex-shrink-0 ${
                            isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 hover:border-blue-500 bg-white'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              Dia {tarefa.dia}: {tarefa.titulo}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                              ⏱️ ~{tarefa.tempo} min
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                              Pilar: {tarefa.pilar}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">{tarefa.desc}</p>
                          {tarefa.motivo && (
                            <div className="p-2.5 rounded bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
                              <strong>Por que fazer isso:</strong> {tarefa.motivo}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aba 3: 8 Geradores de Copy com IA (Conforme Seção 10 do PRD) */}
      {activeTab === 'assistentes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase text-slate-500">8 Geradores com IA</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Uso: {assistantsUsageCount} / {maxAssistantsUsage} mês
              </span>
            </div>

            {/* Barra de Limite Mensal (Seção 5.3) */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(assistantsUsageCount / maxAssistantsUsage) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'headline', label: '1. Headline de Perfil', icon: Briefcase },
                { id: 'sobre', label: '2. Seção "Sobre"', icon: FileText },
                { id: 'ideias_posts', label: '3. Ideias de Publicações', icon: Lightbulb },
                { id: 'rascunho_post', label: '4. Rascunhos de Publicações', icon: Edit3 },
                { id: 'comentario', label: '5. Comentários Relevantes', icon: MessageSquare },
                { id: 'convite', label: '6. Convite com Nota', icon: UserCheck },
                { id: 'primeira_msg', label: '7. Primeira Mensagem (Pós-Aceite)', icon: Send },
                { id: 'followup', label: '8. Follow-up de Valor', icon: Clock }
              ].map((asst) => {
                const Icon = asst.icon;
                return (
                  <button
                    key={asst.id}
                    onClick={() => handleAssistantTrigger(asst.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition ${
                      activeAssistant === asst.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{asst.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Customização de Tom e Contexto */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" /> Tom da Copy
              </label>
              <select
                value={selectedTone}
                onChange={(e) => {
                  setSelectedTone(e.target.value);
                  runAssistant(activeAssistant, e.target.value);
                }}
                className="w-full text-xs border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 bg-slate-50"
              >
                <option value="Consultivo">Consultivo & Estratégico</option>
                <option value="Direto">Direto ao Ponto (Executivo)</option>
                <option value="Provocativo">Provocativo (Desafio ao Status Quo)</option>
                <option value="Empático">Empático & Relacional</option>
              </select>

              <div className="pt-1">
                <label className="text-[11px] text-slate-500 block mb-1">Instrução adicional para a IA:</label>
                <input
                  type="text"
                  placeholder="Ex: Focar em redução de CAC e ciclo de vendas"
                  value={customPromptNote}
                  onChange={(e) => setCustomPromptNote(e.target.value)}
                  className="w-full text-[11px] border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Área de Visualização do Conteúdo Gerado */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" /> Redator Inteligente de Social Selling
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adaptado dinamicamente para {contexto.publico} em {contexto.segmento}.
                  </p>
                </div>

                <button
                  onClick={() => runAssistant(activeAssistant)}
                  disabled={isGenerating}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Gerando...' : 'Regerar com IA'}
                </button>
              </div>

              {isGenerating ? (
                <div className="py-16 text-center text-xs text-slate-500 space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                  <p className="font-semibold text-slate-700">Construindo copy com IA Gemini 3...</p>
                  <p className="text-[11px] text-slate-400">Levando em conta seu pilar fraco: {pilarAnalise.maisFraco.short}</p>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-sans text-xs text-slate-800 whitespace-pre-line leading-relaxed min-h-[260px]">
                  {generatedOutput || 'Selecione um gerador na coluna lateral ou clique em "Regerar com IA" para criar uma copy contextualizada.'}
                </div>
              )}
            </div>

            {generatedOutput && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Lembre-se de personalizar o nome e momento do lead antes de enviar.</span>
                <button
                  onClick={() => copyToClipboard(generatedOutput)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  {copiedNotification ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedNotification ? 'Copiado!' : 'Copiar Texto'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Aba 4: Simulador de Reação do Decisor B2B */}
      {activeTab === 'simulador' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-1">
              <Bot className="w-3.5 h-3.5" /> Simulador de Persona com IA Gemini
            </div>
            <h2 className="text-xl font-bold text-slate-900">Simulador de Reação do Decisor B2B</h2>
            <p className="text-xs text-slate-600 mt-1">
              Cole sua mensagem de prospecção antes de disparar no LinkedIn. A IA assume o papel de <strong>{contexto.publico}</strong> no nicho de <strong>{contexto.segmento}</strong> e fornece feedback honesto sobre a probabilidade de resposta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 block">Sua Mensagem de Abordagem / Pitch:</label>
              <textarea
                rows={8}
                value={pitchInput}
                onChange={(e) => setPitchInput(e.target.value)}
                placeholder="Cole aqui o texto do seu convite, primeira mensagem ou follow-up que pretende enviar no LinkedIn..."
                className="w-full text-xs p-3.5 border border-slate-300 rounded-xl outline-none focus:border-indigo-600 bg-slate-50 font-mono leading-relaxed"
              ></textarea>

              <button
                onClick={onEvaluatePitch}
                disabled={isEvaluatingPitch || !pitchInput.trim()}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Bot className={`w-4 h-4 ${isEvaluatingPitch ? 'animate-spin' : ''}`} />
                {isEvaluatingPitch ? 'Decisor está lendo e avaliando...' : 'Avaliar Mensagem com Decisor Virtual'}
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Target className="w-4 h-4 text-indigo-600" /> Veredito do Decisor ({contexto.publico})
              </h3>

              {isEvaluatingPitch ? (
                <div className="py-16 text-center text-xs text-slate-500 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
                  <p>Calculando taxa de resposta e fricções comerciais...</p>
                </div>
              ) : pitchFeedback ? (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
                    <span className="font-semibold text-slate-700">Probabilidade de Resposta:</span>
                    <span className={`text-base font-black ${
                      pitchFeedback.aceitacaoScore >= 70 
                        ? 'text-emerald-600' 
                        : pitchFeedback.aceitacaoScore >= 45 
                          ? 'text-amber-600' 
                          : 'text-rose-600'
                    }`}>
                      {pitchFeedback.aceitacaoScore}%
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-200 space-y-1">
                    <span className="font-bold text-indigo-950 block">💭 Pensamento Interno nos Primeiros 5 Segundos:</span>
                    <p className="text-indigo-900 italic">"{pitchFeedback.pensamentoInterno}"</p>
                  </div>

                  {pitchFeedback.errosCriticos?.length > 0 && (
                    <div className="space-y-1">
                      <span className="font-bold text-rose-700 block">Gargalos Identificados:</span>
                      <ul className="list-disc list-inside text-slate-600 text-[11px] space-y-0.5">
                        {pitchFeedback.errosCriticos.map((e, idx) => <li key={idx}>{e}</li>)}
                      </ul>
                    </div>
                  )}

                  {pitchFeedback.versaoReescrita && (
                    <div className="p-3 rounded-lg bg-white border border-emerald-300 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-800">Versão Reescrita Recomendada:</span>
                        <button 
                          onClick={() => copyToClipboard(pitchFeedback.versaoReescrita)}
                          className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copiar
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-slate-800 bg-emerald-50/40 p-2.5 rounded border border-emerald-100">
                        {pitchFeedback.versaoReescrita}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-slate-400">
                  Escreva ou cole sua mensagem ao lado e clique em "Avaliar Mensagem com Decisor Virtual".
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Aba 5: Histórico & Evolução com Gráficos Comparativos (Conforme Seção 8.6 do PRD) */}
      {activeTab === 'evolucao' && (() => {
        // Dados sincronizados dinamicamente com a tabela de medições
        const historyList = historicoSSI && historicoSSI.length > 0 
          ? historicoSSI 
          : [
              { data: '1ª Medição', total: scores.total || 49, p1: scores.pilar1 || 14, p2: scores.pilar2 || 10, p3: scores.pilar3 || 9, p4: scores.pilar4 || 16 }
            ];

        const firstEntry = historyList[0];
        const latestEntry = historyList[historyList.length - 1];

        const deltaTotal = latestEntry.total - firstEntry.total;
        const percTotal = firstEntry.total > 0 ? Math.round((deltaTotal / firstEntry.total) * 100) : 0;

        const deltaP1 = latestEntry.p1 - firstEntry.p1;
        const deltaP2 = latestEntry.p2 - firstEntry.p2;
        const deltaP3 = latestEntry.p3 - firstEntry.p3;
        const deltaP4 = latestEntry.p4 - firstEntry.p4;

        // Cálculos do Gráfico SVG Dinâmico
        const svgWidth = 650;
        const plotYMin = 30;
        const plotYMax = 170;
        const plotHeight = plotYMax - plotYMin; // 140
        const n = historyList.length;

        const getX = (idx: number) => {
          if (n <= 1) return svgWidth / 2;
          const paddingLeft = 70;
          const paddingRight = 50;
          const usableWidth = svgWidth - paddingLeft - paddingRight;
          return paddingLeft + (idx / (n - 1)) * usableWidth;
        };

        const getYTotal = (score: number) => {
          const clamped = Math.min(100, Math.max(0, score));
          return plotYMax - (clamped / 100) * plotHeight;
        };

        const getYPilar = (score: number) => {
          const clamped = Math.min(25, Math.max(0, score));
          return plotYMax - (clamped / 25) * plotHeight;
        };

        const totalLinePoints = historyList.map((item, idx) => `${getX(idx)},${getYTotal(item.total)}`).join(' ');
        const totalAreaPoints = n > 1 
          ? `${getX(0)},${plotYMax} ${totalLinePoints} ${getX(n - 1)},${plotYMax}`
          : `${getX(0) - 30},${plotYMax} ${getX(0)},${getYTotal(historyList[0].total)} ${getX(0) + 30},${plotYMax}`;

        const pilaresConfig = [
          { key: 'p1' as const, cor: '#2563eb', label: 'Marca' },
          { key: 'p2' as const, cor: '#059669', label: 'Pessoas' },
          { key: 'p3' as const, cor: '#d97706', label: 'Insights' },
          { key: 'p4' as const, cor: '#7c3aed', label: 'Relacionamentos' }
        ];

        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Histórico de Medições do SSI</h3>
                  <p className="text-xs text-slate-500">
                    O gráfico e métricas atualizam instantaneamente conforme novas medições são adicionadas ou editadas na tabela.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddMeasurementModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                  >
                    <Plus className="w-4 h-4 text-emerald-400" /> Nova Medição Manual
                  </button>

                  <button
                    onClick={onNewUpload}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                  >
                    <UploadCloud className="w-4 h-4" /> Importar Captura
                  </button>
                </div>
              </div>

              {/* Cards de Métricas Dinâmicos calculados a partir da Tabela */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs text-slate-500 font-medium">Score Geral Atual</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-slate-900">{latestEntry.total}</span>
                    <span className={`text-xs font-bold ${deltaTotal >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {deltaTotal > 0 ? `▲ +${deltaTotal} pts (+${percTotal}%)` : deltaTotal < 0 ? `▼ ${deltaTotal} pts (${percTotal}%)` : 'Sem variação'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">vs. 1ª medição ({firstEntry.total} pts)</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs text-slate-500 font-medium">Marca Profissional</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-blue-700">{latestEntry.p1} / 25</span>
                    <span className={`text-xs font-bold ${deltaP1 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {deltaP1 > 0 ? `▲ +${deltaP1} pts` : deltaP1 < 0 ? `▼ ${deltaP1} pts` : '0 pts'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">vs. 1ª medição ({firstEntry.p1} pts)</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs text-slate-500 font-medium">Pessoas Certas</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-emerald-700">{latestEntry.p2} / 25</span>
                    <span className={`text-xs font-bold ${deltaP2 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {deltaP2 > 0 ? `▲ +${deltaP2} pts` : deltaP2 < 0 ? `▼ ${deltaP2} pts` : '0 pts'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">vs. 1ª medição ({firstEntry.p2} pts)</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs text-slate-500 font-medium">Criar Relacionamentos</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-purple-700">{latestEntry.p4} / 25</span>
                    <span className={`text-xs font-bold ${deltaP4 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {deltaP4 > 0 ? `▲ +${deltaP4} pts` : deltaP4 < 0 ? `▼ ${deltaP4} pts` : '0 pts'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">vs. 1ª medição ({firstEntry.p4} pts)</span>
                </div>
              </div>

              {/* Tabela de Medições Dinâmica */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span className="font-semibold text-slate-700">Tabela de Registros ({historyList.length} {historyList.length === 1 ? 'medição' : 'medições'})</span>
                  <span>Pontuações de 0 a 25 em cada pilar</span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                      <tr>
                        <th className="p-3">Data</th>
                        <th className="p-3">Score Total</th>
                        <th className="p-3">Marca (0-25)</th>
                        <th className="p-3">Pessoas (0-25)</th>
                        <th className="p-3">Insights (0-25)</th>
                        <th className="p-3">Relacionamentos (0-25)</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {historyList.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition">
                          <td className="p-3 font-semibold">{item.data}</td>
                          <td className="p-3 font-bold text-slate-900">{item.total} / 100</td>
                          <td className="p-3">{item.p1}</td>
                          <td className="p-3">{item.p2}</td>
                          <td className="p-3">{item.p3}</td>
                          <td className="p-3">{item.p4}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium text-[10px]">
                              Auditado
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {onUpdateHistorico && historyList.length > 1 && (
                              <button
                                onClick={() => handleDeleteMeasurement(idx)}
                                title="Remover esta medição"
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gráfico Comparativo de Evolução 100% Dinâmico com a Tabela */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" /> Gráfico Comparativo de Evolução
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Atualizado em tempo real com todos os {historyList.length} registros da tabela acima.
                    </p>
                  </div>

                  {/* Seletor de Visão do Gráfico */}
                  <div className="flex items-center p-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold self-start sm:self-auto">
                    <button
                      onClick={() => setChartViewMode('total')}
                      className={`px-3 py-1 rounded-md transition ${
                        chartViewMode === 'total' 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Pontuação Total (0-100)
                    </button>
                    <button
                      onClick={() => setChartViewMode('pilares')}
                      className={`px-3 py-1 rounded-md transition ${
                        chartViewMode === 'pilares' 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Evolução dos 4 Pilares (0-25)
                    </button>
                  </div>
                </div>

                {/* Gráfico SVG Responsivo e Dinâmico */}
                <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                  {chartViewMode === 'total' ? (
                    <div className="space-y-2">
                      <svg viewBox="0 0 650 200" className="w-full h-44 overflow-visible">
                        <defs>
                          <linearGradient id="totalScoreGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Linhas de Grade Y (0, 25, 50, 75, 100) */}
                        {[0, 25, 50, 75, 100].map((val) => {
                          const y = getYTotal(val);
                          return (
                            <g key={val}>
                              <line x1="50" y1={y} x2="620" y2={y} stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray={val === 0 ? "none" : "3,3"} />
                              <text x="42" y={y + 3.5} textAnchor="end" className="text-[10px] fill-slate-400 font-sans">{val}</text>
                            </g>
                          );
                        })}

                        {/* Área Sombreada da Curva Total */}
                        <polygon
                          points={totalAreaPoints}
                          fill="url(#totalScoreGrad)"
                        />

                        {/* Linha de Tendência Conectando Todos os Pontos da Tabela */}
                        {n > 1 && (
                          <polyline
                            points={totalLinePoints}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}

                        {/* Pontos, Linhas Verticais e Rótulos para Cada Linha da Tabela */}
                        {historyList.map((item, idx) => {
                          const x = getX(idx);
                          const y = getYTotal(item.total);
                          return (
                            <g key={idx} className="transition-all">
                              <line x1={x} y1={y} x2={x} y2={plotYMax} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                              <circle cx={x} cy={y} r="6" fill="#ffffff" stroke="#2563eb" strokeWidth="3.5" className="drop-shadow-sm" />
                              <rect x={x - 24} y={y - 28} width="48" height="20" rx="6" fill="#1e293b" />
                              <text x={x} y={y - 14} textAnchor="middle" fill="#ffffff" className="text-[11px] font-bold font-sans">
                                {item.total} pts
                              </text>
                              <text x={x} y="190" textAnchor="middle" className="text-[11px] font-semibold fill-slate-600 font-sans">
                                {item.data}
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      <div className="flex items-center justify-between text-xs pt-1 px-3 border-t border-slate-100">
                        <span className="text-slate-500 font-medium">Evolução Líquida ({firstEntry.data} → {latestEntry.data}):</span>
                        <span className={`font-bold px-2.5 py-0.5 rounded-full border ${
                          deltaTotal >= 0 
                            ? 'text-emerald-600 bg-emerald-50 border-emerald-200' 
                            : 'text-rose-600 bg-rose-50 border-rose-200'
                        }`}>
                          {deltaTotal >= 0 ? `▲ +${deltaTotal}` : `▼ ${deltaTotal}`} pontos ({deltaTotal >= 0 ? `+${percTotal}%` : `${percTotal}%`} de ganho relativo)
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Visão dos 4 Pilares (0-25) Totalmente Dinâmica */
                    <div className="space-y-3">
                      <svg viewBox="0 0 650 200" className="w-full h-44 overflow-visible">
                        {[0, 5, 10, 15, 20, 25].map((val) => {
                          const y = getYPilar(val);
                          return (
                            <g key={val}>
                              <line x1="45" y1={y} x2="620" y2={y} stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray={val === 0 ? "none" : "3,3"} />
                              <text x="38" y={y + 3.5} textAnchor="end" className="text-[10px] fill-slate-400 font-sans">{val}</text>
                            </g>
                          );
                        })}

                        {pilaresConfig.map((pilar) => {
                          const pointsStr = historyList.map((item, idx) => `${getX(idx)},${getYPilar(item[pilar.key])}`).join(' ');

                          return (
                            <g key={pilar.key}>
                              {n > 1 && (
                                <polyline
                                  points={pointsStr}
                                  fill="none"
                                  stroke={pilar.cor}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              )}
                              {historyList.map((item, idx) => {
                                const x = getX(idx);
                                const y = getYPilar(item[pilar.key]);
                                return (
                                  <g key={`${pilar.key}-${idx}`}>
                                    <circle cx={x} cy={y} r="4.5" fill="#ffffff" stroke={pilar.cor} strokeWidth="2.5" />
                                    {idx === historyList.length - 1 && (
                                      <text x={x + 8} y={y + 3.5} fill={pilar.cor} className="text-[10px] font-bold font-sans">
                                        {item[pilar.key]}/25
                                      </text>
                                    )}
                                  </g>
                                );
                              })}
                            </g>
                          );
                        })}

                        {historyList.map((item, idx) => (
                          <text key={idx} x={getX(idx)} y="190" textAnchor="middle" className="text-[11px] font-semibold fill-slate-600 font-sans">
                            {item.data}
                          </text>
                        ))}
                      </svg>

                      {/* Resumo dinâmico dos 4 pilares */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                        {pilaresConfig.map(pilar => {
                          const diff = latestEntry[pilar.key] - firstEntry[pilar.key];
                          return (
                            <div key={pilar.key} className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
                              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pilar.cor }}></span> {pilar.label}
                              </span>
                              <span className={`font-bold ${diff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                                {diff > 0 ? `▲ +${diff} pts` : diff < 0 ? `▼ ${diff} pts` : '0 pts'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal para Adicionar Medição Manual */}
            {showAddMeasurementModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-600" /> Registrar Nova Medição Manual
                    </h3>
                    <button
                      onClick={() => setShowAddMeasurementModal(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveNewMeasurement} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Rótulo / Data da Medição</label>
                      <input
                        type="text"
                        value={newMeasureData}
                        onChange={(e) => setNewMeasureData(e.target.value)}
                        placeholder="Ex: 21/Set, Hoje, Semana 3..."
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Marca (0-25)</label>
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={newMeasureP1}
                          onChange={(e) => setNewMeasureP1(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Pessoas (0-25)</label>
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={newMeasureP2}
                          onChange={(e) => setNewMeasureP2(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Insights (0-25)</label>
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={newMeasureP3}
                          onChange={(e) => setNewMeasureP3(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Relacionamentos (0-25)</label>
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={newMeasureP4}
                          onChange={(e) => setNewMeasureP4(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between">
                      <span className="font-semibold text-blue-900">Score Total Calculado:</span>
                      <span className="text-base font-black text-blue-700">
                        {Number(newMeasureP1) + Number(newMeasureP2) + Number(newMeasureP3) + Number(newMeasureP4)} / 100
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowAddMeasurementModal(false)}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs"
                      >
                        Salvar e Atualizar Gráfico
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
