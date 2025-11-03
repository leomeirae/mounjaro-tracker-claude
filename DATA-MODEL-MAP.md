# DATA-MODEL-MAP: Mapeamento Tela/Fluxo → Tabela/Coluna

**Data de Criação:** 2025-01-27  
**Versão:** 1.0  
**Última Atualização:** 2025-01-27  
**Status:** Inventário Completo via Supabase MCP

---

## Visão Geral

Este documento mapeia **onde cada tela/fluxo do app lê e escreve dados** no Supabase, garantindo:
- Rastreabilidade de uso de dados
- Prevenção de tabelas duplicadas
- Documentação de dependências
- Facilita migrações futuras

---

## Inventário de Tabelas Existentes

### 1. `users` (RLS: ✅ enabled)
**Descrição:** Tabela principal de usuários. Usa Clerk Auth (`clerk_id`).

**Colunas:**
- `id` (uuid, PK)
- `clerk_id` (text, unique) - ID do Clerk
- `email` (text)
- `name` (text, nullable)
- `height` (numeric, nullable) - Altura do usuário (cm)
- `start_weight` (numeric, nullable) - Peso inicial (kg)
- `target_weight` (numeric, nullable) - Peso meta (kg)
- `goal_weight` (numeric, nullable) - **DEPRECATED** - usar `target_weight`
- `initial_weight` (numeric, nullable) - **DEPRECATED** - usar `start_weight`
- `onboarding_completed` (boolean, default: false)
- `created_at`, `updated_at` (timestamptz)
- Campos de streaks/gamificação (opcional)

**Onde o app usa:**
- **Onboarding:** Salva `height`, `start_weight`, `target_weight`, `onboarding_completed`
- **Profile:** Lê `name`, `email`, `height`, `target_weight`
- **Dashboard:** Lê `target_weight` para cálculo de progresso
- **Results:** Lê `height` para cálculo de IMC

**Políticas RLS:**
- `Allow authenticated inserts` - INSERT para qualquer authenticated
- `Users can view their own data` - SELECT próprio
- `Users can update their own data` - UPDATE próprio

---

### 2. `medications` (RLS: ✅ enabled)
**Descrição:** Medicamentos do usuário. Um usuário pode ter múltiplos medicamentos, mas apenas um `active=true`.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id)
- `type` (text) - 'mounjaro' | 'ozempic' | 'saxenda' | 'wegovy' | 'zepbound'
- `dosage` (numeric) - Dose em mg
- `frequency` (text) - 'weekly' | 'daily'
- `start_date` (date)
- `end_date` (date, nullable)
- `active` (boolean, default: true)
- `notes` (text, nullable)
- `created_at`, `updated_at` (timestamptz)

**Onde o app usa:**
- **Onboarding:** Cria registro após seleção de medicação (step 6-9)
- **Add Application:** Lê `active=true` para vincular aplicação
- **Dashboard:** Lê `active` para mostrar medicação atual
- **Settings:** Lê para mostrar medicação atual

**Políticas RLS:**
- `Allow all operations for medications` - RLS relaxada (⚠️ revisar)

---

### 3. `medication_applications` (RLS: ✅ enabled)
**Descrição:** Histórico de aplicações/injeções do usuário.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id)
- `medication_id` (uuid, FK → medications.id)
- `dosage` (numeric) - Dose aplicada
- `application_date` (date)
- `application_time` (time, nullable)
- `injection_sites` (text[], default: '{}')
- `side_effects_list` (text[], default: '{}')
- `notes` (text, nullable)
- `created_at`, `updated_at` (timestamptz)

**View:** `applications` (alias simplificado)

**Onde o app usa:**
- **Add Application:** INSERT novo registro
- **Injections List:** SELECT histórico ordenado por data DESC
- **Dashboard:** SELECT últimas aplicações para widgets
- **Calendar:** SELECT para marcar eventos
- **Results:** SELECT para estatísticas

**Políticas RLS:**
- `Allow all operations for medication_applications` - RLS relaxada (⚠️ revisar)

---

