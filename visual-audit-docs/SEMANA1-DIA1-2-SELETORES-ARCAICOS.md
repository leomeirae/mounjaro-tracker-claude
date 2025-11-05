# SEMANA 1 - DIA 1-2: Seletores Arcaicos - Auditoria Completa

**Data:** 5 de novembro de 2025  
**Objetivo:** Auditar 3 seletores arcaicos restantes (Medication, Frequency, Side Effects)  
**Status:** 🟡 Em Andamento

---

## 📋 SUMÁRIO EXECUTIVO

Este documento apresenta a auditoria detalhada de **3 seletores arcaicos** do onboarding que precisam upgrade visual para ficarem idênticos ao Shotsy:

1. **Medication Selection Screen** (Onboarding Step 5)
2. **Injection Frequency Screen** (Onboarding Step 8)
3. **Side Effects Concerns Screen** (Onboarding Step 20)

**Nota:** Initial Dose Screen já foi auditado no Piloto - reutilizar especificações.

---

# COMPONENTE 1: MEDICATION SELECTION SCREEN

## 📸 Referências Visuais

- **Shotsy (Original):** `FIGMA-SCREENSHOTS/shotsy-onboarding-05-medication-selection.PNG` (IMG_0618.PNG)
- **Mounjaro (Atual):** `components/onboarding/MedicationSelectionScreen.tsx` (linhas 75-104)
- **Tela no Fluxo:** Onboarding Step 5/22 (após Already Using GLP-1)

---

## 🎯 IMPACTO UX

**Por que essa mudança importa para o usuário?**

O seletor de medicação é a primeira decisão médica real que o usuário toma no app. É o ponto onde ele confirma que está usando um medicamento específico (Mounjaro, Zepbound, Ozempic, etc.). Um design visual profissional transmite confiança e reduz ansiedade ao tomar decisões sobre medicação. Os seletores atuais parecem "arcaicos" e genéricos, não refletindo o padrão de qualidade do Shotsy.

**Métricas de Impacto:**

- 🎯 **Confiança do usuário:** ALTA - decisões sobre medicação requerem interface profissional
- 📱 **Usabilidade móvel:** MÉDIA - touch targets atuais são adequados, mas espaçamento pode melhorar
- 🎨 **Consistência visual:** ALTA - alinhamento com design system do Shotsy

---

## 🔍 GAPS VISUAIS IDENTIFICADOS

### Gap 1: Card de Opção (Seletor de Medicação)

#### Shotsy (Referência Original):

```
Dimensões e Espaçamento:
- Border radius: 16px
- Padding vertical: 20px
- Padding horizontal: 16px
- Min-height: 72px
- Gap entre cards: 12px ✅ (já correto)

Tipografia:
- Título (nome do medicamento):
  * Font size: 18px
  * Font weight: 600 (semibold)
  * Color: colors.text
  * Margin bottom: 4px

- Descrição:
  * Font size: 13px
  * Font weight: 400 (regular)
  * Color: colors.textSecondary
  * Line height: 18px ✅ (já correto)

Bordas e Estados:
- Border unselected: 1px solid colors.border
- Border selected: 2px solid colors.primary (accent color)
- Background: colors.card

Ícone de Seleção:
- Icon: checkmark-circle (Ionicons)
- Size: 24px ✅ (já correto)
- Color: colors.primary (accent color) ✅ (já correto)
- Position: right aligned ✅ (já correto)
```

#### Mounjaro (Implementação Atual):

```typescript
// components/onboarding/MedicationSelectionScreen.tsx

styles.option: {
  borderRadius: 12,        // ❌ 12px (deve ser 16px)
  padding: 16,             // ❌ 16px (deve ser 20px vertical, 16px horizontal)
  minHeight: 60,           // ❌ 60px (deve ser 72px)
  flexDirection: 'row',    // ✅ correto
  alignItems: 'center',    // ✅ correto
  justifyContent: 'space-between', // ✅ correto
}

styles.optionTitle: {
  fontSize: 17,            // ❌ 17px (deve ser 18px)
  fontWeight: '600',       // ✅ já correto!
  marginBottom: 2,         // ❌ 2px (deve ser 4px)
}

styles.optionDescription: {
  fontSize: 13,            // ✅ já correto!
  lineHeight: 18,          // ✅ já correto!
}
```

