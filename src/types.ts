export type PilarKey = 'pilar1' | 'pilar2' | 'pilar3' | 'pilar4';

export interface PilarDetail {
  id: PilarKey;
  nome: string;
  short: string;
  cor: string;
  descricao: string;
}

export interface SSIScores {
  total: number;
  pilar1: number;
  pilar2: number;
  pilar3: number;
  pilar4: number;
}

export interface PilarAnaliseItem {
  id: PilarKey;
  nome: string;
  short: string;
  valor: number;
  max: number;
}

export interface PilarAnalise {
  maisFraco: PilarAnaliseItem;
  maisForte: PilarAnaliseItem;
  nivel: string;
  badgeColor: string;
  list: PilarAnaliseItem[];
}

export interface ContextoProfissional {
  cargo: string;
  objetivo: string;
  publico: string;
  segmento: string;
  tempoDiario: '10' | '15' | '30';
  dificuldade: string;
  usoComercial: 'comercial' | 'individual';
}

export interface UserAccount {
  id?: string;
  nome: string;
  email: string;
  senha?: string;
  aceiteTermos: boolean;
  avatarUrl?: string;
}

export type SubscriptionPlan = 'free' | 'monthly' | 'annual';
export type BillingCycle = 'monthly' | 'annual';

export interface PlanTask {
  id: string;
  dia: number;
  titulo: string;
  tempo: number;
  pilar: string;
  desc: string;
  motivo: string;
}

export interface PlanCycle {
  ciclo: number;
  nome: string;
  dias: string;
  foco: string;
  tarefas: PlanTask[];
}

export interface HistoricalMeasurement {
  id?: string;
  data: string;
  total: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  status?: string;
}

export interface PitchEvaluation {
  aceitacaoScore: number;
  pensamentoInterno: string;
  errosCriticos: string[];
  pontosFortes?: string[];
  versaoReescrita: string;
}

export type StepView =
  | 'landing'
  | 'input_ssi'
  | 'validation'
  | 'context'
  | 'report_free'
  | 'checkout'
  | 'dashboard'
  | 'faq';
