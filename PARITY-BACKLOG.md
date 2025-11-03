# Backlog Priorizado: Shotsy → Mounjaro Paridade

**Data de Criação:** 2025-01-27  
**Versão:** 1.0  
**Total de Itens:** 31 (9 P0, 7 P1, 15 P2)

---

## Legenda de Prioridades

- **P0:** Bloqueador de paridade funcional (crítico)
- **P1:** Robustez/UX (importante)
- **P2:** Refinamentos/polimento (nice-to-have)

---

## P0 - BLOQUEADORES (9 itens)

### [P0-001] Onboarding - Implementar 19 Telas Faltantes

**Descrição:**  
Shotsy tem 23 telas sequenciais de onboarding, Mounjaro tem apenas 4. Implementar as 19 telas faltantes mantendo ordem, microcopy e validações do Shotsy.

**Telas a Implementar:**
1. WidgetsIntroScreen (já existe, verificar ordem)
2. ChartsIntroScreen (já existe, verificar ordem)
3. CustomizationIntroScreen (já existe, verificar ordem)
4. AlreadyUsingGLP1Screen (já existe, verificar ordem)
5. MedicationSelectionScreen (já existe, verificar ordem)
6. InitialDoseScreen (já existe, verificar ordem)
7. DeviceTypeScreen (já existe, verificar ordem)
8. InjectionFrequencyScreen (já existe, verificar ordem)
9. EducationGraphScreen (já existe, verificar ordem)
10. HealthDisclaimerScreen (já existe, verificar ordem)
11. HeightInputScreen (já existe, verificar ordem)
12. CurrentWeightScreen (já existe, verificar ordem)
13. StartingWeightScreen (já existe, verificar ordem)
14. TargetWeightScreen (já existe, verificar ordem)
15. MotivationalMessageScreen (já existe, verificar ordem)
16. WeightLossRateScreen (já existe, verificar ordem)
17. DailyRoutineScreen (já existe, verificar ordem)
18. FluctuationsEducationScreen (já existe, verificar ordem)
19. FoodNoiseScreen (já existe, verificar ordem)
20. SideEffectsConcernsScreen (já existe, verificar ordem)
21. MotivationScreen (já existe, verificar ordem)
22. AppRatingScreen (já existe, verificar ordem)

**Nota:** Componentes já existem em `/components/onboarding/`, mas não estão sendo usados no fluxo atual. Precisamos integrá-los ao `onboarding-flow.tsx`.

**Aceite:**
- **Given** usuário completa sign-up no Clerk
- **When** inicia onboarding
- **Then** vê sequência de 23 telas conforme Shotsy
- **And** progress bar mostra "Step X of 23"
- **And** pode navegar com botões "Voltar" e "Próximo"
- **And** dados são coletados e salvos no perfil Supabase
- **And** ao completar, redireciona para Dashboard

**Dependências:**
- Componentes já existem (apenas integração)
- Microcopy final (MICROCOPY-TABLE.md)
- Profile schema atualizado no Supabase
- Validações implementadas

**Impacto:** CRÍTICO - Define experiência inicial completa do usuário  
**Risco:** Médio (integração com Supabase + validações múltiplas)  
**Estimativa:** 20-24h

---

### [P0-002] Onboarding - Corrigir Progress Bar (23 Steps)

**Descrição:**  
Progress bar atual mostra "Step X of 4", mas deve mostrar "Step X of 23" após implementar onboarding completo.

**Aceite:**
- **Given** usuário está em qualquer tela de onboarding
- **When** visualiza progress bar
- **Then** vê "Step X of 23" (não "Step X of 4")
- **And** barra preenche proporcionalmente (X/23)

**Dependências:**
- P0-001 completo

**Impacto:** CRÍTICO - UX consistente  
**Risco:** Baixo (apenas mudança de número)  
**Estimativa:** 1h

---

### [P0-003] FAQ - Criar Tela Completa com 12 Perguntas

**Descrição:**  
Implementar tela FAQ com 12 perguntas conforme Shotsy. Perguntas devem ser expansíveis (tap para expandir resposta).

