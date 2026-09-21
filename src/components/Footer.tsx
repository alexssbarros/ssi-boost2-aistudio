import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogoIcon } from './BrandLogoIcon';

interface FooterProps {
  onNavigateHome: () => void;
  onStartAnalysis: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCheckout: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenAccount: () => void;
  onOpenFaq?: () => void;
}

export function Footer({
  onNavigateHome,
  onStartAnalysis,
  onNavigateSection,
  onOpenCheckout,
  onOpenTerms,
  onOpenPrivacy,
  onOpenAccount,
  onOpenFaq
}: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-8 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-3.5">
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-white font-bold text-sm cursor-pointer select-none"
          >
            <BrandLogoIcon size={30} />
            <span>SSI <span className="text-blue-400 font-extrabold">Boost</span></span>
          </div>
          <p className="text-slate-400 max-w-md leading-relaxed">
            Plataforma independente potencializada por inteligência artificial para profissionais de vendas e liderança B2B. Converte a fotografia do Sales Navigator em diagnósticos pragmáticos, planos de 30 dias e rotinas de alta conversão.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 font-mono text-[11px] border border-slate-700/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>100% Seguro: Sem senha, cookies, scraping ou automações no LinkedIn.</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Responsável pelo produto: <strong>Alex Barros</strong> • Versão de lançamento: 1.0
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Navegação & Recursos</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={onNavigateHome} className="hover:text-blue-400 transition">
                Início
              </button>
            </li>
            <li>
              <button onClick={onStartAnalysis} className="hover:text-blue-400 transition">
                Fazer Diagnóstico Gratuito
              </button>
            </li>
            <li>
              <button 
                id="footer-tabela-precos-btn"
                onClick={onOpenCheckout} 
                className="hover:text-blue-400 transition cursor-pointer"
              >
                Tabela de Preços
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenFaq || (() => onNavigateSection('secao-faq'))} 
                className="hover:text-blue-400 transition"
              >
                Perguntas Frequentes (FAQ)
              </button>
            </li>
            <li className="flex items-center gap-1 text-slate-400 pt-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Visão Computacional Gemini 3</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Privacidade & Termos</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button 
                id="footer-termos-uso-btn"
                onClick={onOpenTerms} 
                className="hover:text-blue-400 transition cursor-pointer"
              >
                Termos de Uso
              </button>
            </li>
            <li>
              <button 
                id="footer-politica-privacidade-btn"
                onClick={onOpenPrivacy} 
                className="hover:text-blue-400 transition cursor-pointer"
              >
                Política de Privacidade
              </button>
            </li>
            <li>
              <button onClick={onOpenAccount} className="hover:text-blue-400 transition">
                Gerenciar Dados da Conta
              </button>
            </li>
            <li className="text-[11px] text-slate-500 pt-1">
              • Descarte imediato das capturas após leitura
            </li>
            <li className="text-[11px] text-slate-500">
              • Exclusão definitiva de conta a qualquer instante
            </li>
          </ul>
        </div>
      </div>

      {/* Aviso Obrigatório de Independência (Conforme Seção 3.3 do PRD) */}
      <div className="max-w-6xl mx-auto border-t border-slate-800 pt-6 space-y-2 text-slate-500">
        <p className="text-[11px] leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-800 text-slate-400">
          <strong>Aviso de Independência:</strong> SSI Boost é uma ferramenta independente. Não é afiliada, patrocinada ou endossada pelo LinkedIn. LinkedIn, Sales Navigator e Social Selling Index são marcas ou recursos de seus respectivos titulares.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] pt-1">
          <p>© 2026 SSI Boost. Todos os direitos reservados.</p>
          <p>Construído com base na especificação de produto do Alex Barros.</p>
        </div>
      </div>
    </footer>
  );
}
