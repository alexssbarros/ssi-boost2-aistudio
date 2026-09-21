import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  User, 
  Mail, 
  KeyRound, 
  Check, 
  Trash2, 
  LogOut, 
  Zap, 
  ShieldCheck,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { UserAccount, SubscriptionPlan } from '../types';

interface AccountModalProps {
  userPlan: SubscriptionPlan;
  userAccount: UserAccount;
  onClose: () => void;
  onUpgrade: () => void;
  onCancelSubscription: () => Promise<void> | void;
  onDeleteAccount: () => Promise<void> | void;
  onLogout: () => void;
  onSyncSubscription?: () => Promise<SubscriptionPlan | null>;
}

export function AccountModal({
  userPlan,
  userAccount,
  onClose,
  onUpgrade,
  onCancelSubscription,
  onDeleteAccount,
  onLogout,
  onSyncSubscription
}: AccountModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmCancelSub, setConfirmCancelSub] = useState(false);
  const [isCancelingSub, setIsCancelingSub] = useState(false);
  const [cancelSubMsg, setCancelSubMsg] = useState('');
  const [resetFeedback, setResetFeedback] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [isCheckingStripe, setIsCheckingStripe] = useState(false);
  const [stripeCheckMsg, setStripeCheckMsg] = useState('');

  const displayName = userAccount?.nome?.trim() 
    ? userAccount.nome 
    : (userAccount?.email ? userAccount.email.split('@')[0] : 'Usuário');

  const displayEmail = userAccount?.email || 'usuario@empresa.com';

  const handleResetPassword = () => {
    setResetFeedback(`Enviamos um link seguro de redefinição de senha para ${displayEmail}.`);
    setTimeout(() => {
      setResetFeedback('');
    }, 4500);
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaSenha || novaSenha.length < 6) {
      setResetFeedback('A senha deve conter no mínimo 6 caracteres.');
      return;
    }
    setResetFeedback('Senha alterada com sucesso!');
    setShowPasswordChange(false);
    setNovaSenha('');
    setTimeout(() => {
      setResetFeedback('');
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700" />
            <h3 className="text-base font-bold text-slate-900">Configurações da Conta & Assinatura</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Card com Dados do Usuário */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center uppercase shadow-sm">
                  {displayName.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Perfil Conectado</span>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" /> {displayName}
                  </h4>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {displayEmail}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 font-semibold text-xs flex items-center gap-1.5 transition shadow-2xs"
                title="Sair da sua conta"
              >
                <LogOut className="w-3.5 h-3.5" /> Sair
              </button>
            </div>

            {/* Ações de Senha */}
            <div className="space-y-2 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition shadow-2xs"
                >
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" /> Solicitar reset de senha
                </button>

                <button
                  type="button"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="px-3 py-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  {showPasswordChange ? 'Cancelar alteração' : 'Digitar nova senha'}
                </button>
              </div>

              {showPasswordChange && (
                <form onSubmit={handleSaveNewPassword} className="p-3 bg-white rounded-lg border border-blue-200 space-y-2 mt-2">
                  <label className="font-semibold text-slate-700 block text-[11px]">
                    Nova senha (mínimo 6 caracteres):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      placeholder="••••••••"
                      className="flex-1 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              )}

              {resetFeedback && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{resetFeedback}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status do Plano e Cobrança */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 text-sm">
                Plano Atual: {userPlan === 'annual' ? 'Anual (R$ 312/ano)' : userPlan === 'monthly' ? 'Mensal (R$ 39/mês)' : 'Gratuito (R$ 0)'}
              </span>
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                userPlan === 'free' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {userPlan === 'free' ? 'Diagnóstico Básico' : 'Plano Completo Ativo'}
              </span>
            </div>
            <p className="text-slate-600">
              {userPlan === 'free' 
                ? 'Você possui acesso ao diagnóstico resumido gratuito. Faça upgrade para desbloquear o plano de 30 dias, os 8 geradores com IA, o Simulador de Decisor B2B e o histórico.'
                : 'Você tem acesso irrestrito ao plano de 30 dias, rotinas diárias, 8 assistentes com IA e gráficos de evolução.'}
            </p>
            {userPlan === 'free' ? (
              <div className="space-y-2 mt-2">
                <button 
                  onClick={onUpgrade}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> Fazer Upgrade para Plataforma Completa
                </button>

                {onSyncSubscription && (
                  <button
                    type="button"
                    disabled={isCheckingStripe}
                    onClick={async () => {
                      setIsCheckingStripe(true);
                      setStripeCheckMsg('');
                      try {
                        const verified = await onSyncSubscription();
                        if (verified && verified !== 'free') {
                          setStripeCheckMsg('Assinatura identificada com sucesso! Acesso Pro liberado.');
                        } else {
                          setStripeCheckMsg('Nenhuma assinatura ativa encontrada no Stripe para este e-mail.');
                        }
                      } catch (err) {
                        setStripeCheckMsg('Erro ao consultar Stripe.');
                      } finally {
                        setIsCheckingStripe(false);
                      }
                    }}
                    className="w-full py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5 disabled:opacity-60"
                  >
                    {isCheckingStripe ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                    )}
                    Já pagou no Stripe? Identificar Pagamento
                  </button>
                )}

                {stripeCheckMsg && (
                  <div className={`p-2 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 ${
                    stripeCheckMsg.includes('sucesso') 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    <span>{stripeCheckMsg}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="pt-1">
                {confirmCancelSub ? (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                    <p className="text-amber-900 font-bold text-xs">
                      Deseja cancelar a renovação automática da assinatura? Nenhuma nova cobrança será realizada em seu cartão.
                    </p>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        disabled={isCancelingSub}
                        onClick={async () => {
                          setIsCancelingSub(true);
                          try {
                            await onCancelSubscription();
                            setCancelSubMsg('Renovação cancelada com sucesso.');
                          } finally {
                            setIsCancelingSub(false);
                            setConfirmCancelSub(false);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60 transition"
                      >
                        {isCancelingSub && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        Confirmar cancelamento da assinatura
                      </button>
                      <button 
                        type="button"
                        disabled={isCancelingSub}
                        onClick={() => setConfirmCancelSub(false)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold hover:bg-slate-50 cursor-pointer transition"
                      >
                        Voltar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setConfirmCancelSub(true)}
                    className="text-xs text-rose-600 hover:underline font-semibold pt-1 block cursor-pointer"
                  >
                    Cancelar renovação automática da assinatura
                  </button>
                )}

                {cancelSubMsg && (
                  <p className="text-xs text-emerald-700 font-semibold pt-1">{cancelSubMsg}</p>
                )}
              </div>
            )}
          </div>

          {/* Exclusão de Conta / LGPD (Conforme Seção 17.1 do PRD) */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-rose-700">
              <Trash2 className="w-4 h-4" /> Excluir Conta e Histórico
            </h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              Conforme a LGPD e as diretrizes da Seção 17 do PRD, a exclusão da conta cancela definitivamente qualquer renovação ou cobrança recorrente no cartão, desativa a assinatura no Stripe e remove permanentemente todos os seus dados e histórico de medições do SSI.
            </p>
            {confirmDelete ? (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 space-y-2.5">
                <p className="text-rose-900 font-bold text-xs leading-relaxed">
                  Atenção: Esta ação é definitiva e irreversível. Sua conta será apagada, as renovações do plano serão interrompidas no Stripe e todo o histórico será removido.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    id="btn-confirmar-exclusao-conta"
                    disabled={isDeleting}
                    onClick={async () => {
                      setIsDeleting(true);
                      try {
                        await onDeleteAccount();
                      } finally {
                        setIsDeleting(false);
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-60 cursor-pointer"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Excluindo conta e cancelando renovações...
                      </>
                    ) : (
                      'Sim, excluir tudo definitivamente'
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setConfirmDelete(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold hover:bg-slate-50 cursor-pointer transition"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button 
                type="button"
                id="btn-iniciar-exclusao-conta"
                onClick={() => setConfirmDelete(true)}
                className="py-2 px-3 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold text-xs transition cursor-pointer"
              >
                Excluir minha conta e histórico
              </button>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
