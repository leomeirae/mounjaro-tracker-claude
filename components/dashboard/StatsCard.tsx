import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/colors';

interface StatsCardProps {
  icon: string;
  label: string;
  value: string;
  subtitle?: string;
}

export function StatsCard({ icon, label, value, subtitle }: StatsCardProps) {
  const colors = useColors();
  const styles = getStyles(colors);

  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      minHeight: 120,
    },
    icon: {
      fontSize: 32,
      marginBottom: 8,
    },
    label: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 4,
    },
    value: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    subtitle: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });
