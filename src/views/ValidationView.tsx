import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  HelpCircle,
  SlidersHorizontal 
} from 'lucide-react';
import { SSIScores } from '../types';

interface ValidationViewProps {
  scores: SSIScores;
  setScores: React.Dispatch<React.SetStateAction<SSIScores>>;
  calculatedSum: number;
  ocrSuccessNote: string;
  onConfirm: () => void;
  onBack: () => void;
}

export function ValidationView({
  scores,
  setScores,
  calculatedSum,
  ocrSuccessNote,
  onConfirm,
  onBack
}: ValidationViewProps) {
  const sumDifference = Math.abs(calculatedSum - Number(scores.total));
  const isExactMatch = sumDifference === 0;
  const isMinorMismatch = sumDifference === 1; // 1 point difference tolerated in PRD section 8.3
  const isMajorMismatch = sumDifference > 1;

  const handleNormalize = () => {
    setScores(prev => ({ ...prev, total: calculatedSum }));
  };

  const isFormValid = 
    scores.total >= 0 && scores.total <= 100 &&
    scores.pilar1 >= 0 && scores.pilar1 <= 25 &&
    scores.pilar2 >= 0 && scores.pilar2 <= 25 &&
    scores.pilar3 >= 0 && scores.pilar3 <= 25 &&
    scores.pilar4 >= 0 && scores.pilar4 <= 25;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Envio
        </button>
        <span className="text-xs font-semibold text-slate-400">Etapa 2 de 4: Confirmação & Validação</span>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">Confirme as Cinco Pontuações</h2>
            {ocrSuccessNote && (
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" /> Lido via IA
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Verifique ou corrija os números extraídos. A soma dos quatro pilares é comparada em tempo real com a pontuação total exibida.
          </p>
        </div>

        {/* Grade de 5 inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50">
            <label className="text-[11px] font-bold text-slate-700 block">Pontuação Total (0 a 100)</label>
            <input 
              type="number" 
              min="0" 
              max="100"
              value={scores.total}
              onChange={(e) => setScores({ ...scores, total: Math.min(100, Math.max(0, Number(e.target.value))) })}
              className="mt-1.5 w-full text-xl font-black text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40">
            <label className="text-[11px] font-bold text-blue-900 block">1. Marca Profissional (0 a 25)</label>
            <input 
              type="number" 
              min="0" 
              max="25"
              value={scores.pilar1}
              onChange={(e) => setScores({ ...scores, pilar1: Math.min(25, Math.max(0, Number(e.target.value))) })}
              className="mt-1.5 w-full text-lg font-bold text-blue-800 bg-white border border-blue-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <label className="text-[11px] font-bold text-emerald-900 block">2. Pessoas Certas (0 a 25)</label>
            <input 
              type="number" 
              min="0" 
              max="25"
              value={scores.pilar2}
              onChange={(e) => setScores({ ...scores, pilar2: Math.min(25, Math.max(0, Number(e.target.value))) })}
              className="mt-1.5 w-full text-lg font-bold text-emerald-800 bg-white border border-emerald-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
            <label className="text-[11px] font-bold text-amber-900 block">3. Oferecer Insights (0 a 25)</label>
            <input 
              type="number" 
              min="0" 
              max="25"
              value={scores.pilar3}
              onChange={(e) => setScores({ ...scores, pilar3: Math.min(25, Math.max(0, Number(e.target.value))) })}
              className="mt-1.5 w-full text-lg font-bold text-amber-800 bg-white border border-amber-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/40">
            <label className="text-[11px] font-bold text-purple-900 block">4. Relacionamentos (0 a 25)</label>
            <input 
              type="number" 
              min="0" 
              max="25"
              value={scores.pilar4}
              onChange={(e) => setScores({ ...scores, pilar4: Math.min(25, Math.max(0, Number(e.target.value))) })}
              className="mt-1.5 w-full text-lg font-bold text-purple-800 bg-white border border-purple-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Validador de Soma Conforme Seção 8.3 do PRD */}
          <div className={`p-3.5 rounded-xl border flex flex-col justify-center ${
            isExactMatch 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : isMinorMismatch
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold">Soma dos 4 Pilares:</span>
              <span className="text-base font-black">{calculatedSum} / 100</span>
            </div>

            {isExactMatch && (
              <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold mt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Soma 100% alinhada com o total!
              </span>
            )}

            {isMinorMismatch && (
              <div className="space-y-1 mt-1 text-[11px]">
                <span className="text-amber-800 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Variação de 1 ponto detectada.
                </span>
                <button 
                  type="button" 
                  onClick={handleNormalize}
                  className="text-blue-700 underline font-bold"
                >
                  Normalizar total para {calculatedSum}
                </button>
              </div>
            )}

            {isMajorMismatch && (
              <div className="space-y-1 mt-1 text-[11px]">
                <span className="text-rose-800 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Divergência de {sumDifference} pts.
                </span>
                <button 
                  type="button" 
                  onClick={handleNormalize}
                  className="text-blue-700 underline font-bold"
                >
                  Ajustar total para coincidir ({calculatedSum})
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <button 
            onClick={onConfirm}
            disabled={!isFormValid}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 transition shadow-md shadow-blue-600/25 disabled:opacity-50"
          >
            Confirmar e Avançar para Contexto <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