### 4. `weight_logs` (RLS: ✅ enabled)
**Descrição:** Histórico de registros de peso.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id)
- `weight` (numeric) - Peso em kg ou lbs
- `unit` (text, default: 'kg') - 'kg' | 'lbs'
- `date` (date)
- `source` (text, default: 'app') - 'app' | 'onboarding' | 'import'
- `notes` (text, nullable)
- `created_at`, `updated_at` (timestamptz)

**Índices:**
- `weight_logs_onboarding_unique` - Índice único para prevenir duplicação do peso inicial do onboarding

**View:** `weights` (alias simplificado)

**Onde o app usa:**
- **Add Weight:** INSERT novo registro
- **Results:** SELECT para gráficos de peso
- **Dashboard:** SELECT peso atual (último registro)
- **Calendar:** SELECT para marcar eventos

**Políticas RLS:**
- `Allow all operations for weight_logs` - RLS relaxada (⚠️ revisar)

---

### 5. `settings` (RLS: ⚠️ disabled)
**Descrição:** Preferências do usuário (tema, notificações, etc). 1:1 com users.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id, unique)
- `theme` (text, default: 'classic')
- `accent_color` (text, default: '#0891B2')
- `dark_mode` (boolean, default: false)
- `shot_reminder` (boolean, default: true)
- `shot_reminder_time` (time, default: '09:00:00')
- `weight_reminder` (boolean, default: true)
- `weight_reminder_time` (time, default: '08:00:00')
- `achievements_notifications` (boolean, default: true)
- `sync_apple_health` (boolean, default: false)
- `auto_backup` (boolean, default: true)
- `created_at`, `updated_at` (timestamptz)

**Onde o app usa:**
- **Settings Screen:** READ/UPDATE todas as preferências
- **Theme Context:** Lê `theme`, `accent_color`, `dark_mode`
- **Notifications:** Lê `shot_reminder`, `weight_reminder`

**Políticas RLS:**
- `Users can view own settings` - SELECT próprio
- `Users can insert own settings` - INSERT próprio
- `Users can update own settings` - UPDATE próprio
- ⚠️ RLS está disabled na tabela (mas políticas existem)

---

### 6. `daily_nutrition` (RLS: ✅ enabled)
**Descrição:** Registros nutricionais diários (AI Nutrition feature).

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id)
- `date` (date)
- `calories` (numeric, nullable)
- `protein` (numeric, nullable)
- `carbs` (numeric, nullable)
- `fats` (numeric, nullable)
- `water_ml` (numeric, nullable)
- `notes` (text, nullable)
- `created_at`, `updated_at` (timestamptz)

**Onde o app usa:**
- **Nutrition Screen:** INSERT após confirmação do resumo AI
- **Dashboard TodaySection:** SELECT do dia atual
- **Nutrition History:** SELECT histórico ordenado por date DESC

**Políticas RLS:**
- `Users can view own nutrition` - SELECT próprio
- `Users can insert own nutrition` - INSERT próprio
- `Users can update own nutrition` - UPDATE próprio
- `Users can delete own nutrition` - DELETE próprio

---

### 7. `achievements` (RLS: ✅ enabled)
**Descrição:** Sistema de conquistas/badges do usuário.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id, nullable)
- `type` (text) - Tipo único da conquista
- `title` (text)
- `description` (text)
- `icon` (text) - Emoji da conquista
- `earned_at` (timestamptz, default: now())
- `created_at` (timestamptz, default: now())

**Onde o app usa:**
- **Dashboard:** SELECT conquistas do usuário
- **Achievements Screen:** SELECT lista completa

**Políticas RLS:**
- `Allow all operations for achievements` - RLS relaxada (⚠️ revisar)

---

### 8. `side_effects` (RLS: ✅ enabled)
**Descrição:** Registro de efeitos colaterais e sintomas.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id)
- `medication_id` (uuid, FK → medications.id, nullable)
- `type` (text) - Tipo do efeito
- `severity` (integer, 1-5)
- `date` (date)
- `notes` (text, nullable)
- `created_at`, `updated_at` (timestamptz)

**Onde o app usa:**
- **Add Side Effect:** INSERT novo registro
- **Dashboard:** SELECT efeitos recentes

