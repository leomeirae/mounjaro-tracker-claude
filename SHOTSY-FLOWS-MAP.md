# Mapa de Fluxos: Shotsy → Mounjaro Tracker

**Data de Criação:** 2025-01-27  
**Versão:** 1.0  
**Baseado em:** 37 screenshots do Shotsy + análise do repositório Mounjaro

---

## Fluxo Principal: Abertura → Onboarding → Dashboard

```mermaid
graph TD
    A[Abertura do App] --> B{Usuário autenticado?}
    B -->|Não| C[Tela Welcome]
    B -->|Sim| D{Tem onboarding completo?}
    D -->|Não| E[Onboarding Flow]
    D -->|Sim| F[Dashboard]
    
    C --> C1[Slide 1: Bem-vindo]
    C1 --> C2[Slide 2: Acompanhe Progresso]
    C2 --> C3[Slide 3: Alcance Objetivos]
    C3 --> C4{Tem conta?}
    C4 -->|Sim| G[Sign In]
    C4 -->|Não| H[Sign Up]
    
    G --> I[Autenticação Clerk]
    H --> I
    I --> D
    
    E --> E1[Step 1: WelcomeScreen]
    E1 --> E2[Step 2: WidgetsIntroScreen]
    E2 --> E3[Step 3: ChartsIntroScreen]
    E3 --> E4[Step 4: CustomizationIntroScreen]
    E4 --> E5[Step 5: AlreadyUsingGLP1Screen]
    E5 --> E6[Step 6: MedicationSelectionScreen]
    E6 --> E7[Step 7: InitialDoseScreen]
    E7 --> E8[Step 8: DeviceTypeScreen]
    E8 --> E9[Step 9: InjectionFrequencyScreen]
    E9 --> E10[Step 10: EducationGraphScreen]
    E10 --> E11[Step 11: HealthDisclaimerScreen]
    E11 --> E12[Step 12: HeightInputScreen]
    E12 --> E13[Step 13: CurrentWeightScreen]
    E13 --> E14[Step 14: StartingWeightScreen]
    E14 --> E15[Step 15: TargetWeightScreen]
    E15 --> E16[Step 16: MotivationalMessageScreen]
    E16 --> E17[Step 17: WeightLossRateScreen]
    E17 --> E18[Step 18: DailyRoutineScreen]
    E18 --> E19[Step 19: FluctuationsEducationScreen]
    E19 --> E20[Step 20: FoodNoiseScreen]
    E20 --> E21[Step 21: SideEffectsConcernsScreen]
    E21 --> E22[Step 22: MotivationScreen]
    E22 --> E23[Step 23: AppRatingScreen]
    E23 --> F
    
    F --> F1[Dashboard/Resumo]
```

---

## Fluxo: Dashboard → Adicionar Injeção

```mermaid
graph TD
    A[Dashboard] --> B{Tem injeções?}
    B -->|Não| C[Empty State]
    B -->|Sim| D[Widgets e Cards]
    
    C --> E[Botão: Adicionar Primeira Injeção]
    D --> F[Botão: + Adicionar Injeção]
    
    E --> G[Add Application Screen]
    F --> G
    
    G --> G1[Selecionar Data]
    G1 --> G2[Selecionar Medicamento]
    G2 --> G3[Selecionar Dosagem]
    G3 --> G4[Selecionar Local de Injeção]
    G4 --> G5[BodyDiagram SVG]
    G5 --> G6[Selecionar Efeitos Colaterais]
    G6 --> G7[Adicionar Notas]
    G7 --> G8{Validar Campos}
    
    G8 -->|Inválido| G9[Botão Salvar Desabilitado]
    G8 -->|Válido| G10[Botão Salvar Habilitado]
    
    G10 --> G11[Salvar no Supabase]
    G11 --> G12{Sucesso?}
    
    G12 -->|Sim| G13[Toast: Sucesso]
    G12 -->|Não| G14[Alert: Erro]
    
    G13 --> H[Voltar para Dashboard]
    G14 --> G
    
    H --> I[Dashboard Atualizado]
    I --> I1[NextShotWidget atualizado]
    I --> I2[ShotHistoryCards atualizado]
    I --> I3[EstimatedLevelsChart atualizado]
```