**Perguntas a Implementar:**
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

**Aceite:**
- **Given** usuário está em Settings
- **When** toca em "FAQ"
- **Then** navega para tela FAQ
- **And** vê header com botão voltar e título "FAQ"
- **And** vê lista de 12 perguntas
- **And** ao tocar em pergunta, expande resposta
- **And** ao tocar novamente, recolhe resposta

**Dependências:**
- Criar `app/(tabs)/faq.tsx`
- Microcopy das respostas (MICROCOPY-TABLE.md)
- Componente FAQItem expansível

**Impacto:** CRÍTICO - Suporte ao usuário  
**Risco:** Baixo (UI simples)  
**Estimativa:** 8-12h

---

### [P0-004] FAQ - Implementar Busca Remissiva

**Descrição:**  
Adicionar input de busca na FAQ que filtra perguntas em tempo real conforme usuário digita.

**Aceite:**
- **Given** usuário está na FAQ
- **When** digita termo no campo de busca (ex: "peso", "injeção")
- **Then** lista filtra instantaneamente
- **And** mostra apenas perguntas que contêm o termo
- **And** busca é case-insensitive
- **And** ao limpar busca, mostra todas as perguntas novamente

**Dependências:**
- P0-003 completo

**Impacto:** CRÍTICO - UX de busca  
**Risco:** Baixo (filtro simples)  
**Estimativa:** 3-4h

---

### [P0-005] Paywall - Criar Sistema Completo com Clerk Payments

**Descrição:**  
Implementar sistema de paywall completo usando Clerk Payments para gerenciar assinaturas. Incluir modal de paywall, integração com Stripe, e gating de features premium.

**Aceite:**
- **Given** usuário toca em feature premium (ex: Export PDF, AI Pack)
- **When** não é premium e não tem trial
- **Then** vê modal de paywall
- **And** modal mostra planos (Mensal R$ 19,90 / Anual R$ 149,90)
- **And** ao tocar "Assinar Agora", abre checkout Clerk Payments
- **And** ao completar pagamento, assinatura é ativada
- **And** badge "Mounjaro+" aparece no perfil
- **And** features premium ficam desbloqueadas