**Políticas RLS:**
- `Allow all operations for side_effects` - RLS relaxada (⚠️ revisar)

---

### 9. `daily_streaks` (RLS: ✅ enabled)
**Descrição:** Sistema de streaks diários (gamificação).

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id)
- `date` (date)
- `weight_logged` (boolean, default: false)
- `application_logged` (boolean, default: false)
- `created_at` (timestamptz, default: now())

**Onde o app usa:**
- **Dashboard:** SELECT streaks do usuário
- **Gamificação:** INSERT/UPDATE quando usuário registra peso/aplicação

**Políticas RLS:**
- `Users can view own streaks` - SELECT próprio
- `Users can insert own streaks` - INSERT próprio
- `Users can update own streaks` - UPDATE próprio
- `Users can delete own streaks` - DELETE próprio

---

### 10. `scheduled_notifications` (RLS: ✅ enabled)
**Descrição:** Notificações agendadas para os usuários.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id, nullable)
- `type` (text)
- `title` (text)
- `body` (text)
- `scheduled_for` (timestamptz)
- `sent` (boolean, default: false)
- `sent_at` (timestamptz, nullable)
- `identifier` (text, nullable, unique)
- `created_at` (timestamptz, default: now())

**Onde o app usa:**
- **Notification Settings:** INSERT quando usuário agenda lembrete
- **Background Tasks:** SELECT notificações pendentes

**Políticas RLS:**
- `Allow all operations for scheduled_notifications` - RLS relaxada (⚠️ revisar)

---

### 11. `subscriptions` (RLS: ✅ enabled)
**Descrição:** Gerenciamento de assinaturas premium (Mounjaro+) e trials de 7 dias.

**Colunas:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id, unique)
- `status` (text) - 'trial' | 'active' | 'expired' | 'cancelled' | 'past_due'
- `tier` (text) - 'free' | 'plus' (default: 'free')
- `trial_started_at` (timestamptz, nullable)
- `trial_ends_at` (timestamptz, nullable)
- `subscription_started_at` (timestamptz, nullable)
- `subscription_ends_at` (timestamptz, nullable)
- `started_at` (timestamptz, nullable) - Data de início (trial ou paga)
- `renews_at` (timestamptz, nullable) - Data de renovação
- `canceled_at` (timestamptz, nullable) - Data de cancelamento
- `plan_type` (text, nullable) - 'monthly' | 'annual'
- `clerk_subscription_id` (text, nullable, unique)
- `created_at`, `updated_at` (timestamptz)

**Índices:**
- `subscriptions_trial_active_idx` - Índice parcial para trial ativo
- `subscriptions_active_idx` - Índice parcial para assinatura ativa

**Onde o app usa:**
- **Paywall Screen:** SELECT via RPC `get_entitlement()` para verificar status
- **Paywall Screen:** INSERT quando trial inicia (com validação de trial único no código)
- **Paywall Screen:** UPDATE quando assinatura é comprada
- **Premium Gate:** SELECT via RPC `get_entitlement()` para verificar `has_plus`
- **Trial Notifications:** SELECT para verificar expiração
- **Settings:** SELECT para mostrar status premium

**Políticas RLS:**
- `Users can view own subscription` - SELECT próprio
- `Users can insert own subscription` - INSERT próprio
- `Users can update own subscription` - UPDATE próprio

**Views/RPC:**
- `current_entitlement` (VIEW) - Resolve entitlement atual com `has_plus`
- `get_entitlement()` (RPC) - Função para buscar entitlement do usuário autenticado

**Documentação:** Ver `SCHEMA-CHANGES.md`

---

## Views Existentes

### 1. `profiles` (View)
**Descrição:** View combinando users + medications para facilitar queries.

**Colunas:**
- `id`, `name`, `email` (de users)
- `height`, `start_weight`, `target_weight` (NULL na view, mas existem em users)
- `medication`, `current_dose`, `frequency` (de medications via LATERAL JOIN)
- `created_at`, `updated_at`

