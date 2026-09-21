import React, { useState, useMemo } from 'react';
import { X, FileText, Search, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-5 sm:p-7 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Termos de Uso do SSI Boost
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Última atualização: 10 de setembro de 2026
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            aria-label="Fechar termos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input for easy navigation */}
        <div className="relative flex-shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar cláusula ou palavra-chave (ex: cancelamento, reembolso, planos, agência)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* Scrollable Terms Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-xs text-slate-700 leading-relaxed divide-y divide-slate-100">
          
          {/* Apresentação e Dados do Responsável */}
          <div className="space-y-3 pt-1">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">1.</span> Apresentação
            </h4>
            <p>Bem-vindo ao SSI Boost.</p>
            <p>
              Estes Termos de Uso regulam o acesso e a utilização do SSI Boost, incluindo seu site, plataforma, área do usuário, diagnósticos, relatórios, recomendações e demais funcionalidades relacionadas.
            </p>
            <p>
              O SSI Boost é uma plataforma de diagnóstico e orientação profissional que auxilia usuários na avaliação e melhoria de aspectos de sua presença, posicionamento e atividade profissional no LinkedIn.
            </p>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-sans">
              <p className="font-bold text-slate-900 text-xs">O responsável pela plataforma é:</p>
              <ul className="space-y-0.5 text-slate-600">
                <li><strong>Plataforma:</strong> SSI Boost</li>
                <li><strong>Responsável:</strong> Alex Barros</li>
                <li><strong>CPF:</strong> 023.677.739-47</li>
                <li>
                  <strong>E-mail de suporte:</strong>{' '}
                  <a href="mailto:2alexsbarros@gmail.com" className="text-blue-600 hover:underline">2alexsbarros@gmail.com</a>
                </li>
                <li>
                  <strong>E-mail de privacidade:</strong>{' '}
                  <a href="mailto:alexsbarros@gmail.com" className="text-blue-600 hover:underline">alexsbarros@gmail.com</a>
                </li>
              </ul>
            </div>

            <p>
              Ao acessar a plataforma, criar uma conta, solicitar um diagnóstico ou contratar um plano, o usuário declara que leu, compreendeu e concordou com estes Termos de Uso.
            </p>
            <p className="font-medium text-slate-900">
              Caso não concorde com alguma disposição, o usuário não deverá utilizar o SSI Boost.
            </p>
          </div>

          {/* 2. Documentos aplicáveis */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">2.</span> Documentos aplicáveis
            </h4>
            <p>Estes Termos devem ser lidos em conjunto com:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>A Política de Privacidade e Proteção de Dados;</li>
              <li>A Política de Cancelamento e Reembolso, quando disponibilizada separadamente;</li>
              <li>A Política de Cookies, quando disponibilizada separadamente;</li>
              <li>As condições específicas apresentadas na página do plano;</li>
              <li>As informações exibidas durante a contratação.</li>
            </ul>
            <p>Esses documentos formam, em conjunto, o acordo entre o SSI Boost e o usuário.</p>
            <p>
              Em caso de divergência, prevalecerão os direitos assegurados pela legislação brasileira, especialmente pelo Código de Defesa do Consumidor.
            </p>
          </div>

          {/* 3. Independência em relação ao LinkedIn */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">3.</span> Independência em relação ao LinkedIn
            </h4>
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-950 font-medium">
              O SSI Boost é uma ferramenta independente.
            </div>
            <p>
              O SSI Boost não é afiliado, patrocinado, certificado, administrado ou oficialmente associado ao LinkedIn Corporation, à Microsoft Corporation ou ao LinkedIn Sales Navigator.
            </p>
            <p>
              LinkedIn, Sales Navigator e demais marcas, nomes, logotipos e funcionalidades mencionados pertencem aos seus respectivos titulares.
            </p>
            <p>O SSI Boost não representa o LinkedIn e não possui controle sobre:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>As regras da plataforma LinkedIn;</li>
              <li>A metodologia utilizada pelo LinkedIn para calcular o SSI;</li>
              <li>A disponibilidade do índice SSI;</li>
              <li>Alterações no Sales Navigator;</li>
              <li>Mudanças em algoritmos, métricas ou funcionalidades;</li>
              <li>Suspensões ou restrições aplicadas a contas do LinkedIn;</li>
              <li>Resultados comerciais ou profissionais obtidos pelo usuário.</li>
            </ul>
            <p className="font-medium text-slate-800">
              O usuário é responsável por conhecer e cumprir os termos, políticas e regras do LinkedIn.
            </p>
          </div>

          {/* 4. Descrição do serviço */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">4.</span> Descrição do serviço
            </h4>
            <p>O SSI Boost poderá oferecer funcionalidades como:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Diagnóstico resumido gratuito;</li>
              <li>Diagnóstico completo;</li>
              <li>Análise de informações profissionais;</li>
              <li>Avaliação de diferentes componentes da presença profissional;</li>
              <li>Pontuações e indicadores;</li>
              <li>Recomendações personalizadas;</li>
              <li>Sugestões de melhoria do perfil;</li>
              <li>Sugestões de textos e conteúdo;</li>
              <li>Planos de ação;</li>
              <li>Relatórios;</li>
              <li>Histórico de diagnósticos;</li>
              <li>Comparação da evolução do usuário;</li>
              <li>Recursos de inteligência artificial;</li>
              <li>Funcionalidades para agências e equipes, quando disponíveis.</li>
            </ul>
            <p>
              As funcionalidades efetivamente disponíveis dependerão do plano contratado e da versão da plataforma em utilização.
            </p>
            <p>
              O SSI Boost poderá incluir, alterar, aperfeiçoar ou descontinuar funcionalidades, respeitando os contratos vigentes, as ofertas realizadas e a legislação aplicável.
            </p>
          </div>

          {/* 5. Diagnóstico gratuito */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">5.</span> Diagnóstico gratuito
            </h4>
            <p>O SSI Boost poderá disponibilizar um diagnóstico resumido gratuitamente.</p>
            <p>O diagnóstico gratuito poderá:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Ter conteúdo reduzido;</li>
              <li>Apresentar apenas parte das pontuações;</li>
              <li>Conter recomendações gerais;</li>
              <li>Exigir cadastro ou fornecimento de e-mail;</li>
              <li>Possuir limites de utilização;</li>
              <li>Não incluir relatório completo;</li>
              <li>Não incluir histórico ou acompanhamento;</li>
              <li>Ser modificado ou encerrado futuramente.</li>
            </ul>
            <p>
              A disponibilização de um diagnóstico gratuito não obriga o SSI Boost a oferecer indefinidamente a mesma funcionalidade, quantidade ou formato.
            </p>
            <p>
              O usuário não poderá criar múltiplas contas ou utilizar dados diferentes com o objetivo de contornar os limites do diagnóstico gratuito.
            </p>
          </div>

          {/* 6. Cadastro e conta do usuário */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">6.</span> Cadastro e conta do usuário
            </h4>
            <p>Algumas funcionalidades exigirão a criação de uma conta.</p>
            <p>Ao realizar o cadastro, o usuário compromete-se a:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Fornecer informações verdadeiras, completas e atualizadas;</li>
              <li>Manter seus dados cadastrais atualizados;</li>
              <li>Criar uma senha segura;</li>
              <li>Não compartilhar suas credenciais;</li>
              <li>Não permitir o acesso de pessoas não autorizadas;</li>
              <li>Comunicar imediatamente qualquer suspeita de acesso indevido.</li>
            </ul>
            <p>
              Cada conta é pessoal e intransferível, salvo quando o plano contratado permitir expressamente contas de equipe ou usuários adicionais.
            </p>
            <p>
              O usuário é responsável pelas atividades realizadas em sua conta até que comunique eventual acesso não autorizado ao SSI Boost.
            </p>
            <p>
              O SSI Boost poderá solicitar confirmação de identidade ou informações adicionais para prevenir fraudes, recuperar contas ou proteger usuários.
            </p>
          </div>

          {/* 7. Requisitos para utilização */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">7.</span> Requisitos para utilização
            </h4>
            <p>Para utilizar o SSI Boost, o usuário declara que:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Possui pelo menos 18 anos;</li>
              <li>Tem capacidade legal para aceitar estes Termos;</li>
              <li>Utilizará a plataforma para finalidades legítimas;</li>
              <li>Fornecerá dados próprios ou devidamente autorizados;</li>
              <li>Não utilizará o serviço para violar direitos de terceiros;</li>
              <li>Cumprirá a legislação e as regras das plataformas relacionadas.</li>
            </ul>
            <p className="font-medium text-slate-800">
              O SSI Boost não é direcionado a crianças ou adolescentes.
            </p>
          </div>

          {/* 8. Informações submetidas à análise */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">8.</span> Informações submetidas à análise
            </h4>
            <p>Para gerar os diagnósticos, o usuário poderá fornecer:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Endereço do perfil do LinkedIn;</li>
              <li>Informações profissionais;</li>
              <li>Textos do perfil;</li>
              <li>Respostas a questionários;</li>
              <li>Pontuações informadas pelo usuário;</li>
              <li>Capturas de tela;</li>
              <li>Documentos;</li>
              <li>Objetivos profissionais;</li>
              <li>Dados sobre público-alvo, carreira ou estratégia;</li>
              <li>Outros conteúdos necessários para a análise.</li>
            </ul>
            <p>O usuário declara que possui direito ou autorização para enviar esses conteúdos.</p>
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1 text-rose-950">
              <p className="font-bold">É proibido enviar:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-rose-900">
                <li>Senhas;</li>
                <li>Credenciais de acesso;</li>
                <li>Dados bancários desnecessários;</li>
                <li>Segredos comerciais de terceiros;</li>
                <li>Documentos confidenciais sem autorização;</li>
                <li>Dados pessoais sensíveis sem necessidade;</li>
                <li>Informações obtidas ilegalmente;</li>
                <li>Conteúdos que violem propriedade intelectual, privacidade ou outros direitos.</li>
              </ul>
            </div>
            <p>
              O SSI Boost poderá remover conteúdos que violem estes Termos ou que representem risco à plataforma, ao usuário ou a terceiros.
            </p>
          </div>

          {/* 9. Senha e acesso ao LinkedIn */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">9.</span> Senha e acesso ao LinkedIn
            </h4>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-bold text-emerald-900">
              O SSI Boost não solicita a senha do LinkedIn.
            </div>
            <p>O usuário nunca deve inserir sua senha do LinkedIn:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Nos formulários do SSI Boost;</li>
              <li>Em campos destinados ao diagnóstico;</li>
              <li>Em documentos enviados;</li>
              <li>Em mensagens ao suporte;</li>
              <li>Em interações com recursos de inteligência artificial.</li>
            </ul>
            <p>
              Caso futuramente seja oferecida alguma integração oficial, ela deverá utilizar mecanismo de autorização disponibilizado pelo respectivo fornecedor, sem que o SSI Boost tenha acesso direto à senha do usuário.
            </p>
            <p>O SSI Boost não realiza automaticamente, salvo informação expressa em contrário:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Publicações no LinkedIn;</li>
              <li>Envio de convites;</li>
              <li>Envio de mensagens;</li>
              <li>Alterações no perfil;</li>
              <li>Curtidas ou comentários;</li>
              <li>Automação de interações;</li>
              <li>Acesso ao Sales Navigator em nome do usuário.</li>
            </ul>
          </div>

          {/* 10. Inteligência artificial e análises automatizadas */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">10.</span> Inteligência artificial e análises automatizadas
            </h4>
            <p>
              O SSI Boost poderá utilizar algoritmos, regras automatizadas e sistemas de inteligência artificial para produzir:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Pontuações;</li>
              <li>Diagnósticos;</li>
              <li>Classificações;</li>
              <li>Recomendações;</li>
              <li>Planos de ação;</li>
              <li>Sugestões de textos;</li>
              <li>Sugestões de conteúdo;</li>
              <li>Comparações e análises.</li>
            </ul>
            <p>
              Os resultados são orientativos e dependem das informações fornecidas pelo usuário.
            </p>
            <p>Sistemas automatizados e modelos de inteligência artificial podem produzir conteúdos:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Incompletos;</li>
              <li>Imprecisos;</li>
              <li>Desatualizados;</li>
              <li>Sem contexto;</li>
              <li>Semelhantes aos conteúdos gerados para outros usuários;</li>
              <li>Inadequados para determinado objetivo ou situação.</li>
            </ul>
            <p className="font-medium text-slate-800">
              O usuário deverá revisar os resultados antes de:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Alterar seu perfil;</li>
              <li>Publicar conteúdos;</li>
              <li>Entrar em contato com terceiros;</li>
              <li>Tomar decisões profissionais;</li>
              <li>Utilizar recomendações em nome de uma empresa ou cliente.</li>
            </ul>
            <p>
              O SSI Boost poderá realizar ajustes, testes e melhorias nos critérios de análise. Por isso, diagnósticos realizados em datas diferentes poderão apresentar resultados distintos, mesmo quando baseados em informações semelhantes.
            </p>
          </div>

          {/* 11. Ausência de garantia de resultados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">11.</span> Ausência de garantia de resultados
            </h4>
            <p>O SSI Boost não garante:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Aumento da pontuação SSI;</li>
              <li>Melhoria de classificação no LinkedIn;</li>
              <li>Aumento de visualizações;</li>
              <li>Crescimento do número de conexões;</li>
              <li>Geração de leads;</li>
              <li>Realização de vendas;</li>
              <li>Recebimento de propostas profissionais;</li>
              <li>Contratação ou recolocação profissional;</li>
              <li>Aumento de renda;</li>
              <li>Aprovação pelo LinkedIn;</li>
              <li>Manutenção de qualquer funcionalidade do LinkedIn ou Sales Navigator.</li>
            </ul>
            <p>
              Os resultados dependem de diversos fatores externos, incluindo o mercado, as ações realizadas pelo usuário, a qualidade das informações, a frequência de utilização e as regras do LinkedIn.
            </p>
            <p className="font-bold text-slate-900">
              Nenhuma informação fornecida pelo SSI Boost deve ser interpretada como promessa de resultado.
            </p>
          </div>

          {/* 12. Planos pagos */}
          <div className="space-y-3 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">12.</span> Planos pagos
            </h4>
            <p>O SSI Boost poderá oferecer, inicialmente, as seguintes modalidades:</p>
            
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">12.1. Plano mensal</p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  <li><strong>Valor:</strong> R$ 39,00 por mês;</li>
                  <li>Cobrança recorrente mensal;</li>
                  <li>Renovação automática enquanto ativa;</li>
                  <li>Funcionalidades da página de contratação.</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">12.2. Plano anual</p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  <li><strong>Valor:</strong> R$ 312,00 por ano (eq. R$ 26/mês);</li>
                  <li>Cobrança anual;</li>
                  <li>Renovação automática anual;</li>
                  <li>Economia de R$ 156/ano vs mensal.</li>
                </ul>
              </div>
            </div>

            <p>
              O valor anual representa a contratação de um período de 12 meses e poderá ser cobrado em pagamento único ou conforme as condições apresentadas pelo meio de pagamento.
            </p>
            <p>
              A eventual possibilidade de parcelamento não transforma a assinatura anual em assinatura mensal.
            </p>
          </div>

          {/* 13. Limites de utilização */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">13.</span> Limites de utilização
            </h4>
            <p>
              Os planos pagos do SSI Boost não são ilimitados, salvo se uma oferta declarar expressamente o contrário.
            </p>
            <p>Cada plano poderá estabelecer limites relacionados a:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Quantidade de diagnósticos;</li>
              <li>Quantidade de perfis analisados;</li>
              <li>Quantidade de relatórios;</li>
              <li>Quantidade de gerações com inteligência artificial;</li>
              <li>Quantidade de textos ou recomendações;</li>
              <li>Número de usuários;</li>
              <li>Número de clientes;</li>
              <li>Espaço de armazenamento;</li>
              <li>Frequência de atualização;</li>
              <li>Exportações;</li>
              <li>Recursos avançados.</li>
            </ul>
            <p>Os limites aplicáveis serão informados na página de contratação ou na área do usuário.</p>
            <p>Salvo indicação diferente na oferta:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Os limites serão renovados mensalmente, inclusive no plano anual;</li>
              <li>Créditos e utilizações não consumidos não serão acumulados;</li>
              <li>O usuário deverá aguardar a renovação do período ou contratar capacidade adicional quando essa opção estiver disponível;</li>
              <li>O cancelamento não gera restituição por créditos ou utilizações não consumidos.</li>
            </ul>
            <p>
              O SSI Boost poderá estabelecer limites técnicos razoáveis para prevenir uso abusivo, automações indevidas ou sobrecarga da plataforma.
            </p>
            <p>
              Alterações que reduzam de maneira relevante as funcionalidades de um plano pago serão informadas previamente e não prejudicarão direitos adquiridos no período já contratado.
            </p>
          </div>

          {/* 14. Plano Agência */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">14.</span> Plano Agência
            </h4>
            <p>
              O SSI Boost poderá disponibilizar futuramente um plano destinado a agências, consultores, empresas e profissionais que realizem diagnósticos para clientes.
            </p>
            <p>
              As características, quantidade de usuários, número de clientes, limites, preços e funcionalidades serão apresentadas na respectiva oferta.
            </p>
            <p>A contratação do plano Agência poderá autorizar:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Análise de múltiplos perfis;</li>
              <li>Cadastro de clientes;</li>
              <li>Acesso de membros da equipe;</li>
              <li>Uso profissional dos relatórios;</li>
              <li>Gerenciamento centralizado;</li>
              <li>Exportação de resultados;</li>
              <li>Personalização ou aplicação de marca, quando expressamente incluída.</li>
            </ul>
            <p>A contratação do plano Agência não autoriza automaticamente:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Revenda de acesso à plataforma;</li>
              <li>Compartilhamento irrestrito da conta;</li>
              <li>Reprodução do software;</li>
              <li>Cópia da metodologia;</li>
              <li>Remoção da marca SSI Boost;</li>
              <li>Utilização em modelo de marca branca;</li>
              <li>Subscrição de acesso para terceiros;</li>
              <li>Utilização acima dos limites contratados.</li>
            </ul>
            <p>
              A agência será responsável por obter autorização dos clientes para inserir e processar seus dados no SSI Boost.
            </p>
            <p>
              Quando a agência decidir as finalidades e os meios de tratamento dos dados de seus clientes, ela poderá atuar como controladora desses dados, enquanto o SSI Boost poderá atuar como operador, nos limites do serviço contratado.
            </p>
          </div>

          {/* 15. Pagamentos */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">15.</span> Pagamentos
            </h4>
            <p>Os pagamentos serão processados por prestadores especializados.</p>
            <p>Ao contratar um plano, o usuário autoriza:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>A cobrança do valor informado;</li>
              <li>A cobrança recorrente enquanto a assinatura permanecer ativa;</li>
              <li>A utilização dos dados necessários para processar a transação;</li>
              <li>O envio de informações sobre confirmação, vencimento ou falha de pagamento.</li>
            </ul>
            <p>
              O SSI Boost não armazena diretamente os dados completos do cartão, salvo se futuramente utilizar infraestrutura certificada e informar expressamente essa condição.
            </p>
            <p>Em caso de falha no pagamento, poderemos:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Realizar novas tentativas de cobrança;</li>
              <li>Solicitar a atualização do meio de pagamento;</li>
              <li>Limitar funcionalidades;</li>
              <li>Suspender o acesso ao plano pago;</li>
              <li>Cancelar a assinatura após comunicação ao usuário.</li>
            </ul>
            <p>
              A suspensão por inadimplência não elimina valores que já estejam legalmente vencidos.
            </p>
          </div>

          {/* 16. Renovação automática */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">16.</span> Renovação automática
            </h4>
            <p>Os planos mensal e anual poderão ser renovados automaticamente.</p>
            <p>
              A renovação ocorrerá utilizando o meio de pagamento cadastrado, salvo se o usuário cancelar a assinatura antes da próxima cobrança.
            </p>
            <p>
              As informações sobre periodicidade, valor e renovação serão apresentadas antes da contratação.
            </p>
            <p>
              O usuário poderá consultar, quando disponível, a data da próxima cobrança em sua área de conta ou solicitar essa informação ao suporte.
            </p>
          </div>

          {/* 17. Alteração de preços */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">17.</span> Alteração de preços
            </h4>
            <p>O SSI Boost poderá alterar os preços dos planos.</p>
            <p>Alterações de preço não serão aplicadas retroativamente ao período já pago.</p>
            <p>
              No caso de assinaturas recorrentes, o usuário será informado previamente quando o novo preço for aplicável à renovação seguinte.
            </p>
            <p>
              Se não concordar com o novo valor, o usuário poderá cancelar a assinatura antes da próxima cobrança.
            </p>
            <p>Promoções, descontos ou condições especiais:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Poderão ter prazo limitado;</li>
              <li>Poderão ser destinadas a grupos específicos;</li>
              <li>Não gerarão direito adquirido para renovações futuras;</li>
              <li>Estarão sujeitas às condições apresentadas na oferta.</li>
            </ul>
          </div>

          {/* 18. Cancelamento da assinatura */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">18.</span> Cancelamento da assinatura
            </h4>
            <p>
              O usuário poderá solicitar o cancelamento da assinatura a qualquer momento, pela área da conta ou pelo e-mail:{' '}
              <a href="mailto:2alexsbarros@gmail.com" className="font-bold text-blue-600 hover:underline">2alexsbarros@gmail.com</a>
            </p>
            <p>O cancelamento interromperá as cobranças futuras.</p>
            <p>
              Salvo quando a legislação ou a oferta estabelecer condição diferente, o usuário continuará com acesso ao plano pago até o encerramento do período já contratado.
            </p>
            <p>No plano mensal, o acesso será mantido até o fim do ciclo mensal pago.</p>
            <p>No plano anual, o acesso será mantido até o fim do período anual pago.</p>
            <p>O cancelamento da assinatura não implica automaticamente:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Exclusão da conta;</li>
              <li>Exclusão imediata dos dados;</li>
              <li>Reembolso proporcional;</li>
              <li>Conversão de créditos não utilizados em dinheiro.</li>
            </ul>
            <p>
              A exclusão da conta e dos dados poderá ser solicitada separadamente, conforme a Política de Privacidade e as hipóteses legais de conservação.
            </p>
          </div>

          {/* 19. Direito de arrependimento */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">19.</span> Direito de arrependimento
            </h4>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-medium text-blue-900">
              Nas contratações realizadas pela internet, o usuário que se enquadrar como consumidor poderá exercer o direito de arrependimento no prazo legal de sete dias, contado da contratação.
            </div>
            <p>
              O pedido poderá ser enviado para:{' '}
              <a href="mailto:2alexsbarros@gmail.com" className="font-bold text-blue-600 hover:underline">2alexsbarros@gmail.com</a>
            </p>
            <p>
              Quando o direito de arrependimento for aplicável e exercido dentro do prazo legal, o contrato será cancelado e os valores pagos serão restituídos conforme a legislação.
            </p>
            <p>
              O SSI Boost confirmará o recebimento da solicitação e adotará as providências necessárias junto ao processador de pagamentos.
            </p>
            <p>Esta cláusula não limita outros direitos garantidos pelo Código de Defesa do Consumidor.</p>
          </div>

          {/* 20. Reembolsos depois do prazo de arrependimento */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">20.</span> Reembolsos depois do prazo de arrependimento
            </h4>
            <p>
              Depois do prazo legal de arrependimento, os valores pagos não serão automaticamente reembolsados apenas por:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Falta de utilização;</li>
              <li>Utilização parcial;</li>
              <li>Esquecimento da renovação;</li>
              <li>Mudança de interesse;</li>
              <li>Ausência do resultado profissional desejado;</li>
              <li>Créditos ou diagnósticos não utilizados.</li>
            </ul>
            <p>Pedidos excepcionais poderão ser avaliados individualmente quando houver:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Cobrança indevida;</li>
              <li>Duplicidade de pagamento;</li>
              <li>Falha comprovada na prestação do serviço;</li>
              <li>Impossibilidade prolongada de acesso causada pelo SSI Boost;</li>
              <li>Outra hipótese prevista em lei.</li>
            </ul>
            <p>Nenhuma disposição destes Termos afasta os direitos obrigatórios do consumidor.</p>
          </div>

          {/* 21. Licença de utilização */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">21.</span> Licença de utilização
            </h4>
            <p>
              Durante a vigência da conta, o SSI Boost concede ao usuário uma licença limitada, pessoal, revogável, não exclusiva e intransferível para utilizar a plataforma conforme o plano contratado.
            </p>
            <p>Essa licença não transfere ao usuário qualquer direito sobre:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>O código-fonte;</li>
              <li>O software;</li>
              <li>A marca SSI Boost;</li>
              <li>A identidade visual;</li>
              <li>Os critérios internos;</li>
              <li>Os modelos de pontuação;</li>
              <li>A estrutura dos relatórios;</li>
              <li>Os bancos de dados;</li>
              <li>As instruções de inteligência artificial;</li>
              <li>A metodologia;</li>
              <li>Outros elementos da plataforma.</li>
            </ul>
            <p>
              O usuário não poderá utilizar o SSI Boost fora das permissões destes Termos e do plano contratado.
            </p>
          </div>

          {/* 22. Conteúdos do usuário */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">22.</span> Conteúdos do usuário
            </h4>
            <p>
              O usuário permanece titular dos direitos que possua sobre os textos, imagens, documentos e informações enviados à plataforma.
            </p>
            <p>Ao enviar conteúdo, o usuário concede ao SSI Boost autorização limitada para:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Receber;</li>
              <li>Armazenar;</li>
              <li>Processar;</li>
              <li>Analisar;</li>
              <li>Adaptar tecnicamente;</li>
              <li>Transmitir aos fornecedores necessários;</li>
              <li>Gerar diagnósticos e relatórios;</li>
              <li>Prestar suporte;</li>
              <li>Cumprir as finalidades do serviço.</li>
            </ul>
            <p>
              Essa autorização permanece enquanto for necessária para a prestação do serviço e para o cumprimento de obrigações legais.
            </p>
            <p className="font-medium text-slate-900">
              O SSI Boost não adquire propriedade sobre o perfil profissional ou os conteúdos originais do usuário.
            </p>
          </div>

          {/* 23. Resultados e conteúdos gerados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">23.</span> Resultados e conteúdos gerados
            </h4>
            <p>
              O usuário poderá utilizar os relatórios, recomendações e textos gerados para suas finalidades pessoais ou profissionais, respeitando estes Termos e direitos de terceiros.
            </p>
            <p>
              No plano Agência, o usuário poderá compartilhar os resultados com os clientes cuja análise esteja autorizada.
            </p>
            <p>
              Por utilizar modelos automatizados, o SSI Boost não garante exclusividade sobre textos, sugestões ou recomendações geradas. Outros usuários poderão receber conteúdos semelhantes.
            </p>
            <p>O usuário é responsável por revisar:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Exatidão;</li>
              <li>Ortografia;</li>
              <li>Contexto;</li>
              <li>Adequação profissional;</li>
              <li>Direitos autorais;</li>
              <li>Informações sobre terceiros;</li>
              <li>Conformidade com as regras do LinkedIn.</li>
            </ul>
          </div>

          {/* 24. Propriedade intelectual */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">24.</span> Propriedade intelectual
            </h4>
            <p>Pertencem ao SSI Boost ou aos respectivos licenciadores:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>A marca;</li>
              <li>O nome;</li>
              <li>O domínio;</li>
              <li>O design;</li>
              <li>O software;</li>
              <li>O código;</li>
              <li>A metodologia;</li>
              <li>Os modelos de relatório;</li>
              <li>Os critérios de análise;</li>
              <li>As bases de conhecimento;</li>
              <li>Os materiais educativos;</li>
              <li>Os textos institucionais;</li>
              <li>Os elementos gráficos;</li>
              <li>As funcionalidades da plataforma.</li>
            </ul>
            <p>É proibido:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Copiar ou reproduzir a plataforma;</li>
              <li>Realizar engenharia reversa;</li>
              <li>Extrair o código-fonte;</li>
              <li>Copiar sistematicamente diagnósticos ou critérios;</li>
              <li>Criar produto concorrente por reprodução do serviço;</li>
              <li>Remover avisos de propriedade;</li>
              <li>Utilizar a marca sem autorização;</li>
              <li>Revender acessos fora das permissões do plano Agência.</li>
            </ul>
          </div>

          {/* 25. Usos proibidos */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">25.</span> Usos proibidos
            </h4>
            <p>O usuário não poderá:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Utilizar a plataforma para fins ilegais;</li>
              <li>Criar contas falsas;</li>
              <li>Compartilhar contas pessoais;</li>
              <li>Contornar limites de uso;</li>
              <li>Explorar falhas ou vulnerabilidades;</li>
              <li>Interferir no funcionamento do serviço;</li>
              <li>Utilizar robôs ou automações não autorizadas;</li>
              <li>Realizar extração massiva de dados;</li>
              <li>Sobrecarregar a infraestrutura;</li>
              <li>Submeter perfis de terceiros sem autorização;</li>
              <li>Violar direitos autorais ou de privacidade;</li>
              <li>Utilizar diagnósticos para discriminação;</li>
              <li>Enviar códigos maliciosos;</li>
              <li>Tentar acessar dados de outros usuários;</li>
              <li>Utilizar o serviço para assédio, perseguição ou fraude;</li>
              <li>Revender relatórios fora das condições do plano;</li>
              <li>Utilizar o SSI Boost para violar as regras do LinkedIn.</li>
            </ul>
            <p className="font-medium text-rose-900">
              A violação dessas regras poderá resultar em limitação, suspensão ou encerramento da conta.
            </p>
          </div>

          {/* 26. Disponibilidade da plataforma */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">26.</span> Disponibilidade da plataforma
            </h4>
            <p>
              O SSI Boost buscará manter a plataforma disponível e segura, mas não garante funcionamento ininterrupto ou livre de erros.
            </p>
            <p>Poderão ocorrer interrupções por:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Manutenção;</li>
              <li>Atualizações;</li>
              <li>Falhas de fornecedores;</li>
              <li>Problemas de internet;</li>
              <li>Incidentes de segurança;</li>
              <li>Eventos fora do controle razoável do SSI Boost;</li>
              <li>Mudanças em serviços de terceiros;</li>
              <li>Necessidade de correção emergencial.</li>
            </ul>
            <p>
              Sempre que possível, manutenções programadas que afetem significativamente o serviço serão comunicadas previamente.
            </p>
          </div>

          {/* 27. Serviços de terceiros */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">27.</span> Serviços de terceiros
            </h4>
            <p>
              O funcionamento do SSI Boost poderá depender de terceiros, incluindo fornecedores de:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Hospedagem;</li>
              <li>Banco de dados;</li>
              <li>Inteligência artificial;</li>
              <li>Processamento de pagamentos;</li>
              <li>Envio de e-mails;</li>
              <li>Monitoramento;</li>
              <li>Análise de dados;</li>
              <li>Segurança.</li>
            </ul>
            <p>Esses serviços possuem seus próprios termos e políticas.</p>
            <p>
              O SSI Boost adotará medidas razoáveis na seleção e gestão dos fornecedores, sem controlar integralmente sua disponibilidade ou funcionamento.
            </p>
          </div>

          {/* 28. Suporte */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">28.</span> Suporte
            </h4>
            <p>
              O suporte poderá ser solicitado pelo e-mail:{' '}
              <a href="mailto:2alexsbarros@gmail.com" className="font-bold text-blue-600 hover:underline">2alexsbarros@gmail.com</a>
            </p>
            <p>O usuário deverá fornecer informações suficientes para identificação e análise do problema.</p>
            <p>O prazo de resposta poderá variar conforme:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Complexidade da solicitação;</li>
              <li>Volume de atendimentos;</li>
              <li>Necessidade de contato com fornecedores;</li>
              <li>Risco de segurança;</li>
              <li>Natureza da demanda.</li>
            </ul>
            <p>
              Solicitações relacionadas ao comércio eletrônico serão atendidas nos prazos legais aplicáveis.
            </p>
          </div>

          {/* 29. Suspensão ou encerramento da conta */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">29.</span> Suspensão ou encerramento da conta
            </h4>
            <p>O SSI Boost poderá suspender ou encerrar uma conta em situações como:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Violação destes Termos;</li>
              <li>Fraude ou tentativa de fraude;</li>
              <li>Inadimplência;</li>
              <li>Compartilhamento indevido;</li>
              <li>Uso abusivo;</li>
              <li>Risco à segurança;</li>
              <li>Violação de direitos de terceiros;</li>
              <li>Contorno dos limites do plano;</li>
              <li>Determinação legal ou judicial.</li>
            </ul>
            <p>
              Sempre que possível e adequado, o usuário será informado e terá oportunidade de corrigir a irregularidade.
            </p>
            <p>
              A suspensão poderá ser imediata quando necessária para proteger a plataforma, os usuários ou terceiros.
            </p>
            <p>
              O encerramento motivado por violação grave não gera automaticamente direito a reembolso, sem prejuízo dos direitos obrigatórios previstos em lei.
            </p>
          </div>

          {/* 30. Encerramento pelo usuário */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">30.</span> Encerramento pelo usuário
            </h4>
            <p>
              O usuário poderá deixar de utilizar o SSI Boost e solicitar o encerramento da conta.
            </p>
            <p>
              Antes do encerramento, recomenda-se exportar os relatórios que desejar conservar, quando essa funcionalidade estiver disponível.
            </p>
            <p>
              A exclusão de dados seguirá a Política de Privacidade e poderá não ser imediata quando a conservação for necessária para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Cumprimento de obrigação legal;</li>
              <li>Manutenção de registros obrigatórios;</li>
              <li>Exercício regular de direitos;</li>
              <li>Prevenção a fraudes;</li>
              <li>Atendimento de determinação judicial.</li>
            </ul>
          </div>

          {/* 31. Responsabilidades do usuário */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">31.</span> Responsabilidades do usuário
            </h4>
            <p>O usuário é responsável:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Pela veracidade das informações fornecidas;</li>
              <li>Pela segurança de sua conta;</li>
              <li>Pelas decisões tomadas com base nos diagnósticos;</li>
              <li>Pela revisão dos conteúdos gerados;</li>
              <li>Pelo cumprimento das regras do LinkedIn;</li>
              <li>Pela autorização para análise de terceiros;</li>
              <li>Pelo uso profissional dos relatórios;</li>
              <li>Pelas comunicações realizadas a partir das recomendações;</li>
              <li>Pela legalidade dos conteúdos enviados.</li>
            </ul>
          </div>

          {/* 32. Responsabilidade do SSI Boost */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">32.</span> Responsabilidade do SSI Boost
            </h4>
            <p>
              O SSI Boost responderá pela prestação do serviço nos limites da legislação aplicável.
            </p>
            <p>O SSI Boost não será responsável por prejuízos causados exclusivamente por:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Informações incorretas fornecidas pelo usuário;</li>
              <li>Uso contrário às recomendações;</li>
              <li>Compartilhamento de credenciais;</li>
              <li>Decisões profissionais tomadas sem revisão;</li>
              <li>Violações praticadas pelo usuário;</li>
              <li>Indisponibilidade do LinkedIn;</li>
              <li>Alterações realizadas pelo LinkedIn;</li>
              <li>Condutas de terceiros fora de nosso controle;</li>
              <li>Eventos inevitáveis ou de força maior;</li>
              <li>Uso indevido ou não autorizado da plataforma.</li>
            </ul>
            <p className="font-medium text-slate-900">
              Nada nestes Termos exclui ou reduz responsabilidades que não possam ser legalmente afastadas, incluindo direitos assegurados ao consumidor.
            </p>
          </div>

          {/* 33. Privacidade e proteção de dados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">33.</span> Privacidade e proteção de dados
            </h4>
            <p>
              O tratamento de dados pessoais realizado pelo SSI Boost é regido pela Política de Privacidade e Proteção de Dados.
            </p>
            <p>
              Ao utilizar a plataforma, o usuário reconhece que determinadas informações são necessárias para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Criar a conta;</li>
              <li>Gerar diagnósticos;</li>
              <li>Processar pagamentos;</li>
              <li>Manter a segurança;</li>
              <li>Prestar suporte;</li>
              <li>Cumprir obrigações legais.</li>
            </ul>
            <p>
              Solicitações relacionadas à privacidade poderão ser enviadas para:{' '}
              <a href="mailto:alexsbarros@gmail.com" className="font-bold text-blue-600 hover:underline">alexsbarros@gmail.com</a>
            </p>
          </div>

          {/* 34. Comunicações eletrônicas */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">34.</span> Comunicações eletrônicas
            </h4>
            <p>O usuário concorda em receber comunicações necessárias relacionadas a:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Cadastro;</li>
              <li>Segurança;</li>
              <li>Autenticação;</li>
              <li>Diagnósticos;</li>
              <li>Pagamentos;</li>
              <li>Renovação;</li>
              <li>Cancelamento;</li>
              <li>Alterações contratuais;</li>
              <li>Atendimento;</li>
              <li>Funcionamento da plataforma.</li>
            </ul>
            <p>Comunicações promocionais poderão ser canceladas a qualquer momento.</p>
            <p>
              A interrupção das comunicações promocionais não impede o envio de mensagens necessárias à execução do serviço.
            </p>
          </div>

          {/* 35. Alterações nestes Termos */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">35.</span> Alterações nestes Termos
            </h4>
            <p>Estes Termos poderão ser atualizados para refletir:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Mudanças legais;</li>
              <li>Novas funcionalidades;</li>
              <li>Alterações nos planos;</li>
              <li>Mudanças operacionais;</li>
              <li>Novos fornecedores;</li>
              <li>Aprimoramentos de segurança.</li>
            </ul>
            <p>A versão atualizada indicará a data da última modificação.</p>
            <p>
              Alterações relevantes serão comunicadas por meio adequado. Quando a legislação exigir nova manifestação de consentimento ou aceite, ela será solicitada.
            </p>
            <p>
              Alterações não serão aplicadas retroativamente para retirar direitos relacionados a períodos já contratados.
            </p>
          </div>

          {/* 36. Legislação aplicável e resolução de conflitos */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">36.</span> Legislação aplicável e resolução de conflitos
            </h4>
            <p>Estes Termos são regidos pela legislação brasileira.</p>
            <p>
              Antes de iniciar uma medida judicial, recomendamos que o usuário entre em contato com o suporte para tentativa de solução amigável:{' '}
              <a href="mailto:2alexsbarros@gmail.com" className="font-bold text-blue-600 hover:underline">2alexsbarros@gmail.com</a>
            </p>
            <p>
              Essa recomendação não impede o usuário de recorrer diretamente aos órgãos de defesa do consumidor, plataformas oficiais de reclamação ou ao Poder Judiciário.
            </p>
            <p>
              Quando existir relação de consumo, será respeitado o foro competente assegurado ao consumidor pela legislação aplicável.
            </p>
          </div>

          {/* 37. Validade das disposições */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">37.</span> Validade das disposições
            </h4>
            <p>Se alguma disposição destes Termos for considerada inválida, ilegal ou inexequível, as demais continuarão válidas.</p>
            <p>
              A eventual tolerância do SSI Boost em relação ao descumprimento de determinada obrigação não significará renúncia de direito ou alteração destes Termos.
            </p>
          </div>

          {/* 38. Contato */}
          <div className="space-y-3 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-blue-600">38.</span> Contato
            </h4>
            <p>Dúvidas, solicitações, cancelamentos ou reclamações poderão ser encaminhados para:</p>
            
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <p className="font-bold text-slate-900">SSI Boost</p>
              <p className="text-slate-600">Responsável: Alex Barros</p>
              <p className="text-slate-600">
                E-mail de suporte:{' '}
                <a href="mailto:2alexsbarros@gmail.com" className="text-blue-600 hover:underline">2alexsbarros@gmail.com</a>
              </p>
              <p className="text-slate-600">
                E-mail de privacidade:{' '}
                <a href="mailto:alexsbarros@gmail.com" className="text-blue-600 hover:underline">alexsbarros@gmail.com</a>
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-bold text-center mt-3">
              Ao criar uma conta ou contratar um plano, o usuário declara que leu, compreendeu e aceitou estes Termos de Uso.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] text-slate-400">
            Termos em conformidade com o CDC e LGPD
          </span>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
          >
            Entendi e Concordo
          </button>
        </div>

      </div>
    </div>
  );
}
