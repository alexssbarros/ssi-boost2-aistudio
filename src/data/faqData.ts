export interface FAQItem {
  pergunta: string;
  resposta: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    pergunta: 'Preciso ter uma licença ativa do Sales Navigator para utilizar a plataforma?',
    resposta: 'O Social Selling Index (SSI) é mensurado com base nos dados do ecossistema do LinkedIn e do Sales Navigator. Se você tem acesso ao link oficial (linkedin.com/sales/ssi) ou a uma conta corporativa de equipe, basta tirar a captura de tela e enviá-la. Caso prefira ou a imagem esteja cortada, você também pode preencher suas 5 notas manualmente em segundos.'
  },
  {
    pergunta: 'Existe qualquer risco de bloqueio ou restrição na minha conta do LinkedIn?',
    resposta: 'Risco absolutamente zero. O SSI Boost não solicita sua senha do LinkedIn, não utiliza cookies de sessão, não instala extensões invasivas no navegador e não realiza automações, bots ou scraping na sua conta. Todo o processamento ocorre de forma externa a partir da captura ou dados que você mesmo fornece.'
  },
  {
    pergunta: 'O sistema atualiza meu SSI de forma automática?',
    resposta: 'Não, e isso é uma escolha proposital de conformidade e segurança máxima para a sua conta. A evolução é acompanhada de maneira transparente: você executa as rotinas diárias e, ao final de cada ciclo semanal ou mensal, envia uma nova captura para gerar o comparativo histórico e os gráficos.'
  },
  {
    pergunta: 'E se a leitura automática por inteligência artificial (OCR) falhar?',
    resposta: 'Você tem controle total e soberano. Após o processamento da imagem pela visão multimodal do Gemini, o sistema apresenta uma tela com os 5 números extraídos (Total e os 4 pilares). Você pode confirmar ou corrigir qualquer valor manualmente antes de liberar a análise.'
  },
  {
    pergunta: 'Como funciona a garantia de 7 dias e o cancelamento?',
    resposta: 'Sem burocracia. Dentro dos primeiros 7 dias corridos após a assinatura, você pode solicitar reembolso integral com devolução de 100% do valor pago. No plano mensal, o cancelamento da renovação automática pode ser feito a qualquer instante com 1 clique diretamente no painel de configurações da sua conta.'
  },
  {
    pergunta: 'O que o plano completo oferece a mais do que a versão gratuita?',
    resposta: 'A versão gratuita entrega um diagnóstico resumido com cálculo do pilar forte, pilar prioritário (gargalo crítico) e 3 recomendações iniciais. O plano completo (R$39/mês ou R$312/ano) desbloqueia o plano operacional diário de 30 dias com checklist, os 8 geradores de copywriting com IA, o Simulador de Reação do Decisor B2B, a auditoria executiva aprofundada e o histórico comparativo entre medições.'
  }
];
