# Matriz de Paridade: Shotsy vs Mounjaro Tracker

**Data de Criação:** 2025-01-27  
**Versão:** 1.0  
**Status:** Análise Completa - Pronto para Implementação

---

## Legenda

- **P0:** Bloqueador de paridade (crítico)
- **P1:** Robustez/UX (importante)
- **P2:** Refinamentos (nice-to-have)

---

## Matriz Completa

| Funcionalidade | Tela/Fluxo | Regra/Validação | Shotsy (Como é) | Mounjaro (Como está) | Gap | Prioridade | Aceite (Given/When/Then) |
|----------------|------------|-----------------|------------------|----------------------|-----|------------|--------------------------|
| **ONBOARDING** |
| Welcome Carousel | Onboarding-1 | 3 slides, dots, termos | Carrossel com 3 slides ("Bem-vindo", "Acompanhe", "Alcance") | ✅ Carrossel com 3 slides similar | ✅ Paridade | P2 | Given usuário abre app pela primeira vez When vê carrossel Then vê 3 slides com navegação por dots |
| Onboarding Completo | Onboarding-2 a 23 | Sequência de 23 telas | 23 telas sequenciais: Intro (4), Medicação (5), Educação (2), Dados (4), Motivação (8) | ⚠️ Apenas 4 telas (basic, avatar, goal, personality) | ❌ 19 telas faltantes | **P0** | Given usuário completa sign-up When inicia onboarding Then vê sequência de 23 telas conforme Shotsy And progress bar mostra "Step X of 23" |
| Progress Bar | Todas telas onboarding | Mostra progresso atual/total | Barra horizontal "Step X of 23" | ✅ Barra existe mas mostra "Step X of 4" | ⚠️ Número incorreto | P0 | Given usuário está em onboarding When navega entre telas Then vê "Step X of 23" |
| Health Disclaimer | Onboarding-11 | Checkbox obrigatório | Tela com checkbox "Concordo com os termos" | ❌ Não existe | ❌ Tela completa faltando | P0 | Given usuário está no passo 11 When tenta avançar sem marcar checkbox Then botão desabilitado |
| **DASHBOARD/SUMMARY** |
| Título da Tela | Dashboard | Header com título | "Resumo" (Summary) | ✅ "Dashboard" | ⚠️ Nome diferente | P1 | Given usuário está na tela principal When visualiza header Then vê "Resumo" |
| Estimated Levels Chart | Dashboard | Gráfico de níveis estimados | Gráfico de linha com período selecionável | ✅ Gráfico implementado com farmacocinética | ✅ Paridade | P2 | Given usuário tem aplicações When visualiza dashboard Then vê gráfico de níveis estimados |
| Next Shot Widget | Dashboard | Widget de próxima injeção | Card com contagem regressiva, estado dinâmico | ✅ Widget implementado com estados | ✅ Paridade | P2 | Given usuário tem aplicações When visualiza dashboard Then vê widget "Próxima Injeção" |
| Today Section | Dashboard | Cards de hoje | 5 cards: Peso, Calorias, Proteína, Efeitos, Notas | ✅ 5 cards implementados | ✅ Paridade | P2 | Given é dia atual When visualiza dashboard Then vê seção "Hoje" com 5 cards |
| Shot History Cards | Dashboard | Estatísticas de injeções | Total, Dose Atual, Nível Estimado | ✅ Cards implementados | ✅ Paridade | P2 | Given usuário tem histórico When visualiza dashboard Then vê cards de estatísticas |
| Results Preview | Dashboard | Preview de resultados | 6 métricas principais | ✅ Preview implementado | ✅ Paridade | P2 | Given usuário tem dados When visualiza dashboard Then vê preview de resultados |
| Empty State | Dashboard | Estado vazio | Mensagem + botão "Adicionar Primeira Injeção" | ✅ Empty state implementado | ✅ Paridade | P2 | Given usuário não tem dados When visualiza dashboard Then vê empty state com CTA |
| **ADD SHOT/APPLICATION** |
| Título da Tela | Add Application | Header | "Adicionar Injeção" | ✅ "Adicionar Injeção" | ✅ Paridade | P2 | Given usuário navega para adicionar When visualiza header Then vê "Adicionar Injeção" |
| Campos Obrigatórios | Add Application | Validação | Data, Dosagem, Local de Injeção | ✅ Validação implementada | ✅ Paridade | P2 | Given usuário preenche formulário When falta campo obrigatório Then botão salvar desabilitado |
| Body Diagram | Add Application | Seleção de local | SVG com silhueta humana, 8 sítios | ✅ BodyDiagram SVG implementado | ✅ Paridade | P2 | Given usuário seleciona local When visualiza diagrama Then vê silhueta com sítios marcados |
| Rotação Inteligente | Add Application | Sugestão de local | Sugere próximo sítio baseado em histórico | ✅ Rotação implementada | ✅ Paridade | P2 | Given usuário tem histórico When adiciona aplicação Then vê sugestão de próximo sítio |
| Dosage Selector | Add Application | Seleção de dose | 2.5mg até 15mg com cores | ✅ Selector com cores implementado | ✅ Paridade | P2 | Given usuário seleciona dosagem When escolhe valor Then vê badge colorido |
| Side Effects | Add Application | Chips de efeitos | 10 efeitos comuns selecionáveis | ✅ Chips implementados | ✅ Paridade | P2 | Given usuário registra aplicação When seleciona efeitos Then vê chips selecionados |
| Preview de Nível | Add Application | Gráfico prévia | Gráfico mostra nível estimado após salvar | ✅ Preview implementado | ✅ Paridade | P2 | Given usuário preenche dose When visualiza preview Then vê gráfico atualizado |
| **SHOTS LIST/INJECTIONS** |
| Título da Tela | Injections | Header | "Injeções" | ✅ "Injeções" | ✅ Paridade | P2 | Given usuário navega para lista When visualiza header Then vê "Injeções" |
| Filtros de Período | Injections | Chips de filtro | Todos, 7d, 30d, 90d, Ano | ✅ Filtros implementados | ✅ Paridade | P2 | Given usuário visualiza lista When seleciona filtro Then lista atualiza |
| Agrupamento | Injections | Por mês/ano | Agrupa por "janeiro 2025" | ✅ Agrupamento implementado | ✅ Paridade | P2 | Given usuário tem histórico When visualiza lista Then vê agrupamento por mês |
| Swipe Delete | Injections | Gesture | Swipe left para deletar | ✅ Swipe delete implementado | ✅ Paridade | P2 | Given usuário visualiza item When faz swipe left Then vê opção de deletar |
| Swipe Edit | Injections | Gesture | Swipe right para editar | ❌ Não implementado | ❌ Funcionalidade faltando | P1 | Given usuário visualiza item When faz swipe right Then vê opção de editar |
| Estatísticas | Injections | Cards de stats | Total, Dose Atual, Dias até próxima | ✅ Stats implementadas | ✅ Paridade | P2 | Given usuário visualiza lista When rola para cima Then vê cards de estatísticas |
| Empty State | Injections | Estado vazio | Ícone + mensagem + botão | ✅ Empty state implementado | ✅ Paridade | P2 | Given usuário não tem dados When visualiza lista Then vê empty state |
| **RESULTS** |
| Título da Tela | Results | Header | "Resultados" | ✅ "Resultados" | ✅ Paridade | P2 | Given usuário navega para resultados When visualiza header Then vê "Resultados" |
| Export Button | Results | Header direito | Botão de exportar | ✅ ExportButton implementado | ✅ Paridade | P2 | Given usuário visualiza resultados When toca exportar Then vê opções PDF/CSV |
| Filtros de Período | Results | Chips | 7d, 30d, 90d, Tudo | ✅ PeriodSelector implementado | ✅ Paridade | P2 | Given usuário visualiza resultados When seleciona período Then gráficos atualizam |
| Métricas Principais | Results | Grid de cards | 6 métricas: Mudança Total, IMC, Peso Atual, Por Cento, Média Semanal, Para Meta | ✅ 6 MetricCards implementados | ✅ Paridade | P2 | Given usuário tem dados When visualiza resultados Then vê grid de 6 métricas |
| Weight Chart | Results | Gráfico de peso | Linha com pontos, meta destacada | ✅ WeightChart implementado | ✅ Paridade | P2 | Given usuário tem pesos When visualiza resultados Then vê gráfico de linha |
| BMI Chart | Results | Gráfico de IMC | Linha com zonas (normal/sobrepeso) | ✅ BMIChart implementado | ✅ Paridade | P2 | Given usuário tem pesos e altura When visualiza resultados Then vê gráfico de IMC |
| Detailed Stats | Results | Estatísticas detalhadas | Média semanal, max/min, semanas em tratamento | ✅ DetailedStats implementado | ✅ Paridade | P2 | Given usuário tem histórico When visualiza resultados Then vê stats detalhadas |
| Empty State | Results | Estado vazio | Ícone + mensagem + botão | ✅ Empty state implementado | ✅ Paridade | P2 | Given usuário não tem dados When visualiza resultados Then vê empty state |
| **CALENDAR** |
| Título da Tela | Calendar | Header | "Calendário" | ✅ "Calendário" | ✅ Paridade | P2 | Given usuário navega para calendário When visualiza header Then vê "Calendário" |
| Navegação de Meses | Calendar | Anterior/Próximo | Botões para navegar meses | ✅ Navegação implementada | ✅ Paridade | P2 | Given usuário visualiza calendário When toca anterior/próximo Then mês muda |
| Go to Today | Calendar | Botão rápido | Botão "Ir para Hoje" | ✅ Botão implementado | ✅ Paridade | P2 | Given usuário está em mês diferente When toca "Hoje" Then volta para hoje |
| Marcadores de Eventos | Calendar | Dots no calendário | Dots para injeções e pesos | ✅ Marcadores implementados | ✅ Paridade | P2 | Given usuário tem eventos When visualiza calendário Then vê dots nos dias |
| Day Events List | Calendar | Lista do dia | Lista de eventos do dia selecionado | ✅ DayEventsList implementado | ✅ Paridade | P2 | Given usuário seleciona dia When visualiza lista Then vê eventos daquele dia |
| Empty State | Calendar | Estado vazio | Mensagem quando sem eventos | ✅ Empty state implementado | ✅ Paridade | P2 | Given usuário não tem eventos When visualiza calendário Then vê empty state |
| **SETTINGS** |
| Título da Tela | Settings | Header | "Ajustes" | ✅ "Ajustes" | ✅ Paridade | P2 | Given usuário navega para settings When visualiza header Then vê "Ajustes" |
| FAQ | Settings | Link para FAQ | Item "FAQ" na lista | ❌ Não existe | ❌ Tela completa faltando | **P0** | Given usuário está em Settings When visualiza lista Then vê item "FAQ" And ao tocar navega para FAQ |
| Busca Remissiva FAQ | FAQ | Busca por termos | Input de busca filtra perguntas | ❌ Não implementado | ❌ Funcionalidade faltando | **P0** | Given usuário está na FAQ When digita termo Then lista filtra em tempo real |
| 12 Perguntas FAQ | FAQ | Lista de perguntas | 12 perguntas conforme Shotsy | ❌ Não implementado | ❌ Conteúdo faltando | **P0** | Given usuário está na FAQ When visualiza lista Then vê 12 perguntas do Shotsy |
| FAQ Expandível | FAQ | Tap para expandir | Tap em pergunta expande resposta | ❌ Não implementado | ❌ Interação faltando | **P0** | Given usuário está na FAQ When toca pergunta Then expande resposta |
| Theme Selector | Settings | Seletor de tema | 8 temas disponíveis | ✅ ThemeSelector implementado | ✅ Paridade | P2 | Given usuário está em Settings When seleciona tema Then app atualiza cores |
| Accent Color | Settings | Seletor de cor | 5 cores de destaque | ✅ AccentColorSelector implementado | ✅ Paridade | P2 | Given usuário está em Settings When seleciona cor Then accent atualiza |
| Notifications | Settings | Toggle lembretes | Switch para ativar/desativar | ✅ Toggle implementado | ✅ Paridade | P2 | Given usuário está em Settings When toca toggle Then notificações ativam/desativam |
| Export Data | Settings | Botão exportar | Exporta dados do usuário | ⚠️ Placeholder alert | ⚠️ Funcionalidade incompleta | P1 | Given usuário está em Settings When toca exportar Then vê opções PDF/CSV |
| Delete Account | Settings | Botão deletar | Deleta conta permanentemente | ⚠️ Placeholder alert | ⚠️ Funcionalidade incompleta | P1 | Given usuário está em Settings When toca deletar Then vê confirmação e deleta |
| **PAYWALL/PREMIUM** |
| Paywall Modal | Todas telas | Gating de features | Modal ao acessar feature premium | ❌ Não implementado | ❌ Sistema completo faltando | **P0** | Given usuário toca feature premium When não é premium Then vê modal de paywall |
| Free Trial | Paywall | Trial de 7 dias | Banner "Experimente grátis por 7 dias" | ❌ Não implementado | ❌ Trial faltando | **P0** | Given usuário vê paywall When é novo usuário Then vê opção de trial de 7 dias |
| Trial Start | Paywall | Iniciar trial | Botão "Começar Trial" sem pagamento | ❌ Não implementado | ❌ Fluxo faltando | **P0** | Given usuário vê paywall When toca "Começar Trial" Then trial inicia sem pagamento |
| Trial Expiry Notification | Dashboard | Notificação | Alerta 2 dias antes do fim | ❌ Não implementado | ❌ Notificação faltando | **P0** | Given usuário está em trial When faltam 2 dias Then vê notificação de expiração |
| Subscription Status | Profile | Indicador premium | Badge "Mounjaro+" ou "Trial" | ❌ Não implementado | ❌ Status faltando | **P0** | Given usuário visualiza perfil When é premium/trial Then vê badge de status |
| Clerk Payments Integration | Paywall | Integração payment | Stripe via Clerk Payments | ❌ Não implementado | ❌ Integração faltando | **P0** | Given usuário compra premium When completa checkout Then assinatura ativa via Clerk |
| Premium Features Gating | Todas telas | Verificação de acesso | Checks antes de acessar features | ❌ Não implementado | ❌ Gating faltando | **P0** | Given usuário toca feature premium When não é premium Then vê paywall |
| **NUTRITION/AI** |
| AI Nutrition Chat | Nutrition | Chat com IA | Chat para registrar nutrição diária | ✅ Chat implementado com Gemini | ✅ Paridade | P2 | Given usuário está em Nutrition When usa chat Then recebe resumo nutricional |
| Audio Input | Nutrition | Gravação de áudio | Botão de microfone para voz | ✅ AudioRecorder implementado | ✅ Paridade | P2 | Given usuário está em chat When toca microfone Then grava áudio |
| Confirmation Modal | Nutrition | Confirmação antes de salvar | Modal mostra resumo antes de salvar | ✅ ConfirmationModal implementado | ✅ Paridade | P2 | Given usuário envia mensagem When IA responde Then vê modal de confirmação |
| Nutrition History | Nutrition | Tab de histórico | Lista de logs nutricionais | ✅ Tab de histórico implementada | ✅ Paridade | P2 | Given usuário tem histórico When visualiza tab Then vê cards de nutrição |
| **NAVEGAÇÃO** |
| Bottom Navigation | Todas telas | 5 tabs | Resumo, Injeções, Resultados, Calendário, Ajustes | ✅ 5 tabs implementadas | ✅ Paridade | P2 | Given usuário está em qualquer tela When visualiza bottom nav Then vê 5 tabs |
| Tab Icons | Bottom Nav | Ícones das tabs | Ícones específicos para cada tab | ✅ Ícones implementados | ✅ Paridade | P2 | Given usuário visualiza bottom nav When vê ícones Then reconhece cada tab |
| Tab Labels | Bottom Nav | Labels em PT-BR | Texto abaixo dos ícones | ✅ Labels implementados | ✅ Paridade | P2 | Given usuário visualiza bottom nav When vê labels Then lê em português |
| **ESTADOS & ERROS** |
| Loading States | Todas telas | Skeleton/Spinner | Skeleton screens durante carregamento | ✅ Skeletons implementados | ✅ Paridade | P2 | Given dados estão carregando When usuário visualiza Then vê skeleton |
| Empty States | Todas listas | Mensagem + CTA | Mensagem explicativa + botão de ação | ✅ Empty states implementados | ✅ Paridade | P2 | Given lista está vazia When usuário visualiza Then vê empty state com CTA |
| Error States | Todas telas | Mensagem de erro | Toast ou alert com retry | ⚠️ Parcialmente implementado | ⚠️ Padronização faltando | P1 | Given ocorre erro When usuário tenta ação Then vê mensagem clara com retry |
| Pull to Refresh | Listas | Gesture de refresh | Pull down para atualizar | ✅ RefreshControl implementado | ✅ Paridade | P2 | Given usuário está em lista When faz pull down Then dados atualizam |
| **ACESSIBILIDADE** |
| Touch Targets | Todas telas | Área mínima | ≥48px de altura/largura | ⚠️ Não verificado | ⚠️ Validação faltando | P1 | Given usuário visualiza botões When mede área de toque Then ≥48px |
| Screen Reader | Todas telas | Labels acessíveis | Labels para leitores de tela | ⚠️ Não verificado | ⚠️ Validação faltando | P1 | Given usuário usa leitor de tela When navega pelo app Then ouve labels corretos |
| Contrast | Todas telas | WCAG AA | Contraste mínimo 4.5:1 | ⚠️ Não verificado | ⚠️ Validação faltando | P1 | Given usuário visualiza texto When mede contraste Then ≥4.5:1 |