---

## Fluxo: Dashboard → Lista de Injeções

```mermaid
graph TD
    A[Dashboard] --> B[Tab: Injeções]
    B --> C{Lista carregando?}
    
    C -->|Sim| D[Loading Skeleton]
    C -->|Não| E{Tem injeções?}
    
    E -->|Não| F[Empty State]
    E -->|Sim| G[Lista Agrupada por Mês]
    
    F --> F1[Ícone + Mensagem]
    F1 --> F2[Botão: Adicionar Injeção]
    F2 --> H[Add Application Screen]
    
    G --> G1[ShotsStats Cards]
    G1 --> G2[FilterChips]
    G2 --> G3[Lista de ShotCards]
    
    G3 --> G4{Usuário interage?}
    
    G4 -->|Swipe Left| G5[Delete Action]
    G4 -->|Swipe Right| G6[Edit Action]
    G4 -->|Tap| G7[Ver Detalhes]
    
    G5 --> G8[Confirmar Delete]
    G8 --> G9{Confirmado?}
    G9 -->|Sim| G10[Deletar do Supabase]
    G9 -->|Não| G3
    
    G10 --> G11[Lista Atualizada]
    
    G6 --> H
    G7 --> I[Detalhes da Injeção]
    
    G --> J[Pull to Refresh]
    J --> K[Refetch Applications]
    K --> G
```

---

## Fluxo: Dashboard → Resultados

```mermaid
graph TD
    A[Dashboard] --> B[Tab: Resultados]
    B --> C{Tem dados de peso?}
    
    C -->|Não| D[Empty State]
    C -->|Sim| E[Results Screen]
    
    D --> D1[Ícone + Mensagem]
    D1 --> D2[Botão: Adicionar Primeiro Peso]
    D2 --> F[Add Weight Screen]
    
    E --> E1[Header: Título + Export Button]
    E1 --> E2[PeriodSelector Chips]
    E2 --> E3[Grid de 6 MetricCards]
    E3 --> E4[WeightChart]
    E4 --> E5[BMIChart]
    E5 --> E6[DetailedStats]
    
    E2 --> E7{Período mudou?}
    E7 -->|Sim| E8[Recalcular Dados]
    E8 --> E3
    
    E1 --> E9{Tocou Export?}
    E9 -->|Sim| E10[Modal: PDF ou CSV]
    E10 --> E11[Gerar Arquivo]
    E11 --> E12[Compartilhar]
    
    E --> E13[Pull to Refresh]
    E13 --> E14[Refetch Weights]
    E14 --> E
```

---

## Fluxo: Dashboard → Calendário

```mermaid
graph TD
    A[Dashboard] --> B[Tab: Calendário]
    B --> C[Calendar Screen]
    
    C --> C1[Header: Navegação de Meses]
    C1 --> C2[Botão: Ir para Hoje]
    C2 --> C3[MonthCalendar Component]
    C3 --> C4[DayEventsList Component]
    
    C1 --> C5{Usuário navega mês?}
    C5 -->|Anterior| C6[Mês Anterior]
    C5 -->|Próximo| C7[Mês Próximo]
    
    C6 --> C3
    C7 --> C3
    
    C2 --> C8{Está em mês diferente?}
    C8 -->|Sim| C9[Voltar para Hoje]
    C8 -->|Não| C3
    
    C9 --> C3
    
    C3 --> C10{Usuário seleciona dia?}
    C10 -->|Sim| C11[Atualizar DayEventsList]
    C11 --> C4
    
    C4 --> C12{Tem eventos?}
    C12 -->|Não| C13[Empty State]
    C12 -->|Sim| C14[Lista de Eventos]
    
    C14 --> C15{Tipo de evento?}
    C15 -->|Injeção| C16[Card: Dosagem + Local]
    C15 -->|Peso| C17[Card: Peso + Diferença]
    
    C --> C18[Pull to Refresh]
    C18 --> C19[Refetch Applications + Weights]
    C19 --> C
```

---

## Fluxo: Dashboard → Configurações → FAQ