#### Comparação Visual:

| Propriedade             | Shotsy | Mounjaro | Status | Delta |
| ----------------------- | ------ | -------- | ------ | ----- |
| Border Radius           | 16px   | 12px     | ❌     | -4px  |
| Padding Vertical        | 20px   | 16px     | ❌     | -4px  |
| Padding Horizontal      | 16px   | 16px     | ✅     | 0px   |
| Min Height              | 72px   | 60px     | ❌     | -12px |
| Gap entre cards         | 12px   | 12px     | ✅     | 0px   |
| Font Size (título)      | 18px   | 17px     | ❌     | -1px  |
| Font Weight (título)    | 600    | 600      | ✅     | 0     |
| Margin Bottom (título)  | 4px    | 2px      | ❌     | -2px  |
| Font Size (descrição)   | 13px   | 13px     | ✅     | 0px   |
| Line Height (descrição) | 18px   | 18px     | ✅     | 0px   |

**Total de Gaps:** 5 propriedades com diferenças visuais

---

## 🛠️ MUDANÇAS NECESSÁRIAS

### Arquivo: `components/onboarding/MedicationSelectionScreen.tsx`

**Linhas a modificar:** 75-104

```typescript
const styles = StyleSheet.create({
  content: {
    gap: 12, // ✅ manter
  },
  option: {
    borderRadius: 16, // 12 → 16 (+4px)
    paddingVertical: 20, // 16 → 20 (+4px) - SEPARAR padding
    paddingHorizontal: 16, // manter
    minHeight: 72, // 60 → 72 (+12px)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18, // 17 → 18 (+1px)
    fontWeight: '600', // ✅ manter
    marginBottom: 4, // 2 → 4 (+2px)
  },
  optionDescription: {
    fontSize: 13, // ✅ manter
    lineHeight: 18, // ✅ manter
  },
});
```

---

## ⚙️ ESPECIFICAÇÕES TÉCNICAS

**Arquivo:** `components/onboarding/MedicationSelectionScreen.tsx`  
**Linhas:** 75-104  
**Tipo de mudança:** Ajuste de valores de estilo (StyleSheet)

**Mudanças por linha:**

- Linha 80: `borderRadius: 12,` → `borderRadius: 16,`
- Linha 81: `padding: 16,` → `paddingVertical: 20,` + adicionar linha 82: `paddingHorizontal: 16,`
- Linha 82 (antiga): `minHeight: 60,` → `minHeight: 72,`
- Linha 96: `fontSize: 17,` → `fontSize: 18,`
- Linha 98: `marginBottom: 2,` → `marginBottom: 4,`

**Dependências:** Nenhuma (mudanças isoladas no StyleSheet)

**Testes necessários:**

- ✅ Verificar que todos os 6 cards de medicação cabem na tela sem scroll
- ✅ Verificar touch target (mínimo 48px - ok com minHeight 72px)
- ✅ Testar em iPhone SE (tela menor)
- ✅ Testar em iPhone Pro Max (tela maior)
- ✅ Verificar alinhamento do checkmark icon

**Risco de quebra:** 🟢 **BAIXO**

- Apenas ajustes visuais de padding/radius
- Não afeta lógica ou interações
- Não afeta outras telas

**Esforço:** 🟢 **45 min (XS)** - Similar ao Initial Dose

---

## ✅ CRITÉRIOS DE ACEITAÇÃO

### Visual

- [ ] Border radius dos cards = 16px
- [ ] Padding vertical = 20px
- [ ] Padding horizontal = 16px
- [ ] Min-height = 72px
- [ ] Font size título = 18px
- [ ] Margin-bottom do título = 4px
- [ ] Gap entre cards = 12px (já ok)

### Funcional

- [ ] Seleção de medicação funciona normalmente
- [ ] Estado selected visualmente destacado (border 2px + checkmark)
- [ ] Estado unselected com border 1px
- [ ] Touch target adequado (≥ 48px)
- [ ] Scroll funciona se necessário

---

---

