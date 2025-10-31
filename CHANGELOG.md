# 📝 Changelog - Calculadora Benjamin Graham

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

---

## [v1.2.0] - 2025-01-31

### ✨ Adicionado
- Sistema de ajuda interativo completo com tutorial passo a passo
- Botão "Precisa de ajuda?" fixo no canto inferior direito
- Tutorial com 8 passos educativos
- Links diretos para Investidor10 e StatusInvest
- Detecção automática de tipo de dispositivo (mobile/tablet/desktop)

### 🐛 Corrigido
- **Responsividade para tablets**: Agora funciona perfeitamente em iPads
- **Posição fixa do tutorial**: Não muda mais de posição ao navegar entre passos
- **Layout mobile**: Modal fullscreen com header e footer fixos
- **Scroll interno**: Habilitado em tablets e mobile quando necessário

### 🎨 Melhorado
- Tutorial sempre centralizado no desktop para melhor UX
- Modal maior em tablets (85vw com max-width de 768px)
- Altura máxima de 90vh em tablets para evitar overflow
- Animações suaves com Framer Motion
- Design dark mode elegante

---

## [v1.1.0] - 2025-01-30

### ✨ Adicionado
- Google Analytics com tracking de eventos
- Vercel Analytics integrado
- Rastreamento de ações do usuário:
  - Cálculos realizados
  - Análises geradas
  - Cliques no Instagram
  - Resets do formulário

### 🎨 Melhorado
- Botão do Instagram com ícone e gradiente
- Disclaimer com cores de alerta
- Espaçamento entre elementos no rodapé

---

## [v1.0.0] - 2025-01-29

### ✨ Lançamento Inicial
- Cálculo de valor justo (fórmula defensiva e crescimento)
- Análise automática de 10+ indicadores
- Sistema de recomendação (Compra/Neutro/Evitar)
- Gráfico comparativo com Recharts
- Estimativa automática de FCF (80% do lucro líquido)
- Design moderno com TailwindCSS
- Totalmente responsivo
- Botão de reset para limpar campos

### 🎯 Funcionalidades Core
- Fórmula Defensiva: √(22.5 × LPA × VPA)
- Fórmula de Crescimento: LPA × (8.5 + 2g)
- Margem de segurança automática
- Análise de múltiplos indicadores:
  - Valuation
  - Crescimento
  - Risco financeiro (Dívida/EBITDA)
  - Rentabilidade (ROE, Margem Líquida)
  - Dividendos
  - Fluxo de caixa
  - Análise setorial
  - Múltiplos de mercado

---

## Legenda

- ✨ **Adicionado**: Novas funcionalidades
- 🐛 **Corrigido**: Bugs e problemas resolvidos
- 🎨 **Melhorado**: Melhorias visuais e de UX
- 🔧 **Alterado**: Mudanças em funcionalidades existentes
- 🗑️ **Removido**: Funcionalidades descontinuadas
- 🔒 **Segurança**: Correções de vulnerabilidades

---

## Roadmap Futuro

### v1.3.0 (Próxima versão)
- [ ] PWA para instalação
- [ ] Modo offline
- [ ] Histórico de análises
- [ ] Comparação entre múltiplas ações

### v2.0.0 (Futuro)
- [ ] Integração com APIs de cotações em tempo real
- [ ] Machine Learning para refinar recomendações
- [ ] Aplicativo mobile nativo
- [ ] Sistema de favoritos

