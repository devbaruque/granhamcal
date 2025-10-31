/**
 * Google Analytics para React
 * Configure seu MEASUREMENT_ID nas variáveis de ambiente da Vercel
 */

// Inicializar Google Analytics
export const initGA = (measurementId) => {
  if (typeof window !== 'undefined' && measurementId) {
    // Adicionar script do Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId);

    console.log('✅ Google Analytics inicializado:', measurementId);
  }
};

// Rastrear visualização de página
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Rastrear evento customizado
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
    console.log('📊 Evento rastreado:', eventName, parameters);
  }
};

// Eventos específicos para a calculadora
export const trackCalculation = (ticker, precoJusto) => {
  trackEvent('calcular_valor_justo', {
    ticker: ticker || 'não_informado',
    preco_justo: precoJusto,
  });
};

export const trackAnalysisGenerated = () => {
  trackEvent('gerar_analise', {
    event_category: 'engagement',
    event_label: 'Análise AI gerada',
  });
};

export const trackReset = () => {
  trackEvent('limpar_campos', {
    event_category: 'interaction',
    event_label: 'Formulário resetado',
  });
};

export const trackInstagramClick = () => {
  trackEvent('click_instagram', {
    event_category: 'social',
    event_label: 'Instagram Luiz Rocha',
  });
};