**Onde o app usa:**
- **Profile Screen:** SELECT dados do perfil
- **Settings:** SELECT para mostrar medicação atual

**Nota:** View está desatualizada - campos `height`, `start_weight`, `target_weight` retornam NULL mas existem em `users`. ⚠️ **Pode precisar atualizar view.**

---

### 2. `applications` (View)
**Descrição:** Alias simplificado de `medication_applications`.

**Onde o app usa:**
- Mesmos lugares que `medication_applications`

---

### 3. `weights` (View)
**Descrição:** Alias simplificado de `weight_logs`.

**Onde o app usa:**
- Mesmos lugares que `weight_logs`

---

### 4. `community_stats` (View)
**Descrição:** Estatísticas agregadas da comunidade (anônimas).

**Onde o app usa:**
- **Community Features:** SELECT estatísticas agregadas (futuro)

---

## Mapeamento: Tela → Tabela/Coluna

### Onboarding Flow (23 telas)

| Tela | Dados Coletados | Tabela Destino | Colunas | Notas |
|------|------------------|----------------|---------|-------|
| WelcomeScreen | Nenhum | - | - | Apenas navegação |
| WidgetsIntroScreen | Nenhum | - | - | Apenas navegação |
| ChartsIntroScreen | Nenhum | - | - | Apenas navegação |
| CustomizationIntroScreen | Nenhum | - | - | Apenas navegação |
| AlreadyUsingGLP1Screen | `already_using` | - | - | Não persistido |
| MedicationSelectionScreen | `medication` | `medications` | `type` | Criar registro após onboarding |
| InitialDoseScreen | `initial_dose` | `medications` | `dosage` | Criar registro após onboarding |
| DeviceTypeScreen | `device_type` | - | - | Não persistido (ou `medications.notes`) |
| InjectionFrequencyScreen | `frequency` | `medications` | `frequency` | Criar registro após onboarding |
| EducationGraphScreen | Nenhum | - | - | Apenas navegação |
| HealthDisclaimerScreen | `consent_accepted` | `users` | `onboarding_completed` | Marca como true após completar |
| HeightInputScreen | `height`, `height_unit` | `users` | `height` | Converter para cm se necessário |
| CurrentWeightScreen | `current_weight`, `weight_unit` | `weight_logs` | `weight`, `unit`, `date` | Criar registro inicial |
| StartingWeightScreen | `starting_weight`, `start_date` | `users` | `start_weight` | Também cria `weight_logs` |
| TargetWeightScreen | `target_weight` | `users` | `target_weight` | Validar < current_weight |
| MotivationalMessageScreen | Nenhum | - | - | Apenas navegação |
| WeightLossRateScreen | `weight_loss_rate` | - | - | Não persistido |
| DailyRoutineScreen | `activity_level` | - | - | Não persistido (ou `settings` futuro) |
| FluctuationsEducationScreen | Nenhum | - | - | Apenas navegação |
| FoodNoiseScreen | `food_noise_day` | - | - | Não persistido |
| SideEffectsConcernsScreen | `side_effects_concerns[]` | - | - | Não persistido |
| MotivationScreen | `motivation` | - | - | Não persistido |
| AppRatingScreen | Nenhum | - | - | Apenas navegação |

**Decisão de Mapeamento:**
- Dados críticos (medicação, peso, altura, meta) → `users` + `medications` + `weight_logs`
- Dados opcionais (motivação, preocupações) → **Não persistir no P0** (podem ir para `settings` no futuro)

---

### Dashboard Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Carregar aplicações recentes | `medication_applications` | `application_date`, `dosage`, `injection_sites` | SELECT |
| Carregar peso atual | `weight_logs` | `weight`, `date` | SELECT (último, WHERE source != 'onboarding' ou todos) |
| Carregar perfil | `users` | `target_weight`, `height` | SELECT |
| Carregar nutrição hoje | `daily_nutrition` | `calories`, `protein`, `date` | SELECT (WHERE date = today) |
| Carregar entitlement | `subscriptions` | Via RPC `get_entitlement()` | RPC call |
| Calcular próximo shot | `medication_applications` + `medications` | `application_date`, `frequency` | SELECT + cálculo |