**Dependências:**
- Clerk Payments configurado
- Schema Supabase para `subscriptions`:
  ```sql
  CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL, -- 'active', 'trial', 'expired', 'cancelled'
    trial_start_date DATE,
    trial_end_date DATE,
    subscription_start_date DATE,
    subscription_end_date DATE,
    plan_type TEXT, -- 'monthly', 'annual'
    clerk_subscription_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- Hooks `useSubscription()`, `usePremiumFeatures()`
- Componente `PremiumGate` para gating

**Impacto:** CRÍTICO - Monetização  
**Risco:** Alto (integração payment gateway + edge cases)  
**Estimativa:** 20-24h

---

### [P0-006] Paywall - Free Trial de 7 Dias

**Descrição:**  
Implementar sistema de trial gratuito de 7 dias. Trial deve iniciar sem pagamento, mostrar badge no perfil, e notificar usuário antes de expirar.

**Aceite:**
- **Given** usuário vê paywall pela primeira vez
- **When** toca em "Começar Trial"
- **Then** trial inicia sem pagamento
- **And** `trial_start_date` = hoje
- **And** `trial_end_date` = hoje + 7 dias
- **And** badge "Trial" aparece no perfil
- **And** features premium ficam desbloqueadas durante trial
- **And** quando faltam 2 dias, notificação aparece
- **And** ao expirar trial, features premium bloqueiam
- **And** ao tentar acessar feature bloqueada, paywall aparece

**Dependências:**
- P0-005 completo
- Sistema de notificações push (expo-notifications)
- Hook `useTrialStatus()`

**Impacto:** CRÍTICO - Conversão  
**Risco:** Médio (gestão de datas + edge cases)  
**Estimativa:** 8-12h

---

### [P0-007] Paywall - Premium Features Gating

**Descrição:**  
Implementar sistema de verificação de acesso premium em todas as features premium. Criar componente `PremiumGate` reutilizável.

**Features Premium a Gatear:**
- AI Nutrition (insights personalizados)
- Export PDF/CSV
- Insights avançados
- Lembretes inteligentes
- Backup/sync em nuvem
- Gráficos e filtros avançados
- Anexos ilimitados
- Temas/Personalização extra
- Suporte prioritário

**Aceite:**
- **Given** usuário toca em feature premium
- **When** não é premium e não tem trial ativo
- **Then** vê modal de paywall imediatamente
- **And** não consegue acessar feature sem premium
- **And** componente `PremiumGate` verifica status antes de renderizar
- **And** verificação é feita via hook `usePremiumFeatures()`

**Dependências:**
- P0-005 completo
- Componente `PremiumGate.tsx`
- Hook `usePremiumFeatures()`

**Impacto:** CRÍTICO - Monetização  
**Risco:** Médio (verificações múltiplas + edge cases)  
**Estimativa:** 6-8h

---

### [P0-008] Paywall - Trial Expiry Notifications

**Descrição:**  
Implementar sistema de notificações quando trial está próximo de expirar (2 dias antes) e quando expira.

**Aceite:**
- **Given** usuário está em trial ativo
- **When** faltam 2 dias para expirar
- **Then** recebe notificação push: "Seu trial Mounjaro+ expira em 2 dias"
- **And** ao abrir app, vê banner no Dashboard
- **And** banner tem botão "Converter para Premium"
- **And** ao expirar trial, recebe notificação: "Seu trial expirou"
- **And** features premium ficam bloqueadas

**Dependências:**
- P0-006 completo
- expo-notifications configurado
- Background task para verificar expiração

**Impacto:** CRÍTICO - Conversão  
**Risco:** Médio (notificações + background tasks)  
**Estimativa:** 6-8h

---

### [P0-009] Health Disclaimer - Tela Obrigatória no Onboarding

**Descrição:**  
Implementar tela HealthDisclaimerScreen (step 11) com checkbox obrigatório antes de avançar. Usuário não pode prosseguir sem marcar checkbox.

**Aceite:**
- **Given** usuário está no step 11 do onboarding
- **When** visualiza HealthDisclaimerScreen
- **Then** vê aviso de saúde completo
- **And** vê checkbox "Concordo com os termos"
- **And** botão "Continuar" está desabilitado
- **When** marca checkbox
- **Then** botão "Continuar" fica habilitado
- **When** desmarca checkbox
- **Then** botão "Continuar" fica desabilitado novamente

**Dependências:**
- P0-001 completo (integração no fluxo)
- Componente HealthDisclaimerScreen já existe, verificar se checkbox está implementado

**Impacto:** CRÍTICO - Compliance legal  
**Risco:** Baixo (tela já existe, apenas validação)  
**Estimativa:** 2-3h

---

## P1 - ROBUSTEZ/UX (7 itens)

### [P1-001] Injections - Swipe Edit

**Descrição:**  
Implementar gesture de swipe right para editar injeção na lista. Atualmente só tem swipe left para deletar.

**Aceite:**
- **Given** usuário está na lista de injeções
- **When** faz swipe right em um item
- **Then** vê ação "Editar"
- **And** ao tocar em "Editar", navega para `add-application?editId=xxx`
- **And** formulário carrega dados existentes

**Dependências:**
- react-native-gesture-handler (já instalado)
- Componente ShotCard atualizado

**Impacto:** IMPORTANTE - UX de edição  
**Risco:** Baixo (gesture simples)  
**Estimativa:** 4-6h

---

### [P1-002] Error States - Padronização

**Descrição:**  
Padronizar todos os estados de erro no app. Criar componente `ErrorState` reutilizável e aplicar padrão consistente.

**Aceite:**
- **Given** ocorre erro em qualquer tela
- **When** erro é exibido
- **Then** vê mensagem clara e amigável
- **And** vê botão "Tentar Novamente"
- **And** ao tocar, tenta novamente automaticamente
- **And** todos os erros seguem mesmo padrão visual

**Dependências:**
- Componente `ErrorState.tsx`
- Padrão de mensagens de erro

**Impacto:** IMPORTANTE - UX consistente  
**Risco:** Baixo (padronização)  
**Estimativa:** 6-8h

---

### [P1-003] Settings - Export Data Funcional

**Descrição:**  
Implementar funcionalidade completa de exportação de dados (PDF e CSV). Atualmente apenas mostra alert placeholder.

**Aceite:**
- **Given** usuário está em Settings
- **When** toca em "Exportar Dados"
- **Then** vê modal com opções: PDF ou CSV
- **And** ao selecionar PDF, gera PDF com:
  - Histórico de injeções
  - Histórico de pesos
  - Gráficos
  - Estatísticas
- **And** ao selecionar CSV, gera CSV com dados brutos
- **And** arquivo pode ser compartilhado

**Dependências:**
- expo-print ou react-native-pdf
- csv-stringify ou similar
- Permissões de compartilhamento

**Impacto:** IMPORTANTE - Feature premium  
**Risco:** Médio (geração de arquivos)  
**Estimativa:** 12-16h

---

### [P1-004] Settings - Delete Account Funcional

**Descrição:**  
Implementar funcionalidade completa de exclusão de conta. Atualmente apenas mostra alert placeholder.

**Aceite:**
- **Given** usuário está em Settings
- **When** toca em "Excluir Conta"
- **Then** vê modal de confirmação
- **And** modal mostra aviso: "Esta ação não pode ser desfeita"
- **And** ao confirmar, deleta:
  - Dados do Supabase (cascade)
  - Conta do Clerk
  - Dados locais
- **And** redireciona para welcome screen

**Dependências:**
- Clerk API para deletar conta
- Supabase cascade delete configurado
- AsyncStorage cleanup

**Impacto:** IMPORTANTE - Compliance GDPR  
**Risco:** Médio (deletar dados com segurança)  
**Estimativa:** 8-10h

---

### [P1-005] Acessibilidade - Touch Targets ≥48px

**Descrição:**  
Garantir que todos os elementos clicáveis tenham área mínima de toque de 48x48px conforme WCAG.

**Aceite:**
- **Given** usuário visualiza qualquer botão/elemento clicável
- **When** mede área de toque
- **Then** altura e largura são ≥48px
- **And** espaçamento entre elementos é adequado

**Dependências:**
- Auditoria completa de todas as telas
- Ajustes de padding/margin

**Impacto:** IMPORTANTE - Acessibilidade  
**Risco:** Baixo (ajustes de layout)  
**Estimativa:** 8-10h

---

### [P1-006] Acessibilidade - Screen Reader Labels

**Descrição:**  
Adicionar labels acessíveis para leitores de tela em todos os elementos interativos.

**Aceite:**
- **Given** usuário usa leitor de tela (VoiceOver/TalkBack)
- **When** navega pelo app
- **Then** ouve labels descritivos para:
  - Botões
  - Inputs
  - Cards
  - Ícones
- **And** labels são em português e descritivos

**Dependências:**
- react-native-accessibility
- Labels em todos os componentes

**Impacto:** IMPORTANTE - Acessibilidade  
**Risco:** Baixo (adicionar props)  
**Estimativa:** 10-12h

---

### [P1-007] Acessibilidade - Contraste WCAG AA

**Descrição:**  
Garantir que todos os textos tenham contraste mínimo de 4.5:1 contra o fundo (WCAG AA).

**Aceite:**
- **Given** usuário visualiza qualquer texto
- **When** mede contraste contra fundo
- **Then** contraste é ≥4.5:1
- **And** textos secundários também respeitam limite

**Dependências:**
- Auditoria de cores
- Ajustes de temas se necessário

**Impacto:** IMPORTANTE - Acessibilidade  
**Risco:** Baixo (ajustes de cor)  
**Estimativa:** 6-8h

---

## P2 - REFINAMENTOS (15 itens)

### [P2-001] Dashboard - Alterar Título para "Resumo"

**Descrição:**  
Alterar título da tela principal de "Dashboard" para "Resumo" conforme Shotsy.

**Aceite:**
- **Given** usuário está na tela principal
- **When** visualiza header
- **Then** vê "Resumo" (não "Dashboard")

**Estimativa:** 1h

---

### [P2-002] Animações - Transições Suaves

**Descrição:**  
Adicionar animações suaves em transições de tela e interações.

**Estimativa:** 8-10h

---

### [P2-003] Haptic Feedback - Expandir Uso

**Descrição:**  
Adicionar haptic feedback em mais interações (além das já existentes).

**Estimativa:** 4-6h

---

### [P2-004] Performance - Otimização de Renderização

**Descrição:**  
Otimizar renderização de listas grandes usando React.memo e useMemo.

**Estimativa:** 6-8h

---

### [P2-005] UI Polish - Espaçamentos Consistentes

**Descrição:**  
Padronizar espaçamentos em todo o app usando design tokens.

**Estimativa:** 4-6h

---

### [P2-006] UI Polish - Tipografia Consistente

**Descrição:**  
Padronizar tipografia usando design tokens.

**Estimativa:** 4-6h

---

### [P2-007] UI Polish - Cores Consistentes

**Descrição:**  
Garantir que cores sigam design system em todas as telas.

**Estimativa:** 4-6h

---

### [P2-008] Loading States - Skeletons Personalizados

**Descrição:**  
Criar skeletons específicos para cada tipo de conteúdo.

**Estimativa:** 6-8h

---

### [P2-009] Empty States - Ilustrações Personalizadas

**Descrição:**  
Adicionar ilustrações SVG nos empty states.

**Estimativa:** 8-10h

---

### [P2-010] Analytics - Tracking Completo

**Descrição:**  
Implementar tracking completo de eventos conforme TRACKING-EVENTS-SPEC.md.

**Estimativa:** 12-16h

---

### [P2-011] Deep Links - Suporte Completo

**Descrição:**  
Implementar deep links para compartilhamento e navegação direta.

**Estimativa:** 8-10h

---

### [P2-012] Offline Support - Cache Local

**Descrição:**  
Implementar cache local para uso offline básico.

**Estimativa:** 16-20h

---

### [P2-013] Internationalization - Preparação

**Descrição:**  
Preparar estrutura para i18n (mesmo que só PT-BR por enquanto).

**Estimativa:** 6-8h

---

### [P2-014] Testing - Unit Tests

**Descrição:**  
Adicionar unit tests para funções críticas.

**Estimativa:** 20-24h

---

### [P2-015] Testing - E2E Tests

**Descrição:**  
Adicionar testes E2E para fluxos críticos.

**Estimativa:** 24-32h

---

## Resumo de Estimativas

| Prioridade | Itens | Horas Mínimas | Horas Máximas |
|------------|-------|----------------|---------------|
| P0 | 9 | 75h | 98h |
| P1 | 7 | 54h | 70h |
| P2 | 15 | 122h | 168h |
| **TOTAL** | **31** | **251h** | **336h** |

---

## Ordem de Implementação Recomendada

### Fase 1 (P0 Crítico - 4 semanas):
1. P0-001: Onboarding completo (20-24h)
2. P0-002: Progress bar (1h)
3. P0-009: Health disclaimer (2-3h)
4. P0-003: FAQ completa (8-12h)
5. P0-004: Busca FAQ (3-4h)
6. P0-005: Paywall completo (20-24h)
7. P0-006: Free trial (8-12h)
8. P0-007: Features gating (6-8h)
9. P0-008: Trial notifications (6-8h)

**Total Fase 1:** ~75-98h

### Fase 2 (P1 Robustez - 2-3 semanas):
1. P1-001: Swipe edit (4-6h)
2. P1-002: Error states (6-8h)
3. P1-003: Export data (12-16h)
4. P1-004: Delete account (8-10h)
5. P1-005: Touch targets (8-10h)
6. P1-006: Screen reader (10-12h)
7. P1-007: Contraste (6-8h)

**Total Fase 2:** ~54-70h

### Fase 3 (P2 Refinamentos - 3-4 semanas):
- Implementar conforme necessidade e tempo disponível

---

**Última Atualização:** 2025-01-27  
**Próxima Revisão:** Após implementação Fase 1

