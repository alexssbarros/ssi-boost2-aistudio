import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Search, Mail, FileCheck, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-5 sm:p-7 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Política de Privacidade e Proteção de Dados
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                SSI Boost • Última atualização: 9 de setembro de 2026
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            aria-label="Fechar política de privacidade"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input for fast clause lookup */}
        <div className="relative flex-shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar termo na política (ex: LGPD, cookies, inteligência artificial, exclusão, direitos)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* Scrollable Policy Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-xs text-slate-700 leading-relaxed divide-y divide-slate-100">
          
          {/* 1. Introdução */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">1.</span> Introdução
            </h4>
            <p>Bem-vindo ao SSI Boost.</p>
            <p>
              A proteção da sua privacidade e dos seus dados pessoais é importante para nós. Esta Política de Privacidade explica, de maneira clara e transparente, como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os dados pessoais tratados durante a utilização do SSI Boost.
            </p>
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-emerald-950 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Esta Política foi elaborada em conformidade com a <strong>Lei Federal nº 13.709/2018 (LGPD)</strong>, o Marco Civil da Internet e demais normas aplicáveis à proteção da privacidade e dos dados pessoais.
              </span>
            </div>
            <p>
              Ao acessar o SSI Boost, criar uma conta, solicitar um diagnóstico, contratar um plano ou interagir com nossos canais de atendimento, você declara ter lido e compreendido esta Política.
            </p>
            <p>
              Quando determinado tratamento depender do seu consentimento, ele será solicitado de maneira específica, livre, informada e destacada.
            </p>
            <p className="text-slate-500">
              Esta Política deve ser lida em conjunto com os Termos de Uso, a Política de Cancelamento e Reembolso e, quando disponibilizada separadamente, a Política de Cookies do SSI Boost.
            </p>
          </div>

          {/* 2. Quem somos */}
          <div className="space-y-2.5 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">2.</span> Quem somos
            </h4>
            <p>
              O SSI Boost é uma plataforma de diagnóstico e orientação profissional destinada a ajudar usuários a avaliar e melhorar aspectos de sua presença, posicionamento e atividade profissional no LinkedIn.
            </p>
            <p>
              A plataforma poderá analisar informações fornecidas pelo próprio usuário, respostas a questionários, dados profissionais, endereço do perfil, imagens, documentos ou outros conteúdos inseridos voluntariamente, gerando pontuações, diagnósticos e recomendações personalizadas.
            </p>
            
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-sans">
              <p className="font-bold text-slate-900 text-xs">
                O responsável pelas decisões relacionadas ao tratamento dos dados pessoais é:
              </p>
              <ul className="space-y-0.5 text-slate-600">
                <li><strong>Plataforma:</strong> SSI Boost</li>
                <li><strong>Responsável:</strong> Alex Barros</li>
                <li><strong>CPF:</strong> 023.677.739-47</li>
                <li>
                  <strong>E-mail de privacidade:</strong>{' '}
                  <a href="mailto:alexsbarros@gmail.com" className="text-emerald-600 font-semibold hover:underline">alexsbarros@gmail.com</a>
                </li>
                <li>
                  <strong>E-mail de suporte:</strong>{' '}
                  <a href="mailto:2alexsbarros@gmail.com" className="text-emerald-600 font-semibold hover:underline">2alexsbarros@gmail.com</a>
                </li>
              </ul>
            </div>
            <p className="text-slate-600">
              Para os fins desta Política, “SSI Boost”, “nós”, “nosso” ou “plataforma” representam o responsável indicado acima.
            </p>
          </div>

          {/* 3. Independência em relação ao LinkedIn */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">3.</span> Independência em relação ao LinkedIn
            </h4>
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-950 font-medium">
              O SSI Boost é uma ferramenta independente.
            </div>
            <p>
              Não somos afiliados, patrocinados, certificados, administrados ou oficialmente associados ao LinkedIn Corporation, à Microsoft Corporation ou ao LinkedIn Sales Navigator, salvo se essa condição for expressamente informada no futuro.
            </p>
            <p>
              LinkedIn, Sales Navigator e demais marcas, nomes e logotipos mencionados pertencem aos seus respectivos titulares.
            </p>
            <p className="font-bold text-rose-900 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
              O SSI Boost não solicita e não recomenda que o usuário forneça sua senha do LinkedIn. O usuário nunca deve inserir sua senha do LinkedIn nos formulários, campos de diagnóstico ou canais de atendimento do SSI Boost.
            </p>
          </div>

          {/* 4. Conceitos importantes */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">4.</span> Conceitos importantes
            </h4>
            <p>Para facilitar a compreensão desta Política:</p>
            <ul className="space-y-1.5 pl-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span><strong>Dado pessoal:</strong> qualquer informação relacionada a uma pessoa natural identificada ou identificável, como nome, e-mail, telefone e informações profissionais.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span><strong>Dado pessoal sensível:</strong> informação sobre origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, saúde, vida sexual, dado genético ou biométrico, conforme definido pela LGPD.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span><strong>Titular:</strong> pessoa natural a quem os dados pessoais se referem.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span><strong>Tratamento:</strong> qualquer operação realizada com dados pessoais, como coleta, acesso, utilização, armazenamento, análise, compartilhamento, alteração ou eliminação.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span><strong>Controlador:</strong> pessoa física ou jurídica responsável pelas decisões relacionadas ao tratamento dos dados pessoais.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span><strong>Operador:</strong> pessoa física ou jurídica que trata dados pessoais em nome do controlador.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span><strong>Cookies:</strong> pequenos arquivos armazenados no navegador ou dispositivo do usuário para permitir o funcionamento da plataforma, lembrar preferências e gerar informações sobre a utilização do serviço.</span>
              </li>
            </ul>
          </div>

          {/* 5. Quais dados pessoais podemos coletar */}
          <div className="space-y-3 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">5.</span> Quais dados pessoais podemos coletar
            </h4>
            <p>Os dados coletados dependem da maneira como você utiliza o SSI Boost.</p>

            {/* 5.1 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-900">5.1. Dados de identificação e cadastro</p>
              <p className="text-slate-600">Ao criar uma conta ou contratar um serviço, podemos coletar:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Nome completo;</li>
                <li>Endereço de e-mail;</li>
                <li>Número de telefone;</li>
                <li>Cidade, estado e país;</li>
                <li>Nome de usuário;</li>
                <li>Senha armazenada de forma criptografada;</li>
                <li>Foto de perfil, quando fornecida;</li>
                <li>Empresa, cargo e área de atuação;</li>
                <li>Informações necessárias para autenticação da conta;</li>
                <li>Data e horário de criação e utilização da conta.</li>
              </ul>
            </div>

            {/* 5.2 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-900">5.2. Dados profissionais e do perfil analisado</p>
              <p className="text-slate-600">Para realizar o diagnóstico, podemos coletar e tratar:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Endereço do perfil do LinkedIn;</li>
                <li>Nome e título profissional;</li>
                <li>Setor, cargo, empresa e localização profissional;</li>
                <li>Texto da seção “Sobre”;</li>
                <li>Experiências profissionais;</li>
                <li>Formação acadêmica;</li>
                <li>Competências, certificações e qualificações;</li>
                <li>Informações sobre conteúdo, publicações, interações e posicionamento profissional;</li>
                <li>Indicadores ou pontuações informados pelo usuário;</li>
                <li>Respostas aos questionários do SSI Boost;</li>
                <li>Objetivos profissionais e comerciais;</li>
                <li>Público-alvo, mercado e estratégia de posicionamento;</li>
                <li>Capturas de tela, textos, arquivos ou documentos enviados voluntariamente;</li>
                <li>Outras informações fornecidas pelo usuário para a elaboração do diagnóstico.</li>
              </ul>
              <p className="text-[11px] text-slate-500 font-medium pt-1">
                O usuário deve fornecer preferencialmente informações referentes ao próprio perfil ou a perfis cuja análise esteja devidamente autorizada.
              </p>
            </div>

            {/* 5.3 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-900">5.3. Dados dos diagnósticos</p>
              <p className="text-slate-600">Durante a utilização do serviço, poderemos gerar e armazenar:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Pontuações e indicadores calculados pela plataforma;</li>
                <li>Diagnósticos resumidos ou completos;</li>
                <li>Recomendações de melhoria;</li>
                <li>Planos de ação;</li>
                <li>Histórico de avaliações;</li>
                <li>Evolução das pontuações;</li>
                <li>Textos sugeridos;</li>
                <li>Relatórios gerados;</li>
                <li>Interações com funcionalidades de inteligência artificial;</li>
                <li>Data e horário de cada análise.</li>
              </ul>
              <p className="text-[11px] text-slate-500 font-medium pt-1">
                Essas informações podem ser consideradas dados pessoais quando estiverem associadas à sua conta ou permitirem sua identificação.
              </p>
            </div>

            {/* 5.4 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-900">5.4. Dados de pagamento e assinatura</p>
              <p className="text-slate-600">Quando você contratar um plano, poderemos tratar:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Nome do titular da compra;</li>
                <li>CPF ou CNPJ, quando necessário;</li>
                <li>Endereço de cobrança;</li>
                <li>Plano contratado;</li>
                <li>Valor, data e situação do pagamento;</li>
                <li>Código da transação;</li>
                <li>Identificador da assinatura;</li>
                <li>Datas de renovação, cancelamento e vencimento;</li>
                <li>Informações necessárias para emissão de nota fiscal;</li>
                <li>Dados relacionados a estornos, reembolsos ou falhas de pagamento.</li>
              </ul>
              <p className="text-[11px] text-slate-600 pt-1">
                Os dados completos do cartão, como número, código de segurança e data de validade, serão processados diretamente pelo provedor de pagamentos contratado. O SSI Boost normalmente receberá apenas informações sobre a situação da cobrança, identificadores e dados parciais (bandeira e últimos 4 dígitos).
              </p>
            </div>

            {/* 5.5 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-900">5.5. Dados de navegação e do dispositivo</p>
              <p className="text-slate-600">Quando você acessa ou utiliza o SSI Boost, podemos coletar automaticamente:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Endereço IP;</li>
                <li>Data e horário do acesso;</li>
                <li>Tipo e versão do navegador;</li>
                <li>Sistema operacional;</li>
                <li>Tipo de dispositivo;</li>
                <li>Idioma e configurações do navegador;</li>
                <li>Identificadores do dispositivo ou da sessão;</li>
                <li>Páginas visitadas;</li>
                <li>Funcionalidades utilizadas;</li>
                <li>Origem do acesso;</li>
                <li>Tempo de permanência;</li>
                <li>Cliques, erros e eventos de navegação;</li>
                <li>Registros de segurança e autenticação;</li>
                <li>Localização aproximada derivada do endereço IP.</li>
              </ul>
            </div>

            {/* 5.6 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-900">5.6. Comunicações e atendimento</p>
              <p className="text-slate-600">Quando você entra em contato conosco, podemos armazenar:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Nome e dados de contato;</li>
                <li>Conteúdo da mensagem;</li>
                <li>Histórico do atendimento;</li>
                <li>Arquivos enviados;</li>
                <li>Data, horário e canal utilizado;</li>
                <li>Avaliações sobre o atendimento.</li>
              </ul>
            </div>

            {/* 5.7 */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-900">5.7. Dados pessoais sensíveis</p>
              <p className="text-slate-600">
                O SSI Boost não tem como finalidade coletar dados pessoais sensíveis. Solicitamos que você não envie informações sobre saúde, religião, opinião política, origem racial ou étnica, orientação ou vida sexual, filiação sindical, biometria ou outros dados sensíveis.
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Caso esses dados sejam enviados espontaneamente, avaliaremos sua necessidade e poderemos excluí-los, restringir seu uso ou solicitar autorização específica quando exigido pela legislação.
              </p>
            </div>

          </div>

          {/* 6. Como coletamos os dados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">6.</span> Como coletamos os dados
            </h4>
            <p>Podemos obter seus dados:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Diretamente de você durante o cadastro;</li>
              <li>Por meio dos formulários de diagnóstico;</li>
              <li>Pelos conteúdos, links, textos, imagens ou documentos que você enviar;</li>
              <li>Durante a contratação ou gestão de uma assinatura;</li>
              <li>Quando você utiliza a plataforma;</li>
              <li>Quando entra em contato com o suporte;</li>
              <li>Por meio de cookies e tecnologias semelhantes;</li>
              <li>Por integrações autorizadas pelo usuário;</li>
              <li>Por prestadores de serviços utilizados na operação da plataforma;</li>
              <li>Por fontes publicamente acessíveis, quando isso for compatível com a legislação, com a finalidade do tratamento e com as expectativas legítimas do titular.</li>
            </ul>
            <p className="text-[11px] text-slate-500 pt-1">
              O fato de uma informação estar publicamente disponível não significa que ela poderá ser utilizada livremente para qualquer finalidade. O SSI Boost adotará critérios de necessidade, adequação, transparência e respeito aos direitos dos titulares.
            </p>
          </div>

          {/* 7. Para quais finalidades utilizamos seus dados */}
          <div className="space-y-3 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">7.</span> Para quais finalidades utilizamos seus dados
            </h4>

            <div className="space-y-2">
              <p className="font-bold text-slate-900">7.1. Fornecimento dos serviços</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Criar e administrar sua conta;</li>
                <li>Autenticar seu acesso;</li>
                <li>Gerar diagnósticos gratuitos ou pagos;</li>
                <li>Calcular pontuações e indicadores;</li>
                <li>Elaborar recomendações personalizadas;</li>
                <li>Gerar relatórios e planos de ação;</li>
                <li>Manter seu histórico de diagnósticos;</li>
                <li>Comparar sua evolução ao longo do tempo;</li>
                <li>Disponibilizar os recursos incluídos no plano contratado.</li>
              </ul>
              <p className="text-[11px] text-slate-500 italic">Base legal: Execução do contrato ou procedimentos preliminares.</p>
            </div>

            <div className="space-y-2 pt-2">
              <p className="font-bold text-slate-900">7.2. Processamento de pagamentos e assinaturas</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Processar cobranças e confirmar pagamentos;</li>
                <li>Administrar períodos de teste, assinaturas e renovações;</li>
                <li>Prevenir pagamentos fraudulentos;</li>
                <li>Realizar cancelamentos e reembolsos;</li>
                <li>Emitir documentos fiscais e cumprir obrigações tributárias.</li>
              </ul>
              <p className="text-[11px] text-slate-500 italic">Bases legais: Execução de contrato, obrigação legal e exercício regular de direitos.</p>
            </div>

            <div className="space-y-2 pt-2">
              <p className="font-bold text-slate-900">7.3. Atendimento ao usuário</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Responder dúvidas e solicitações e resolver problemas técnicos;</li>
                <li>Enviar avisos da conta e informar alterações nos serviços;</li>
                <li>Atender solicitações relacionadas à privacidade.</li>
              </ul>
              <p className="text-[11px] text-slate-500 italic">Bases legais: Execução de contrato, legítimo interesse e obrigação legal.</p>
            </div>

            <div className="space-y-2 pt-2">
              <p className="font-bold text-slate-900">7.4. Melhoria e desenvolvimento da plataforma</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Entender como os usuários utilizam o serviço e corrigir erros;</li>
                <li>Melhorar a experiência de navegação e avaliar desempenho;</li>
                <li>Desenvolver novos recursos e produzir análises agregadas.</li>
              </ul>
              <p className="text-[11px] text-slate-500 italic">Base legal: Legítimo interesse do SSI Boost (utilizando dados anonimizados sempre que possível).</p>
            </div>

            <div className="space-y-2 pt-2">
              <p className="font-bold text-slate-900">7.5. Segurança da plataforma</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li>Detectar e prevenir fraudes e investigar atividades suspeitas;</li>
                <li>Proteger contas e credenciais e evitar acessos não autorizados;</li>
                <li>Prevenir abusos e violações dos Termos de Uso.</li>
              </ul>
              <p className="text-[11px] text-slate-500 italic">Bases legais: Legítimo interesse, proteção do crédito, obrigação legal e exercício regular de direitos.</p>
            </div>

            <div className="space-y-2 pt-2">
              <p className="font-bold text-slate-900">7.6. Comunicações de marketing</p>
              <p className="text-slate-600">
                Com sua autorização, poderemos enviar novidades, conteúdos educativos, pesquisas e ofertas. Você pode cancelar o recebimento a qualquer momento.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <p className="font-bold text-slate-900">7.7. Cumprimento de obrigações legais</p>
              <p className="text-slate-600">
                Para cumprir determinações legais, regulatórias, fiscais ou ordens judiciais válidas.
              </p>
            </div>
          </div>

          {/* 8. Diagnósticos automatizados e inteligência artificial */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">8.</span> Diagnósticos automatizados e inteligência artificial
            </h4>
            <p>
              O SSI Boost poderá utilizar sistemas automatizados, algoritmos e recursos de inteligência artificial para analisar as informações fornecidas pelo usuário e gerar pontuações, classificações, diagnósticos, recomendações, sugestões de textos e planos de ação.
            </p>
            <p>
              Os resultados são orientativos e dependem da qualidade e precisão das informações fornecidas pelo usuário. Não garantem resultados comerciais ou profissionais específicos e não substituem avaliação humana especializada.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-slate-700">
              <p className="font-semibold text-slate-900">Proteção contra treinamento não autorizado:</p>
              <p>
                Quando utilizarmos fornecedores externos de inteligência artificial, partes do conteúdo estritamente necessário poderão ser processadas por esses prestadores sob medidas contratuais de segurança. <strong>Não utilizaremos os dados pessoais identificáveis dos usuários para treinamento de modelos próprios ou de terceiros fora da prestação do serviço</strong>, salvo mediante informação clara, base legal adequada e consentimento quando exigido.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              O usuário poderá solicitar informações sobre os critérios gerais utilizados e pedir revisão de decisões tomadas exclusivamente com base em tratamento automatizado que afetem seus interesses, observados os segredos comercial e industrial.
            </p>
          </div>

          {/* 9. Cookies e tecnologias semelhantes */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">9.</span> Cookies e tecnologias semelhantes
            </h4>
            <p>O SSI Boost poderá utilizar cookies, pixels, armazenamento local e tecnologias semelhantes:</p>
            <ul className="space-y-1.5 pl-2 text-slate-600">
              <li><strong>9.1. Cookies necessários:</strong> indispensáveis para o funcionamento, autenticação e segurança da plataforma (não podem ser desativados sem comprometer a plataforma).</li>
              <li><strong>9.2. Cookies funcionais:</strong> permitem lembrar preferências de navegação e idioma.</li>
              <li><strong>9.3. Cookies analíticos:</strong> ajudam a compreender como a plataforma é utilizada e onde ocorrem erros.</li>
              <li><strong>9.4. Cookies de publicidade:</strong> utilizados para medir campanhas (sujeitos a consentimento quando aplicável).</li>
              <li><strong>9.5. Gerenciamento dos cookies:</strong> você pode gerenciar suas preferências no aviso de cookies ou através das configurações do seu navegador.</li>
            </ul>
          </div>

          {/* 10. Com quem podemos compartilhar seus dados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">10.</span> Com quem podemos compartilhar seus dados
            </h4>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-bold">
              O SSI Boost não vende dados pessoais.
            </div>
            <p>Podemos compartilhar somente os dados necessários com:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>10.1. Fornecedores de infraestrutura:</strong> hospedagem em nuvem, bancos de dados, armazenamento e segurança técnica.</li>
              <li><strong>10.2. Processadores de pagamento:</strong> empresas responsáveis por transações financeiras, prevenção a fraudes e documentos fiscais.</li>
              <li><strong>10.3. Fornecedores de inteligência artificial:</strong> processamento de conteúdos para auxílio no diagnóstico.</li>
              <li><strong>10.4. Ferramentas de comunicação:</strong> envio de e-mails transacionais e suporte ao cliente.</li>
              <li><strong>10.5. Ferramentas de análise e marketing:</strong> métricas de desempenho respeitando as preferências de cookies.</li>
              <li><strong>10.6. Consultores profissionais:</strong> contadores, advogados e auditores sob obrigação de sigilo.</li>
              <li><strong>10.7. Autoridades públicas:</strong> mediante obrigação legal ou ordem judicial válida.</li>
              <li><strong>10.8. Operações societárias:</strong> em caso de reorganização, fusão ou transferência da operação, com dever de confidencialidade.</li>
            </ul>
          </div>

          {/* 11. Transferência internacional de dados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">11.</span> Transferência internacional de dados
            </h4>
            <p>
              Alguns fornecedores utilizados pelo SSI Boost poderão armazenar ou processar dados fora do Brasil (como serviços de nuvem, banco de dados, IA ou mensageria).
            </p>
            <p>
              Nessas situações, adotaremos mecanismos legais adequados para assegurar conformidade com a LGPD e as normas da ANPD.
            </p>
          </div>

          {/* 12. Por quanto tempo armazenamos os dados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">12.</span> Por quanto tempo armazenamos os dados
            </h4>
            <p>Manteremos os dados apenas pelo tempo necessário para cumprir as finalidades desta Política:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Dados da conta: enquanto ela permanecer ativa;</li>
              <li>Diagnósticos e relatórios: enquanto necessários para a prestação do serviço conforme o plano;</li>
              <li>Dados de pagamento e fiscais: pelos prazos legais obrigatórios;</li>
              <li>Registros de conexão e acesso: conforme prazos do Marco Civil da Internet;</li>
              <li>Registros para defesa de direitos: durante os prazos prescricionais legais.</li>
            </ul>
            <p className="text-[11px] text-slate-500">
              Após o término do tratamento, os dados serão eliminados ou anonimizados, exceto nas hipóteses legais de conservação. O cancelamento da assinatura não exclui automaticamente a conta, podendo a exclusão ser solicitada separadamente.
            </p>
          </div>

          {/* 13. Como protegemos seus dados */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">13.</span> Como protegemos seus dados
            </h4>
            <p>Adotamos medidas técnicas, administrativas e organizacionais, tais como:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
              <li>Controle e limitação de acesso de acordo com a necessidade;</li>
              <li>Autenticação de usuários e proteção de credenciais;</li>
              <li>Criptografia durante a transmissão de dados (HTTPS / SSL);</li>
              <li>Monitoramento contra acessos não autorizados e backups regulares;</li>
              <li>Compromissos de confidencialidade com prestadores de serviço.</li>
            </ul>
            <p className="text-[11px] text-slate-500">
              O usuário também é responsável por manter sua senha em segurança e não compartilhar suas credenciais.
            </p>
          </div>

          {/* 14. Direitos dos titulares */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">14.</span> Direitos dos titulares
            </h4>
            <p>Nos termos da LGPD, você poderá solicitar gratuitamente:</p>
            <ul className="grid sm:grid-cols-2 gap-1 text-slate-600 list-disc pl-5">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos seus dados;</li>
              <li>Correção de dados incompletos ou inexatos;</li>
              <li>Anonimização, bloqueio ou eliminação;</li>
              <li>Portabilidade dos dados;</li>
              <li>Informação sobre compartilhamento com entidades;</li>
              <li>Revogação do consentimento;</li>
              <li>Eliminação dos dados tratados com consentimento;</li>
              <li>Oposição a tratamentos irregulares;</li>
              <li>Revisão de decisões automatizadas;</li>
              <li>Peticionamento perante a ANPD.</li>
            </ul>
          </div>

          {/* 15. Como exercer seus direitos */}
          <div className="space-y-2.5 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">15.</span> Como exercer seus direitos
            </h4>
            <p>Para exercer seus direitos ou esclarecer qualquer dúvida sobre privacidade, entre em contato:</p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <p className="font-bold text-slate-900">Responsável pelo atendimento: Alex Barros</p>
              <p className="text-slate-600">
                E-mail de privacidade:{' '}
                <a href="mailto:alexsbarros@gmail.com" className="text-emerald-600 font-bold hover:underline">alexsbarros@gmail.com</a>
              </p>
              <p className="text-slate-600">
                E-mail de suporte:{' '}
                <a href="mailto:2alexsbarros@gmail.com" className="text-emerald-600 font-bold hover:underline">2alexsbarros@gmail.com</a>
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              Se você entender que sua solicitação não foi adequadamente atendida, poderá apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) ou aos órgãos de defesa do consumidor.
            </p>
          </div>

          {/* 16. Dados de crianças e adolescentes */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">16.</span> Dados de crianças e adolescentes
            </h4>
            <p>
              O SSI Boost é destinado a pessoas com 18 anos ou mais e não é direcionado a crianças ou adolescentes. Não coletamos intencionalmente dados de menores de idade.
            </p>
          </div>

          {/* 17. Responsabilidade pelas informações enviadas */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">17.</span> Responsabilidade pelas informações enviadas
            </h4>
            <p>
              O usuário declara que as informações fornecidas são verdadeiras e que possui autorização para enviar os dados, textos, imagens, documentos e perfis submetidos à análise.
            </p>
            <p className="font-semibold text-rose-900 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
              É terminantemente proibido enviar senhas ou credenciais de terceiros, dados pessoais sensíveis sem necessidade ou perfis sem autorização legítima.
            </p>
          </div>

          {/* 18. Links e serviços de terceiros */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">18.</span> Links e serviços de terceiros
            </h4>
            <p>
              O SSI Boost poderá apresentar links para o LinkedIn, meios de pagamento e serviços externos que possuem políticas próprias. Recomendamos consultar as políticas de privacidade desses serviços.
            </p>
          </div>

          {/* 19. Alterações nesta Política */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">19.</span> Alterações nesta Política
            </h4>
            <p>
              Esta Política poderá ser atualizada para refletir mudanças legais, operacionais ou novas funcionalidades. A versão vigente indicará a data da última modificação e alterações relevantes serão informadas por meio apropriado.
            </p>
          </div>

          {/* 20. Disposições finais */}
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">20.</span> Disposições finais
            </h4>
            <p>
              Se alguma parte desta Política for considerada inválida, as demais permanecerão válidas. Esta Política será interpretada conforme a legislação brasileira, especialmente a LGPD e o Marco Civil da Internet.
            </p>
          </div>

          {/* 21. Contato */}
          <div className="space-y-3 pt-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="text-emerald-600">21.</span> Contato
            </h4>
            <p>Em caso de dúvida, solicitação ou reclamação relacionada à privacidade e ao tratamento de dados pessoais, fale conosco:</p>
            
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <p className="font-bold text-slate-900">SSI Boost</p>
              <p className="text-slate-600">Responsável: Alex Barros</p>
              <p className="text-slate-600">
                E-mail de privacidade:{' '}
                <a href="mailto:alexsbarros@gmail.com" className="text-emerald-600 font-bold hover:underline">alexsbarros@gmail.com</a>
              </p>
              <p className="text-slate-600">
                E-mail de suporte:{' '}
                <a href="mailto:2alexsbarros@gmail.com" className="text-emerald-600 font-bold hover:underline">2alexsbarros@gmail.com</a>
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-medium text-center mt-2">
              Nosso compromisso é tratar sua solicitação com transparência, segurança e respeito aos seus direitos.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] text-slate-400">
            Conformidade integral com a LGPD (Lei 13.709/18)
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
