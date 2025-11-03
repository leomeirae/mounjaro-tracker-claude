# Tracking/Analytics Spec: Mounjaro Tracker

**Data de Criação:** 2025-01-27  
**Versão:** 1.0  
**Plataforma:** React Native (Expo)

---

## Visão Geral

Este documento define todos os eventos de tracking a serem implementados no Mounjaro Tracker para análise de comportamento do usuário, conversão e engajamento.

---

## Estrutura de Eventos

Todos os eventos seguem o padrão:
```typescript
{
  event: 'event_name',
  timestamp: 'ISO 8601',
  userId: 'clerk_user_id',
  properties: {
    // Propriedades específicas do evento
  }
}
```

---

## ONBOARDING

### onboarding_started
**Quando:** Usuário toca "Começar" na tela welcome após sign-up  
**Props:**
```typescript
{
  source: 'welcome_screen',
  method: 'email' | 'google' | 'apple'
}
```

### onboarding_step_viewed
**Quando:** Usuário visualiza uma tela de onboarding  
**Props:**
```typescript
{
  step_number: number, // 1-23
  step_name: string, // 'WelcomeScreen', 'HeightInputScreen', etc.
  total_steps: 23
}
```

### onboarding_step_completed
**Quando:** Usuário avança para próxima tela de onboarding  
**Props:**
```typescript
{
  step_number: number,
  step_name: string,
  time_spent_seconds: number,
  data_collected: {
    // Campos coletados naquela tela (ex: height, weight, etc.)
  }
}
```

### onboarding_step_skipped
**Quando:** Usuário toca "Pular" em uma tela que permite skip  
**Props:**
```typescript
{
  step_number: number,
  step_name: string
}
```

### onboarding_completed
**Quando:** Usuário completa todas as 23 telas de onboarding  
**Props:**
```typescript
{
  total_time_seconds: number,
  skipped_steps: number[],
  data_completed: {
    has_medication: boolean,
    has_height: boolean,
    has_weight: boolean,
    has_target_weight: boolean,
    // etc.
  }
}
```

### onboarding_abandoned
**Quando:** Usuário fecha app durante onboarding sem completar  
**Props:**
```typescript
{
  last_step: number,
  last_step_name: string,
  time_spent_seconds: number
}
```

---

## AUTHENTICATION

### sign_up_started
**Quando:** Usuário toca "Criar Conta"  
**Props:**
```typescript
{
  method: 'email' | 'google' | 'apple'
}
```

### sign_up_completed
**Quando:** Usuário completa cadastro com sucesso  
**Props:**
```typescript
{
  method: 'email' | 'google' | 'apple',
  time_to_complete_seconds: number
}
```

### sign_in_started
**Quando:** Usuário toca "Entrar"  
**Props:**
```typescript
{
  method: 'email' | 'google' | 'apple'
}
```

### sign_in_completed
**Quando:** Usuário faz login com sucesso  
**Props:**
```typescript
{
  method: 'email' | 'google' | 'apple',
  time_to_complete_seconds: number
}
```

### sign_out
**Quando:** Usuário toca "Sair da Conta"  
**Props:**
```typescript
{
  session_duration_minutes: number,
  last_screen: string
}
```

---

## APPLICATION TRACKING

### application_create_started
**Quando:** Usuário navega para tela "Adicionar Injeção"  
**Props:**
```typescript
{
  source: 'dashboard_button' | 'empty_state' | 'injections_list' | 'calendar'
}
```

### application_create_completed
**Quando:** Usuário salva injeção com sucesso  
**Props:**
```typescript
{
  dosage: number,
  injection_site: string,
  has_side_effects: boolean,
  side_effects_count: number,
  has_notes: boolean,
  time_to_complete_seconds: number,
  is_first_application: boolean
}
```

### application_create_failed
**Quando:** Erro ao salvar injeção  
**Props:**
```typescript
{
  error_code: string,
  error_message: string
}
```

### application_edited
**Quando:** Usuário edita injeção existente  
**Props:**
```typescript
{
  application_id: string,
  days_since_created: number,
  fields_changed: string[] // ['dosage', 'injection_site', etc.]
}
```

### application_deleted
**Quando:** Usuário deleta injeção  
**Props:**
```typescript
{
  application_id: string,
  days_since_created: number,
  method: 'swipe' | 'button'
}
```

### applications_list_viewed
**Quando:** Usuário visualiza lista de injeções  
**Props:**
```typescript
{
  total_applications: number,
  filter_applied: 'all' | '7d' | '30d' | '90d' | 'year'
}
```

---

## WEIGHT TRACKING

### weight_logged
**Quando:** Usuário registra peso  
**Props:**
```typescript
{
  weight: number,
  unit: 'kg' | 'lb',
  has_notes: boolean,
  is_first_weight: boolean,
  days_since_last_weight: number | null
}
```

