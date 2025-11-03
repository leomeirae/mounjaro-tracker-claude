# Riscos e Mitigações: Shotsy → Mounjaro Paridade

**Data de Criação:** 2025-01-27  
**Versão:** 1.0  
**Status:** Análise Completa

---

## Visão Geral

Este documento lista todos os riscos identificados durante a análise de paridade e suas respectivas mitigações.

---

## RISCOS CRÍTICOS (P0)

### [RISK-001] Integração Clerk Payments Falha ou Tem Limitações

**Severidade:** 🔴 Alta  
**Probabilidade:** 🟡 Média  
**Impacto:** Bloqueador completo do paywall

**Descrição:**  
Clerk Payments pode não funcionar como esperado, ter bugs, ou não ter suporte completo para assinaturas recorrentes no Brasil.

**Mitigações:**
1. **Testar extensivamente em sandbox** antes de produção
2. **Documentar limitações conhecidas** do Clerk Payments
3. **Ter plano B:** Considerar RevenueCat como alternativa se Clerk falhar
4. **Validar com Clerk Support** se features necessárias estão disponíveis

**Plano de Contingência:**
- Se Clerk Payments não funcionar:
  1. Avaliar RevenueCat (já tem suporte completo para assinaturas)
  2. Implementar integração direta com Stripe (mais complexo)
  3. Documentar decisão e razão

**Status:** ⚠️ Monitorar durante implementação

---

### [RISK-002] Onboarding Extenso Causa Abandono

**Severidade:** 🟡 Média  
**Probabilidade:** 🟡 Média  
**Impacto:** Taxa de conversão baixa

**Descrição:**  
23 telas de onboarding podem ser muito extensas e causar abandono de usuários.

**Mitigações:**
1. **Permitir skip** em telas não críticas (avatar, goal, personality)
2. **Mostrar progresso claro** ("Step X of 23")
3. **Salvar progresso** localmente para retomar depois
4. **Otimizar performance** com lazy loading
5. **Validar com usuários** se onboarding é muito longo

**Plano de Contingência:**
- Se taxa de abandono > 50%:
  1. Reduzir número de telas não críticas
  2. Combinar telas relacionadas
  3. Tornar mais telas opcionais

**Status:** ⚠️ Monitorar analytics após release

---

### [RISK-003] Trial Expiry Notifications Não Funcionam em Background

**Severidade:** 🟡 Média  
**Probabilidade:** 🟡 Média  
**Impacto:** Usuários não recebem alertas de expiração

**Descrição:**  
Notificações push podem não funcionar corretamente quando app está em background, especialmente em iOS.

**Mitigações:**
1. **Usar expo-notifications** com configuração adequada
2. **Implementar notificações locais** como fallback
3. **Mostrar banner in-app** quando app é aberto
4. **Testar em iOS e Android** extensivamente
5. **Pedir permissões** corretamente

**Plano de Contingência:**
- Se notificações não funcionarem:
  1. Usar apenas notificações in-app
  2. Enviar email de expiração (se tiver email do usuário)
  3. Mostrar alerta sempre que app abrir durante últimos 2 dias

**Status:** ⚠️ Testar antes de produção

---

## RISCOS IMPORTANTES (P1)

### [RISK-004] Geração de PDF Lenta em Dispositivos Antigos

**Severidade:** 🟡 Média  
**Probabilidade:** 🟡 Média  
**Impacto:** UX ruim ao exportar dados

**Descrição:**  
Geração de PDF com gráficos pode ser lenta em dispositivos Android antigos.

**Mitigações:**
1. **Mostrar loading state** durante geração
2. **Otimizar renderização** de gráficos
3. **Considerar gerar PDF no backend** (futuro)
4. **Limitar tamanho** de dados exportados
5. **Testar em dispositivo antigo** antes de release

**Plano de Contingência:**
- Se geração for muito lenta:
  1. Mostrar warning: "Pode levar alguns minutos"
  2. Permitir gerar em background
  3. Notificar quando PDF estiver pronto

**Status:** ⚠️ Monitorar performance após implementação

---

### [RISK-005] Ajustes de Acessibilidade Quebram Layout

