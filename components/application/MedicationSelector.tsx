import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useShotsyColors } from '@/hooks/useShotsyColors';
import * as Haptics from 'expo-haptics';

export interface Medication {
  id: string;
  name: string;
}

interface MedicationSelectorProps {
  visible: boolean;
  medications: Medication[];
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function MedicationSelector({
  visible,
  medications,
  selectedId,
  onSelect,
  onClose,
}: MedicationSelectorProps) {
  const colors = useShotsyColors();

  const handleSelect = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(id);
    onClose();
  };

  const renderItem = ({ item }: { item: Medication }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={[
          styles.optionCard,
          {
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={() => handleSelect(item.id)}
      >
        <View style={styles.optionContent}>
          <Text
            style={[
              styles.optionText,
              {
                color: isSelected ? colors.primary : colors.text,
                fontWeight: isSelected ? '600' : '400',
              },
            ]}
          >
            {item.name}
          </Text>
          {isSelected && (
            <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Selecionar Medicação
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, { color: colors.textSecondary }]}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={medications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  optionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
