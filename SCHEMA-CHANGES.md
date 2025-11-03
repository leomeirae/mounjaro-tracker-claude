# SCHEMA-CHANGES: Alterações de Schema Aplicadas

**Data:** 2025-01-27  
**Versão:** 2.0  
**Status:** ✅ Aplicado

---

## CHANGES-002: Melhorias em `subscriptions` e Entitlement Server-Side

### Rationale

Aprimorar a tabela `subscriptions` com campos adicionais (`tier`, `started_at`, `renews_at`, `canceled_at`) e criar VIEW + RPC para entitlement server-side, garantindo verificações seguras e consistentes.

### Migração SQL Aplicada

```sql
-- Campos adicionados:
ALTER TABLE public.subscriptions
  ADD COLUMN tier TEXT CHECK (tier IN ('free', 'plus')) DEFAULT 'free',
  ADD COLUMN started_at TIMESTAMPTZ,
  ADD COLUMN renews_at TIMESTAMPTZ,
  ADD COLUMN canceled_at TIMESTAMPTZ;

-- Status atualizado para incluir 'past_due'
ALTER TABLE public.subscriptions
  DROP CONSTRAINT subscriptions_status_check;
ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_status_check
  CHECK (status IN ('trial', 'active', 'expired', 'cancelled', 'past_due'));

-- Índices para performance
CREATE INDEX subscriptions_trial_active_idx
  ON public.subscriptions(user_id, status, trial_ends_at)
  WHERE status = 'trial';

CREATE INDEX subscriptions_active_idx
  ON public.subscriptions(user_id, status, renews_at)
  WHERE status = 'active';

-- VIEW para entitlement atual
CREATE OR REPLACE VIEW public.current_entitlement AS
SELECT
  s.user_id,
  COALESCE(
    (s.status = 'trial' AND NOW() BETWEEN s.trial_started_at AND s.trial_ends_at) OR
    (s.status = 'active' AND s.tier = 'plus' AND (s.renews_at IS NULL OR s.renews_at > NOW())),
    false
  ) AS has_plus,
  s.status, s.tier, s.trial_started_at, s.trial_ends_at,
  s.renews_at, s.subscription_started_at, s.subscription_ends_at,
  s.plan_type, s.canceled_at
FROM public.subscriptions s
WHERE s.user_id IN (
  SELECT id FROM public.users WHERE clerk_id = auth.jwt() ->> 'sub'
);

-- RPC para buscar entitlement
CREATE OR REPLACE FUNCTION public.get_entitlement()
RETURNS TABLE (...)
LANGUAGE SQL STABLE SECURITY DEFINER
AS $$
  SELECT * FROM public.current_entitlement
  WHERE user_id IN (
    SELECT id FROM public.users WHERE clerk_id = auth.jwt() ->> 'sub'
  );
$$;
```

### Impacto

- ✅ Campos adicionais em `subscriptions` para rastreamento completo
- ✅ VIEW `current_entitlement` para resolução server-side
- ✅ RPC `get_entitlement()` para uso no app
- ✅ Índices otimizados para queries de trial/ativo
- ✅ Validação de trial único feito no código da aplicação (não via constraint devido a limitação de `NOW()` em índices)

---

## CHANGES-003: Proteção contra Duplicação em `weight_logs`

### Rationale

Evitar duplicação do peso inicial do onboarding através de coluna `source` e índice único.

### Migração SQL Aplicada

```sql
-- Adicionar coluna source
ALTER TABLE public.weight_logs
  ADD COLUMN source TEXT DEFAULT 'app' 
  CHECK (source IN ('app', 'onboarding', 'import'));

-- Índice único para onboarding
CREATE UNIQUE INDEX weight_logs_onboarding_unique
  ON public.weight_logs(user_id, date)
  WHERE source = 'onboarding';
```

### Impacto

- ✅ Previne duplicação do peso inicial do onboarding
- ✅ Permite rastreamento da origem do registro

---

## Notas de Implementação

### Validação de Trial Único

Devido à limitação do PostgreSQL de não poder usar `NOW()` em índices parciais com `WHERE`, a validação de "um trial ativo por user" é feita:

1. **No código da aplicação** (`useSubscription.ts`): verifica antes de INSERT
2. **Via índices parciais**: para queries rápidas de trial ativo
3. **Via VIEW**: `current_entitlement` calcula `has_plus` baseado em `NOW()` em runtime

### Uso do RPC `get_entitlement()`

O app deve usar `supabase.rpc('get_entitlement')` para buscar entitlement server-side, com cache local de 24h e refresh no app start.

---

**Última Atualização:** 2025-01-27