```mermaid
graph TD
    A[Dashboard] --> B[Tab: Ajustes]
    B --> C[Settings Screen]
    
    C --> C1[Seção: Informações Pessoais]
    C --> C2[Seção: Aparência]
    C --> C3[Seção: Notificações]
    C --> C4[Seção: Dados e Privacidade]
    C --> C5[Seção: Sobre]
    C --> C6[Seção: Conta]
    
    C5 --> C7[Item: FAQ]
    C7 --> D[FAQ Screen]
    
    D --> D1[Header: Voltar + Título FAQ]
    D1 --> D2[Input de Busca]
    D2 --> D3[Lista de 12 Perguntas]
    
    D2 --> D4{Usuário digita?}
    D4 -->|Sim| D5[Filtrar Perguntas]
    D4 -->|Não| D3
    
    D5 --> D6[Lista Filtrada]
    
    D3 --> D7{Usuário toca pergunta?}
    D6 --> D7
    
    D7 -->|Sim| D8[Expandir Resposta]
    D7 -->|Não| D3
    
    D8 --> D9[Mostrar Resposta Completa]
    D9 --> D10{Usuário toca novamente?}
    D10 -->|Sim| D11[Recolher]
    D10 -->|Não| D9
    
    D11 --> D3
```

---

## Fluxo: Paywall → Free Trial → Premium

```mermaid
graph TD
    A[Feature Premium] --> B{Usuário é premium?}
    B -->|Sim| C[Acessar Feature]
    B -->|Não| D{Tem trial ativo?}
    
    D -->|Sim| C
    D -->|Não| E{Trial já usado?}
    
    E -->|Não| F[Paywall Modal]
    E -->|Sim| F
    
    F --> F1[Banner: Trial de 7 dias grátis]
    F1 --> F2[Botão: Começar Trial]
    F2 --> F3[Botão: Assinar Agora]
    F2 --> F4[Botão: Não Obrigado]
    
    F3 --> G[Clerk Payments Checkout]
    G --> G1[Selecionar Plano]
    G1 --> G2{Mensal ou Anual?}
    G2 -->|Mensal| G3[R$ 19,90/mês]
    G2 -->|Anual| G4[R$ 149,90/ano]
    
    G3 --> G5[Processar Pagamento]
    G4 --> G5
    G5 --> G6{Sucesso?}
    
    G6 -->|Sim| G7[Ativar Assinatura]
    G6 -->|Não| G8[Erro: Tentar Novamente]
    
    G7 --> H[Salvar no Supabase]
    H --> I[Badge Premium no Perfil]
    I --> C
    
    F2 --> J[Iniciar Trial]
    J --> J1[Salvar trial_start_date]
    J1 --> J2[Salvar trial_end_date = hoje + 7 dias]
    J2 --> J3[Badge Trial no Perfil]
    J3 --> C
    
    F4 --> K[Fechar Modal]
    K --> L[Voltar para Tela Anterior]
    
    C --> M{5 dias de trial?}
    M -->|Sim| N[Notificação: Trial expira em 2 dias]
    M -->|Não| C
    
    N --> O{Usuário vê notificação?}
    O -->|Sim| P[Modal: Converter para Premium]
    O -->|Não| Q{7 dias passaram?}
    
    P --> G
    Q -->|Sim| R[Trial Expirou]
    R --> R1[Bloquear Features Premium]
    R1 --> S[Mostrar Paywall ao tentar acessar]
    S --> F
```

---

## Fluxo: Adicionar Nutrição (AI Chat)

```mermaid
graph TD
    A[Dashboard] --> B[Tab: Nutrição]
    B --> C[Nutrition Screen]
    
    C --> C1[InstructionsCard]
    C1 --> C2[Chat Interface]
    C2 --> C3[Input: Texto ou Áudio]
    
    C3 --> C4{Usuário digita?}
    C4 -->|Sim| C5[Enviar Mensagem]
    C4 -->|Grava áudio?| C6[AudioRecorder]
    
    C6 --> C7[Transcrever Áudio]
    C7 --> C5
    
    C5 --> C8[Enviar para Gemini API]
    C8 --> C9[AI Processa Input]
    C9 --> C10{AI entende?}
    
    C10 -->|Não| C11[Pedir Esclarecimento]
    C11 --> C2
    
    C10 -->|Sim| C12[Gerar Resumo Nutricional]
    C12 --> C13[ConfirmationModal]
    
    C13 --> C14[Mostrar: Calorias, Proteína, etc]
    C14 --> C15{Usuário confirma?}
    
    C15 -->|Não| C16[Cancelar]
    C15 -->|Sim| C17[Salvar no Supabase]
    
    C16 --> C2
    C17 --> C18[Toast: Sucesso]
    C18 --> C19[Atualizar Histórico]
    
    C --> C20[Tab: Histórico]
    C20 --> C21[Lista de NutritionCards]
    C21 --> C22{Tem histórico?}
    
    C22 -->|Não| C23[Empty State]
    C22 -->|Sim| C24[Cards com Data + Resumo]
```

