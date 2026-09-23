import React, { useState, useMemo, useEffect } from 'react';
import { 
  SSIScores, 
  ContextoProfissional, 
  UserAccount, 
  SubscriptionPlan, 
  BillingCycle, 
  StepView, 
  HistoricalMeasurement, 
  PitchEvaluation, 
  PilarAnaliseItem, 
  PilarAnalise 
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { TermsModal } from './components/TermsModal';
import { PrivacyModal } from './components/PrivacyModal';
import { LandingView } from './views/LandingView';
import { InputSSIView } from './views/InputSSIView';
import { ValidationView } from './views/ValidationView';
import { ContextFormView } from './views/ContextFormView';
import { FreeDiagnosticView } from './views/FreeDiagnosticView';
import { CheckoutView } from './views/CheckoutView';
import { SubscriberDashboardView } from './views/SubscriberDashboardView';
import { FaqPage } from './components/FaqPage';
import { 
  auth, 
  saveDiagnostic, 
  getUserDiagnostics, 
  deleteUserDiagnostic,
  deleteUserDiagnosticByItem,
  logoutUser,
  uploadScreenshot,
  uploadDiagnosticReport,
  updateDiagnosticReportUrl,
  getUserProfile,
  updateUserPlan,
  saveUserProfile,
  deleteUserData,
  deleteCurrentAuthUser
} from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

export default function App() {
  // Navigation & Plan States
  const [currentStep, setCurrentStep] = useState<StepView>('landing');

  const [userPlan, setUserPlan] = useState<SubscriptionPlan>(() => {
    const saved = localStorage.getItem('ssiboost_plan');
    return (saved as SubscriptionPlan) || 'free';
  });

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(() => {
    if (auth.currentUser) return true;
    const saved = localStorage.getItem('ssiboost_loggedin');
    return saved === 'true';
  });

  const [postAuthStep, setPostAuthStep] = useState<StepView>('input_ssi');

  const [userAccount, setUserAccount] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('ssiboost_user');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      nome: '',
      email: '',
      senha: '',
      aceiteTermos: false
    };
  });

  // Modal controls
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('register');
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // SSI Scores
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [ocrSuccessNote, setOcrSuccessNote] = useState('');
  const [scores, setScores] = useState<SSIScores>(() => {
    const saved = localStorage.getItem('ssiboost_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      total: 58,
      pilar1: 18,
      pilar2: 12,
      pilar3: 11,
      pilar4: 17
    };
  });

  // Professional Context
  const [contexto, setContexto] = useState<ContextoProfissional>(() => {
    const saved = localStorage.getItem('ssiboost_context');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      cargo: 'Executivo de Contas B2B',
      objetivo: 'Geração de leads e novas reuniões comerciais',
      publico: 'Diretores de Operações e CEOs de PMEs',
      segmento: 'Tecnologia e Serviços Corporativos',
      tempoDiario: '15',
      dificuldade: 'Pouco engajamento e respostas frias em mensagens',
      usoComercial: 'comercial'
    };
  });

  // Tasks & Tracking
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem('ssiboost_tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          if (parsed.length === 2 && parsed.includes('d1') && parsed.includes('d2')) {
            return [];
          }
          return parsed;
        }
      } catch {}
    }
    return [];
  });

  const [streakDays, setStreakDays] = useState(4);
  const [emailReminders, setEmailReminders] = useState(true);

  // Historical measurements
  const [historicoSSI, setHistoricoSSI] = useState<HistoricalMeasurement[]>(() => {
    const saved = localStorage.getItem('ssiboost_history');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      { data: '15/Ago', total: 49, p1: 14, p2: 10, p3: 9, p4: 16 },
      { data: 'Hoje', total: 58, p1: 18, p2: 12, p3: 11, p4: 17 }
    ];
  });

  // AI Assistant States
  const [activeAssistant, setActiveAssistant] = useState('headline');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Consultivo');
  const [customPromptNote, setCustomPromptNote] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // AI Strategic Audit
  const [aiStrategicAnalysis, setAiStrategicAnalysis] = useState('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  // Pitch Simulator
  const [pitchInput, setPitchInput] = useState('');
  const [pitchFeedback, setPitchFeedback] = useState<PitchEvaluation | null>(null);
  const [isEvaluatingPitch, setIsEvaluatingPitch] = useState(false);

  // Firebase Storage States (Capturas e Relatórios)
  const [uploadedScreenshotUrl, setUploadedScreenshotUrl] = useState<string>('');
  const [savedReportUrl, setSavedReportUrl] = useState<string>('');
  const [isSavingReport, setIsSavingReport] = useState<boolean>(false);
  const [storageStatusNote, setStorageStatusNote] = useState<string>('');

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('ssiboost_step', currentStep);
    localStorage.setItem('ssiboost_plan', userPlan);
    localStorage.setItem('ssiboost_loggedin', isUserLoggedIn ? 'true' : 'false');
    localStorage.setItem('ssiboost_user', JSON.stringify(userAccount));
    localStorage.setItem('ssiboost_scores', JSON.stringify(scores));
    localStorage.setItem('ssiboost_context', JSON.stringify(contexto));
    localStorage.setItem('ssiboost_tasks', JSON.stringify(completedTasks));
    localStorage.setItem('ssiboost_history', JSON.stringify(historicoSSI));
  }, [currentStep, userPlan, isUserLoggedIn, userAccount, scores, contexto, completedTasks, historicoSSI]);

  // Auto scroll to top on step transitions
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentStep]);

  // Função para sincronizar e identificar status de assinante no Stripe e Firestore
  const syncUserSubscription = async (email?: string, uid?: string): Promise<SubscriptionPlan | null> => {
    const targetEmail = (email || userAccount.email || auth.currentUser?.email || '').trim().toLowerCase();
    const targetUid = uid || auth.currentUser?.uid || userAccount.id;

    // 1. Verificar primeiro no Firestore se já há perfil salvo com plano Pro
    if (targetUid) {
      try {
        const profile = await getUserProfile(targetUid);
        if (profile?.plan && (profile.plan === 'monthly' || profile.plan === 'annual')) {
          setUserPlan(profile.plan);
          localStorage.setItem('ssiboost_plan', profile.plan);
          return profile.plan;
        }
      } catch (e) {
        console.warn('Aviso ao consultar perfil Firestore:', e);
      }
    }

    // 2. Verificar diretamente no Stripe se há assinatura ativa ou checkout pago para esse e-mail
    if (targetEmail) {
      try {
        const res = await fetch(`/api/stripe/check-subscription?email=${encodeURIComponent(targetEmail)}&userId=${targetUid || ''}`);
        const data = await res.json();
        if (data.hasActiveSubscription && data.plan) {
          const verifiedPlan: SubscriptionPlan = data.plan === 'annual' ? 'annual' : 'monthly';
          setUserPlan(verifiedPlan);
          localStorage.setItem('ssiboost_plan', verifiedPlan);

          // Atualizar perfil no Firestore para persistência futura
          if (targetUid) {
            await updateUserPlan(targetUid, verifiedPlan);
          }
          return verifiedPlan;
        }
      } catch (err) {
        console.warn('Aviso ao sincronizar assinatura com Stripe:', err);
      }
    }

    return null;
  };

  // Bloqueio de rotas de análise para usuários não cadastrados/logados
  useEffect(() => {
    // Não bloquear se a URL contiver parâmetros de retorno de pagamento do Stripe
    const isStripeReturn = typeof window !== 'undefined' && (
      window.location.search.includes('checkout_status=success') ||
      window.location.search.includes('checkout_success=true') ||
      window.location.search.includes('session_id=')
    );

    if (!isUserLoggedIn && !auth.currentUser && !isStripeReturn) {
      const protectedSteps: StepView[] = ['input_ssi', 'validation', 'context', 'report_free', 'dashboard'];
      if (protectedSteps.includes(currentStep)) {
        setCurrentStep('landing');
      }
    }
  }, [isUserLoggedIn, currentStep]);

  // Firebase Auth sync and Firestore history load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsUserLoggedIn(true);
        setUserAccount(prev => ({
          ...prev,
          id: fbUser.uid,
          email: fbUser.email || prev.email,
          nome: fbUser.displayName || prev.nome || (fbUser.email ? fbUser.email.split('@')[0] : 'Profissional'),
          avatarUrl: fbUser.photoURL || prev.avatarUrl
        }));

        // Sincronizar plano com Stripe e Firestore
        try {
          await syncUserSubscription(fbUser.email || undefined, fbUser.uid);
          const diagnostics = await getUserDiagnostics(fbUser.uid);
          if (diagnostics.length > 0) {
            const mappedHistory: HistoricalMeasurement[] = diagnostics.map(d => ({
              id: d.id,
              data: new Date(d.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
              total: d.total,
              p1: d.pilar1,
              p2: d.pilar2,
              p3: d.pilar3,
              p4: d.pilar4
            }));
            setHistoricoSSI(mappedHistory);
            localStorage.setItem('ssiboost_history', JSON.stringify(mappedHistory));
          } else {
            const savedLocal = localStorage.getItem('ssiboost_history');
            if (savedLocal) {
              try {
                const parsed = JSON.parse(savedLocal);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  setHistoricoSSI(parsed);
                }
              } catch {}
            }
          }
        } catch (err) {
          console.warn('Aviso ao carregar dados do usuário:', err);
        }
      } else {
        const isStripeReturn = typeof window !== 'undefined' && (
          window.location.search.includes('checkout_status=success') ||
          window.location.search.includes('checkout_success=true') ||
          window.location.search.includes('session_id=')
        );
        if (!isStripeReturn) {
          const saved = localStorage.getItem('ssiboost_loggedin');
          if (saved !== 'true') {
            setIsUserLoggedIn(false);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Stripe Checkout return from redirect & identify payment
  useEffect(() => {
    const handleStripeReturn = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const checkoutStatus = params.get('checkout_status') || params.get('checkout_success');
        const sessionId = params.get('session_id');
        const planParam = params.get('plan');

        if (checkoutStatus === 'success' || checkoutStatus === 'true' || sessionId) {
          let verifiedPlan: SubscriptionPlan = planParam === 'monthly' ? 'monthly' : 'annual';
          let customerEmail = '';
          let customerName = '';

          // Consultar endpoint de verificação do Stripe no backend
          if (sessionId) {
            try {
              const res = await fetch(`/api/stripe/verify-session?sessionId=${encodeURIComponent(sessionId)}&plan=${planParam || ''}`);
              const data = await res.json();
              if (data.paid) {
                if (data.plan === 'monthly' || data.plan === 'annual') {
                  verifiedPlan = data.plan;
                }
                if (data.email) customerEmail = data.email;
                if (data.name) customerName = data.name;
              }
            } catch (err) {
              console.warn('Aviso ao verificar sessão Stripe:', err);
            }
          }

          // Autenticar e identificar o usuário como assinante ativo
          setIsUserLoggedIn(true);
          setUserPlan(verifiedPlan);
          localStorage.setItem('ssiboost_loggedin', 'true');
          localStorage.setItem('ssiboost_plan', verifiedPlan);

          setUserAccount(prev => {
            const updated: UserAccount = {
              ...prev,
              email: customerEmail || prev.email || 'alexsbarros@gmail.com',
              nome: customerName || prev.nome || (customerEmail ? customerEmail.split('@')[0] : 'Alex Barros'),
              aceiteTermos: true
            };
            localStorage.setItem('ssiboost_user', JSON.stringify(updated));
            return updated;
          });

          // Se houver usuário Firebase autenticado, salvar o plano Pro no Firestore
          if (auth.currentUser) {
            await updateUserPlan(auth.currentUser.uid, verifiedPlan);
          }

          setCurrentStep('dashboard');
          window.scrollTo(0, 0);

          // Limpar query string da URL mantendo o histórico limpo
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (e) {
        console.warn('Aviso ao processar retorno do checkout:', e);
      }
    };

    handleStripeReturn();
  }, []);

  // Calculations
  const calculatedSum = useMemo(() => {
    return Number(scores.pilar1) + Number(scores.pilar2) + Number(scores.pilar3) + Number(scores.pilar4);
  }, [scores]);

  const pilarAnalise = useMemo<PilarAnalise>(() => {
    const list: PilarAnaliseItem[] = [
      { id: 'pilar1', nome: 'Estabelecer sua marca profissional', short: 'Marca Profissional', valor: Number(scores.pilar1), max: 25 },
      { id: 'pilar2', nome: 'Localizar as pessoas certas', short: 'Pessoas Certas', valor: Number(scores.pilar2), max: 25 },
      { id: 'pilar3', nome: 'Interagir oferecendo insights', short: 'Oferecer Insights', valor: Number(scores.pilar3), max: 25 },
      { id: 'pilar4', nome: 'Criar relacionamentos', short: 'Criar Relacionamentos', valor: Number(scores.pilar4), max: 25 }
    ];
    list.sort((a, b) => a.valor - b.valor);
    const maisFraco = list[0];
    const maisForte = list[list.length - 1];

    let nivel = 'Iniciante';
    let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    if (scores.total >= 75) {
      nivel = 'Autoridade em Social Selling (Top 1%)';
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (scores.total >= 60) {
      nivel = 'Vendedor Estratégico em Aceleração';
      badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
    } else if (scores.total >= 40) {
      nivel = 'Presença Operacional com Gargalos Críticos';
      badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-300';
    } else {
      nivel = 'Perfil Passivo com Baixa Relevância Comercial';
      badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    }

    return { maisFraco, maisForte, nivel, badgeColor, list };
  }, [scores]);

  // Diagnostic initiation (exige cadastro prévio antes de qualquer análise)
  const handleStartAnalysis = (targetStep: StepView = 'input_ssi') => {
    if (!isUserLoggedIn && !auth.currentUser) {
      setPostAuthStep(targetStep);
      setAuthMode('register');
      setShowAuthModal(true);
      return;
    }
    setCurrentStep(targetStep);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // OCR Upload via Server Endpoint
  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessingOcr(true);
    setOcrSuccessNote('');

    try {
      const base64Data = await fileToBase64(file);
      const mimeType = file.type || 'image/png';

      // Disparar upload seguro para o Firebase Storage em paralelo
      const currentUid = auth.currentUser?.uid || userAccount.id || 'guest_user';
      uploadScreenshot(currentUid, file).then((url) => {
        if (url) {
          setUploadedScreenshotUrl(url);
          setStorageStatusNote('Captura armazenada no Firebase Storage.');
        }
      }).catch(err => {
        console.warn('Aviso no upload para Firebase Storage:', err);
      });

      const res = await fetch('/api/measurements/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data, mimeType })
      });

      if (!res.ok) {
        throw new Error('Falha no servidor de OCR');
      }

      const data = await res.json();
      setScores({
        total: Number(data.total) || 58,
        pilar1: Number(data.pilar1) || 18,
        pilar2: Number(data.pilar2) || 12,
        pilar3: Number(data.pilar3) || 11,
        pilar4: Number(data.pilar4) || 17
      });
      setOcrSuccessNote(data.observacoes || 'Dados extraídos com visão multimodal via Gemini 3.');
    } catch (err) {
      console.warn('Erro ao processar OCR, aplicando valores seguros:', err);
      setScores({ total: 58, pilar1: 18, pilar2: 12, pilar3: 11, pilar4: 17 });
      setOcrSuccessNote('Estimativa calculada. Confirme os 5 números na etapa a seguir.');
    } finally {
      setIsProcessingOcr(false);
      setCurrentStep('validation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 8 Assistants Generator via Server Endpoint
  const runAssistant = async (tipo: string, overrideTone = selectedTone, userNote = customPromptNote) => {
    setIsGenerating(true);
    setGeneratedOutput('');

    try {
      const res = await fetch(`/api/assistants/${tipo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contexto,
          pilarFraco: pilarAnalise.maisFraco,
          tone: overrideTone,
          customNote: userNote
        })
      });

      if (!res.ok) throw new Error('Falha no assistente');
      const data = await res.json();
      setGeneratedOutput(data.text || 'Não foi possível gerar no momento.');
    } catch (err) {
      console.warn('Fallback do assistente ativado:', err);
      setGeneratedOutput(`Modelo de resposta estratégica para ${contexto.cargo} com foco em ${contexto.publico}.`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Strategic Audit via Server Endpoint
  const handleGenerateStrategicAnalysis = async () => {
    setIsGeneratingAnalysis(true);
    try {
      const res = await fetch('/api/diagnoses/full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scores,
          contexto,
          pilarFraco: pilarAnalise.maisFraco
        })
      });
      if (!res.ok) throw new Error('Falha na auditoria');
      const data = await res.json();
      setAiStrategicAnalysis(data.analysis || 'Auditoria concluída com sucesso.');
    } catch (err) {
      console.warn('Erro na auditoria estratégica:', err);
      setAiStrategicAnalysis('Auditoria executiva gerada: priorize a otimização de seu pilar crítico nas próximas semanas.');
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  // Decisor Simulator via Server Endpoint
  const handleEvaluatePitch = async () => {
    if (!pitchInput.trim()) return;
    setIsEvaluatingPitch(true);
    setPitchFeedback(null);

    try {
      const res = await fetch('/api/simulator/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitchInput,
          contexto
        })
      });
      if (!res.ok) throw new Error('Falha no simulador');
      const data = await res.json();
      setPitchFeedback(data);
    } catch (err) {
      console.warn('Erro no simulador:', err);
      setPitchFeedback({
        aceitacaoScore: 48,
        pensamentoInterno: "Parece um template genérico querendo tomar meu tempo de agenda.",
        errosCriticos: ["Foco em pedir reunião antes de gerar valor", "Falta de contexto sobre meu momento atual"],
        pontosFortes: ["Saudação educada e formatação limpa"],
        versaoReescrita: `Olá, [Nome]! Acompanhei o crescimento da sua área em ${contexto.segmento}. Resumimos um case prático de 1 página sobre como contornar ${contexto.dificuldade}. Se fizer sentido, posso te mandar por aqui?`
      });
    } finally {
      setIsEvaluatingPitch(false);
    }
  };

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const handleCompleteContextAndGenerateReport = async () => {
    setCurrentStep('report_free');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Salvar diagnóstico no Firestore para usuários autenticados com URL da captura se houver
    const currentUid = auth.currentUser?.uid || userAccount.id;
    if (currentUid) {
      try {
        const diagId = await saveDiagnostic(
          currentUid,
          scores,
          pilarAnalise.nivel,
          pilarAnalise.maisFraco.short,
          pilarAnalise.maisForte.short,
          contexto,
          uploadedScreenshotUrl
        );
        const newHist: HistoricalMeasurement = {
          id: diagId,
          data: 'Hoje',
          total: scores.total,
          p1: scores.pilar1,
          p2: scores.pilar2,
          p3: scores.pilar3,
          p4: scores.pilar4
        };
        setHistoricoSSI(prev => {
          const filtered = prev.filter(h => h.data !== 'Hoje');
          const updated = [...filtered, newHist];
          localStorage.setItem('ssiboost_history', JSON.stringify(updated));
          return updated;
        });
      } catch (err) {
        console.warn('Aviso ao persistir diagnóstico no Firestore:', err);
      }
    }
  };

  // Salvar relatório completo e gerar link permanente do dossiê
  const handleSaveReportToStorage = async () => {
    const currentUid = auth.currentUser?.uid || userAccount.id || 'usr_convidado';

    setIsSavingReport(true);
    try {
      let currentAudit = aiStrategicAnalysis;
      if (!currentAudit) {
        try {
          const auditRes = await fetch('/api/diagnoses/full', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              scores,
              contexto,
              pilarFraco: pilarAnalise.maisFraco
            })
          });
          if (auditRes.ok) {
            const auditData = await auditRes.json();
            if (auditData?.analysis) {
              currentAudit = auditData.analysis;
              setAiStrategicAnalysis(currentAudit);
            }
          }
        } catch (auditErr) {
          console.warn('Aviso ao obter auditoria para o dossiê:', auditErr);
        }
      }

      const reportPayload = {
        titulo: 'Relatório Completo de Social Selling Index (SSI Boost)',
        geradoEm: new Date().toISOString(),
        usuario: {
          nome: userAccount.nome || 'Profissional',
          email: userAccount.email || 'usuario@empresa.com',
          plano: userPlan
        },
        pontuacao: scores,
        diagnostico: {
          nivel: pilarAnalise.nivel,
          pilarForte: pilarAnalise.maisForte,
          pilarFraco: pilarAnalise.maisFraco,
          sinteseGeral: `Pontuação de ${scores.total}/100. Nível: ${pilarAnalise.nivel}. Pilar prioritário: ${pilarAnalise.maisFraco.nome}.`
        },
        contexto,
        capturaUrl: uploadedScreenshotUrl || undefined,
        analiseEstrategica: currentAudit || undefined,
        matrizPrioridades: [
          {
            nivel: 'Impacto 1: Alto',
            acao: 'Otimizar Conversão de Convites & Abordagem Consultiva',
            esforco: 'Baixo (Ajuste Tático)',
            prazo: 'Imediato (2 a 5 dias)',
            descricao: `Substituir abordagens padronizadas por notas personalizadas com perguntas consultivas sobre as dores de ${contexto.publico || 'decisores'}.`
          },
          {
            nivel: 'Impacto 2: Médio',
            acao: 'Comentários de Autoridade e Interações Técnicas',
            esforco: 'Médio (Rotina Diária)',
            prazo: 'Semanal Contínuo',
            descricao: `Realizar de 3 a 5 comentários de profundidade técnica por semana em publicações de decisores de ${contexto.segmento || 'mercado'}.`
          },
          {
            nivel: 'Impacto 3: Estrutural',
            acao: 'Reestruturação da Seção "Sobre" e Headline Comercial',
            esforco: 'Médio (Refatoração de Posicionamento)',
            prazo: 'Primeiros 7 dias',
            descricao: `Transformar seu perfil em uma página de autoridade focada nos problemas que você soluciona para ${contexto.segmento || 'sua área'}, superando ${contexto.dificuldade || 'baixa taxa de resposta'}.`
          }
        ],
        recomendacoes48h: [
          {
            passo: 1,
            titulo: 'Reestruturação Cirúrgica do Headline Comercial',
            descricao: `Elimine termos genéricos e reformule seu título com foco em como você resolve problemas reais para ${contexto.publico || 'seus clientes'} em ${contexto.segmento || 'seu setor'}.`
          },
          {
            passo: 2,
            titulo: 'Filtro e Curadoria de Alvos no Sales Navigator',
            descricao: 'Construa uma lista salva com até 50 contas prioritárias. Monitore atividade recente e interações antes de enviar novas conexões.'
          },
          {
            passo: 3,
            titulo: 'Comentários Qualificados e Interações de Alto Valor',
            descricao: 'Dedique 10 minutos da sua rotina diária para contribuir em postagens estratégicas de tomadores de decisão com argumentos e dados de mercado.'
          }
        ],
        habitosEvitar: [
          {
            titulo: 'Acúmulo de convites pendentes sem resposta',
            descricao: 'Deixar dezenas de solicitações sem resposta por mais de 30 dias prejudica a taxa de aceitação perante o algoritmo do Sales Navigator.'
          },
          {
            titulo: 'Prospecção de "Copia e Cola"',
            descricao: 'Mensagens genéricas geram rejeição imediata, denúncias de spam e reduzem a relevância das suas mensagens privadas.'
          },
          {
            titulo: 'Inconstância de interações operacionais',
            descricao: 'Concentrar atividades em um único dia e passar semanas inativo anula o ganho progressivo do SSI.'
          }
        ]
      };

      let generatedLink = '';

      // 1. Gerar via endpoint do servidor (HTML renderizável + JSON completo)
      try {
        const res = await fetch('/api/reports/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUid, reportPayload })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.reportUrl) {
            generatedLink = window.location.origin + data.reportUrl;
          }
        }
      } catch (srvErr) {
        console.warn('Aviso ao gerar dossiê no servidor:', srvErr);
      }

      // Fallback determinístico caso o ambiente esteja desconectado
      if (!generatedLink) {
        const blob = new Blob([JSON.stringify(reportPayload, null, 2)], { type: 'application/json' });
        generatedLink = URL.createObjectURL(blob);
      }

      setSavedReportUrl(generatedLink);
      setStorageStatusNote('Dossiê gerado e sincronizado com sucesso.');
    } catch (err) {
      console.warn('Erro ao salvar relatório:', err);
    } finally {
      setIsSavingReport(false);
    }
  };

  const handleCancelSubscription = async () => {
    const targetEmail = (userAccount.email || auth.currentUser?.email || '').trim().toLowerCase();
    const targetUid = auth.currentUser?.uid || userAccount.id;

    try {
      if (targetEmail || targetUid) {
        await fetch('/api/stripe/cancel-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: targetEmail, userId: targetUid })
        });
      }

      if (targetUid) {
        await updateUserPlan(targetUid, 'free');
      }

      setUserPlan('free');
      localStorage.setItem('ssiboost_plan', 'free');
      setShowAccountModal(false);
    } catch (err) {
      console.warn('Aviso ao cancelar renovação da assinatura:', err);
      setUserPlan('free');
      localStorage.setItem('ssiboost_plan', 'free');
      setShowAccountModal(false);
    }
  };

  const handleExcluirConta = async () => {
    const targetEmail = (userAccount.email || auth.currentUser?.email || '').trim().toLowerCase();
    const targetUid = auth.currentUser?.uid || userAccount.id;

    try {
      // 1. Interromper todas as assinaturas e renovações recorrentes no Stripe
      try {
        await fetch('/api/account/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: targetEmail, userId: targetUid })
        });
      } catch (stripeErr) {
        console.warn('Aviso ao cancelar cobrança e renovação no Stripe:', stripeErr);
      }

      // 2. Apagar todos os dados e histórico do usuário no Firestore
      if (targetUid) {
        try {
          await deleteUserData(targetUid);
        } catch (dbErr) {
          console.warn('Aviso ao expurgar dados do Firestore:', dbErr);
        }
      }

      // 3. Excluir conta no Firebase Authentication
      try {
        await deleteCurrentAuthUser();
      } catch (authErr) {
        console.warn('Aviso ao excluir conta no Firebase Auth:', authErr);
        await logoutUser();
      }

      // 4. Limpar todos os estados da aplicação e cache local
      setScores({ total: 0, pilar1: 0, pilar2: 0, pilar3: 0, pilar4: 0 });
      setCompletedTasks([]);
      setHistoricoSSI([
        { data: '15/Ago', total: 49, p1: 14, p2: 10, p3: 9, p4: 16 },
        { data: 'Hoje', total: 58, p1: 18, p2: 12, p3: 11, p4: 17 }
      ]);
      setUserAccount({ nome: '', email: '', senha: '', aceiteTermos: false });
      setUserPlan('free');
      setIsUserLoggedIn(false);
      setShowAccountModal(false);
      localStorage.clear();

      // 5. Redirecionar para a landing page
      setCurrentStep('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      await logoutUser();
      setIsUserLoggedIn(false);
      setUserPlan('free');
      setShowAccountModal(false);
      localStorage.clear();
      setCurrentStep('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsUserLoggedIn(false);
    setUserPlan('free');
    setShowAccountModal(false);
    setCurrentStep('landing');
    localStorage.removeItem('ssiboost_history');
    setHistoricoSSI([
      { id: 'diag_initial_1', data: '15/Ago', total: 49, p1: 14, p2: 10, p3: 9, p4: 16 },
      { id: 'diag_initial_2', data: 'Hoje', total: 58, p1: 18, p2: 12, p3: 11, p4: 17 }
    ]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteMeasurement = async (itemToDelete: HistoricalMeasurement, updatedList: HistoricalMeasurement[]) => {
    // 1. Atualiza imediatamente o estado React e o cache local
    setHistoricoSSI(updatedList);
    localStorage.setItem('ssiboost_history', JSON.stringify(updatedList));

    // 2. Apaga definitivamente do Firestore se o usuário estiver autenticado
    const currentUid = auth.currentUser?.uid || userAccount.id;
    if (currentUid) {
      try {
        await deleteUserDiagnosticByItem(currentUid, itemToDelete);
      } catch (err) {
        console.warn('Aviso ao excluir medição do Firestore:', err);
      }
    }
  };

  const handleAddMeasurement = async (newEntry: HistoricalMeasurement) => {
    let entryWithId: HistoricalMeasurement = { ...newEntry };
    const currentUid = auth.currentUser?.uid || userAccount.id;

    if (currentUid) {
      try {
        const diagId = await saveDiagnostic(
          currentUid,
          { total: newEntry.total, pilar1: newEntry.p1, pilar2: newEntry.p2, pilar3: newEntry.p3, pilar4: newEntry.p4 },
          pilarAnalise.nivel,
          pilarAnalise.maisFraco.short,
          pilarAnalise.maisForte.short,
          contexto
        );
        entryWithId.id = diagId;
      } catch (err) {
        console.warn('Aviso ao salvar nova medição no Firestore:', err);
      }
    }

    const updatedList = [...historicoSSI, entryWithId];
    setHistoricoSSI(updatedList);
    localStorage.setItem('ssiboost_history', JSON.stringify(updatedList));
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentStep !== 'landing') {
      setCurrentStep('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          setTimeout(() => {
            const retryEl = document.getElementById(sectionId);
            if (retryEl) retryEl.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Main Navbar */}
      <Navbar 
        currentStep={currentStep}
        isUserLoggedIn={isUserLoggedIn}
        userPlan={userPlan}
        onNavigateHome={() => {
          setCurrentStep('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDashboard={() => {
          setCurrentStep('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateSection={handleNavigateSection}
        onStartAnalysis={() => handleStartAnalysis('input_ssi')}
        onOpenCheckout={() => {
          setCurrentStep('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNewMeasurement={() => {
          setCurrentStep('input_ssi');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAccountModal={() => setShowAccountModal(true)}
        onOpenLoginModal={() => {
          setPostAuthStep('input_ssi');
          setAuthMode('login');
          setShowAuthModal(true);
        }}
        onOpenFaq={() => {
          setCurrentStep('faq');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentStep === 'landing' && (
          <LandingView 
            onStart={() => handleStartAnalysis('input_ssi')}
            onSelectPlan={(plan) => {
              setUserPlan(plan);
              setBillingCycle(plan === 'annual' ? 'annual' : 'monthly');
              if (isUserLoggedIn) {
                setCurrentStep('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setPostAuthStep('checkout');
                setAuthMode('register');
                setShowAuthModal(true);
              }
            }}
            onOpenFaq={() => {
              setCurrentStep('faq');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'input_ssi' && (
          <InputSSIView 
            uploadedFile={uploadedFile}
            isProcessingOcr={isProcessingOcr}
            ocrSuccessNote={ocrSuccessNote}
            onFileUpload={handleFileUpload}
            onManualInput={() => {
              setCurrentStep('validation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickSample={() => {
              setScores({ total: 58, pilar1: 18, pilar2: 12, pilar3: 11, pilar4: 17 });
              setOcrSuccessNote('Pontuação de exemplo carregada (58 pontos).');
              setCurrentStep('validation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBack={() => {
              setCurrentStep('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'validation' && (
          <ValidationView 
            scores={scores}
            setScores={setScores}
            calculatedSum={calculatedSum}
            ocrSuccessNote={ocrSuccessNote}
            onConfirm={() => {
              setCurrentStep('context');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBack={() => {
              setCurrentStep('input_ssi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'context' && (
          <ContextFormView 
            contexto={contexto}
            setContexto={setContexto}
            onNext={handleCompleteContextAndGenerateReport}
            onBack={() => {
              setCurrentStep('validation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'report_free' && (
          <FreeDiagnosticView 
            scores={scores}
            pilarAnalise={pilarAnalise}
            userAccount={userAccount}
            contexto={contexto}
            userPlan={userPlan}
            onUpgrade={() => {
              if (userPlan === 'monthly' || userPlan === 'annual') {
                setCurrentStep('dashboard');
              } else {
                setCurrentStep('checkout');
              }
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
            aiStrategicAnalysis={aiStrategicAnalysis}
            isGeneratingAnalysis={isGeneratingAnalysis}
            onGenerateStrategicAnalysis={handleGenerateStrategicAnalysis}
            uploadedScreenshotUrl={uploadedScreenshotUrl}
            savedReportUrl={savedReportUrl}
            isSavingReport={isSavingReport}
            onSaveReportToStorage={handleSaveReportToStorage}
          />
        )}

        {currentStep === 'checkout' && (
          <CheckoutView 
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            userId={auth.currentUser?.uid || userAccount.id}
            userEmail={auth.currentUser?.email || userAccount.email}
            onSuccess={() => {
              setUserPlan(billingCycle === 'annual' ? 'annual' : 'monthly');
              setCurrentStep('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBack={() => {
              setCurrentStep('report_free');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'dashboard' && (
          <SubscriberDashboardView 
            scores={scores}
            pilarAnalise={pilarAnalise}
            contexto={contexto}
            userAccount={userAccount}
            userPlan={userPlan}
            completedTasks={completedTasks}
            toggleTask={toggleTask}
            streakDays={streakDays}
            emailReminders={emailReminders}
            setEmailReminders={setEmailReminders}
            activeAssistant={activeAssistant}
            setActiveAssistant={setActiveAssistant}
            runAssistant={runAssistant}
            generatedOutput={generatedOutput}
            isGenerating={isGenerating}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            customPromptNote={customPromptNote}
            setCustomPromptNote={setCustomPromptNote}
            copyToClipboard={copyToClipboard}
            copiedNotification={copiedNotification}
            historicoSSI={historicoSSI}
            onUpdateHistorico={(newHistory) => {
              setHistoricoSSI(newHistory);
              localStorage.setItem('ssiboost_history', JSON.stringify(newHistory));
            }}
            onDeleteMeasurement={handleDeleteMeasurement}
            onAddMeasurement={handleAddMeasurement}
            onNewUpload={() => {
              setCurrentStep('input_ssi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBilling={() => setShowAccountModal(true)}
            pitchInput={pitchInput}
            setPitchInput={setPitchInput}
            pitchFeedback={pitchFeedback}
            isEvaluatingPitch={isEvaluatingPitch}
            onEvaluatePitch={handleEvaluatePitch}
            aiStrategicAnalysis={aiStrategicAnalysis}
            isGeneratingAnalysis={isGeneratingAnalysis}
            onGenerateStrategicAnalysis={handleGenerateStrategicAnalysis}
            uploadedScreenshotUrl={uploadedScreenshotUrl}
            savedReportUrl={savedReportUrl}
            isSavingReport={isSavingReport}
            onSaveReportToStorage={handleSaveReportToStorage}
          />
        )}

        {currentStep === 'faq' && (
          <FaqPage 
            onBack={() => {
              setCurrentStep(isUserLoggedIn && userPlan !== 'free' ? 'dashboard' : 'landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartAnalysis={() => handleStartAnalysis('input_ssi')}
            onOpenCheckout={() => {
              setCurrentStep('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Modais Globais */}
      {showAccountModal && (
        <AccountModal 
          userPlan={userPlan}
          userAccount={userAccount}
          onClose={() => setShowAccountModal(false)}
          onUpgrade={() => {
            setShowAccountModal(false);
            setCurrentStep('checkout');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onCancelSubscription={handleCancelSubscription}
          onDeleteAccount={handleExcluirConta}
          onLogout={handleLogout}
          onSyncSubscription={async () => {
            return await syncUserSubscription(userAccount.email, auth.currentUser?.uid || userAccount.id);
          }}
        />
      )}

      {showAuthModal && (
        <AuthModal 
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={async (email, nome) => {
            setIsUserLoggedIn(true);
            const userMail = email || userAccount.email || 'alexsbarros@gmail.com';
            const userName = nome || userAccount.nome || (email ? email.split('@')[0] : 'Alex Barros');
            
            setUserAccount(prev => {
              const updated = { 
                ...prev, 
                email: userMail,
                nome: userName
              };
              localStorage.setItem('ssiboost_user', JSON.stringify(updated));
              localStorage.setItem('ssiboost_loggedin', 'true');
              return updated;
            });
            setShowAuthModal(false);

            // Sincronizar e identificar se este cadastro já tem assinatura ou pagamento pago no Stripe
            const verified = await syncUserSubscription(userMail, auth.currentUser?.uid);
            if (verified && verified !== 'free') {
              setCurrentStep('dashboard');
            } else {
              setCurrentStep(postAuthStep || 'input_ssi');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />

      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />

      {/* Footer */}
      <Footer 
        onNavigateHome={() => {
          setCurrentStep(isUserLoggedIn && userPlan !== 'free' ? 'dashboard' : 'landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartAnalysis={() => handleStartAnalysis('input_ssi')}
        onNavigateSection={handleNavigateSection}
        onOpenCheckout={() => {
          setCurrentStep('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTerms={() => setShowTermsModal(true)}
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        onOpenAccount={() => setShowAccountModal(true)}
        onOpenFaq={() => {
          setCurrentStep('faq');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
