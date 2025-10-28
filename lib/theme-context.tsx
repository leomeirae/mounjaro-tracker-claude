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
  
  // Calcula o tema efetivo baseado no modo selecionado
  const effectiveMode: 'light' | 'dark' = 
    mode === 'system' 
      ? (systemColorScheme === 'dark' ? 'dark' : 'light')
      : mode;

  // Carrega o tema salvo ao iniciar
  useEffect(() => {
    loadSavedTheme();
  }, []);

  // Atualiza quando o tema do sistema muda (se estiver em modo 'system')
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
