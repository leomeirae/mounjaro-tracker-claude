import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useColors } from '@/constants/colors';
import { TimelineEvent } from '@/lib/types';

interface TimelineProps {
  events: TimelineEvent[];
  maxVisible?: number;
  onEditApplication?: (eventId: string) => void;
  onDeleteApplication?: (eventId: string) => void;
  onEditWeight?: (eventId: string) => void;
  onDeleteWeight?: (eventId: string) => void;
}

export function Timeline({
  events,
  maxVisible,
  onEditApplication,
  onDeleteApplication,
  onEditWeight,
  onDeleteWeight,
}: TimelineProps) {
  const colors = useColors();

  const handleDelete = (event: TimelineEvent) => {
    const message = event.type === 'application' 
      ? `Tem certeza que deseja excluir esta aplicação?`
      : `Tem certeza que deseja excluir este registro de peso?`;
    
    Alert.alert(
      'Confirmar Exclusão',
      message,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            if (event.type === 'application') {
              onDeleteApplication?.(event.id);
            } else {
              onDeleteWeight?.(event.id);
            }
          }
        }
      ]
    );
  };

  if (events.length === 0) {
    const styles = getStyles(colors);

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📅 Nenhum evento registrado ainda</Text>
        <Text style={styles.emptySubtext}>
          Comece registrando sua primeira aplicação ou peso!
        </Text>
      </View>
    );
  }

  const displayEvents = maxVisible ? events.slice(0, maxVisible) : events;

  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Linha do Tempo</Text>
      
      <View style={styles.timelineContainer}>
        {displayEvents.map((event, index) => (
          <View key={event.id} style={styles.eventWrapper}>
            {/* Linha conectora */}
            {index < displayEvents.length - 1 && (
              <View style={styles.connector} />
            )}

            {/* Evento */}
            <View style={styles.eventCard}>
              {/* Ícone e data */}
              <View style={styles.eventHeader}>
                <View style={[
                  styles.iconCircle,
                  event.type === 'application' ? styles.iconApplication : styles.iconWeight
                ]}>
                  <Text style={styles.iconText}>
                    {event.type === 'application' ? '💉' : '⚖️'}
                  </Text>
                </View>
                
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  {event.time && (
                    <Text style={styles.timeText}>
                      {event.time.substring(0, 5)}
                    </Text>
                  )}
                </View>
              </View>

              {/* Conteúdo */}
              {event.type === 'application' && (
                <View style={styles.eventContent}>
                  <View style={styles.contentHeader}>
                    <View style={styles.contentInfo}>
                      <Text style={styles.eventTitle}>
                        Aplicação: {event.medicationName}
                      </Text>
                      <Text style={styles.eventDetail}>
                        Dosagem: {event.dosage}mg
                      </Text>
                      {event.applicationNotes && (
                        <Text style={styles.eventNotes}>
                          "{event.applicationNotes}"
                        </Text>
                      )}
                    </View>
                    <View style={styles.actions}>
                      <TouchableOpacity 
                        onPress={() => onEditApplication?.(event.id)}
                        style={styles.actionButton}
                      >
                        <Text style={styles.actionIcon}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleDelete(event)}
                        style={[styles.actionButton, styles.actionButtonSecond]}
                      >
                        <Text style={styles.actionIcon}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {event.type === 'weight' && (
                <View style={styles.eventContent}>
                  <View style={styles.contentHeader}>
                    <View style={styles.contentInfo}>
                      <Text style={styles.eventTitle}>
                        Peso: {event.weight}kg
                      </Text>
                      {event.weightDiff && (
                        <Text style={[
                          styles.weightDiff,
                          event.weightDiff > 0 ? styles.weightUp : styles.weightDown
                        ]}>
                          {event.weightDiff > 0 ? '↑' : '↓'} {Math.abs(event.weightDiff).toFixed(1)}kg
                        </Text>
                      )}
                      {event.weightNotes && (
                        <Text style={styles.eventNotes}>
                          "{event.weightNotes}"
                        </Text>
                      )}
                    </View>
                    <View style={styles.actions}>
                      <TouchableOpacity 
                        onPress={() => onEditWeight?.(event.id)}
                        style={styles.actionButton}
                      >
                        <Text style={styles.actionIcon}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleDelete(event)}
                        style={[styles.actionButton, styles.actionButtonSecond]}
                      >
                        <Text style={styles.actionIcon}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  emptyContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  timelineContainer: {
    paddingLeft: 8,
  },
  eventWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  connector: {
    position: 'absolute',
    left: 19,
    top: 40,
    width: 2,
    height: '100%',
    backgroundColor: colors.border,
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginLeft: 48,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -64,
    marginRight: 16,
    borderWidth: 3,
    borderColor: colors.background,
  },
  iconApplication: {
    backgroundColor: colors.primary,
  },
  iconWeight: {
    backgroundColor: colors.success,
  },
  iconText: {
    fontSize: 20,
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  timeText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  eventContent: {
    // gap: 4, // Not supported in React Native StyleSheet
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  contentInfo: {
    flex: 1,
    // gap: 4, // Not supported in React Native StyleSheet
  },
  actions: {
    flexDirection: 'row',
    // gap: 4, // Not supported in React Native StyleSheet
    alignSelf: 'flex-start',
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  actionButtonSecond: {
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  eventDetail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  eventNotes: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: 4,
  },
  weightDiff: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  weightUp: {
    color: colors.error,
  },
  weightDown: {
    color: colors.success,
  },
});