# COMPONENTE 2: INJECTION FREQUENCY SCREEN

## 📸 Referências Visuais

- **Shotsy (Original):** `FIGMA-SCREENSHOTS/shotsy-onboarding-08-injection-frequency.PNG` (IMG_0621.PNG)
- **Mounjaro (Atual):** `components/onboarding/InjectionFrequencyScreen.tsx` (linhas 105-155)
- **Tela no Fluxo:** Onboarding Step 8/22 (após Device Type)

---

## 🎯 IMPACTO UX

**Por que essa mudança importa para o usuário?**

A frequência de aplicação é crítica para cálculos farmacocinéticos (quando a próxima dose é necessária, estimativa de níveis). Um seletor claro e profissional ajuda o usuário a entender a importância dessa informação e confia em fornecer dados precisos. O design atual não transmite a mesma confiança profissional do Shotsy.

**Métricas de Impacto:**

- 🎯 **Precisão de dados:** CRÍTICA - frequência afeta todos os cálculos do app
- 🎨 **Consistência visual:** ALTA - deve ser idêntico aos outros seletores
- 📱 **Usabilidade:** MÉDIA - input customizado precisa ser claro

---

## 🔍 GAPS VISUAIS IDENTIFICADOS

### Gap 1: Card de Opção (Seletor de Frequência)

**Análise:** Mesmos gaps do Medication Selection (padrão repetível)

#### Comparação Visual:

| Propriedade          | Shotsy | Mounjaro | Status | Delta |
| -------------------- | ------ | -------- | ------ | ----- |
| Border Radius        | 16px   | 12px     | ❌     | -4px  |
| Padding Vertical     | 20px   | 16px     | ❌     | -4px  |
| Padding Horizontal   | 16px   | 16px     | ✅     | 0px   |
| Min Height           | 72px   | 60px     | ❌     | -12px |
| Gap entre cards      | 12px   | 12px     | ✅     | 0px   |
| Font Size (título)   | 18px   | 17px     | ❌     | -1px  |
| Font Weight (título) | 600    | 600      | ✅     | 0     |
| Margin Bottom        | N/A    | N/A      | ✅     | -     |

**Total de Gaps:** 4 propriedades com diferenças visuais

### Gap 2: Input Customizado (Quando selecionado "Personalizado")

**Shotsy (Referência):**

```
Input Container:
- Border radius: 12px (menor que card principal)
- Padding: 16px
- Border: 1px solid colors.border
- Background: colors.card
- Margin top: 12px ✅ (já correto)

Input Field:
- Border radius: 8px
- Padding: 12px
- Border: 1px solid colors.border
- Font size: 16px
- Font weight: 600 ✅ (já correto)
- Placeholder: "7"
- Keyboard type: decimal-pad ✅ (já correto)

Suffix ("dias"):
- Font size: 16px ✅ (já correto)
- Color: colors.textSecondary ✅ (já correto)
- Spacing: 12px gap ✅ (já correto)
```

**Mounjaro (Atual):**

```typescript
styles.customInput: {
  marginTop: 12,  // ✅ já correto
  padding: 16,  // ✅ já correto
  borderRadius: 12,  // ✅ já correto
  borderWidth: 1,  // ✅ já correto
}

styles.input: {
  flex: 1,
  borderWidth: 1,
  borderRadius: 8,  // ✅ já correto
  padding: 12,  // ✅ já correto
  fontSize: 16,  // ✅ já correto
  fontWeight: '600',  // ✅ já correto
}
```

**Status:** ✅ Input customizado já está correto!

---

## 🛠️ MUDANÇAS NECESSÁRIAS

### Arquivo: `components/onboarding/InjectionFrequencyScreen.tsx`

**Linhas a modificar:** 105-128

```typescript
const styles = StyleSheet.create({
  content: {
    gap: 12, // ✅ manter
  },
  option: {
    borderRadius: 16, // 12 → 16 (+4px)
    paddingVertical: 20, // 16 → 20 (+4px)
    paddingHorizontal: 16, // manter
    minHeight: 72, // 60 → 72 (+12px)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18, // 17 → 18 (+1px)
    fontWeight: '600', // ✅ manter
  },
  // ... resto do código (customInput já está correto)
});
```

