import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  ExternalLink, 
  UploadCloud, 
  RefreshCw, 
  Edit3, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';

interface InputSSIViewProps {
  uploadedFile: File | null;
  isProcessingOcr: boolean;
  ocrSuccessNote: string;
  onFileUpload: (file: File) => void;
  onManualInput: () => void;
  onBack: () => void;
  onQuickSample?: () => void;
}

export function InputSSIView({
  uploadedFile,
  isProcessingOcr,
  ocrSuccessNote,
  onFileUpload,
  onManualInput,
  onBack,
  onQuickSample
}: InputSSIViewProps) {
  const [consentChecked, setConsentChecked] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState('');

  const handleFile = (file: File) => {
    setFileError('');
    if (!consentChecked) {
      setFileError('Por favor, confirme a autorização de envio do arquivo antes de prosseguir.');
      return;
    }
    // Max 10MB as per PRD
    if (file.size > 10 * 1024 * 1024) {
      setFileError('O arquivo excede o limite máximo permitido de 10 MB.');
      return;
    }
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setFileError('Formato inválido. Por favor, envie uma imagem PNG, JPG, WebP ou PDF de uma página.');
      return;
    }
    onFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Stepper Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <button onClick={onBack} className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold">1</span>
          <span className="font-bold text-blue-950">Envio do SSI</span>
          <span className="text-slate-300">→</span>
          <span className="text-slate-400">2. Validação</span>
          <span className="text-slate-300">→</span>
          <span className="text-slate-400">3. Contexto</span>
          <span className="text-slate-300">→</span>
          <span className="text-slate-400">4. Diagnóstico</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-blue-600" /> Leitura Inteligente com Visão Multimodal Gemini 3
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Etapa 1: Envie ou Digite sua Pontuação SSI</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1.5 leading-relaxed">
            O SSI utiliza métricas do LinkedIn e Sales Navigator divididas em 4 pilares de até 25 pontos cada.
          </p>
        </div>

        {/* Link Oficial */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs text-slate-700">
          <div className="font-bold text-blue-900 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-blue-600" />
            1. Acesse seu SSI pelo link oficial no Sales Navigator:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a 
              href="https://www.linkedin.com/sales/ssi" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono font-bold text-blue-600 hover:underline bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs"
            >
              https://www.linkedin.com/sales/ssi <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-[11px] text-slate-500">(Abra em nova aba com sua sessão ativa no navegador)</span>
          </div>
          <p className="text-[11px] text-slate-600 pt-1">
            2. Tire uma captura de tela (print screen) exibindo a pontuação total (0 a 100) e os 4 pilares (0 a 25 cada).
          </p>
        </div>

        {/* Consentimento Conforme Seção 8.2 do PRD */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-xs text-slate-700 select-none">
          <input 
            type="checkbox" 
            id="consent"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="consent" className="cursor-pointer font-medium">
            Confirmo que tenho autorização para enviar este arquivo para análise.
          </label>
        </div>

        {fileError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{fileError}</span>
          </div>
        )}

        {/* Dropzone */}
        <label 
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 md:p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
            dragOver 
              ? 'border-blue-600 bg-blue-50/50' 
              : 'border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/20'
          }`}
        >
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp, application/pdf" 
            className="hidden" 
            disabled={isProcessingOcr}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }} 
          />
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {uploadedFile ? uploadedFile.name : 'Clique para selecionar ou arraste sua captura de tela aqui'}
            </p>
            <p className="text-xs text-slate-500 mt-1">Formatos aceitos: PNG, JPG, WebP ou PDF (até 10 MB)</p>
          </div>

          {isProcessingOcr && (
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100/90 px-4 py-2 rounded-full animate-pulse shadow-sm mt-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" /> 
              Analisando captura com visão computacional multimodal Gemini 3...
            </div>
          )}
        </label>

        {ocrSuccessNote && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{ocrSuccessNote}</span>
          </div>
        )}

        {/* Fallback de entrada manual e exemplo de teste */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">Prefere digitar ou fazer um teste imediato?</span>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {onQuickSample && (
              <button
                type="button"
                onClick={onQuickSample}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Usar pontuação de exemplo (58 pts)
              </button>
            )}
            <button 
              type="button"
              onClick={onManualInput}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" /> Digitar manualmente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
