# 📊 Calculadora de Valor Justo de Ações - Benjamin Graham AI

> Uma aplicação web inteligente para análise fundamentalista de ações usando os princípios clássicos de Benjamin Graham, o pai do Value Investing.

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Desenvolvido por:** [Luiz Rocha](https://github.com/devbaruque) - Programador

---

## 📖 Sobre o Projeto

A **Calculadora Benjamin Graham AI** é uma ferramenta educacional e prática para investidores que desejam analisar ações sob a ótica do **Value Investing** (Investimento em Valor). 

### 🎯 Para Que Serve?

Esta aplicação ajuda investidores a:

1. **Calcular o preço justo** de uma ação usando duas metodologias consagradas de Benjamin Graham
2. **Avaliar se uma ação está barata, justa ou cara** em relação ao seu valor intrínseco
3. **Analisar múltiplos indicadores fundamentalistas** de forma integrada e automatizada
4. **Receber recomendações inteligentes** baseadas em análise quantitativa e qualitativa
5. **Tomar decisões de investimento mais informadas** com base em fundamentos sólidos

### 💡 O Problema Que Resolve

Investidores enfrentam desafios ao analisar ações:
- ❌ Fórmulas complexas de valuation são difíceis de calcular manualmente
- ❌ Interpretar múltiplos indicadores simultaneamente é trabalhoso
- ❌ Falta de clareza sobre quando comprar, vender ou esperar
- ❌ Análise subjetiva sem critérios objetivos

**Nossa solução:**
- ✅ Cálculos automáticos e instantâneos
- ✅ Análise integrada de 10+ indicadores financeiros
- ✅ Recomendações claras com justificativas
- ✅ Interface intuitiva e profissional

---

## 🧮 Como Funciona?

### 1️⃣ Metodologia Benjamin Graham

A aplicação utiliza duas fórmulas criadas por Benjamin Graham, mentor de Warren Buffett:

#### **Fórmula Defensiva** (Investidores Conservadores)
```
Preço Justo = √(22.5 × LPA × VPA)
```
- **LPA**: Lucro por Ação
- **VPA**: Valor Patrimonial por Ação
- **22.5**: Constante de Graham (P/L de 15 × P/VP de 1.5)

Esta fórmula é mais conservadora e adequada para investidores que priorizam segurança.

#### **Fórmula de Crescimento** (Investidores Moderados)
```
Preço Justo = LPA × (8.5 + 2g)
```
- **LPA**: Lucro por Ação
- **g**: Taxa de crescimento anual esperada (%)
- **8.5**: P/L base para empresa sem crescimento
- **2g**: Ajuste pelo crescimento

Esta fórmula considera o potencial de crescimento futuro da empresa.

### 2️⃣ Análise Inteligente Automatizada

Além dos cálculos de Graham, a aplicação analisa:

| Indicador | O Que Avalia |
|-----------|--------------|
| **Margem de Segurança** | Desconto do preço atual em relação ao valor justo |
| **Dívida/EBITDA** | Saúde financeira e risco de insolvência |
| **ROE** | Rentabilidade sobre o patrimônio |
| **Margem Líquida** | Eficiência operacional |
| **Dividend Yield** | Retorno em dividendos |
| **Fluxo de Caixa Livre** | Capacidade de geração de caixa |
| **EV/EBITDA** | Múltiplo de mercado |
| **Setor** | Contexto e características do segmento |

### 3️⃣ Sistema de Recomendação

Com base em um **score ponderado**, a aplicação gera recomendações:

- 🟢 **COMPRA**: Fundamentos sólidos + preço atrativo
- 🟡 **NEUTRO/OBSERVAR**: Esperar melhor momento
- 🔴 **EVITAR/VENDER**: Riscos significativos ou preço elevado

### 4️⃣ Recursos Inteligentes

**🤖 Estimativa Automática de FCF**
- Se você não informar o Fluxo de Caixa Livre, o sistema estima automaticamente como **80% do lucro líquido**
- Transparência total: informa quando o valor é estimado

**📊 Visualização Gráfica**
- Gráfico de barras comparando preço atual vs valores justos
- Facilita a compreensão visual do valuation

**🎯 Análise Contextual**
- Considera características específicas de cada setor
- Alerta sobre projeções otimistas demais
- Avalia coerência entre indicadores

---

## 🚀 Instalação e Uso

### Pré-requisitos

- **Node.js** 16 ou superior
- **npm** ou **yarn**

### Passo a Passo

1. **Clone ou navegue até o diretório do projeto:**
```bash
cd /Users/desenvolvimentotecnorise/Desktop/GrahamCal
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Abra no navegador:**
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Deploy

Este projeto pode ser facilmente implantado em:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Qualquer serviço de hospedagem estática

---

## 📱 Como Usar a Aplicação

### Passo 1: Preencha os Dados Obrigatórios

Os únicos campos **obrigatórios** para o cálculo são:

- **LPA** (Lucro por Ação): Encontrado no DRE ou sites de análise
- **VPA** (Valor Patrimonial por Ação): Calculado como Patrimônio Líquido / Número de Ações
- **Taxa de Crescimento (%)**: Estimativa de crescimento anual dos lucros (5-15% é comum)
- **Preço Atual (R$)**: Cotação atual da ação na bolsa

### Passo 2: Preencha Dados Complementares (Opcional)

Para uma **análise mais completa**, adicione:

- **EV/EBITDA**: Múltiplo de valor de mercado
- **Dívida Líquida/EBITDA**: Indicador de endividamento
- **ROE (%)**: Retorno sobre patrimônio líquido
- **Margem Líquida (%)**: Percentual de lucro sobre receita
- **Dividend Yield (%)**: Rendimento de dividendos
- **Fluxo de Caixa Livre (milhões)**: Caixa gerado após investimentos
- **Setor**: Segmento de atuação da empresa

> 💡 **Dica:** O Fluxo de Caixa Livre será estimado automaticamente se não informado (80% do lucro líquido).

### Passo 3: Calcule e Analise

1. Clique em **"🧮 Calcular Valor Justo"**
   - Veja os preços justos (defensivo e crescimento)
   - Confira a margem de segurança
   - Analise o gráfico comparativo

2. Clique em **"🤖 Gerar Análise AI"**
   - Receba uma análise textual completa
   - Veja a recomendação final (Compra/Neutro/Evitar)
   - Entenda os pontos fortes e fracos da ação

3. Use **"🔄 Limpar Todos os Campos"** para começar nova análise

---

## 💡 Interpretação dos Resultados

### Margem de Segurança

A margem de segurança é a diferença entre o valor justo e o preço atual:

| Margem | Interpretação |
|--------|---------------|
| **> 30%** | 🟢 Excelente oportunidade - Ação muito descontada |
| **15-30%** | 🟢 Boa oportunidade - Margem confortável |
| **0-15%** | 🟡 Margem reduzida - Avaliar com cautela |
| **< 0%** | 🔴 Ação cara - Preço acima do valor justo |

### Indicadores de Risco Financeiro

**Dívida Líquida/EBITDA:**
- **< 1.5**: ✅ Baixo risco - Empresa saudável
- **1.5-3**: ⚠️ Risco moderado - Atenção
- **> 3**: 🔴 Alto risco - Endividamento preocupante

### Indicadores de Rentabilidade

**ROE e Margem Líquida:**
- **ROE > 15% + Margem > 10%**: ✅ Excelente rentabilidade
- **ROE > 10% ou Margem > 5%**: 📊 Rentabilidade razoável
- **Valores abaixo**: ⚠️ Atenção à eficiência operacional

### Dividendos

**Dividend Yield:**
- **> 5%**: 💎 Excelente pagador de dividendos
- **3-5%**: 📊 Bom pagamento
- **< 3%**: Dividendos modestos (comum em empresas de crescimento)

---

## 🎓 Conceitos Fundamentais

### O Que é Value Investing?

Value Investing é uma estratégia de investimento que busca comprar ações **abaixo do seu valor intrínseco**. Criada por Benjamin Graham nos anos 1930, foi popularizada por Warren Buffett.

**Princípios básicos:**
1. O preço nem sempre reflete o valor real da empresa
2. O mercado é irracional no curto prazo, mas racional no longo prazo
3. Margem de segurança protege contra erros de análise
4. Análise fundamentalista é essencial

### Quem Foi Benjamin Graham?

Benjamin Graham (1894-1976) é considerado o **"Pai do Value Investing"**. Autor dos clássicos:
- "Security Analysis" (1934)
- "The Intelligent Investor" (1949)

Suas metodologias influenciaram gerações de investidores, incluindo Warren Buffett, seu aluno mais famoso.

---

## 🔧 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 18.2 | Framework JavaScript para UI |
| **TailwindCSS** | 3.3 | Framework CSS utilitário |
| **Recharts** | 2.10 | Biblioteca de gráficos responsivos |
| **Vite** | 5.0 | Build tool ultra-rápido |
| **JavaScript** | ES6+ | Linguagem de programação |

### Por Que Essas Tecnologias?

- ✅ **React**: Componentização, performance, ecossistema robusto
- ✅ **TailwindCSS**: Desenvolvimento rápido, design consistente, responsivo
- ✅ **Recharts**: Gráficos bonitos e interativos sem complexidade
- ✅ **Vite**: Build instantâneo, hot reload, otimização automática
- ✅ **JavaScript**: Simplicidade, sem overhead de TypeScript para MVP

---

## 📂 Estrutura do Projeto

```
GrahamCal/
├── src/
│   ├── App.jsx          # Componente principal (lógica + UI)
│   ├── main.jsx         # Ponto de entrada da aplicação
│   └── index.css        # Estilos globais + Tailwind
├── public/              # Arquivos estáticos
├── index.html           # HTML base
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
├── tailwind.config.js   # Configuração do Tailwind
├── postcss.config.js    # Configuração do PostCSS
├── README.md           # Este arquivo
├── EXEMPLOS.md         # Exemplos práticos de uso
└── .gitignore          # Arquivos ignorados pelo Git
```

### Arquitetura do Código

O código foi desenvolvido seguindo princípios de:
- **Componentização**: Estrutura preparada para refatoração modular
- **Funções puras**: Cálculos isolados e testáveis
- **Single Responsibility**: Cada função tem propósito único
- **Código autodocumentado**: Comentários explicativos em pontos críticos
- **Responsividade**: Design adaptável a todos os dispositivos

---

## 📚 Exemplos de Uso

Incluímos **5 exemplos práticos** no arquivo `EXEMPLOS.md`:

1. **Empresa de Valor** - Fundamentos sólidos, boa oportunidade
2. **Empresa em Transição** - Alto crescimento mas endividada
3. **Empresa Cara** - Preço muito acima do valor justo
4. **Empresa Premium** - Blue chip de primeira linha
5. **Growth Stock** - Empresa de crescimento acelerado

Cada exemplo inclui todos os dados para você testar na calculadora.

---

## ⚠️ Disclaimer Legal

**IMPORTANTE:** Esta ferramenta é **educacional e informativa**. 

- ❌ **NÃO constitui recomendação de investimento**
- ❌ **NÃO substitui análise profissional completa**
- ❌ **NÃO considera todos os fatores necessários para decisão de investimento**

Os cálculos são baseados em fórmulas clássicas de Benjamin Graham, mas não consideram:
- Fatores qualitativos (qualidade da gestão, governança corporativa)
- Análise técnica e tendências de mercado
- Eventos futuros e riscos específicos
- Contexto macroeconômico completo

### Recomendações:

✅ **Sempre faça sua própria análise**  
✅ **Consulte o histórico completo da empresa**  
✅ **Considere fatores qualitativos (gestão, vantagens competitivas)**  
✅ **Diversifique seus investimentos**  
✅ **Consulte profissionais qualificados antes de investir**  

**Investir na bolsa envolve riscos. Rentabilidade passada não garante rentabilidade futura.**

---

## 🚀 Roadmap e Melhorias Futuras

### Versão 1.1 (Curto Prazo)
- [ ] Histórico de análises (localStorage)
- [ ] Comparação entre múltiplas ações
- [ ] Exportar análise em PDF
- [ ] Testes automatizados (Jest + React Testing Library)
- [ ] Modo escuro (dark mode)

### Versão 1.5 (Médio Prazo)
- [ ] Integração com API de cotações em tempo real (B3, Alpha Vantage)
- [ ] Autenticação de usuários
- [ ] Dashboard com portfólio de ações favoritas
- [ ] Alertas de preço por e-mail
- [ ] Análise de múltiplas moedas (USD, EUR)

### Versão 2.0 (Longo Prazo)
- [ ] Machine Learning para refinar recomendações
- [ ] Análise técnica complementar (suporte, resistência)
- [ ] Aplicativo mobile (React Native)
- [ ] API pública para desenvolvedores
- [ ] Sistema de backtesting

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tem sugestões de melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Áreas que Precisam de Contribuição:
- Testes automatizados
- Documentação adicional
- Novos indicadores financeiros
- Melhorias de UI/UX
- Internacionalização (i18n)

---

## 📞 Suporte e Contato

- **Desenvolvedor:** Luiz Rocha
- **GitHub:** [github.com/luizrocha](https://github.com/luizrocha)
- **Email:** contato@luizrocha.dev
- **Issues:** [GitHub Issues](https://github.com/luizrocha/graham-calculator/issues)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2025 Luiz Rocha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🎓 Referências e Leituras Recomendadas

### Livros
- **"The Intelligent Investor"** - Benjamin Graham (1949)
- **"Security Analysis"** - Benjamin Graham & David Dodd (1934)
- **"The Essays of Warren Buffett"** - Warren Buffett (compilado por Lawrence Cunningham)

### Sites e Recursos
- [Status Invest](https://statusinvest.com.br) - Dados fundamentalistas de ações brasileiras
- [Fundamentus](https://fundamentus.com.br) - Análise fundamentalista gratuita
- [Investopedia](https://investopedia.com) - Educação financeira

### Comunidades
- [Reddit r/investimentos](https://reddit.com/r/investimentos)
- [Clube do Valor](https://clubedovalor.com.br)

---

## 🙏 Agradecimentos

Este projeto foi desenvolvido com base nos ensinamentos de:
- **Benjamin Graham** - Por criar as metodologias de Value Investing
- **Warren Buffett** - Por popularizar e provar a eficácia do Value Investing
- **A comunidade de investidores** - Por compartilhar conhecimento

---

<div align="center">

**Desenvolvido com 💙 por Luiz Rocha**

*"Price is what you pay. Value is what you get."* - Warren Buffett

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!

[⬆ Voltar ao topo](#-calculadora-de-valor-justo-de-ações---benjamin-graham-ai)

</div>
