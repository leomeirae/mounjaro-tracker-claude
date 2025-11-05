/**
 * Tipos para o sistema de cores do Shotsy
 *
 * Define a interface completa para todas as cores dinâmicas
 * usadas pelo hook useShotsyColors()
 */

export interface ShotsyColors {
  // Background colors
  background: string;
  backgroundSecondary: string;

  // Card colors
  card: string;
  cardSecondary: string;

  // Primary/accent colors
  primary: string;
  primaryMuted: string;

  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;

  // Border colors
  border: string;
  borderLight: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Chart colors (para gráficos)
  chartPrimary: string;
  chartSecondary: string;
  chartTertiary: string;
  chartBackground: string;
  chartGrid: string;

  // Interactive states
  hover: string;
  active: string;
  disabled: string;

  // Semantic colors
  positive: string;
  negative: string;
  neutral: string;
}

/**
 * Interface para cores de tema
 * Usado pelo sistema de temas personalizados
 */
export interface ThemeColors {
  light: Partial<ShotsyColors>;
  dark: Partial<ShotsyColors>;
}

/**
 * Tipos de temas disponíveis
 */
export type ThemeType =
  | 'sunset'
  | 'ocean'
  | 'forest'
  | 'lavender'
  | 'rose'
  | 'midnight'
  | 'monochrome'
  | 'candy';

/**
 * Modo de cor (light/dark)
 */
export type ColorMode = 'light' | 'dark';
