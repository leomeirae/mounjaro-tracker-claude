# Plano de Fases: Shotsy → Mounjaro Paridade

**Data de Criação:** 2025-01-27  
**Versão:** 1.0  
**Duração Total Estimada:** 8-12 semanas

---

## Visão Geral

Este documento define as fases de implementação para alcançar paridade funcional e de UX entre Shotsy e Mounjaro Tracker, priorizando gaps P0 primeiro, depois P1 e P2.

---

## FASE 1: PARIDADE MÍNIMA (P0) - 4-5 semanas

### Objetivo
Implementar todos os bloqueadores críticos de paridade funcional.

### Itens Incluídos
1. **[P0-001]** Onboarding completo (19 telas faltantes)
2. **[P0-002]** Progress bar corrigida (23 steps)
3. **[P0-009]** Health disclaimer obrigatório
4. **[P0-003]** FAQ completa (12 perguntas)
5. **[P0-004]** Busca remissiva na FAQ
6. **[P0-005]** Paywall completo com Clerk Payments
7. **[P0-006]** Free trial de 7 dias
8. **[P0-007]** Premium features gating
9. **[P0-008]** Trial expiry notifications

### Estimativa
- **Horas:** 75-98h
- **Semanas:** 4-5 semanas (assumindo 20h/semana)

### Marcos (Milestones)

#### Marco 1.1: Onboarding Completo (Semana 1-2)
**Critérios de Pronto:**
- ✅ Todas as 23 telas de onboarding funcionando
- ✅ Progress bar mostra "Step X of 23"
- ✅ Health disclaimer com checkbox obrigatório
- ✅ Dados coletados e salvos no Supabase
- ✅ Navegação fluida entre telas

**Entregáveis:**
- `app/(auth)/onboarding-flow.tsx` atualizado
- Todas as 23 telas integradas
- Validações implementadas

#### Marco 1.2: FAQ Completa (Semana 2-3)
**Critérios de Pronto:**
- ✅ Tela FAQ criada (`app/(tabs)/faq.tsx`)
- ✅ 12 perguntas implementadas
- ✅ Busca remissiva funcionando
- ✅ Perguntas expansíveis (tap para expandir)
- ✅ Navegação Settings → FAQ

**Entregáveis:**
- Tela FAQ completa
- Componente FAQItem expansível
- Busca com filtro em tempo real

#### Marco 1.3: Paywall + Trial (Semana 3-5)
**Critérios de Pronto:**
- ✅ Schema Supabase para subscriptions
- ✅ Integração Clerk Payments configurada
- ✅ Modal de paywall implementado
- ✅ Free trial de 7 dias funcionando
- ✅ Premium features gating implementado
- ✅ Trial expiry notifications funcionando
- ✅ Badges de status (Premium/Trial) no perfil

**Entregáveis:**
- Schema `subscriptions` no Supabase
- Componentes `PaywallModal`, `PremiumGate`
- Hooks `useSubscription()`, `usePremiumFeatures()`
- Sistema de notificações de trial

### Critérios de Pronto da Fase 1
- ✅ Onboarding completo conforme Shotsy
- ✅ FAQ completa com busca
- ✅ Paywall funcional com trial de 7 dias
- ✅ Features premium bloqueadas para usuários free
- ✅ Navegação principal idêntica ao Shotsy
- ✅ Zero regressões em funcionalidades existentes

### Riscos Fase 1
- **Alto:** Integração Clerk Payments pode ter bugs ou limitações
- **Médio:** Onboarding extenso pode ter problemas de performance
- **Médio:** Trial expiry notifications podem não funcionar em background

### Mitigações Fase 1
- Testar Clerk Payments em sandbox extensivamente antes de produção
- Implementar lazy loading nas telas de onboarding
- Usar expo-notifications com background tasks para notificações

---

## FASE 2: ROBUSTEZ E UX (P1) - 2-3 semanas

### Objetivo
Completar paridade com melhorias de robustez, acessibilidade e UX.

### Itens Incluídos
1. **[P1-001]** Swipe edit em Injections
2. **[P1-002]** Error states padronizados
3. **[P1-003]** Export data funcional (PDF/CSV)
4. **[P1-004]** Delete account funcional
5. **[P1-005]** Touch targets ≥48px
6. **[P1-006]** Screen reader labels
7. **[P1-007]** Contraste WCAG AA

### Estimativa
- **Horas:** 54-70h
- **Semanas:** 2-3 semanas (assumindo 20h/semana)

### Marcos (Milestones)

#### Marco 2.1: Gestos e Interações (Semana 1)
**Critérios de Pronto:**
- ✅ Swipe edit implementado em Injections
- ✅ Error states padronizados em todas as telas
- ✅ Componente `ErrorState` reutilizável criado

**Entregáveis:**
- Gesture de swipe right em ShotCard
- Componente ErrorState
- Padrão de mensagens de erro

#### Marco 2.2: Features Premium (Semana 1-2)
**Critérios de Pronto:**
- ✅ Export PDF funcional
- ✅ Export CSV funcional
- ✅ Delete account funcional com cascade delete

**Entregáveis:**
- Geração de PDF com gráficos
- Geração de CSV com dados brutos
- Fluxo completo de exclusão de conta

#### Marco 2.3: Acessibilidade (Semana 2-3)
**Critérios de Pronto:**
- ✅ Todos os botões têm área ≥48px
- ✅ Screen reader labels em todos os elementos
- ✅ Contraste WCAG AA em todos os textos

**Entregáveis:**
- Auditoria completa de acessibilidade
- Ajustes de layout e cores
- Labels acessíveis implementados

