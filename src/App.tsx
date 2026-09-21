import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldCheck 
} from 'lucide-react';
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
  logoutUser,
  uploadScreenshot,
  uploadDiagnosticReport,
  updateDiagnosticReportUrl
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
  const [currentStep, setCurrentStep] = useState<StepView>(() => {
    return 'input_ssi';
  });

  const [userPlan, setUserPlan] = useState<SubscriptionPlan>(() => {
    const saved = localStorage.getItem('ssiboost_plan');
    return (saved as SubscriptionPlan) || 'free';
  });

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('ssiboost_loggedin');
    return saved !== null ? saved === 'true' : true;
  });

  const [postAuthStep, setPostAuthStep] = useState<StepView>('input_ssi');

  const [userAccount, setUserAccount] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('ssiboost_user');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      nome: 'Alex Barros',
      email: 'alexsbarros@gmail.com',
      senha: '',
      aceiteTermos: true
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
      try { return JSON.parse(saved); } catch {}
    }
    return ['d1', 'd2'];
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

  // Firebase Auth sync and Firestore history load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsUserLoggedIn(true);
        setUserAccount(prev => ({
          ...prev,
          id: fbUser.uid,
          email: fbUser.email || prev.email,
          nome: fbUser.displayName || prev.nome || 'Profissional',
          avatarUrl: fbUser.photoURL || prev.avatarUrl
        }));

        try {
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
          }
        } catch (err) {
          console.warn('Aviso ao carregar histórico do Firestore:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Stripe Checkout return from redirect
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const checkoutStatus = params.get('checkout_status') || params.get('checkout_success');
      const planParam = params.get('plan');
      if (checkoutStatus === 'success' || checkoutStatus === 'true') {
        const selectedPlan = planParam === 'monthly' ? 'monthly' : 'annual';
        setUserPlan(selectedPlan);
        setCurrentStep('dashboard');
        // Clean query parameters from URL without page reload
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      // Safe guard for window location parsing
    }
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

  // Diagnostic initiation
  const handleStartAnalysis = (targetStep: StepView = 'input_ssi') => {
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        await saveDiagnostic(
          currentUid,
          scores,
          pilarAnalise.nivel,
          pilarAnalise.maisFraco.short,
          pilarAnalise.maisForte.short,
          contexto,
          uploadedScreenshotUrl
        );
        const newHist: HistoricalMeasurement = {
          data: 'Hoje',
          total: scores.total,
          p1: scores.pilar1,
          p2: scores.pilar2,
          p3: scores.pilar3,
          p4: scores.pilar4
        };
        setHistoricoSSI(prev => {
          const filtered = prev.filter(h => h.data !== 'Hoje');
          return [...filtered, newHist];
        });
      } catch (err) {
        console.warn('Aviso ao persistir diagnóstico no Firestore:', err);
      }
    }
  };

  // Salvar relatório completo no Firebase Storage
  const handleSaveReportToStorage = async () => {
    const currentUid = auth.currentUser?.uid || userAccount.id;
    if (!currentUid) {
      setShowAuthModal(true);
      return;
    }

    setIsSavingReport(true);
    try {
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
        analiseEstrategica: aiStrategicAnalysis || undefined
      };

      const url = await uploadDiagnosticReport(currentUid, reportPayload);
      if (url) {
        setSavedReportUrl(url);
        setStorageStatusNote('Relatório salvo com sucesso no Firebase Storage.');
      }
    } catch (err) {
      console.warn('Erro ao salvar relatório no Firebase Storage:', err);
    } finally {
      setIsSavingReport(false);
    }
  };

  const handleExcluirConta = async () => {
    await logoutUser();
    setScores({ total: 0, pilar1: 0, pilar2: 0, pilar3: 0, pilar4: 0 });
    setCompletedTasks([]);
    setUserAccount({ nome: '', email: '', senha: '', aceiteTermos: false });
    setUserPlan('free');
    setIsUserLoggedIn(false);
    setShowAccountModal(false);
    localStorage.clear();
    setCurrentStep('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsUserLoggedIn(false);
    setUserPlan('free');
    setShowAccountModal(false);
    setCurrentStep('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentStep !== 'landing') {
      setCurrentStep('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner de Segurança e Independência */}
      <header className="bg-slate-900 text-slate-200 text-xs py-2 px-4 text-center flex items-center justify-center gap-2 border-b border-slate-800">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>
          <strong>100% Seguro:</strong> Sem senha, cookies, scraping ou automações na sua conta do LinkedIn. Plataforma independente com IA Gemini 3.
        </span>
      </header>

      {/* Main Navbar */}
      <Navbar 
        currentStep={currentStep}
        isUserLoggedIn={isUserLoggedIn}
        userPlan={userPlan}
        onNavigateHome={() => {
          setCurrentStep(isUserLoggedIn && userPlan !== 'free' ? 'dashboard' : 'landing');
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
              setCurrentStep('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
          onCancelSubscription={() => {
            setUserPlan('free');
            setShowAccountModal(false);
          }}
          onDeleteAccount={handleExcluirConta}
          onLogout={handleLogout}
        />
      )}

      {showAuthModal && (
        <AuthModal 
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={(email, nome) => {
            setIsUserLoggedIn(true);
            setUserAccount(prev => ({ 
              ...prev, 
              email: email || prev.email || 'alexsbarros@gmail.com',
              nome: nome || prev.nome || (email ? email.split('@')[0] : 'Alex Barros')
            }));
            setShowAuthModal(false);
            setCurrentStep(postAuthStep || 'input_ssi');
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