### weight_edited
**Quando:** Usuário edita peso existente  
**Props:**
```typescript
{
  weight_id: string,
  days_since_created: number,
  weight_changed: boolean
}
```

### weight_deleted
**Quando:** Usuário deleta peso  
**Props:**
```typescript
{
  weight_id: string,
  days_since_created: number
}
```

---

## NUTRITION TRACKING

### nutrition_chat_started
**Quando:** Usuário abre tela de nutrição  
**Props:**
```typescript
{
  source: 'dashboard' | 'tab'
}
```

### nutrition_message_sent
**Quando:** Usuário envia mensagem no chat de nutrição  
**Props:**
```typescript
{
  input_type: 'text' | 'audio',
  message_length: number, // caracteres ou segundos de áudio
  is_first_message: boolean
}
```

### nutrition_ai_response_received
**Quando:** IA retorna resposta no chat de nutrição  
**Props:**
```typescript
{
  response_time_ms: number,
  calories_estimated: number | null,
  protein_estimated: number | null,
  has_confirmation: boolean
}
```

### nutrition_summary_confirmed
**Quando:** Usuário confirma resumo nutricional  
**Props:**
```typescript
{
  calories: number,
  protein: number,
  message_count: number,
  time_to_confirm_seconds: number
}
```

### nutrition_summary_cancelled
**Quando:** Usuário cancela resumo nutricional  
**Props:**
```typescript
{
  message_count: number,
  time_spent_seconds: number
}
```

---

## RESULTS/ANALYTICS

### results_viewed
**Quando:** Usuário visualiza tela de resultados  
**Props:**
```typescript
{
  period_filter: '7d' | '30d' | '90d' | 'all',
  has_weight_data: boolean,
  has_application_data: boolean,
  total_weights: number,
  total_applications: number
}
```

### results_period_changed
**Quando:** Usuário altera filtro de período em Results  
**Props:**
```typescript
{
  previous_period: '7d' | '30d' | '90d' | 'all',
  new_period: '7d' | '30d' | '90d' | 'all'
}
```

### results_export_initiated
**Quando:** Usuário toca botão de exportar  
**Props:**
```typescript
{
  format: 'pdf' | 'csv',
  period_filter: '7d' | '30d' | '90d' | 'all'
}
```

### results_export_completed
**Quando:** Exportação completa com sucesso  
**Props:**
```typescript
{
  format: 'pdf' | 'csv',
  file_size_kb: number,
  generation_time_ms: number
}
```

### results_export_failed
**Quando:** Erro ao exportar  
**Props:**
```typescript
{
  format: 'pdf' | 'csv',
  error_code: string
}
```

---

## CALENDAR

### calendar_viewed
**Quando:** Usuário visualiza tela de calendário  
**Props:**
```typescript
{
  month: number, // 1-12
  year: number,
  events_count: number
}
```

### calendar_month_changed
**Quando:** Usuário navega para mês diferente  
**Props:**
```typescript
{
  previous_month: number,
  new_month: number,
  direction: 'previous' | 'next'
}
```

### calendar_day_selected
**Quando:** Usuário seleciona dia no calendário  
**Props:**
```typescript
{
  date: string, // ISO format
  events_count: number,
  is_today: boolean
}
```

### calendar_go_to_today
**Quando:** Usuário toca "Ir para Hoje"  
**Props:**
```typescript
{
  months_away: number // quantos meses longe estava
}
```

---

## PAYWALL/PREMIUM

### paywall_viewed
**Quando:** Usuário vê modal de paywall  
**Props:**
```typescript
{
  trigger_feature: string, // 'export_pdf', 'ai_nutrition', etc.
  user_status: 'free' | 'trial_expired' | 'never_trial'
}
```

### paywall_trial_started
**Quando:** Usuário inicia trial de 7 dias  
**Props:**
```typescript
{
  trial_start_date: string, // ISO format
  trial_end_date: string // ISO format
}
```

### paywall_subscription_started
**Quando:** Usuário completa compra de assinatura  
**Props:**
```typescript
{
  plan_type: 'monthly' | 'annual',
  price: number, // em centavos
  currency: 'BRL',
  payment_method: 'credit_card' | 'apple_pay' | 'google_pay'
}
```

### paywall_dismissed
**Quando:** Usuário fecha modal sem assinar  
**Props:**
```typescript
{
  trigger_feature: string,
  time_spent_seconds: number
}
```

### trial_expiry_notification_shown
**Quando:** Notificação de expiração de trial é exibida  
**Props:**
```typescript
{
  days_remaining: number,
  notification_type: 'push' | 'in_app_banner'
}
```

### trial_expired
**Quando:** Trial expira  
**Props:**
```typescript
{
  trial_start_date: string,
  trial_end_date: string,
  features_used_during_trial: string[]
}
```

