import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/colors';

interface CommunityCardProps {
  yourWeightLost: number;
  avgWeightLost: number;
  yourPercentile: number;
  message: string;
  emoji: string;
  usersInSample: number;
}

export function CommunityCard({
  yourWeightLost,
  avgWeightLost,
  yourPercentile,
  message,
  emoji,
  usersInSample
}: CommunityCardProps) {
  const colors = useColors();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={styles.message}>{message}</Text>

      <View style={styles.comparisonRow}>
        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonLabel}>Você</Text>
          <Text style={styles.comparisonValue}>{yourWeightLost.toFixed(1)}kg</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonLabel}>Média</Text>
          <Text style={styles.comparisonValue}>{avgWeightLost.toFixed(1)}kg</Text>
        </View>
      </View>

      <View style={styles.percentileBar}>
        <View style={[styles.percentileFill, { width: `${yourPercentile}%` }]} />
      </View>
      <Text style={styles.percentileText}>
        Top {100 - yourPercentile}% dos {usersInSample} usuários
      </Text>

      <Text style={styles.disclaimer}>
        * Dados anônimos e agregados da comunidade
      </Text>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  comparisonRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  percentileBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  percentileFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  percentileText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  disclaimer: {
    fontSize: 10,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
