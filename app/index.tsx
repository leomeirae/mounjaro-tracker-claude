import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '@/lib/clerk';
import { useRouter } from 'expo-router';
import { useColors } from '@/constants/colors';
import { useUser } from '@/hooks/useUser';
import { createLogger } from '@/lib/logger';

const logger = createLogger('IndexScreen');

export default function IndexScreen() {
  const colors = useColors();
  const { isSignedIn, isLoaded } = useAuth();
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const hasRedirectedRef = useRef(false);
  const [waitTime, setWaitTime] = useState(0);
  const maxWaitTime = 8; // 8 segundos máximo de espera

  useEffect(() => {
    if (!isLoaded) return;

    // Evitar múltiplos redirecionamentos que podem causar loops
    if (hasRedirectedRef.current) return;

    // Se não estiver autenticado, ir para welcome
    if (!isSignedIn) {
      hasRedirectedRef.current = true;
      router.replace('/(auth)/welcome');
      setTimeout(() => {
        hasRedirectedRef.current = false;
      }, 500);
      return;
    }

    // Incrementar contador de espera
    if (userLoading) {
      const interval = setInterval(() => {
        setWaitTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    // Se passou do tempo máximo de espera e ainda não tem user, assumir que precisa de onboarding
    if (!user && waitTime >= maxWaitTime) {
      logger.warn('User data not loaded after timeout, redirecting to onboarding', { waitTime });
      hasRedirectedRef.current = true;
      router.replace('/(auth)/onboarding-flow');
      setTimeout(() => {
        hasRedirectedRef.current = false;
      }, 500);
      return;
    }

    // Se ainda está carregando, aguardar
    if (userLoading) return;

    // Se user ainda é null após carregar, aguardar um pouco mais
    // (o useUserSync pode estar criando o usuário)
    if (!user) {
      logger.debug('User still loading, waiting...');
      return;
    }

    // Marcar como redirecionado antes de redirecionar
    hasRedirectedRef.current = true;

    // Pequeno delay para garantir que o estado está estável
    const timer = setTimeout(() => {
      if (isSignedIn && user) {
        // Se o onboarding não foi completado, ir para onboarding
        if (!user.onboarding_completed) {
          logger.info('Redirecting to onboarding flow');
          router.replace('/(auth)/onboarding-flow');
        } else {
          logger.info('Redirecting to dashboard');
          router.replace('/(tabs)');
        }
        // Resetar após redirecionar
        setTimeout(() => {
          hasRedirectedRef.current = false;
        }, 500);
      } else if (!isSignedIn) {
        router.replace('/(auth)/welcome');
        setTimeout(() => {
          hasRedirectedRef.current = false;
        }, 500);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isSignedIn, isLoaded, userLoading, user, waitTime]);

  const styles = getStyles(colors);

  // Sempre mostrar loading enquanto decide para onde ir
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.primary} />
      {waitTime > 3 && <Text style={styles.loadingText}>Carregando seus dados...</Text>}
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 14,
      color: colors.textSecondary,
    },
  });