### premium_feature_accessed
**Quando:** Usuário premium acessa feature premium  
**Props:**
```typescript
{
  feature_name: string,
  user_status: 'premium' | 'trial'
}
```

### premium_feature_blocked
**Quando:** Usuário free tenta acessar feature premium  
**Props:**
```typescript
{
  feature_name: string,
  user_status: 'free' | 'trial_expired'
}
```

---

## FAQ

### faq_viewed
**Quando:** Usuário visualiza tela FAQ  
**Props:**
```typescript
{
  source: 'settings' | 'deep_link'
}
```

### faq_searched
**Quando:** Usuário digita no campo de busca da FAQ  
**Props:**
```typescript
{
  search_term: string,
  results_count: number
}
```

### faq_question_opened
**Quando:** Usuário expande pergunta na FAQ  
**Props:**
```typescript
{
  question_number: number, // 1-12
  question_text: string
}
```

### faq_support_requested
**Quando:** Usuário toca em pergunta de suporte  
**Props:**
```typescript
{
  question_number: number,
  question_text: string
}
```

---

## SETTINGS

### settings_viewed
**Quando:** Usuário visualiza tela de configurações  
**Props:**
```typescript
{
  has_premium: boolean,
  has_active_trial: boolean
}
```

### settings_theme_changed
**Quando:** Usuário altera tema  
**Props:**
```typescript
{
  previous_theme: string,
  new_theme: string
}
```

### settings_accent_changed
**Quando:** Usuário altera cor de destaque  
**Props:**
```typescript
{
  previous_accent: string,
  new_accent: string
}
```

### settings_notifications_toggled
**Quando:** Usuário ativa/desativa notificações  
**Props:**
```typescript
{
  enabled: boolean,
  notification_type: 'shot_reminder' | 'achievements'
}
```

### settings_data_exported
**Quando:** Usuário exporta dados  
**Props:**
```typescript
{
  format: 'pdf' | 'csv',
  file_size_kb: number
}
```

### settings_account_deleted
**Quando:** Usuário deleta conta  
**Props:**
```typescript
{
  account_age_days: number,
  total_applications: number,
  total_weights: number,
  had_premium: boolean
}
```

---

## NAVIGATION

### screen_viewed
**Quando:** Usuário visualiza qualquer tela  
**Props:**
```typescript
{
  screen_name: string, // 'dashboard', 'injections', 'results', etc.
  previous_screen: string | null,
  time_on_previous_screen_seconds: number
}
```

### tab_changed
**Quando:** Usuário muda de tab na bottom navigation  
**Props:**
```typescript
{
  previous_tab: string,
  new_tab: string,
  time_on_previous_tab_seconds: number
}
```

---

## ERRORS

### error_occurred
**Quando:** Qualquer erro ocorre no app  
**Props:**
```typescript
{
  error_code: string,
  error_message: string,
  screen_name: string,
  action: string // 'save', 'delete', 'load', etc.
}
```

### error_retry_attempted
**Quando:** Usuário tenta novamente após erro  
**Props:**
```typescript
{
  error_code: string,
  retry_count: number
}
```

---

## ENGAGEMENT

### app_opened
**Quando:** App é aberto  
**Props:**
```typescript
{
  is_first_open_today: boolean,
  days_since_last_open: number,
  session_count: number // total de sessões do usuário
}
```

### app_backgrounded
**Quando:** App vai para background  
**Props:**
```typescript
{
  session_duration_seconds: number,
  screens_visited: string[],
  actions_taken: number
}
```

### pull_to_refresh
**Quando:** Usuário faz pull to refresh  
**Props:**
```typescript
{
  screen_name: string,
  time_since_last_refresh_seconds: number
}
```

---

## IMPLEMENTAÇÃO

### Biblioteca Recomendada
- **Segment** ou **Amplitude** ou **Mixpanel**
- Alternativa simples: **React Native Analytics** ou criar wrapper próprio

### Estrutura de Código
```typescript
// lib/analytics.ts
import { track, identify, screen } from '@analytics-library';

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  track(eventName, {
    timestamp: new Date().toISOString(),
    userId: getCurrentUserId(),
    ...properties
  });
}

export function trackScreen(screenName: string, properties?: Record<string, any>) {
  screen(screenName, properties);
}
```

### Uso nos Componentes
```typescript
import { trackEvent } from '@/lib/analytics';

useEffect(() => {
  trackEvent('screen_viewed', {
    screen_name: 'dashboard'
  });
}, []);
```

---

## PRIVACIDADE

- Todos os eventos devem respeitar LGPD
- Não coletar dados sensíveis de saúde sem consentimento explícito
- Permitir opt-out de tracking não essencial
- Dados anonimizados quando possível

---

**Última Atualização:** 2025-01-27  
**Próxima Revisão:** Após implementação P0

