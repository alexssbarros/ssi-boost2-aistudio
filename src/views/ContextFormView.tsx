import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Clock, Briefcase, Target, Building } from 'lucide-react';
import { ContextoProfissional } from '../types';

interface ContextFormViewProps {
  contexto: ContextoProfissional;
  setContexto: React.Dispatch<React.SetStateAction<ContextoProfissional>>;
  onNext: () => void;
  onBack: () => void;
}

export function ContextFormView({
  contexto,
  setContexto,
  onNext,
  onBack
}: ContextFormViewProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Voltar à Validação
        </button>
        <span className="text-xs font-semibold text-slate-400">Etapa 3 de 4: Contexto Profissional</span>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-blue-600" /> Calibração do Algoritmo
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Contexto para Personalização</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Estas 7 perguntas curtas calibram o diagnóstico, as recomendações, o plano diário e os 8 geradores de IA.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          {/* 1. Cargo */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1">1. Cargo ou área de atuação</label>
            <input 
              type="text" 
              value={contexto.cargo}
              onChange={(e) => setContexto({ ...contexto, cargo: e.target.value })}
              placeholder="Ex: Executivo de Contas B2B, Consultor Comercial, Fundador"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* 2. Objetivo */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1">2. Objetivo prioritário no LinkedIn</label>
            <select 
              value={contexto.objetivo}
              onChange={(e) => setContexto({ ...contexto, objetivo: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-white"
            >
              <option>Geração de leads e novas reuniões comerciais</option>
              <option>Construção de autoridade e marca pessoal no setor</option>
              <option>Networking com executivos C-level e parceiros</option>
              <option>Recolocação profissional executiva</option>
              <option>Atrair talentos e fortalecer employer branding</option>
            </select>
          </div>

          {/* 3. Público / ICP */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1">3. Público que deseja alcançar (Persona / ICP)</label>
            <input 
              type="text" 
              value={contexto.publico}
              onChange={(e) => setContexto({ ...contexto, publico: e.target.value })}
              placeholder="Ex: Diretores de Operações, CEOs de PMEs, Gerentes de TI"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* 4. Segmento */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1">4. Segmento de atuação</label>
            <input 
              type="text" 
              value={contexto.segmento}
              onChange={(e) => setContexto({ ...contexto, segmento: e.target.value })}
              placeholder="Ex: Tecnologia e Software B2B, Serviços Corporativos, Saúde"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* 5. Tempo diário */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1">5. Tempo diário disponível para executar as rotinas</label>
            <div className="grid grid-cols-3 gap-3 pt-1">
              {(['10', '15', '30'] as const).map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setContexto({ ...contexto, tempoDiario: mins })}
                  className={`py-2 px-3 rounded-lg border font-semibold text-xs transition ${
                    contexto.tempoDiario === mins 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ⏱️ {mins} minutos/dia
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">O plano de 30 dias ocupará ~70% deste tempo para garantir execução real.</p>
          </div>

          {/* 6. Maior dificuldade */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1">6. Principal dificuldade atual</label>
            <input 
              type="text" 
              value={contexto.dificuldade}
              onChange={(e) => setContexto({ ...contexto, dificuldade: e.target.value })}
              placeholder="Ex: Pouco engajamento e respostas frias em mensagens privadas"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* 7. Uso comercial ou individual */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1">7. Uso prioritário do LinkedIn</label>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setContexto({ ...contexto, usoComercial: 'comercial' })}
                className={`py-2 px-3 rounded-lg border font-semibold text-xs transition ${
                  contexto.usoComercial === 'comercial' 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                💼 Comercial (Vendas e Prospecção B2B)
              </button>
              <button
                type="button"
                onClick={() => setContexto({ ...contexto, usoComercial: 'individual' })}
                className={`py-2 px-3 rounded-lg border font-semibold text-xs transition ${
                  contexto.usoComercial === 'individual' 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                👤 Individual (Branding e Carreira)
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <button 
            onClick={onNext}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 transition shadow-md shadow-blue-600/25"
          >
            Gerar Diagnóstico Gratuito <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