---

### Add Application Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Criar aplicação | `medication_applications` | Todas | INSERT |
| Atualizar aplicação | `medication_applications` | Todas exceto `id`, `created_at` | UPDATE |
| Deletar aplicação | `medication_applications` | - | DELETE |

---

### Injections List Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Listar aplicações | `medication_applications` | Todas | SELECT (ORDER BY date DESC) |
| Filtrar por período | `medication_applications` | `application_date` | SELECT (WHERE date BETWEEN) |
| Deletar aplicação | `medication_applications` | - | DELETE |

---

### Results Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Carregar histórico de peso | `weight_logs` | `weight`, `date` | SELECT (ORDER BY date DESC) |
| Carregar perfil | `users` | `height`, `target_weight`, `start_weight` | SELECT |
| Calcular métricas | `weight_logs` + `users` | Agregações | SELECT + cálculos |

---

### Calendar Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Carregar eventos | `medication_applications` + `weight_logs` | `application_date`, `date` | SELECT (UNION) |

---

### Settings Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Carregar preferências | `settings` | Todas | SELECT (WHERE user_id) |
| Atualizar tema | `settings` | `theme`, `accent_color`, `dark_mode` | UPDATE |
| Atualizar notificações | `settings` | `shot_reminder`, `weight_reminder` | UPDATE |

---

### Nutrition Screen (AI Chat)

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Salvar resumo | `daily_nutrition` | `calories`, `protein`, `date` | INSERT (UPSERT by date) |
| Carregar histórico | `daily_nutrition` | Todas | SELECT (ORDER BY date DESC) |

---

## Mapeamento: Tela → Tabela/Coluna (Paywall)

### Premium/Paywall Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Carregar status | `subscriptions` | Via RPC `get_entitlement()` | RPC call |
| Iniciar trial | `subscriptions` | `status='trial'`, `tier='plus'`, `trial_started_at`, `trial_ends_at`, `started_at` | INSERT (com validação de trial único no código) |
| Ativar assinatura | `subscriptions` | `status='active'`, `tier='plus'`, `subscription_started_at`, `renews_at`, `plan_type` | UPSERT (onConflict: user_id) |
| Cancelar assinatura | `subscriptions` | `status='cancelled'`, `canceled_at` | UPDATE |

### FAQ Screen

| Ação | Tabela | Colunas | Operação |
|------|--------|---------|----------|
| Listar perguntas | Nenhuma | - | Dados locais (JSON/Markdown) |
| Buscar perguntas | Nenhuma | - | Filtro client-side |

---

## Campos DEPRECATED/LEGACY

### `users.goal_weight` e `users.initial_weight`
**Status:** ⚠️ **DEPRECATED**  
**Razão:** Substituídos por `target_weight` e `start_weight`  
**Ação:** Marcar como deprecated via COMMENT, migrar dados se necessário

**Plano de Migração:**
1. Adicionar COMMENT na coluna
2. Migrar dados existentes (se houver)
3. Atualizar código para não usar mais
4. Drop após 2-4 semanas sem uso

---

## Checklist de Integridade

- [x] Todas as tabelas listadas
- [x] Todas as políticas RLS documentadas
- [x] Todas as views documentadas
- [x] Mapeamento tela → tabela completo
- [x] Campos deprecated identificados
- [x] Tabelas ausentes identificadas

---

## Próximos Passos

1. ✅ Criar `subscriptions` via MCP (documentado em SCHEMA-CHANGES.md)
2. ✅ Melhorar `subscriptions` com campos adicionais e VIEW/RPC de entitlement
3. ✅ Adicionar proteção contra duplicação em `weight_logs` (source column)
4. ⏳ Atualizar view `profiles` para incluir campos corretos de `users` (P1)
5. ⏳ Revisar políticas RLS relaxadas (várias tabelas com `Allow all operations`) (P1)
6. ⏳ Integrar Clerk Payments para compras reais (P0 pendente)
7. ⏳ Implementar Edge Function para refresh de entitlement (P1)

---

**Última Atualização:** 2025-01-27  
**Próxima Revisão:** Após implementação P0

