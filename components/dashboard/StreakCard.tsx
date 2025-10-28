import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/colors';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  type: 'weight' | 'application';
}

export function StreakCard({ currentStreak, longestStreak, type }: StreakCardProps) {
  const colors = useColors();
  const emoji = type === 'weight' ? '⚖️' : '💉';
  const label = type === 'weight' ? 'Pesagens' : 'Aplicações';

  const styles = getStyles(colors);

  return (
    <View style={[
      styles.container,
      currentStreak === 0 && styles.containerInactive
    ]}>
      <Text style={styles.emoji}>{emoji}</Text>

      <View style={styles.content}>
        <View style={styles.streakRow}>
          <Text style={styles.fireEmoji}>🔥</Text>
          <Text style={styles.currentStreak}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>dias</Text>
        </View>

        <Text style={styles.type}>{label} Consecutivas</Text>

        {longestStreak > currentStreak && (
          <Text style={styles.record}>
            Recorde: {longestStreak} dias
          </Text>
        )}
      </View>

      {currentStreak === 0 && (
        <View style={styles.brokenBadge}>
          <Text style={styles.brokenText}>Quebrado</Text>
        </View>
      )}
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '40',
  },
  containerInactive: {
    opacity: 0.6,
    borderColor: colors.border,
  },
  emoji: {
    fontSize: 40,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  fireEmoji: {
    fontSize: 20,
    marginRight: 4,
  },
  currentStreak: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 4,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  type: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  record: {
    fontSize: 12,
    color: colors.textMuted,
  },
  brokenBadge: {
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  brokenText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
  },
});