---

## ⚙️ ESPECIFICAÇÕES TÉCNICAS

**Arquivo:** `components/onboarding/InjectionFrequencyScreen.tsx`  
**Linhas:** 105-128  
**Tipo de mudança:** Ajuste de valores de estilo (StyleSheet)

**Mudanças por linha:**

- Linha 110: `borderRadius: 12,` → `borderRadius: 16,`
- Linha 111: `padding: 16,` → `paddingVertical: 20,` + adicionar linha 112: `paddingHorizontal: 16,`
- Linha 112 (antiga): `minHeight: 60,` → `minHeight: 72,`
- Linha 126: `fontSize: 17,` → `fontSize: 18,`

**Dependências:** Nenhuma

**Testes necessários:**

- ✅ Verificar que todos os 4 cards de frequência cabem na tela
- ✅ Verificar input customizado aparece corretamente quando selecionado
- ✅ Testar input numérico (aceita decimais como 3.5)
- ✅ Verificar validação (não permite valores <= 0)

**Risco de quebra:** 🟢 **BAIXO**

**Esforço:** 🟢 **45 min (XS)** - Similar aos outros seletores

---

## ✅ CRITÉRIOS DE ACEITAÇÃO

### Visual

- [ ] Border radius = 16px
- [ ] Padding vertical = 20px
- [ ] Min-height = 72px
- [ ] Font size = 18px
- [ ] Input customizado funciona corretamente ✅ (já ok)

### Funcional

- [ ] Seleção de frequência funciona
- [ ] Input customizado aparece quando "Personalizado" selecionado
- [ ] Validação numérica funciona (aceita decimais)
- [ ] Botão "Continuar" desabilita se inválido

---

---

# COMPONENTE 3: SIDE EFFECTS CONCERNS SCREEN

## 📸 Referências Visuais

- **Shotsy (Original):** `FIGMA-SCREENSHOTS/shotsy-onboarding-20-side-effects-concerns.PNG` (A identificar nos screenshots restantes)
- **Mounjaro (Atual):** `components/onboarding/SideEffectsConcernsScreen.tsx` (linhas 88-125)
- **Tela no Fluxo:** Onboarding Step 20/22 (último antes de Motivation)

---

## 🎯 IMPACTO UX

**Por que essa mudança importa para o usuário?**

Os efeitos colaterais são uma preocupação legítima dos usuários de GLP-1. Um seletor claro e profissional ajuda o usuário a:

- Expressar suas preocupações sem ansiedade
- Receber dicas personalizadas baseadas nas seleções
- Sentir que o app leva suas preocupações a sério

Um design "arcaico" pode fazer o usuário sentir que o app não é profissional o suficiente para lidar com questões médicas sérias.

**Métricas de Impacto:**

- 🎯 **Confiança médica:** ALTA - questões de saúde requerem interface profissional
- 🎨 **Consistência visual:** ALTA - deve ser idêntico aos outros seletores
- 📱 **Usabilidade:** MÉDIA - seleção múltipla precisa ser clara

---

## 🔍 GAPS VISUAIS IDENTIFICADOS

### Gap 1: Card de Opção (Seletor de Efeitos Colaterais)

**Análise:** Similar aos outros seletores, mas com diferenças importantes:

#### Diferenças Específicas do Side Effects:

**Shotsy (Referência):**

```
Layout Especial:
- Emoji + Label lado a lado (não apenas texto)
- Checkbox (não radio button) pois permite múltipla seleção
- Contador de selecionados no final (badge)

Card:
- Border radius: 16px
- Padding vertical: 20px
- Padding horizontal: 16px
- Min-height: 72px
- Gap entre cards: 12px ✅ (já correto)

Tipografia:
- Label (nome do efeito):
  * Font size: 18px
  * Font weight: 500 (medium) - menos peso que outros seletores
  * Color: colors.text

- Emoji:
  * Font size: 28px ✅ (já correto)
  * Spacing: 12px gap ✅ (já correto)

Ícone:
- Unselected: square-outline (checkbox vazio)
- Selected: checkbox (checkbox marcado)
- Size: 24px ✅ (já correto)
- Color selected: colors.primary ✅ (já correto)
- Color unselected: colors.border ✅ (já correto)

Badge de Contagem:
- Border radius: 12px ✅ (já correto)
- Padding: 12px ✅ (já correto)
- Background: colors.card ✅ (já correto)
- Font size: 14px ✅ (já correto)
- Font weight: 600 ✅ (já correto)
```