---

## Resumo de Gaps

### P0 (Bloqueadores - 9 itens):
1. ❌ Onboarding completo (19 telas faltantes)
2. ❌ Progress bar com número correto (23 steps)
3. ❌ Health Disclaimer (tela 11)
4. ❌ FAQ completa (tela + 12 perguntas)
5. ❌ Busca remissiva na FAQ
6. ❌ Paywall + Free Trial (sistema completo)
7. ❌ Clerk Payments Integration
8. ❌ Premium Features Gating
9. ❌ Trial Expiry Notifications

### P1 (Robustez - 7 itens):
1. ⚠️ Swipe Edit em Injections
2. ⚠️ Error States padronizados
3. ⚠️ Export Data funcional
4. ⚠️ Delete Account funcional
5. ⚠️ Acessibilidade (touch targets, screen reader, contrast)

### P2 (Refinamentos - Todos os demais):
- ✅ Maioria já implementada ou próximo da paridade

---

## Notas de Divergências

1. **Nome da Tela Principal:** Shotsy usa "Resumo", Mounjaro usa "Dashboard". Decisão: Manter "Dashboard" (mais comum em apps modernos) ou alterar para "Resumo" (fidelidade ao Shotsy)?

2. **Onboarding:** Mounjaro tem estrutura diferente (4 telas vs 23). Decisão: Implementar todas as 23 telas do Shotsy mantendo ordem e microcopy.

3. **FAQ:** Shotsy tem FAQ completa, Mounjaro não tem. Decisão: Implementar FAQ completa com busca remissiva conforme Shotsy.

4. **Paywall:** Shotsy tem sistema premium, Mounjaro não tem. Decisão: Implementar sistema completo com trial de 7 dias usando Clerk Payments.

---

**Última Atualização:** 2025-01-27  
**Próxima Revisão:** Após implementação P0