---

## Fluxo: Estados e Erros

```mermaid
graph TD
    A[Qualquer Tela] --> B{Dados carregando?}
    B -->|Sim| C[Loading State]
    B -->|Não| D{Dados carregados?}
    
    D -->|Sim| E{Dados vazios?}
    D -->|Não| F[Error State]
    
    E -->|Sim| G[Empty State]
    E -->|Não| H[Dados Renderizados]
    
    C --> C1[Skeleton Screen]
    C1 --> C2[Spinner]
    
    G --> G1[Ícone]
    G1 --> G2[Mensagem Explicativa]
    G2 --> G3[CTA Button]
    
    F --> F1[Mensagem de Erro]
    F1 --> F2[Botão: Tentar Novamente]
    F2 --> B
    
    H --> I{Pull to Refresh?}
    I -->|Sim| J[RefreshControl]
    J --> B
    
    H --> K{Ação do usuário?}
    K -->|Sucesso| L[Toast: Sucesso]
    K -->|Erro| F
    K -->|Loading| C
```

---

## Hierarquia de Telas (Árvore)

```
Mounjaro Tracker
│
├── (auth) [Rotas não autenticadas]
│   ├── welcome.tsx [Carrossel inicial]
│   ├── sign-in.tsx [Login]
│   ├── sign-up.tsx [Cadastro]
│   └── onboarding-flow.tsx [23 telas de onboarding]
│
├── (tabs) [Rotas autenticadas - Bottom Navigation]
│   ├── dashboard.tsx [Resumo/Home]
│   ├── injections.tsx [Lista de Injeções]
│   ├── results.tsx [Resultados e Gráficos]
│   ├── calendar.tsx [Calendário]
│   ├── settings.tsx [Configurações]
│   │
│   └── [Modais/Stack] [Telas de ação]
│       ├── add-application.tsx [Adicionar Injeção]
│       ├── add-weight.tsx [Adicionar Peso]
│       ├── add-nutrition.tsx [Nutrição com IA]
│       ├── add-medication.tsx [Adicionar Medicamento]
│       ├── add-side-effect.tsx [Adicionar Efeito]
│       ├── notification-settings.tsx [Config Notificações]
│       ├── profile.tsx [Perfil do Usuário]
│       └── faq.tsx [FAQ - A IMPLEMENTAR]
│
└── [Sistema] [Componentes globais]
    ├── PaywallModal.tsx [A IMPLEMENTAR]
    ├── PremiumGate.tsx [A IMPLEMENTAR]
    └── TrialNotification.tsx [A IMPLEMENTAR]
```

---

## Decisões de Fluxo

### 1. Onboarding
- **Shotsy:** 23 telas sequenciais obrigatórias
- **Mounjaro Atual:** 4 telas (basic, avatar, goal, personality)
- **Decisão:** Implementar todas as 23 telas do Shotsy

### 2. Paywall
- **Shotsy:** Paywall com trial opcional
- **Mounjaro Atual:** Não implementado
- **Decisão:** Implementar paywall com trial obrigatório de 7 dias

### 3. FAQ
- **Shotsy:** FAQ completa com busca
- **Mounjaro Atual:** Não existe
- **Decisão:** Implementar FAQ completa conforme Shotsy

### 4. Navegação
- **Shotsy:** 5 tabs fixas no bottom
- **Mounjaro Atual:** 5 tabs implementadas
- **Decisão:** Manter estrutura atual (já está correta)

---

**Última Atualização:** 2025-01-27  
**Próxima Revisão:** Após implementação P0

