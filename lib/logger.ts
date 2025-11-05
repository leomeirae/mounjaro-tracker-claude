/**
 * Sistema centralizado de logging
 *
 * Fornece logs estruturados com níveis diferentes e suporte para
 * envio para serviços externos (Sentry, LogRocket, etc.) em produção.
 *
 * @example
 * ```typescript
 * import { logger } from '@/lib/logger';
 *
 * logger.info('User logged in', { userId: user.id });
 * logger.error('Failed to fetch data', error);
 * logger.debug('Rendering component', { props });
 * ```
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMetadata {
  [key: string]: any;
}

interface LoggerConfig {
  /** Habilita logs em produção (apenas error por padrão) */
  enableInProd: boolean;
  /** Envia erros para Sentry em produção */
  sendToSentry: boolean;
  /** Prefixo para todos os logs (útil para debug) */
  prefix?: string;
}

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      enableInProd: false,
      sendToSentry: false,
      ...config,
    };
  }

  /**
   * Log de debug (apenas em desenvolvimento)
   * Útil para valores intermediários, renderizações, etc.
   */
  debug(message: string, metadata?: LogMetadata): void {
    if (__DEV__) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.debug(`🐛 ${prefix} ${message}`, metadata || '');
    }
  }

  /**
   * Log informativo (apenas em desenvolvimento por padrão)
   * Útil para tracking de fluxo, eventos importantes, etc.
   */
  info(message: string, metadata?: LogMetadata): void {
    if (__DEV__ || this.config.enableInProd) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.log(`ℹ️  ${prefix} ${message}`, metadata || '');
    }
  }

  /**
   * Log de warning (sempre visível)
   * Útil para situações que merecem atenção mas não são erros
   */
  warn(message: string, metadata?: LogMetadata): void {
    const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
    console.warn(`⚠️  ${prefix} ${message}`, metadata || '');
  }

  /**
   * Log de erro (sempre visível)
   * Envia para Sentry em produção se configurado
   */
  error(message: string, error?: Error | unknown, metadata?: LogMetadata): void {
    const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
    console.error(`❌ ${prefix} ${message}`, error, metadata || '');

    // Em produção, enviar para Sentry
    if (!__DEV__ && this.config.sendToSentry) {
      // TODO: Integrar com Sentry quando disponível
      // Sentry.captureException(error, {
      //   tags: { message },
      //   extra: metadata,
      // });
    }
  }

  /**
   * Cria um logger com prefixo específico
   * Útil para identificar origem dos logs
   *
   * @example
   * ```typescript
   * const logger = createLogger('UserSync');
   * logger.info('Syncing user...'); // ℹ️ [UserSync] Syncing user...
   * ```
   */
  createChild(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: this.config.prefix ? `${this.config.prefix}:${prefix}` : prefix,
    });
  }
}

// Instância padrão para uso geral
export const logger = new Logger({
  enableInProd: false,
  sendToSentry: false,
});

/**
 * Cria um logger com prefixo específico
 *
 * @param prefix - Prefixo para identificar origem dos logs
 * @returns Logger instance com prefixo
 *
 * @example
 * ```typescript
 * const logger = createLogger('OnboardingFlow');
 * logger.info('User completed step 3');
 * // Output: ℹ️ [OnboardingFlow] User completed step 3
 * ```
 */
export function createLogger(prefix: string): Logger {
  return logger.createChild(prefix);
}

/**
 * Tipos exportados para uso externo
 */
export type { LogLevel, LogMetadata, LoggerConfig };