**Severidade:** 🟢 Baixa  
**Probabilidade:** 🟡 Média  
**Impacto:** Layout quebrado em algumas telas

**Descrição:**  
Aumentar touch targets para ≥48px pode quebrar layout em telas com muitos elementos.

**Mitigações:**
1. **Testar em dispositivos pequenos** (iPhone SE)
2. **Usar flexbox** para layout responsivo
3. **Ajustar espaçamentos** gradualmente
4. **Manter proporções** visuais
5. **Validar com usuários** antes de release

**Plano de Contingência:**
- Se layout quebrar:
  1. Reduzir tamanho de alguns elementos não críticos
  2. Usar scroll horizontal onde necessário
  3. Priorizar elementos principais

**Status:** ⚠️ Testar durante implementação

---

### [RISK-006] Delete Account Não Deleta Tudo (Cascade Delete)

**Severidade:** 🟡 Média  
**Probabilidade:** 🟢 Baixa  
**Impacto:** Violação de LGPD/GDPR

**Descrição:**  
Se cascade delete não estiver configurado corretamente no Supabase, dados podem permanecer após exclusão de conta.

**Mitigações:**
1. **Configurar ON DELETE CASCADE** em todas as foreign keys
2. **Testar delete completo** antes de release
3. **Verificar manualmente** no Supabase após delete
4. **Implementar cleanup manual** se necessário
5. **Documentar processo** de exclusão

**Plano de Contingência:**
- Se dados não forem deletados:
  1. Implementar função SQL para cleanup manual
  2. Executar cleanup periodicamente
  3. Notificar usuário que dados foram deletados

**Status:** ✅ Verificar schema antes de implementar

---

### [RISK-007] Busca FAQ Lenta com Muitas Perguntas

**Severidade:** 🟢 Baixa  
**Probabilidade:** 🟢 Baixa  
**Impacto:** UX ruim na busca

**Descrição:**  
Busca simples (filtro por termo) pode ser lenta se houver muitas perguntas no futuro.

**Mitigações:**
1. **Limitar a 12 perguntas** inicialmente
2. **Usar debounce** no input de busca
3. **Implementar busca otimizada** se necessário
4. **Considerar indexação** se crescer muito

**Plano de Contingência:**
- Se busca ficar lenta:
  1. Implementar debounce de 300ms
  2. Limitar resultados a 10 por vez
  3. Considerar busca no backend (futuro)

**Status:** ✅ Implementar debounce desde o início

---

## RISCOS MENORES (P2)

### [RISK-008] Regressões em Funcionalidades Existentes

**Severidade:** 🟡 Média  
**Probabilidade:** 🟡 Média  
**Impacto:** Features que funcionavam param de funcionar

**Mitigações:**
1. **Testar regressões** após cada mudança
2. **Usar feature flags** para mudanças grandes
3. **Manter testes manuais** das funcionalidades críticas
4. **Code review** antes de merge

**Plano de Contingência:**
- Se regressão for encontrada:
  1. Reverter mudança imediatamente
  2. Corrigir em branch separada
  3. Testar extensivamente antes de re-deploy

**Status:** ⚠️ Monitorar continuamente

---

### [RISK-009] Performance Degrada com Muitos Dados

**Severidade:** 🟡 Média  
**Probabilidade:** 🟢 Baixa  
**Impacto:** App lento para usuários com muito histórico

**Mitigações:**
1. **Implementar paginação** em listas grandes
2. **Limitar queries** a períodos específicos
3. **Usar índices** no Supabase
4. **Cache local** para dados frequentes
5. **Otimizar renderização** com React.memo

**Plano de Contingência:**
- Se performance degradar:
  1. Implementar paginação imediatamente
  2. Limitar histórico exibido (ex: últimos 100 itens)
  3. Adicionar filtros de período obrigatórios

**Status:** ⚠️ Monitorar performance após release

---

### [RISK-010] Microcopy Não Traduzido Corretamente

**Severidade:** 🟢 Baixa  
**Probabilidade:** 🟡 Média  
**Impacto:** Textos inconsistentes ou erros de português

**Mitigações:**
1. **Revisar todos os textos** antes de release
2. **Usar MICROCOPY-TABLE.md** como referência
3. **Validar com nativo** de português se possível
4. **Corrigir erros** conforme encontrados

**Plano de Contingência:**
- Se textos estiverem errados:
  1. Criar issue para correção
  2. Corrigir em hotfix se crítico
  3. Atualizar MICROCOPY-TABLE.md

**Status:** ✅ Usar tabela de microcopy como fonte única

---

## FEATURE FLAGS NECESSÁRIOS

### FF-PAYWALL
**Descrição:** Ativar/desativar sistema de paywall  
**Uso:** Testar paywall sem afetar usuários existentes  
**Valor padrão:** `false` (desativado até implementação completa)

### FF-FAQ
**Descrição:** Ativar/desativar tela FAQ  
**Uso:** Testar FAQ antes de release  
**Valor padrão:** `false` (desativado até implementação completa)

### FF-ONBOARDING-23
**Descrição:** Usar onboarding completo (23 telas) ou reduzido (4 telas)  
**Uso:** Rollback rápido se onboarding extenso causar problemas  
**Valor padrão:** `false` (usar 4 telas até implementação completa)

### FF-TRIAL
**Descrição:** Ativar/desativar free trial  
**Uso:** Testar trial sem afetar usuários  
**Valor padrão:** `false` (desativado até implementação completa)

---

## PLANO DE MITIGAÇÃO GERAL

### Antes de Cada Release:
1. ✅ Testar todas as funcionalidades críticas
2. ✅ Verificar regressões
3. ✅ Validar performance
4. ✅ Revisar textos e microcopy
5. ✅ Testar em dispositivos reais (iOS e Android)

### Durante Desenvolvimento:
1. ✅ Code review antes de merge
2. ✅ Testes manuais após cada feature
3. ✅ Monitorar erros em produção
4. ✅ Coletar feedback de usuários beta

### Após Release:
1. ✅ Monitorar analytics
2. ✅ Rastrear erros e crashes
3. ✅ Coletar feedback
4. ✅ Iterar rapidamente em problemas críticos

---

## MATRIZ DE RISCOS

| Risco | Severidade | Probabilidade | Prioridade | Mitigação Implementada |
|-------|------------|---------------|------------|------------------------|
| RISK-001 | Alta | Média | 🔴 P0 | ⚠️ Testar Clerk Payments antes |
| RISK-002 | Média | Média | 🟡 P1 | ⚠️ Permitir skip + progresso |
| RISK-003 | Média | Média | 🟡 P1 | ⚠️ Notificações in-app + push |
| RISK-004 | Média | Média | 🟡 P1 | ⚠️ Loading state + otimização |
| RISK-005 | Baixa | Média | 🟢 P2 | ⚠️ Testar layout responsivo |
| RISK-006 | Média | Baixa | 🟡 P1 | ✅ Verificar schema cascade |
| RISK-007 | Baixa | Baixa | 🟢 P2 | ✅ Debounce desde início |
| RISK-008 | Média | Média | 🟡 P1 | ⚠️ Testes de regressão |
| RISK-009 | Média | Baixa | 🟡 P1 | ⚠️ Paginação + cache |
| RISK-010 | Baixa | Média | 🟢 P2 | ✅ Tabela de microcopy |

---

## DECISÕES REGISTRADAS

### Decisão 1: Usar Clerk Payments (não RevenueCat)
**Data:** 2025-01-27  
**Razão:** Já está na stack, menos dependências  
**Risco:** Pode ter limitações  
**Mitigação:** Testar extensivamente, ter RevenueCat como plano B

### Decisão 2: Implementar todas as 23 telas de onboarding
**Data:** 2025-01-27  
**Razão:** Paridade completa é prioridade  
**Risco:** Pode causar abandono  
**Mitigação:** Permitir skip em telas não críticas

### Decisão 3: Busca simples (filtro) na FAQ
**Data:** 2025-01-27  
**Razão:** Suficiente para MVP (12 perguntas)  
**Risco:** Pode ser lenta se crescer  
**Mitigação:** Implementar debounce, considerar melhorias futuras

---

**Última Atualização:** 2025-01-27  
**Próxima Revisão:** Após início da Fase 1

