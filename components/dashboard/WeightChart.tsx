import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/colors';
import { WeightLog } from '@/lib/types';

interface WeightChartProps {
  data: WeightLog[];
  goalWeight?: number | null;
  initialWeight?: number | null;
}

export function WeightChart({ data, goalWeight, initialWeight: userInitialWeight }: WeightChartProps) {
  const colors = useColors();

  if (data.length === 0) {
    const styles = getStyles(colors);

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📊 Nenhum registro de peso ainda</Text>
        <Text style={styles.emptySubtext}>Comece registrando seu peso hoje!</Text>
      </View>
    );
  }

  // Calcular estatísticas
  const currentWeight = data[0]?.weight || 0;
  const initialWeight = userInitialWeight || data[data.length - 1]?.weight || currentWeight;
  const calculatedGoalWeight = goalWeight || (initialWeight - 10); // Usar meta do usuário ou fallback para -10kg
  const totalLost = initialWeight - currentWeight;
  const progressPercentage = Math.min(Math.max(((initialWeight - currentWeight) / (initialWeight - calculatedGoalWeight)) * 100, 0), 100);

  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      {/* Progress Card */}
      <View style={styles.progressCard}>
        <Text style={styles.title}>⚖️ Peso e Meta</Text>
        
        <View style={styles.weightFlow}>
          <View style={styles.weightPoint}>
            <Text style={styles.weightLabel}>Inicial</Text>
            <Text style={styles.weightValue}>{initialWeight}kg</Text>
          </View>
          
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
          
          <View style={styles.weightPoint}>
            <Text style={styles.weightLabel}>Atual</Text>
            <Text style={[styles.weightValue, styles.currentWeight]}>{currentWeight}kg</Text>
          </View>
          
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
          
          <View style={styles.weightPoint}>
            <Text style={styles.weightLabel}>Meta</Text>
            <Text style={styles.weightValue}>{calculatedGoalWeight.toFixed(1)}kg</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {totalLost > 0 ? `${totalLost.toFixed(1)}kg perdidos` : 'Continue firme!'}
          {totalLost > 0 && ` · ${progressPercentage.toFixed(0)}% da meta`}
        </Text>
      </View>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    // gap: 16, // Not supported in React Native StyleSheet
  },
  emptyContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
  },
  
  // Progress Card
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  weightFlow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weightPoint: {
    alignItems: 'center',
    flex: 1,
  },
  weightLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  weightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  currentWeight: {
    color: colors.primary,
    fontSize: 24,
  },
  arrow: {
    marginHorizontal: 8,
  },
  arrowText: {
    fontSize: 20,
    color: colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
