# Atualizações Críticas ao Plano de Paridade

**Data:** 2025-01-27  
**Status:** Descobertas adicionais que alteram prioridades P0

---

## 🔴 DESCOBERTAS CRÍTICAS (P0)

### 1. Paywall + Free Trial (P0 - CRÍTICO)

**Contexto:**
- Shotsy tem "Shotsy+" premium com paywall
- Roadmap Mounjaro menciona: "Fase 1 — Autenticação & paywall: Clerk (providers, rotas protegidas), "MounjaroAI+" (gating) com Clerk + Stripe (via Clerk Payments)"
- **Free trial de 1 semana** mencionado pelo usuário
- **NÃO está implementado** no Mounjaro atual

**Gap Identificado:**
- ❌ Sem paywall
- ❌ Sem free trial
- ❌ Sem gating de features premium
- ❌ Sem integração Clerk Payments

**Ações Necessárias:**
1. Criar schema Supabase para `subscriptions`:
   - `user_id`, `status` (active/trial/expired), `trial_start_date`, `trial_end_date`, `subscription_start_date`, `subscription_end_date`
2. Implementar hooks `useSubscription()`, `usePremiumFeatures()`
3. Criar tela de paywall (`app/(tabs)/premium.tsx` ou modal)
4. Integrar Clerk Payments para gerenciar assinaturas
5. Implementar gating de features premium (ex: AI Nutrition, Export Data, Insights avançados)
6. Adicionar banner de trial nas telas principais
7. Criar evento de tracking: `trial_started`, `trial_expired`, `subscription_purchased`

**Estimativa:** 16-20h (P0)

---

### 2. FAQ com Busca Remissiva (P0 - CRÍTICO)

**Contexto:**
- Imagem anexada mostra FAQ completa do Shotsy
- **12 perguntas** identificadas
- Busca remissiva mencionada pelo usuário
- **NÃO está implementada** no Mounjaro atual

**Perguntas da FAQ (extraídas da imagem):**
1. "Como posso aproveitar ao máximo o uso do Shotsy?"
2. "O que inclui o Shotsy+ premium?"
3. "Como adiciono ou ajusto pesos?"
4. "Como altero ou excluo injeções?"
5. "Como adiciono uma dosagem personalizada?"
6. "Como adiciono efeitos colaterais personalizados?"
7. "Como posso alternar meus locais de injeção?"
8. "Por que meu nível de medicação está mostrando o dobro da quantidade esperada?"
9. "Estou experimentando algum outro problema inesperado com o aplicativo."
10. "Como restauro minha assinatura Shotsy+ em um novo dispositivo?"
11. "Enviei uma solicitação de suporte mas ainda não obtive resposta."
12. "Como excluo minha conta?"

**Gap Identificado:**
- ❌ Sem tela FAQ
- ❌ Sem busca remissiva (busca por termos nas perguntas)
- ❌ Sem navegação FAQ → Settings
- ❌ Sem respostas implementadas

**Ações Necessárias:**
1. Criar `app/(tabs)/faq.tsx` ou `components/settings/FAQScreen.tsx`
2. Implementar busca remissiva (filtro de perguntas por termo)
3. Criar componente `FAQItem` expansível (pergunta → resposta)
4. Adicionar link "FAQ" em Settings (substituir ou complementar "Suporte")
5. Implementar navegação: Settings → FAQ (com back button)
6. Criar array de FAQ items com perguntas e respostas (PT-BR)
7. Adicionar evento de tracking: `faq_viewed`, `faq_searched`, `faq_item_opened`

**Estimativa:** 8-12h (P0)

---

## 📊 INSIGHTS DAS URLs ANALISADAS

### August Wanner (Designer do Shotsy)
- **Design System:** Apple HIG + custom design system
- **Milestones:** Celebrações para compartilhamento social
- **Custom Metrics:** Sistema flexível de métricas personalizáveis
- **Visual Refinement:** Polimento visual completo
- **Impact:** Shotsy ganhou "Lone Skipper Shippie Award" (Revenue Cat)

### Monzo Community (DoseDiary - Competidor)
- **PWA Approach:** Versão web antes de mobile
- **Import Function:** Permite migração de dados de apps pagos
- **Free Core:** Funcionalidades core gratuitas, sem ads
- **Community Growth:** Crescimento via grupos Facebook + word-of-mouth
- **Tip:** "Start simple - Don't overcomplicate MVP"

