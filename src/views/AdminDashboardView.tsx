import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  Crown, 
  Search, 
  RefreshCw, 
  ArrowUpDown, 
  Calendar, 
  Mail, 
  FileImage, 
  ExternalLink, 
  X, 
  Check, 
  TrendingUp, 
  Eye, 
  Download, 
  AlertCircle,
  BarChart3,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  AdminUserRecord, 
  SubscriptionPlan, 
  ADMIN_UID 
} from '../types';
import { 
  getAllUsersForAdmin, 
  getUserDiagnosticsForAdmin, 
  updateUserPlanByAdmin,
  StoredDiagnostic 
} from '../lib/firebase';

interface AdminDashboardViewProps {
  onSwitchToUserDashboard: () => void;
  onLogout: () => void;
  adminEmail?: string;
  adminUid?: string;
}

export function AdminDashboardView({
  onSwitchToUserDashboard,
  onLogout,
  adminEmail = 'alexsbarros@gmail.com',
  adminUid = ADMIN_UID
}: AdminDashboardViewProps) {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [userDiagnosticsMap, setUserDiagnosticsMap] = useState<Record<string, StoredDiagnostic[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'monthly' | 'annual'>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [selectedDiagnostics, setSelectedDiagnostics] = useState<StoredDiagnostic[]>([]);
  const [isLoadingDiagnostics, setIsLoadingDiagnostics] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const [planUpdateSuccess, setPlanUpdateSuccess] = useState('');

  // Carrega todos os usuários e a contagem de arquivos enviados
  const loadData = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await getAllUsersForAdmin();
      
      // Carregar diagnósticos de cada usuário para obter arquivos e contagem precisa
      const diagMap: Record<string, StoredDiagnostic[]> = {};
      const enrichedUsers: AdminUserRecord[] = [];

      for (const u of fetchedUsers) {
        try {
          const userDiags = await getUserDiagnosticsForAdmin(u.id);
          diagMap[u.id] = userDiags;
          
          // Contagem de arquivos: capturas de tela + relatórios gerados
          let fileCount = 0;
          userDiags.forEach(d => {
            if (d.screenshotUrl) fileCount += 1;
            if (d.reportUrl) fileCount += 1;
            // Se não tiver URL externa mas for uma medição persistida, conta como envio válido
            if (!d.screenshotUrl && !d.reportUrl) fileCount += 1;
          });

          enrichedUsers.push({
            ...u,
            filesCount: fileCount
          });
        } catch {
          enrichedUsers.push({
            ...u,
            filesCount: 0
          });
        }
      }

      setUserDiagnosticsMap(diagMap);
      setUsers(enrichedUsers);
    } catch (err) {
      console.error('Erro ao carregar dados administrativos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Selecionar usuário e carregar detalhamento
  const handleSelectUser = async (user: AdminUserRecord) => {
    setSelectedUser(user);
    setIsLoadingDiagnostics(true);
    try {
      // Se já temos no mapa, usa imediatamente; senão consulta
      if (userDiagnosticsMap[user.id]) {
        setSelectedDiagnostics(userDiagnosticsMap[user.id]);
      } else {
        const diags = await getUserDiagnosticsForAdmin(user.id);
        setSelectedDiagnostics(diags);
        setUserDiagnosticsMap(prev => ({ ...prev, [user.id]: diags }));
      }
    } catch (err) {
      console.error('Erro ao carregar detalhes do usuário:', err);
    } finally {
      setIsLoadingDiagnostics(false);
    }
  };

  // Alterar plano de um usuário pelo Admin
  const handleUpdatePlan = async (newPlan: SubscriptionPlan) => {
    if (!selectedUser) return;
    setIsUpdatingPlan(true);
    setPlanUpdateSuccess('');

    try {
      const success = await updateUserPlanByAdmin(selectedUser.id, newPlan);
      if (success) {
        // Atualiza estado local
        setSelectedUser(prev => prev ? { ...prev, plan: newPlan } : null);
        setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, plan: newPlan } : u));
        setPlanUpdateSuccess(`Plano alterado com sucesso para "${newPlan.toUpperCase()}"!`);
        setTimeout(() => setPlanUpdateSuccess(''), 3500);
      }
    } catch (err) {
      console.error('Erro ao atualizar plano do usuário:', err);
    } finally {
      setIsUpdatingPlan(false);
    }
  };

  // Métricas agregadas da plataforma
  const platformStats = useMemo(() => {
    const totalUsers = users.length;
    let totalFiles = 0;
    let proUsersCount = 0;
    let allSsiScores: number[] = [];

    users.forEach(u => {
      totalFiles += u.filesCount || 0;
      if (u.plan === 'monthly' || u.plan === 'annual') proUsersCount += 1;
    });

    Object.values(userDiagnosticsMap).forEach(diagList => {
      diagList.forEach(d => {
        if (typeof d.total === 'number') allSsiScores.push(d.total);
      });
    });

    const avgSsi = allSsiScores.length > 0 
      ? Math.round(allSsiScores.reduce((a, b) => a + b, 0) / allSsiScores.length) 
      : 0;

    return {
      totalUsers,
      totalFiles,
      proUsersCount,
      freeUsersCount: totalUsers - proUsersCount,
      avgSsi,
      totalDiagnostics: allSsiScores.length
    };
  }, [users, userDiagnosticsMap]);

  // Filtro e Busca
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.nome?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlan = 
        planFilter === 'all' || 
        u.plan === planFilter;

      return matchesSearch && matchesPlan;
    });
  }, [users, searchQuery, planFilter]);

  // Exportar dados para CSV
  const handleExportCsv = () => {
    const headers = ['ID', 'Nome', 'Email', 'Plano', 'Data Criacao', 'Total Arquivos'];
    const rows = filteredUsers.map(u => [
      `"${u.id}"`,
      `"${u.nome || ''}"`,
      `"${u.email || ''}"`,
      `"${u.plan}"`,
      `"${u.createdAt || ''}"`,
      u.filesCount || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ssiboost_usuarios_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Data não informada';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Banner Superior Exclusivo de Administrador */}
      <div className="bg-purple-950/80 border-b border-purple-800/60 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/30 border border-purple-400/50 text-purple-200 text-xs font-black uppercase tracking-wider shadow-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
            <span>Painel do Administrador</span>
          </div>
          <span className="text-xs text-purple-300/80 hidden sm:inline">
            Modo Super-Admin Ativo (Acesso Completo ao Firestore)
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-purple-300/70 bg-purple-900/50 px-3 py-1 rounded-lg border border-purple-700/50">
            <span>Admin UID:</span>
            <span className="text-purple-200 font-bold">{adminUid}</span>
          </div>

          <button
            onClick={onSwitchToUserDashboard}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Ver como Usuário</span>
          </button>

          <button
            onClick={onLogout}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/50 transition"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-6 flex-1">
        {/* Cabeçalho da Visão Admin */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Gestão Geral da Plataforma SSI Boost
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                ADMIN
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Controle de usuários cadastrados, auditoria de arquivos e capturas de tela enviadas em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-purple-400' : 'text-slate-400'}`} />
              <span>Atualizar Dados</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 transition shadow-md shadow-purple-600/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Métricas e KPIs da Plataforma */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Total de Usuários</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-black text-white">
              {isLoading ? '...' : platformStats.totalUsers}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Contas cadastradas no Firestore
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Arquivos e Relatórios</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <FileImage className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-black text-white">
              {isLoading ? '...' : platformStats.totalFiles}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Capturas enviadas e relatórios gerados
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Assinantes Pro</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Crown className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-black text-emerald-400">
              {isLoading ? '...' : platformStats.proUsersCount}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {platformStats.freeUsersCount} usuários no plano gratuito
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Média Global SSI</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-black text-amber-400">
              {isLoading ? '...' : `${platformStats.avgSsi} pts`}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Baseado em {platformStats.totalDiagnostics} diagnósticos
            </div>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar usuário por nome, e-mail ou UID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:inline" />
            <button
              onClick={() => setPlanFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                planFilter === 'all' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Todos ({users.length})
            </button>
            <button
              onClick={() => setPlanFilter('free')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                planFilter === 'free' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Gratuito ({users.filter(u => u.plan === 'free').length})
            </button>
            <button
              onClick={() => setPlanFilter('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                planFilter === 'monthly' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Pro Mensal ({users.filter(u => u.plan === 'monthly').length})
            </button>
            <button
              onClick={() => setPlanFilter('annual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                planFilter === 'annual' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              Pro Anual ({users.filter(u => u.plan === 'annual').length})
            </button>
          </div>
        </div>

        {/* Tabela de Usuários */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white">
                Lista Geral de Usuários ({filteredUsers.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Clique em uma linha para abrir a visualização detalhada dos arquivos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Usuário</th>
                  <th className="py-3 px-4">E-mail</th>
                  <th className="py-3 px-4">Data de Criação</th>
                  <th className="py-3 px-4 text-center">Plano</th>
                  <th className="py-3 px-4 text-center">Arquivos Enviados</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
                        <span>Carregando base de usuários do Firestore...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Nenhum usuário encontrado com os filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr 
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="hover:bg-slate-700/50 cursor-pointer transition group"
                    >
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center text-xs border border-purple-500/40 shrink-0">
                            {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span>{user.nome || 'Sem Nome'}</span>
                              {user.id === ADMIN_UID && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-purple-500/30 text-purple-300 border border-purple-400/50">
                                  ADMIN
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">UID: {user.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{user.email || 'Não informado'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          user.plan === 'annual'
                            ? 'bg-purple-900/60 text-purple-300 border-purple-600'
                            : user.plan === 'monthly'
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {user.plan === 'annual' ? (
                            <>
                              <Crown className="w-3 h-3 text-purple-400" /> Pro Anual
                            </>
                          ) : user.plan === 'monthly' ? (
                            <>
                              <Crown className="w-3 h-3 text-emerald-400" /> Pro Mensal
                            </>
                          ) : (
                            'Gratuito'
                          )}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-bold text-white">
                          <FileText className="w-3.5 h-3.5 text-purple-400" />
                          <span>{user.filesCount || 0}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectUser(user);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 font-semibold text-xs transition inline-flex items-center gap-1"
                        >
                          <span>Ver Arquivos</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal / Gaveta Lateral de Detalhes do Usuário */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Header do Modal */}
            <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-200 font-black text-lg flex items-center justify-center shrink-0">
                  {selectedUser.nome ? selectedUser.nome.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedUser.nome}</h3>
                    {selectedUser.id === ADMIN_UID && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-500/30 text-purple-300 border border-purple-400/50">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-slate-300">{selectedUser.email}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-500">UID: {selectedUser.id}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo do Modal */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Gerenciamento de Plano e Metadados do Usuário */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>Plano de Assinatura e Permissões</span>
                  </div>
                  {planUpdateSuccess && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {planUpdateSuccess}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400">Alterar plano deste usuário:</span>
                  <button
                    onClick={() => handleUpdatePlan('free')}
                    disabled={isUpdatingPlan || selectedUser.plan === 'free'}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      selectedUser.plan === 'free'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    Gratuito
                  </button>
                  <button
                    onClick={() => handleUpdatePlan('monthly')}
                    disabled={isUpdatingPlan || selectedUser.plan === 'monthly'}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      selectedUser.plan === 'monthly'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    Pro Mensal
                  </button>
                  <button
                    onClick={() => handleUpdatePlan('annual')}
                    disabled={isUpdatingPlan || selectedUser.plan === 'annual'}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      selectedUser.plan === 'annual'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    Pro Anual
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-700/60 text-slate-400 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-300">Data de Criação:</span> {formatDate(selectedUser.createdAt)}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-300">Última Atualização:</span> {formatDate(selectedUser.updatedAt)}
                  </div>
                </div>
              </div>

              {/* Lista de Arquivos e Diagnósticos Enviados */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-purple-400" />
                    <span>Arquivos e Diagnósticos Enviados ({selectedDiagnostics.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Histórico extraído da subcoleção /users/{selectedUser.id}/diagnostics
                  </span>
                </div>

                {isLoadingDiagnostics ? (
                  <div className="py-8 text-center text-slate-400 flex flex-col items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
                    <span>Carregando arquivos enviados pelo usuário...</span>
                  </div>
                ) : selectedDiagnostics.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700">
                    Este usuário ainda não enviou capturas de tela nem medições do SSI.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDiagnostics.map((diag, index) => (
                      <div 
                        key={diag.id || index}
                        className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center text-xs">
                              {index + 1}
                            </span>
                            <span className="font-bold text-white">Medição do SSI</span>
                            <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {formatDate(diag.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-600 text-white shadow-xs">
                              Score: {diag.total} / 100
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-700 text-slate-200">
                              {diag.nivel || 'Nível Analisado'}
                            </span>
                          </div>
                        </div>

                        {/* Pilares detalhados */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                            <span className="text-slate-400 block">Marca Profissional</span>
                            <span className="text-sm font-bold text-blue-400">{diag.pilar1} / 25</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                            <span className="text-slate-400 block">Pessoas Certas</span>
                            <span className="text-sm font-bold text-emerald-400">{diag.pilar2} / 25</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                            <span className="text-slate-400 block">Oferecer Insights</span>
                            <span className="text-sm font-bold text-amber-400">{diag.pilar3} / 25</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                            <span className="text-slate-400 block">Relacionamentos</span>
                            <span className="text-sm font-bold text-purple-400">{diag.pilar4} / 25</span>
                          </div>
                        </div>

                        {/* Se houver arquivos vinculados (Screenshot ou Relatório) */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          {diag.screenshotUrl ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setPreviewImage(diag.screenshotUrl || null)}
                                className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 font-semibold text-xs flex items-center gap-1.5 transition"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Ver Captura de Tela do SSI</span>
                              </button>
                              <a
                                href={diag.screenshotUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition"
                                title="Abrir imagem em nova aba"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-500 italic">
                              Entrada digitada manualmente (sem captura de tela enviada)
                            </span>
                          )}

                          {diag.reportUrl && (
                            <a
                              href={diag.reportUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition"
                            >
                              <FileText className="w-3.5 h-3.5 text-blue-400" />
                              <span>Abrir Dossiê / Relatório JSON</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                        </div>

                        {/* Contexto Profissional Preenchido (se houver) */}
                        {diag.contexto && (
                          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                            <span className="font-bold text-slate-300 block">Contexto Comercial Preenchido:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div><span className="text-slate-500">Cargo:</span> {diag.contexto.cargo || 'Não informado'}</div>
                              <div><span className="text-slate-500">Segmento:</span> {diag.contexto.segmento || 'Não informado'}</div>
                              <div><span className="text-slate-500">Tempo Diário:</span> {diag.contexto.tempoDiario || '15'} min/dia</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="p-4 border-t border-slate-800 flex justify-end bg-slate-950/60">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visualizador Modal de Imagem / Captura Ampliada */}
      {previewImage && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-purple-400 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={previewImage} 
              alt="Captura de tela do SSI enviada pelo usuário" 
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
            <div className="mt-3 flex items-center gap-3">
              <a
                href={previewImage}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <ExternalLink className="w-4 h-4" /> Abrir Original em Nova Aba
              </a>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