**Mounjaro (Atual):**

```typescript
styles.option: {
  borderRadius: 12,        // ❌ 12px (deve ser 16px)
  padding: 16,             // ❌ 16px (deve ser 20px vertical, 16px horizontal)
  minHeight: 60,           // ❌ 60px (deve ser 72px)
  flexDirection: 'row',    // ✅ correto
  alignItems: 'center',    // ✅ correto
  justifyContent: 'space-between', // ✅ correto
}

styles.optionLabel: {
  fontSize: 17,            // ❌ 17px (deve ser 18px)
  fontWeight: '500',       // ✅ já correto!
}

styles.emoji: {
  fontSize: 28,            // ✅ já correto!
}

styles.selectedCount: {
  borderRadius: 12,        // ✅ já correto
  padding: 12,            // ✅ já correto
}

styles.selectedCountText: {
  fontSize: 14,           // ✅ já correto
  fontWeight: '600',      // ✅ já correto
}
```

#### Comparação Visual:

| Propriedade         | Shotsy | Mounjaro | Status | Delta |
| ------------------- | ------ | -------- | ------ | ----- |
| Border Radius       | 16px   | 12px     | ❌     | -4px  |
| Padding Vertical    | 20px   | 16px     | ❌     | -4px  |
| Padding Horizontal  | 16px   | 16px     | ✅     | 0px   |
| Min Height          | 72px   | 60px     | ❌     | -12px |
| Gap entre cards     | 12px   | 12px     | ✅     | 0px   |
| Font Size (label)   | 18px   | 17px     | ❌     | -1px  |
| Font Weight (label) | 500    | 500      | ✅     | 0     |
| Emoji Size          | 28px   | 28px     | ✅     | 0px   |
| Gap emoji-label     | 12px   | 12px     | ✅     | 0px   |
| Checkbox Size       | 24px   | 24px     | ✅     | 0px   |
| Badge Contagem      | ✅     | ✅       | ✅     | OK    |

**Total de Gaps:** 4 propriedades com diferenças visuais

---

## 🛠️ MUDANÇAS NECESSÁRIAS

### Arquivo: `components/onboarding/SideEffectsConcernsScreen.tsx`

**Linhas a modificar:** 88-125

```typescript
const styles = StyleSheet.create({
  content: {
    gap: 20, // ✅ manter (maior gap para badge)
  },
  optionsList: {
    gap: 12, // ✅ manter
  },
  option: {
    borderRadius: 16, // 12 → 16 (+4px)
    paddingVertical: 20, // 16 → 20 (+4px)
    paddingHorizontal: 16, // manter
    minHeight: 72, // 60 → 72 (+12px)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // ✅ manter
    flex: 1,
  },
  emoji: {
    fontSize: 28, // ✅ manter
  },
  optionLabel: {
    fontSize: 18, // 17 → 18 (+1px)
    fontWeight: '500', // ✅ manter
  },
  selectedCount: {
    padding: 12, // ✅ manter
    borderRadius: 12, // ✅ manter
    alignItems: 'center',
  },
  selectedCountText: {
    fontSize: 14, // ✅ manter
    fontWeight: '600', // ✅ manter
  },
});
```

---

## ⚙️ ESPECIFICAÇÕES TÉCNICAS

**Arquivo:** `components/onboarding/SideEffectsConcernsScreen.tsx`  
**Linhas:** 88-125  
**Tipo de mudança:** Ajuste de valores de estilo (StyleSheet)

**Mudanças por linha:**

- Linha 96: `borderRadius: 12,` → `borderRadius: 16,`
- Linha 97: `padding: 16,` → `paddingVertical: 20,` + adicionar linha 98: `paddingHorizontal: 16,`
- Linha 98 (antiga): `minHeight: 60,` → `minHeight: 72,`
- Linha 113: `fontSize: 17,` → `fontSize: 18,`