---

## 🎯 ATUALIZAÇÃO DO BACKLOG P0

### Novos Itens P0 Adicionados:

**[P0-PAYWALL] Paywall + Free Trial de 1 Semana**
- **Descrição:** Implementar sistema de assinatura premium com trial gratuito de 7 dias usando Clerk Payments
- **Aceite:** 
  - **Given** usuário completa onboarding
  - **When** acessa feature premium
  - **Then** vê modal de paywall com trial de 7 dias
  - **And** pode iniciar trial sem pagamento
  - **And** recebe notificação 2 dias antes do fim do trial
  - **And** features premium ficam bloqueadas após trial expirar
- **Dependências:** Clerk Payments setup, Supabase schema, hooks de subscription
- **Impacto:** CRÍTICO - Monetização e diferenciação
- **Risco:** Alto (integração payment gateway)
- **Estimativa:** 16-20h

**[P0-FAQ] FAQ com Busca Remissiva**
- **Descrição:** Implementar tela FAQ com 12 perguntas e busca por termos
- **Aceite:**
  - **Given** usuário está em Settings
  - **When** toca em "FAQ"
  - **Then** vê lista de 12 perguntas
  - **And** pode buscar por termo (ex: "peso", "injeção")
  - **And** resultados filtram em tempo real
  - **And** ao tocar em pergunta, expande resposta
- **Dependências:** Microcopy das respostas, componente de busca
- **Impacto:** CRÍTICO - Suporte ao usuário
- **Risco:** Baixo (UI simples)
- **Estimativa:** 8-12h

---

## 📝 MICROCOPY FAQ (Preliminar)

### Perguntas (conforme imagem):
1. "Como posso aproveitar ao máximo o uso do Shotsy?"
2. "O que inclui o Shotsy+ premium?"
3. "Como adiciono ou ajusto pesos?"
4. "Como altero ou excluo injeções?"
5. "Como adiciono uma dosagem personalizada?"
6. "Como adiciono efeitos colaterais personalizados?"
7. "Como posso alternar meus locais de injeção?"
8. "Por que meu nível de medicação está mostrando o dobro da quantidade esperada?"
9. "Estou experimentando algum outro problema inesperado com o aplicativo."
10. "Como restauro minha assinatura Shotsy+ em um novo dispositivo?"
11. "Enviei uma solicitação de suporte mas ainda não obtive resposta."
12. "Como excluo minha conta?"

**Observação:** Microcopy completo das respostas precisa ser extraído dos screenshots ou criado baseado nas funcionalidades do Mounjaro.

---

## 🔄 IMPACTO NO PLANO DE FASES

### Fase 1 (P0) - Atualizada:
**Duração:** 4-5 semanas (era 3-4 semanas)

**Novos Itens:**
- Paywall + Free Trial (semanas 3-4)
- FAQ com busca (semana 4-5)

**Critérios de Pronto Atualizados:**
- ✅ Onboarding completo (23 telas)
- ✅ Add Shot com todos os campos
- ✅ Dashboard com layout Shotsy
- ✅ **Paywall funcional com trial de 7 dias**
- ✅ **FAQ implementada com busca**
- ✅ Navegação principal idêntica

---

## ⚠️ RISCOS ADICIONAIS

### Paywall Integration
- **Risco:** Clerk Payments pode ter limitações ou bugs
- **Mitigação:** Testar fluxo completo em sandbox antes de produção
- **Contingência:** Considerar RevenueCat como alternativa se Clerk Payments falhar

### FAQ Content
- **Risco:** Respostas podem precisar ser atualizadas conforme app evolui
- **Mitigação:** Criar sistema de versionamento de FAQ items
- **Contingência:** Manter FAQ em arquivo JSON separado para fácil atualização

---

## ✅ PRÓXIMOS PASSOS

1. **Confirmar com usuário:** 
   - Qual nome do plano premium? ("MounjaroAI+" ou "Mounjaro+")?
   - Features premium exatas (lista completa)?
   - Preço da assinatura?

2. **Iniciar análise dos 37 screenshots** para extrair:
   - Sequência completa de onboarding
   - Microcopy exato de todas as telas
   - Validações e estados

3. **Criar documentos de paridade** com estas atualizações incluídas

---

**Status:** Plano atualizado com descobertas críticas. Pronto para análise completa dos screenshots e geração dos documentos finais.

