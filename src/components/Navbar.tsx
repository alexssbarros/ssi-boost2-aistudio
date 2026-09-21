import React from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  RefreshCw, 
  Settings, 
  Zap
} from 'lucide-react';
import { BrandLogoIcon } from './BrandLogoIcon';
import { SubscriptionPlan } from '../types';

interface NavbarProps {
  currentStep: string;
  isUserLoggedIn: boolean;
  userPlan: SubscriptionPlan;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onStartAnalysis: () => void;
  onOpenCheckout: () => void;
  onOpenNewMeasurement: () => void;
  onOpenAccountModal: () => void;
  onOpenLoginModal: () => void;
  onOpenFaq?: () => void;
  onOpenDashboard?: () => void;
}

export function Navbar({
  currentStep,
  isUserLoggedIn,
  userPlan,
  onNavigateHome,
  onNavigateSection,
  onStartAnalysis,
  onOpenCheckout,
  onOpenNewMeasurement,
  onOpenAccountModal,
  onOpenLoginModal,
  onOpenFaq,
  onOpenDashboard
}: NavbarProps) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-2xs">
      <div 
        onClick={onNavigateHome}
        className="flex items-center gap-3 cursor-pointer select-none group"
      >
        <BrandLogoIcon size={38} className="shadow-md shadow-blue-600/25 transition-transform duration-200 group-hover:scale-105" />
        <div>
          <div className="font-bold text-slate-900 text-base leading-tight flex items-center gap-1.5">
            <span className="tracking-tight font-extrabold text-slate-900">
              SSI <span className="text-blue-600 font-black">Boost</span>
            </span>
          </div>
        </div>
      </div>

      {/* Links Centrais de Navegação */}
      <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
        <button
          onClick={onNavigateHome}
          className={`hover:text-blue-600 transition flex items-center gap-1 py-1 ${currentStep === 'landing' ? 'text-blue-600 font-bold' : ''}`}
        >
          Início
        </button>

        {isUserLoggedIn && (userPlan === 'monthly' || userPlan === 'annual') && onOpenDashboard && (
          <button
            onClick={onOpenDashboard}
            className={`hover:text-blue-600 transition flex items-center gap-1 py-1 ${currentStep === 'dashboard' ? 'text-blue-600 font-bold' : ''}`}
          >
            Meu Painel
          </button>
        )}

        <button
          onClick={() => onNavigateSection('secao-pilares')}
          className="hover:text-blue-600 transition flex items-center gap-1 py-1"
        >
          Como Funciona
        </button>

        <button
          onClick={() => onNavigateSection('secao-precos')}
          className="hover:text-blue-600 transition flex items-center gap-1 py-1"
        >
          Preços
        </button>

        <button
          onClick={onOpenFaq || (() => onNavigateSection('secao-faq'))}
          className={`hover:text-blue-600 transition flex items-center gap-1 py-1 ${currentStep === 'faq' ? 'text-blue-600 font-bold' : ''}`}
        >
          Perguntas Frequentes
        </button>
      </div>

      {/* Ações Dinâmicas */}
      <div className="flex items-center gap-2.5">
        {isUserLoggedIn ? (
          <div className="flex items-center gap-2">
            <span className={`hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full font-semibold border items-center gap-1 ${
              userPlan === 'free' 
                ? 'bg-slate-100 text-slate-700 border-slate-300' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <CheckCircle className="w-3.5 h-3.5" /> 
              {userPlan === 'free' ? 'Conta Gratuita' : userPlan === 'annual' ? 'Assinante Anual (Pro)' : 'Assinante Mensal'}
            </span>

            {userPlan === 'free' ? (
              <button
                onClick={onOpenCheckout}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5" /> Assinar Plano Completo
              </button>
            ) : (
              <button
                onClick={onOpenNewMeasurement}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" /> Nova Medição
              </button>
            )}

            <button
              onClick={onOpenAccountModal}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 border border-slate-200 transition"
              title="Configurações e Assinatura"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLoginModal}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition"
            >
              Entrar
            </button>
            <button 
              onClick={onStartAnalysis}
              className="text-xs md:text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30 transition flex items-center gap-1.5"
            >
              Analisar meu SSI gratuitamente <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
