import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { initGA, trackCalculation, trackAnalysisGenerated, trackReset, trackInstagramClick } from './analytics';

/**
 * Calculadora de Valor Justo de Ações - Benjamin Graham AI
 * 
 * Esta aplicação calcula o preço justo de uma ação usando duas fórmulas:
 * 1. Fórmula Defensiva: √(22.5 × LPA × VPA)
 * 2. Fórmula de Crescimento: LPA × (8.5 + 2g)
 * 
 * Além disso, gera uma análise automática baseada em múltiplos indicadores
 */

function App() {
  // Inicializar Google Analytics quando o componente montar
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      initGA(measurementId);
    }
  }, []);
  // Estados para os inputs do usuário
  const [lpa, setLpa] = useState('');
  const [vpa, setVpa] = useState('');
  const [taxaCrescimento, setTaxaCrescimento] = useState('');
  const [precoAtual, setPrecoAtual] = useState('');
  const [evEbitda, setEvEbitda] = useState('');
  const [dividaEbitda, setDividaEbitda] = useState('');
  const [roe, setRoe] = useState('');
  const [margemLiquida, setMargemLiquida] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [fluxoCaixaLivre, setFluxoCaixaLivre] = useState('');
  const [setor, setSetor] = useState('');

  // Estados para os resultados
  const [precoJustoDefensivo, setPrecoJustoDefensivo] = useState(null);
  const [precoJustoCrescimento, setPrecoJustoCrescimento] = useState(null);
  const [margemSeguranca, setMargemSeguranca] = useState(null);
  const [analise, setAnalise] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  /**
   * Calcula o preço justo usando a fórmula defensiva de Graham
   * Fórmula: √(22.5 × LPA × VPA)
   */
  const calcularPrecoDefensivo = (lpaVal, vpaVal) => {
    return Math.sqrt(22.5 * lpaVal * vpaVal);
  };

  /**
   * Calcula o preço justo usando a fórmula de crescimento de Graham
   * Fórmula: LPA × (8.5 + 2g)
   * onde g é a taxa de crescimento esperada
   */
  const calcularPrecoCrescimento = (lpaVal, g) => {
    return lpaVal * (8.5 + 2 * g);
  };

  /**
   * Calcula a margem de segurança
   * Retorna a diferença percentual entre o preço justo e o preço atual
   */
  const calcularMargemSeguranca = (precoJusto, precoAtualVal) => {
    return ((precoJusto - precoAtualVal) / precoJusto) * 100;
  };

  /**
   * Gera uma análise automática completa baseada em todos os indicadores
   * Esta função aplica lógica de investimento para avaliar a ação
   */
  const gerarAnalise = () => {
    const lpaNum = parseFloat(lpa);
    const vpaNum = parseFloat(vpa);
    const crescNum = parseFloat(taxaCrescimento);
    const precoNum = parseFloat(precoAtual);
    const evEbitdaNum = parseFloat(evEbitda);
    const dividaEbitdaNum = parseFloat(dividaEbitda);
    const roeNum = parseFloat(roe);
    const margemNum = parseFloat(margemLiquida);
    const dividendNum = parseFloat(dividendYield);
    const fcfNum = parseFloat(fluxoCaixaLivre);

    let analiseTexto = '📊 **ANÁLISE COMPLETA DA AÇÃO**\n\n';

    // Análise de Valuation (preço vs valor justo)
    analiseTexto += '💰 **VALUATION:**\n';
    if (precoNum < precoJustoDefensivo * 0.8) {
      analiseTexto += `✅ A ação está sendo negociada com um desconto significativo de ${Math.abs(margemSeguranca).toFixed(1)}%. `;
      analiseTexto += 'Segundo a fórmula defensiva de Graham, há uma boa margem de segurança. ';
      analiseTexto += 'Este pode ser um momento interessante para compra, especialmente para investidores conservadores.\n\n';
    } else if (precoNum >= precoJustoDefensivo * 0.8 && precoNum <= precoJustoCrescimento) {
      analiseTexto += `⚖️ A ação está próxima do valor justo (margem: ${margemSeguranca.toFixed(1)}%). `;
      analiseTexto += 'O preço atual está entre o valor defensivo e o valor de crescimento. ';
      analiseTexto += 'Recomenda-se manter em observação e aguardar uma melhor oportunidade de entrada.\n\n';
    } else {
      analiseTexto += `⚠️ A ação parece estar sobrevalorizada (${Math.abs(margemSeguranca).toFixed(1)}% acima do valor justo). `;
      analiseTexto += 'O preço atual excede as estimativas de Graham. ';
      analiseTexto += 'Melhor aguardar uma correção ou procurar outras oportunidades.\n\n';
    }

    // Análise de Crescimento
    analiseTexto += '📈 **CRESCIMENTO:**\n';
    if (crescNum > 15) {
      analiseTexto += `⚠️ A taxa de crescimento projetada (${crescNum}%) é bastante otimista. `;
      analiseTexto += 'Certifique-se de que essa projeção é sustentável pelo histórico da empresa. ';
      analiseTexto += 'Crescimentos muito altos podem não se materializar.\n\n';
    } else if (crescNum >= 8 && crescNum <= 15) {
      analiseTexto += `✅ A taxa de crescimento (${crescNum}%) está em um patamar razoável e sustentável. `;
      analiseTexto += 'Esse crescimento é compatível com empresas maduras e sólidas.\n\n';
    } else if (crescNum >= 0 && crescNum < 8) {
      analiseTexto += `📊 A taxa de crescimento (${crescNum}%) é modesta. `;
      analiseTexto += 'A empresa pode estar em um setor maduro ou passando por desafios.\n\n';
    } else {
      analiseTexto += `🔴 A taxa de crescimento é negativa (${crescNum}%). `;
      analiseTexto += 'Isso indica contração nos lucros. Investir requer cautela extrema.\n\n';
    }

    // Análise de Risco Financeiro (Dívida)
    analiseTexto += '⚡ **RISCO FINANCEIRO:**\n';
    if (!isNaN(dividaEbitdaNum)) {
      if (dividaEbitdaNum > 3) {
        analiseTexto += `🔴 ATENÇÃO: A dívida líquida é ${dividaEbitdaNum.toFixed(1)}x o EBITDA. `;
        analiseTexto += 'Isso indica alto endividamento e risco financeiro elevado. ';
        analiseTexto += 'A empresa pode ter dificuldades em cenários adversos.\n';
      } else if (dividaEbitdaNum >= 1.5 && dividaEbitdaNum <= 3) {
        analiseTexto += `⚠️ A dívida líquida está em ${dividaEbitdaNum.toFixed(1)}x o EBITDA. `;
        analiseTexto += 'O endividamento é moderado. Fique atento à capacidade de geração de caixa.\n';
      } else if (dividaEbitdaNum >= 0) {
        analiseTexto += `✅ A dívida está controlada (${dividaEbitdaNum.toFixed(1)}x EBITDA). `;
        analiseTexto += 'Isso demonstra solidez financeira e baixo risco de solvência.\n';
      } else {
        analiseTexto += `💎 A empresa possui caixa líquido positivo! `;
        analiseTexto += 'Excelente posição financeira, com recursos para investimentos e distribuição aos acionistas.\n';
      }
    }
    analiseTexto += '\n';

    // Análise de Rentabilidade
    analiseTexto += '💼 **RENTABILIDADE:**\n';
    if (!isNaN(roeNum) && !isNaN(margemNum)) {
      if (roeNum > 15 && margemNum > 10) {
        analiseTexto += `✅ Excelente rentabilidade! ROE de ${roeNum.toFixed(1)}% e margem líquida de ${margemNum.toFixed(1)}%. `;
        analiseTexto += 'A empresa demonstra eficiência operacional e boa utilização do patrimônio.\n';
      } else if (roeNum >= 10 || margemNum >= 5) {
        analiseTexto += `📊 Rentabilidade razoável. ROE: ${roeNum.toFixed(1)}%, Margem: ${margemNum.toFixed(1)}%. `;
        analiseTexto += 'Os números são aceitáveis, mas há espaço para melhoria.\n';
      } else {
        analiseTexto += `⚠️ Rentabilidade baixa. ROE: ${roeNum.toFixed(1)}%, Margem: ${margemNum.toFixed(1)}%. `;
        analiseTexto += 'A empresa pode estar enfrentando desafios operacionais ou margens comprimidas.\n';
      }
    }
    analiseTexto += '\n';

    // Análise de Dividendos
    analiseTexto += '💵 **DIVIDENDOS:**\n';
    if (!isNaN(dividendNum)) {
      if (dividendNum > 5) {
        analiseTexto += `✅ Dividend Yield de ${dividendNum.toFixed(2)}% - Excelente pagador de dividendos! `;
        analiseTexto += 'Interessante para investidores focados em renda passiva.\n';
      } else if (dividendNum >= 3) {
        analiseTexto += `📊 Dividend Yield de ${dividendNum.toFixed(2)}% - Bom pagamento de dividendos. `;
        analiseTexto += 'Oferece um retorno razoável em proventos.\n';
      } else if (dividendNum > 0) {
        analiseTexto += `⚠️ Dividend Yield de ${dividendNum.toFixed(2)}% - Dividendos modestos. `;
        analiseTexto += 'A empresa pode estar reinvestindo mais nos negócios.\n';
      } else {
        analiseTexto += `🔴 A empresa não paga dividendos ou tem yield negativo. `;
        analiseTexto += 'Típico de empresas em crescimento que reinvestem todo o lucro.\n';
      }
    }
    analiseTexto += '\n';

    // Análise de Fluxo de Caixa
    analiseTexto += '🏦 **GERAÇÃO DE CAIXA:**\n';
    
    // Se FCF não foi informado, estimar como 80% do lucro líquido baseado no LPA
    let fcfParaAnalise = fcfNum;
    let fcfEstimado = false;
    
    if (isNaN(fcfNum) && !isNaN(lpaNum)) {
      // Estimativa: assume que FCF é aproximadamente 80% do lucro líquido
      // Como não temos o lucro líquido total, usamos o LPA como proxy
      fcfParaAnalise = lpaNum * 0.8;
      fcfEstimado = true;
    }
    
    if (!isNaN(fcfParaAnalise)) {
      if (fcfParaAnalise > 0) {
        analiseTexto += `✅ Fluxo de caixa livre ${fcfEstimado ? 'estimado ' : ''}positivo`;
        if (!fcfEstimado) {
          analiseTexto += ` (${fcfParaAnalise.toFixed(2)} milhões)`;
        }
        analiseTexto += '. ';
        if (fcfEstimado) {
          analiseTexto += '(Estimativa: ~80% do lucro líquido, pois FCF não foi informado). ';
        }
        analiseTexto += 'A empresa gera caixa consistente, fundamental para sustentabilidade do negócio.\n';
      } else if (fcfParaAnalise < 0) {
        analiseTexto += `🔴 ATENÇÃO: Fluxo de caixa livre ${fcfEstimado ? 'estimado ' : ''}negativo`;
        if (!fcfEstimado) {
          analiseTexto += ` (${fcfParaAnalise.toFixed(2)} milhões)`;
        }
        analiseTexto += '. ';
        if (fcfEstimado) {
          analiseTexto += '(Estimativa baseada em lucro negativo). ';
        }
        analiseTexto += 'A empresa está consumindo caixa. Verifique se isso é temporário ou estrutural.\n';
      }
    } else {
      analiseTexto += `⚠️ Fluxo de caixa livre não informado e não foi possível estimar. `;
      analiseTexto += 'Recomenda-se verificar a capacidade de geração de caixa da empresa.\n';
    }
    analiseTexto += '\n';

    // Análise de Setor
    analiseTexto += '🏭 **ANÁLISE SETORIAL:**\n';
    const setorLower = setor.toLowerCase();
    if (setorLower.includes('financeiro') || setorLower.includes('banco')) {
      analiseTexto += `🏦 Setor Financeiro: Geralmente estável, mas sensível a juros e ciclos econômicos. `;
      analiseTexto += 'Atente-se à qualidade da carteira de crédito e regulação.\n';
    } else if (setorLower.includes('utilidade') || setorLower.includes('energia') || setorLower.includes('saneamento')) {
      analiseTexto += `⚡ Setor de Utilidades: Setores defensivos com receitas previsíveis. `;
      analiseTexto += 'Bons pagadores de dividendos, mas com crescimento limitado.\n';
    } else if (setorLower.includes('tecnologia') || setorLower.includes('tech') || setorLower.includes('software')) {
      analiseTexto += `💻 Setor de Tecnologia: Alto potencial de crescimento, mas também maior volatilidade. `;
      analiseTexto += 'Empresas de tech exigem análise mais profunda de vantagens competitivas.\n';
    } else if (setorLower.includes('consumo') || setorLower.includes('varejo')) {
      analiseTexto += `🛒 Setor de Consumo: Sensível ao ciclo econômico e poder de compra. `;
      analiseTexto += 'Avalie marcas fortes e poder de precificação.\n';
    } else if (setorLower.includes('industrial') || setorLower.includes('manufatura')) {
      analiseTexto += `🏭 Setor Industrial: Cíclico e capital-intensivo. `;
      analiseTexto += 'O momento econômico é crucial para performance.\n';
    } else if (setor) {
      analiseTexto += `📊 Setor: ${setor}. Avalie as particularidades e riscos específicos deste segmento.\n`;
    }
    analiseTexto += '\n';

    // Múltiplos de Mercado
    analiseTexto += '📉 **MÚLTIPLOS:**\n';
    if (!isNaN(evEbitdaNum)) {
      if (evEbitdaNum < 8) {
        analiseTexto += `✅ EV/EBITDA de ${evEbitdaNum.toFixed(1)}x está em patamar atrativo. `;
        analiseTexto += 'A empresa está barata em relação à sua geração operacional de caixa.\n';
      } else if (evEbitdaNum <= 12) {
        analiseTexto += `📊 EV/EBITDA de ${evEbitdaNum.toFixed(1)}x está em patamar razoável. `;
        analiseTexto += 'Múltiplo adequado para empresas de qualidade.\n';
      } else {
        analiseTexto += `⚠️ EV/EBITDA de ${evEbitdaNum.toFixed(1)}x está elevado. `;
        analiseTexto += 'A empresa pode estar cara ou o mercado está precificando crescimento futuro.\n';
      }
    }
    analiseTexto += '\n';

    // Conclusão e Recomendação
    analiseTexto += '🎯 **RECOMENDAÇÃO FINAL:**\n';
    
    // Score baseado em múltiplos fatores
    let score = 0;
    if (precoNum < precoJustoDefensivo * 0.8) score += 3;
    else if (precoNum <= precoJustoCrescimento) score += 1;
    else score -= 2;

    if (dividaEbitdaNum < 1.5) score += 2;
    else if (dividaEbitdaNum > 3) score -= 2;

    if (roeNum > 15 && margemNum > 10) score += 2;
    if (dividendNum > 5) score += 1;
    
    // Usa FCF estimado se não foi informado
    if (!isNaN(fcfParaAnalise) && fcfParaAnalise > 0) score += 1;
    else if (!isNaN(fcfParaAnalise) && fcfParaAnalise < 0) score -= 1;

    if (score >= 6) {
      analiseTexto += `🟢 **COMPRA:** A ação apresenta fundamentos sólidos e está em um ponto de entrada atrativo. `;
      analiseTexto += 'Os indicadores apontam para uma oportunidade de investimento com boa relação risco-retorno. ';
      analiseTexto += 'Considere iniciar ou aumentar posição, respeitando sempre seu perfil de risco e diversificação.\n';
    } else if (score >= 2) {
      analiseTexto += `🟡 **NEUTRO/OBSERVAR:** A ação tem aspectos positivos e negativos equilibrados. `;
      analiseTexto += 'Não há urgência para compra, mas vale monitorar para uma eventual correção de preço. ';
      analiseTexto += 'Acompanhe os próximos resultados e notícias da empresa.\n';
    } else {
      analiseTexto += `🔴 **EVITAR/VENDER:** Os indicadores sugerem cautela. `;
      analiseTexto += 'A ação apresenta riscos significativos ou está muito cara. ';
      analiseTexto += 'Se você já possui, considere reduzir exposição. Se não possui, busque outras oportunidades.\n';
    }

    analiseTexto += '\n';
    analiseTexto += '⚠️ **DISCLAIMER:** Esta análise é automatizada e educacional. ';
    analiseTexto += 'Não constitui recomendação de investimento. Sempre faça sua própria análise e consulte profissionais qualificados.\n';

    return analiseTexto;
  };

  /**
   * Handler principal que executa todos os cálculos
   */
  const handleCalcular = () => {
    // Validação básica
    if (!lpa || !vpa || !taxaCrescimento || !precoAtual) {
      alert('Por favor, preencha pelo menos LPA, VPA, Taxa de Crescimento e Preço Atual');
      return;
    }

    const lpaNum = parseFloat(lpa);
    const vpaNum = parseFloat(vpa);
    const crescNum = parseFloat(taxaCrescimento);
    const precoNum = parseFloat(precoAtual);

    // Validação de valores negativos
    if (lpaNum <= 0 || vpaNum <= 0 || precoNum <= 0) {
      alert('LPA, VPA e Preço Atual devem ser valores positivos');
      return;
    }

    // Calcular preços justos
    const precoDefensivo = calcularPrecoDefensivo(lpaNum, vpaNum);
    const precoCrescimento = calcularPrecoCrescimento(lpaNum, crescNum);

    // Usar o preço defensivo como referência para margem de segurança (mais conservador)
    const margem = calcularMargemSeguranca(precoDefensivo, precoNum);

    // Atualizar estados
    setPrecoJustoDefensivo(precoDefensivo);
    setPrecoJustoCrescimento(precoCrescimento);
    setMargemSeguranca(margem);
    setMostrarResultados(true);
    
    // Rastrear cálculo no Google Analytics
    trackCalculation(setor, precoDefensivo);
  };

  /**
   * Handler para gerar a análise completa
   */
  const handleGerarAnalise = () => {
    if (!mostrarResultados) {
      alert('Por favor, calcule os valores primeiro');
      return;
    }
    const analiseGerada = gerarAnalise();
    setAnalise(analiseGerada);
    
    // Rastrear geração de análise
    trackAnalysisGenerated();
  };

  /**
   * Handler para resetar todos os campos e resultados
   */
  const handleResetar = () => {
    // Limpar todos os inputs
    setLpa('');
    setVpa('');
    setTaxaCrescimento('');
    setPrecoAtual('');
    setEvEbitda('');
    setDividaEbitda('');
    setRoe('');
    setMargemLiquida('');
    setDividendYield('');
    setFluxoCaixaLivre('');
    setSetor('');
    
    // Limpar resultados
    setPrecoJustoDefensivo(null);
    setPrecoJustoCrescimento(null);
    setMargemSeguranca(null);
    setAnalise('');
    setMostrarResultados(false);
    
    // Rastrear reset
    trackReset();
  };

  /**
   * Prepara dados para o gráfico comparativo
   */
  const getDadosGrafico = () => {
    if (!mostrarResultados) return [];

    return [
      {
        nome: 'Preço Atual',
        valor: parseFloat(precoAtual),
        cor: '#ef4444'
      },
      {
        nome: 'Graham Defensivo',
        valor: precoJustoDefensivo,
        cor: '#3b82f6'
      },
      {
        nome: 'Graham Crescimento',
        valor: precoJustoCrescimento,
        cor: '#10b981'
      }
    ];
  };

  /**
   * Retorna a cor da célula do gráfico baseado no tipo
   */
  const getCellColor = (entry) => {
    return entry.cor;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            📊 Calculadora de Valor Justo de Ações
          </h1>
          <h2 className="text-2xl text-white/90 font-light mb-2">
            Benjamin Graham AI
          </h2>
          <p className="text-white/80 text-lg">
            Analise ações usando as fórmulas clássicas de valor + inteligência de dados
          </p>
        </header>

        {/* Container Principal */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Card de Inputs */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
              📝 Dados da Ação
            </h3>
            
            <div className="space-y-4">
              {/* Inputs Principais (Obrigatórios) */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-3">Dados Principais*</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LPA (Lucro por Ação)*
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={lpa}
                      onChange={(e) => setLpa(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 5.50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      VPA (Valor Patrimonial)*
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={vpa}
                      onChange={(e) => setVpa(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 25.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Taxa Crescimento (%)* 
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={taxaCrescimento}
                      onChange={(e) => setTaxaCrescimento(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 10.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço Atual (R$)*
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={precoAtual}
                      onChange={(e) => setPrecoAtual(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 30.00"
                    />
                  </div>
                </div>
              </div>

              {/* Inputs Complementares (Opcionais) */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-3">Indicadores Complementares</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      EV/EBITDA
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={evEbitda}
                      onChange={(e) => setEvEbitda(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 8.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Dívida Líq./EBITDA
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={dividaEbitda}
                      onChange={(e) => setDividaEbitda(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 2.0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      ROE (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={roe}
                      onChange={(e) => setRoe(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 18.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Margem Líquida (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={margemLiquida}
                      onChange={(e) => setMargemLiquida(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 12.0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Dividend Yield (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={dividendYield}
                      onChange={(e) => setDividendYield(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 5.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      FCF (milhões R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={fluxoCaixaLivre}
                      onChange={(e) => setFluxoCaixaLivre(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 150.5"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Setor da Empresa
                  </label>
                  <input
                    type="text"
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
                    className="input-field"
                    placeholder="Ex: Tecnologia, Financeiro, Consumo..."
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3 pt-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleCalcular}
                    className="btn-primary flex-1"
                  >
                    🧮 Calcular Valor Justo
                  </button>
                  
                  <button
                    onClick={handleGerarAnalise}
                    disabled={!mostrarResultados}
                    className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
                      mostrarResultados
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    🤖 Gerar Análise AI
                  </button>
                </div>
                
                <button
                  onClick={handleResetar}
                  className="w-full px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  🔄 Limpar Todos os Campos
                </button>
              </div>
            </div>
          </div>

          {/* Card de Resultados */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
              📈 Resultados
            </h3>
            
            {mostrarResultados ? (
              <div className="space-y-6">
                {/* Cards de Valores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <p className="text-sm text-blue-700 font-medium mb-1">Preço Justo (Defensivo)</p>
                    <p className="text-3xl font-bold text-blue-900">
                      R$ {precoJustoDefensivo.toFixed(2)}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">√(22.5 × LPA × VPA)</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-green-700 font-medium mb-1">Preço Justo (Crescimento)</p>
                    <p className="text-3xl font-bold text-green-900">
                      R$ {precoJustoCrescimento.toFixed(2)}
                    </p>
                    <p className="text-xs text-green-600 mt-1">LPA × (8.5 + 2g)</p>
                  </div>
                </div>

                {/* Margem de Segurança */}
                <div className={`p-5 rounded-lg border-2 ${
                  margemSeguranca > 20 
                    ? 'bg-green-50 border-green-300' 
                    : margemSeguranca > 0 
                      ? 'bg-yellow-50 border-yellow-300' 
                      : 'bg-red-50 border-red-300'
                }`}>
                  <p className="text-sm font-medium mb-2">
                    {margemSeguranca > 20 ? '✅' : margemSeguranca > 0 ? '⚠️' : '❌'} Margem de Segurança
                  </p>
                  <p className="text-4xl font-bold mb-2">
                    {margemSeguranca.toFixed(1)}%
                  </p>
                  <p className="text-sm">
                    {margemSeguranca > 20 
                      ? '🟢 Excelente oportunidade de compra' 
                      : margemSeguranca > 0 
                        ? '🟡 Margem reduzida, avaliar com cautela' 
                        : '🔴 Ação acima do valor justo'}
                  </p>
                </div>

                {/* Gráfico Comparativo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Comparação Visual</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={getDadosGrafico()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="nome" 
                        tick={{ fontSize: 12 }}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => `R$ ${value.toFixed(2)}`}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ccc' }}
                      />
                      <Bar dataKey="valor" radius={[8, 8, 0, 0]}>
                        {getDadosGrafico().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-500 text-lg">
                  Preencha os dados e clique em "Calcular Valor Justo"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card de Análise Automática */}
        {analise && (
          <div className="card mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
              🤖 Análise Automática Completa
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-lg">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">
                {analise}
              </pre>
            </div>
          </div>
        )}

        {/* Rodapé Informativo */}
        <footer className="mt-12 text-center text-white/80 space-y-4">
          <div className="card bg-white/10 backdrop-blur-sm border border-white/20">
            <h4 className="text-lg font-semibold text-white mb-3">💡 Dicas de Investimento</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-white/90">
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="font-semibold mb-1">🛡️ Perfil Conservador</p>
                <p>Priorize margem de segurança &gt; 30%, baixo endividamento e dividendos consistentes</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="font-semibold mb-1">⚖️ Perfil Moderado</p>
                <p>Busque margem de 15-30%, ROE &gt; 12% e empresas em setores estáveis</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="font-semibold mb-1">🚀 Perfil Agressivo</p>
                <p>Pode aceitar margens menores em empresas com alto crescimento e boa governança</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm">
            Desenvolvido por{' '}
            <a
              href="https://www.instagram.com/luizrochadev/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackInstagramClick}
              className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 ml-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Luiz Rocha
              </span>
            </a>
            <span className="ml-2">
              apaixonado por finanças e interfaces inteligentes.
            </span>
          </p>
          <p className="text-xs text-yellow-300 font-semibold bg-yellow-900/30 px-4 py-2 rounded-lg border border-yellow-500/50">
            ⚠️ Esta ferramenta é educacional. Sempre consulte profissionais qualificados antes de investir.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