### Critérios de Pronto da Fase 2
- ✅ Todas as funcionalidades críticas funcionando sem erros
- ✅ Acessibilidade WCAG AA básica implementada
- ✅ Export de dados funcional
- ✅ Delete account funcional
- ✅ UX consistente em todas as telas

### Riscos Fase 2
- **Médio:** Geração de PDF pode ser lenta em dispositivos antigos
- **Baixo:** Ajustes de acessibilidade podem quebrar layout em alguns casos

### Mitigações Fase 2
- Implementar loading state durante geração de PDF
- Testar acessibilidade em dispositivos reais antes de deploy

---

## FASE 3: REFINAMENTOS E POLIMENTO (P2) - 3-4 semanas (opcional)

### Objetivo
Refinamentos visuais, animações, performance e features avançadas.

### Itens Incluídos (Priorizados)
1. **[P2-001]** Alterar título Dashboard → "Resumo"
2. **[P2-002]** Animações suaves
3. **[P2-003]** Haptic feedback expandido
4. **[P2-004]** Performance otimizada
5. **[P2-010]** Analytics tracking completo
6. **[P2-008]** Skeletons personalizados
7. **[P2-009]** Empty states com ilustrações

### Estimativa
- **Horas:** 60-80h (priorizados)
- **Semanas:** 3-4 semanas (assumindo 20h/semana)

### Critérios de Pronto da Fase 3
- ✅ Animações suaves em transições
- ✅ Performance otimizada (< 2s carregamento inicial)
- ✅ Tracking completo implementado
- ✅ UI polida e consistente

### Nota
Fase 3 é opcional e pode ser implementada conforme necessidade e tempo disponível.

---

## RESUMO DE FASES

| Fase | Prioridade | Itens | Horas | Semanas | Status |
|------|------------|-------|-------|---------|--------|
| Fase 1 | P0 | 9 | 75-98h | 4-5 | 🔴 Pendente |
| Fase 2 | P1 | 7 | 54-70h | 2-3 | 🔴 Pendente |
| Fase 3 | P2 | 7+ | 60-80h | 3-4 | 🟡 Opcional |
| **TOTAL** | - | **23+** | **189-248h** | **9-12** | - |

---

## CRITÉRIOS DE PRONTO GERAIS

### Para cada Marco:
- ✅ Funcionalidade testada manualmente
- ✅ Código revisado
- ✅ Sem erros críticos
- ✅ Documentação atualizada

### Para cada Fase:
- ✅ Todos os itens da fase implementados
- ✅ Testes de regressão passando
- ✅ Zero bugs críticos conhecidos
- ✅ Performance aceitável

### Para Release Final:
- ✅ Paridade funcional 100% (P0 completo)
- ✅ Paridade UX 90%+ (P1 completo)
- ✅ Refinamentos implementados conforme tempo disponível (P2)
- ✅ Testes de aceitação passando
- ✅ Documentação completa

---

## ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

### Semana 1-2: Onboarding
1. Integrar 19 telas faltantes ao onboarding-flow.tsx
2. Corrigir progress bar para 23 steps
3. Implementar validação de Health Disclaimer
4. Testar fluxo completo

### Semana 2-3: FAQ
1. Criar tela FAQ
2. Implementar 12 perguntas
3. Implementar busca remissiva
4. Testar navegação e busca

### Semana 3-5: Paywall + Trial
1. Criar schema Supabase para subscriptions
2. Configurar Clerk Payments
3. Implementar modal de paywall
4. Implementar free trial de 7 dias
5. Implementar gating de features premium
6. Implementar notificações de trial expiry
7. Testar fluxo completo de pagamento

### Semana 5-7: Robustez (P1)
1. Swipe edit
2. Error states padronizados
3. Export data funcional
4. Delete account funcional

### Semana 7-8: Acessibilidade (P1)
1. Touch targets ≥48px
2. Screen reader labels
3. Contraste WCAG AA

### Semana 9-12: Refinamentos (P2 - opcional)
- Implementar conforme tempo disponível

---

## MONITORAMENTO DE PROGRESSO

### Métricas por Fase:
- **Fase 1:** % de itens P0 completos (meta: 100%)
- **Fase 2:** % de itens P1 completos (meta: 100%)
- **Fase 3:** % de itens P2 completos (meta: 70%+)

### Checkpoints Semanais:
- Revisar progresso vs estimativa
- Identificar bloqueadores
- Ajustar plano se necessário

---

## ASSUNÇÕES

1. **Desenvolvedor:** 1 desenvolvedor full-time (20h/semana)
2. **Acesso:** Acesso completo a Clerk Dashboard e Supabase Dashboard
3. **Dependências:** Todas as dependências necessárias podem ser instaladas
4. **Design:** Design decisions podem ser tomadas durante desenvolvimento
5. **Testes:** Testes manuais serão suficientes para MVP

---

## DECISÕES TÉCNICAS

### Paywall
- **Decisão:** Usar Clerk Payments (não RevenueCat)
- **Razão:** Já está na stack, menos dependências externas
- **Risco:** Clerk Payments pode ter limitações
- **Mitigação:** Testar extensivamente antes de produção

### FAQ
- **Decisão:** Implementar busca simples (filtro por termo)
- **Razão:** Suficiente para MVP, pode melhorar depois
- **Risco:** Busca pode ser lenta com muitas perguntas
- **Mitigação:** Limitar a 12 perguntas inicialmente

### Onboarding
- **Decisão:** Implementar todas as 23 telas do Shotsy
- **Razão:** Paridade completa é prioridade
- **Risco:** Onboarding pode ser longo demais
- **Mitigação:** Permitir skip em telas não críticas

---

**Última Atualização:** 2025-01-27  
**Próxima Revisão:** Após início da Fase 1

