# TASK-CORRECAO-TEMAS: Corrigir Sistema de Temas Global

## 🎯 OBJETIVO
Corrigir o sistema de temas para funcionar em TODO o app, não apenas na tela de perfil. Atualmente o toggle de tema muda apenas a tela de perfil e de forma inconsistente.

## 📋 PROBLEMA ATUAL
- ❌ Tema muda apenas na tela de perfil
- ❌ Header fica escuro, conteúdo fica claro (inconsistente)
- ❌ StatusBar não muda
- ❌ Outras telas não respondem ao toggle

## ✅ SOLUÇÃO
Implementar ThemeProvider com React Context API seguindo as melhores práticas do Expo (https://docs.expo.dev/develop/user-interface/color-themes/)

---

## 🚀 PASSO 1: Criar ThemeProvider com Context API

Execute no **Cursor AI** (composer):

```
Crie o arquivo lib/theme-context.tsx com o seguinte código:

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  effectiveMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@mounjaro_tracker:theme_mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  
  const effectiveMode: 'light' | 'dark' = 
    mode === 'system' 
      ? (systemColorScheme === 'dark' ? 'dark' : 'light')
      : mode;

  useEffect(() => {
    loadSavedTheme();
  }, []);

  useEffect(() => {
    if (mode === 'system') {
      // Força re-render quando o tema do sistema muda
    }
  }, [systemColorScheme, mode]);

  async function loadSavedTheme() {
    try {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setModeState(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  }

  async function setMode(newMode: ThemeMode) {
    try {
      setModeState(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  }

  return (
    <ThemeContext.Provider value={{ mode, effectiveMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
```

---

## 🚀 PASSO 2: Atualizar constants/colors.ts

Execute no **Cursor AI** (composer):

```
Modifique o arquivo constants/colors.ts para importar do novo theme-context:

No topo do arquivo, troque:
DE: import { useTheme } from '@/lib/theme';
PARA: import { useTheme } from '@/lib/theme-context';

O resto do arquivo permanece igual.
```

---

## 🚀 PASSO 3: Envolver o app com ThemeProvider

Execute no **Cursor AI** (composer):

```
Modifique o arquivo app/_layout.tsx:

1. Adicione o import:
import { ThemeProvider, useTheme } from '@/lib/theme-context';

2. Extraia o conteúdo do Stack para um componente separado chamado RootStack:

function RootStack() {
  const colors = useColors();
  const { effectiveMode } = useTheme();

  return (
    <>
      <StatusBar style={effectiveMode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backgroundLight,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
          animation: 'fade',
        }}
      >
        {/* Todo o conteúdo das screens aqui */}
      </Stack>
    </>
  );
}

3. No export default, envolva com ThemeProvider:

export default function RootLayout() {
  const publishableKey = validateClerkKey();

  return (
    <ClerkProvider 
      publishableKey={publishableKey} 
      tokenCache={tokenCache}
    >
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </ClerkProvider>
  );
}
```

---

## 🚀 PASSO 4: Atualizar app/(tabs)/_layout.tsx

Execute no **Cursor AI** (composer):

```
Modifique o arquivo app/(tabs)/_layout.tsx:

1. Troque o import:
DE: import { COLORS } from '@/constants/colors';
PARA: import { useColors } from '@/constants/colors';

2. Dentro do componente TabsLayout, adicione:
const colors = useColors();

3. Troque todas as referências de COLORS para colors (minúsculo)

Exemplo:
DE: backgroundColor: COLORS.background
PARA: backgroundColor: colors.background
```

---

## 🚀 PASSO 5: Atualizar app/(tabs)/profile.tsx

Execute no **Cursor AI** (composer):

```
Modifique o arquivo app/(tabs)/profile.tsx:

1. Troque o import:
DE: import { useTheme } from '@/lib/theme';
PARA: import { useTheme } from '@/lib/theme-context';

2. No início da função ProfileScreen, já deve existir:
const colors = useColors();
const { mode, setMode } = useTheme();

3. Remova a linha: const styles = createStyles(colors);

4. Troque TODA a função createStyles() no final por styles normais inline

5. Onde tiver style={styles.container}, troque por:
style={{ flex: 1, backgroundColor: colors.background }}

6. Onde tiver style={styles.text}, troque por:
style={{ fontSize: X, color: colors.text }}

IMPORTANTE: Mantenha a lógica dos botões de tema funcionando corretamente com:
- mode === 'light' para destacar o botão Claro
- mode === 'dark' para destacar o botão Escuro
- mode === 'system' para destacar o botão Sistema
```

---

## 🚀 PASSO 6: Atualizar componentes UI (Button e Input)

Execute no **Cursor AI** (composer):

```
Modifique components/ui/button.tsx:

1. Troque o import:
DE: import { COLORS } from '@/constants/colors';
PARA: import { useColors } from '@/constants/colors';

2. Adicione no início da função Button:
const colors = useColors();

3. Crie funções para calcular estilos dinâmicos:

const getButtonStyle = () => {
  switch (variant) {
    case 'primary':
      return { backgroundColor: colors.primary };
    case 'secondary':
      return { backgroundColor: colors.card };
    case 'outline':
      return { 
        backgroundColor: 'transparent', 
        borderWidth: 2, 
        borderColor: colors.primary 
      };
  }
};

const getTextStyle = () => {
  switch (variant) {
    case 'outline':
      return { color: colors.primary };
    case 'secondary':
      return { color: colors.text };
    default:
      return { color: '#ffffff' };
  }
};

4. No return, use:
style={[styles.button, getButtonStyle(), ...]}
```

Execute no **Cursor AI** (composer):

```
Modifique components/ui/input.tsx:

1. Troque o import:
DE: import { COLORS } from '@/constants/colors';
PARA: import { useColors } from '@/constants/colors';

2. Adicione no início da função Input:
const colors = useColors();

3. No TextInput, troque o style por:
style={[
  styles.input, 
  { 
    backgroundColor: colors.card,
    color: colors.text,
    borderColor: error ? colors.error : colors.border,
  }
]}

4. Troque placeholderTextColor={COLORS.textMuted} por:
placeholderTextColor={colors.textMuted}
```

---

## 🚀 PASSO 7: Limpar e testar

Execute no **Terminal**:

```bash
# Limpar cache do Metro Bundler
npx expo start --clear
```

---

## 🧪 COMO TESTAR

1. **Abra o app no simulador**
2. **Vá em Perfil** (tab inferior direita - ícone 👤)
3. **Toque em ☀️ Claro**
   - ✅ TODO o app deve ficar claro (fundo branco, texto escuro)
4. **Toque em 🌙 Escuro**
   - ✅ TODO o app deve ficar escuro (fundo escuro, texto claro)
5. **Toque em ⚙️ Sistema**
   - ✅ App deve seguir o tema do sistema operacional
6. **Feche o app e reabra**
   - ✅ Tema escolhido deve persistir

---

## 🎯 RESULTADO ESPERADO

✅ Tema muda instantaneamente em TODO o app
✅ StatusBar adapta-se ao tema (clara no escuro, escura no claro)
✅ Todas telas respondem ao toggle
✅ Persistência entre sessões funciona
✅ Modo sistema detecta mudanças do OS automaticamente

---

## 📁 ARQUIVOS QUE SERÃO MODIFICADOS

1. ✅ `lib/theme-context.tsx` - NOVO (ThemeProvider)
2. ✅ `constants/colors.ts` - Atualizado (import)
3. ✅ `app/_layout.tsx` - Envolve com ThemeProvider
4. ✅ `app/(tabs)/_layout.tsx` - Usa cores dinâmicas
5. ✅ `app/(tabs)/profile.tsx` - Usa novo contexto
6. ✅ `components/ui/button.tsx` - Cores dinâmicas
7. ✅ `components/ui/input.tsx` - Cores dinâmicas

---

## ⚠️ ARQUIVO QUE PODE SER DELETADO (OPCIONAL)

- `lib/theme.ts` - Não é mais necessário (substituído por theme-context.tsx)

Você pode deletar manualmente ou deixar (não vai afetar o funcionamento)

---

## 💡 DICA PRO

Se houver MUITOS outros arquivos usando `COLORS`, você pode fazer um **Find & Replace global** no Cursor AI:

1. Pressione `Cmd+Shift+H` (Mac) ou `Ctrl+Shift+H` (Windows)
2. Find: `import { COLORS } from '@/constants/colors';`
3. Replace: `import { useColors } from '@/constants/colors';`
4. **Replace All** apenas nos arquivos `.tsx`

Depois para cada arquivo, adicione `const colors = useColors();` no início do componente.

---

**Data**: 28 de Outubro de 2025  
**Prioridade**: ALTA  
**Tempo estimado**: 10-15 minutos  
**Status**: PRONTO PARA EXECUTAR ✅
