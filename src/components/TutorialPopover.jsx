import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Sistema de Tutorial Interativo
 * Mostra um passo a passo para ajudar o usuário a preencher a calculadora
 * Em mobile: Modal fullscreen
 * Em desktop: Popover centralizado
 */
const TutorialPopover = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detectar tipo de dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Passos do tutorial - Sempre centralizados para melhor UX
  const tutorialSteps = [
    {
      id: 0,
      title: 'Bem-vindo à Calculadora de Valuation!',
      content: 'Aqui você aprende como preencher cada campo da forma certa, mesmo sem experiência em finanças. Vamos juntos descobrir de onde vêm os dados?',
      highlight: null,
    },
    {
      id: 1,
      title: 'LPA (Lucro por Ação)',
      content: 'O LPA mostra quanto lucro cada ação gerou. Você encontra esse valor no Investidor10 ou StatusInvest, na seção de "Indicadores Fundamentalistas". Procure por "LPA" ou "Lucro por Ação".',
      highlight: 'lpa',
      links: [
        { text: 'Investidor10', url: 'https://investidor10.com.br' },
        { text: 'StatusInvest', url: 'https://statusinvest.com.br' },
      ]
    },
    {
      id: 2,
      title: 'VPA (Valor Patrimonial por Ação)',
      content: 'O VPA representa o valor contábil de cada ação. Também está disponível no Investidor10 e StatusInvest, na mesma seção de indicadores. É calculado como Patrimônio Líquido dividido pelo número de ações.',
      highlight: 'vpa',
    },
    {
      id: 3,
      title: 'Taxa de Crescimento (%)',
      content: 'Essa é a taxa de crescimento anual esperada dos lucros. Você pode usar o CAGR (crescimento médio) dos últimos 5 anos, disponível no Investidor10. Uma taxa entre 5% e 15% é comum para empresas maduras.',
      highlight: 'taxaCrescimento',
    },
    {
      id: 4,
      title: 'Preço Atual (R$)',
      content: 'É a cotação atual da ação na bolsa. Você encontra em tempo real no app da sua corretora, Google Finance, Investidor10 ou Yahoo Finance. Basta pesquisar o ticker da ação (ex: PETR4, VALE3).',
      highlight: 'precoAtual',
    },
    {
      id: 5,
      title: 'Indicadores Complementares (Opcionais)',
      content: 'Os campos como EV/EBITDA, Dívida/EBITDA, ROE e outros são opcionais, mas melhoram muito a análise. Todos estão disponíveis no Investidor10, na aba de "Indicadores". Se não preencher, a calculadora fará estimativas automáticas.',
      highlight: null,
    },
    {
      id: 6,
      title: 'Dica Especial: FCF (Fluxo de Caixa Livre)',
      content: 'O FCF você encontra no site de Relações com Investidores (RI) da empresa. Pesquise no Google: "RI + nome da empresa". Se não encontrar, pode deixar em branco — a calculadora estimará automaticamente como 80% do lucro líquido!',
      highlight: 'fluxoCaixaLivre',
    },
    {
      id: 7,
      title: 'Pronto! Você está preparado! 🎉',
      content: 'Agora você sabe exatamente de onde vêm os dados e como preencher a calculadora. Pode voltar aqui a qualquer momento clicando em "Precisa de ajuda?" no canto da tela. Bons investimentos e ótimas análises!',
      highlight: null,
    },
  ];

  const currentStepData = tutorialSteps[currentStep];

  // Fechar tutorial
  const handleClose = () => {
    // Salvar no localStorage que o usuário já viu
    localStorage.setItem('grahamcal_tutorial_seen', 'true');
    setCurrentStep(0);
    onClose();
  };

  // Próximo passo
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  // Passo anterior
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay escuro */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popover do Tutorial - Sempre Centralizado */}
          <motion.div
            className={`fixed z-50 ${
              isMobile
                ? 'inset-0 m-0 overflow-y-auto' // Mobile: fullscreen
                : isTablet
                ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-xl max-h-[85vh] overflow-y-auto' // Tablet: ajustado para caber
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg' // Desktop: centralizado fixo
            }`}
            initial={{ opacity: 0, scale: isMobile ? 1 : 0.9, y: isMobile ? 50 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: isMobile ? 1 : 0.9, y: isMobile ? 50 : 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={`bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl border border-slate-700 overflow-hidden ${
              isMobile 
                ? 'min-h-screen rounded-none flex flex-col' 
                : isTablet
                ? 'rounded-2xl flex flex-col'
                : 'rounded-2xl'
            }`}>
              {/* Header */}
              <div className={`bg-gradient-to-r from-blue-600 to-purple-600 ${
                isMobile ? 'px-4 py-5 sticky top-0 z-10' : 'px-6 py-4'
              } flex justify-between items-center`}>
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-white/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-white font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>
                      {currentStep + 1}
                    </span>
                  </div>
                  <h3 className={`text-white font-bold ${isMobile ? 'text-base leading-tight' : 'text-lg'} truncate`}>
                    {currentStepData.title}
                  </h3>
                </div>
                
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white transition-colors ml-2 flex-shrink-0"
                >
                  <svg className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Conteúdo */}
              <div className={`${
                isMobile 
                  ? 'px-4 py-6 flex-1' 
                  : isTablet
                  ? 'px-6 py-6 flex-1 overflow-y-auto'
                  : 'px-6 py-6'
              } space-y-4`}>
                <p className={`text-slate-200 ${
                  isMobile ? 'text-sm' : 'text-base'
                } leading-relaxed`}>
                  {currentStepData.content}
                </p>

                {/* Links úteis (se houver) */}
                {currentStepData.links && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {currentStepData.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 ${
                          isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'
                        } bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors`}
                      >
                        {link.text}
                        <svg className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}

                {/* Indicador de progresso */}
                <div className="flex gap-1 pt-4">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`${isMobile ? 'h-1' : 'h-1'} flex-1 rounded-full transition-all ${
                        index === currentStep
                          ? 'bg-blue-500'
                          : index < currentStep
                          ? 'bg-blue-700'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Footer com botões */}
              <div className={`${
                isMobile ? 'px-4 py-4 sticky bottom-0 bg-slate-900' : 'px-6 py-4 bg-slate-900/50'
              } flex justify-between items-center border-t border-slate-700`}>
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`${
                    isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'
                  } rounded-lg font-medium transition-all ${
                    currentStep === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {isMobile ? '←' : '← Voltar'}
                </button>

                <span className={`text-slate-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {currentStep + 1} de {tutorialSteps.length}
                </span>

                <button
                  onClick={handleNext}
                  className={`${
                    isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-2'
                  } bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg`}
                >
                  {currentStep === tutorialSteps.length - 1 ? 'Concluir' : isMobile ? '→' : 'Próximo →'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TutorialPopover;