**Dependências:** Nenhuma

**Testes necessários:**

- ✅ Verificar que todos os 7 cards de efeitos colaterais cabem na tela
- ✅ Verificar seleção múltipla funciona (checkbox)
- ✅ Verificar badge de contagem aparece quando seleciona
- ✅ Verificar botão "Pular" quando nenhum selecionado
- ✅ Verificar botão "Continuar" quando seleciona pelo menos 1

**Risco de quebra:** 🟢 **BAIXO**

**Esforço:** 🟢 **45 min (XS)** - Similar aos outros seletores

---

## ✅ CRITÉRIOS DE ACEITAÇÃO

### Visual

- [ ] Border radius = 16px
- [ ] Padding vertical = 20px
- [ ] Min-height = 72px
- [ ] Font size label = 18px
- [ ] Emoji size = 28px (já ok)
- [ ] Gap emoji-label = 12px (já ok)
- [ ] Badge contagem funciona (já ok)

### Funcional

- [ ] Seleção múltipla funciona (checkbox)
- [ ] Badge mostra contagem correta
- [ ] Botão muda para "Pular" quando nenhum selecionado
- [ ] Botão muda para "Continuar" quando seleciona pelo menos 1

---

---

# 📊 RESUMO DIA 1-2: Seletores Arcaicos

## ✅ COMPONENTES AUDITADOS

| Componente            | Tela    | Gaps | Esforço | Risco | Status               |
| --------------------- | ------- | ---- | ------- | ----- | -------------------- |
| Medication Selection  | Step 5  | 5    | 45min   | Baixo | ✅ Auditado          |
| Initial Dose          | Step 6  | 4    | 1h      | Baixo | ✅ Auditado (Piloto) |
| Injection Frequency   | Step 8  | 4    | 45min   | Baixo | ✅ Auditado          |
| Side Effects Concerns | Step 20 | 4    | 45min   | Baixo | ✅ Auditado          |

**Total:** 4 seletores auditados | **Esforço Total:** ~3h | **Risco:** 🟢 Baixo

---

## 🎯 PADRÃO IDENTIFICADO

Todos os 4 seletores têm **exatamente os mesmos gaps**:

### Gaps Comuns (Padrão Repetível):

1. ❌ **Border Radius:** 12px → 16px (+4px)
2. ❌ **Padding Vertical:** 16px → 20px (+4px)
3. ❌ **Padding Horizontal:** 16px (já correto)
4. ❌ **Min Height:** 60px → 72px (+12px)
5. ❌ **Font Size (título/label):** 17px → 18px (+1px)
6. ❌ **Margin Bottom (quando aplicável):** 2px → 4px (+2px)

### Elementos Já Corretos:

- ✅ Gap entre cards (12px)
- ✅ Font weight (600 ou 500)
- ✅ Border colors (selected/unselected)
- ✅ Ícones (checkmark, checkbox)
- ✅ Background colors

---

## 🚀 PRÓXIMOS PASSOS

### Dia 3-4: Telas Educacionais

A auditar:

- Charts Intro Screen (tela 2)
- Education Graph Screen (tela 9)
- Fluctuations Education Screen (tela 18)

### Dia 5: Inputs de Dados

A auditar:

- Height Input Screen (tela 11)
- Current Weight Screen (tela 12)
- Starting Weight Screen (tela 13)
- Target Weight Screen (tela 14)

---

## 📝 NOTAS PARA IMPLEMENTAÇÃO

### Quick Win Identificado:

Como todos os 4 seletores têm exatamente os mesmos gaps, pode-se criar um **componente base reutilizável** (`OnboardingSelectorOption`) que:

- Aplica os estilos corretos automaticamente
- Reduz código duplicado
- Garante consistência visual

**Esforço adicional:** +1h para criar componente base  
**Benefício:** Reduz retrabalho futuro e garante consistência

**Recomendação:** Criar componente base após implementar mudanças nos 4 seletores individuais (validar que funciona primeiro).

---

**Status:** ✅ Dia 1-2 Completo  
**Próxima Etapa:** Dia 3-4 (Telas Educacionais)
