import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

export default function TransactionDetailScreen({ route }) {
  const { transaction } = route.params;
  const { deleteTransaction } = useAppContext();
  const navigation = useNavigation();

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTransaction(transaction.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1') // camelCase to spaced words
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transaction Details</Text>

      {Object.entries(transaction).map(([key, value]) => {
        if (value === null || value === undefined || value === '') return null;

        const isAmount = key.toLowerCase().includes('amount');
        const isDate = key.toLowerCase().includes('date');

        return (
          <Text
            key={key}
            style={[
              styles.detail,
              isAmount && { color: colors.success, fontWeight: 'bold' }
            ]}
          >
            {formatLabel(key)}: {isDate ? new Date(value).toLocaleDateString() : value}
          </Text>
        );
      })}

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    flex: 1,
  },
  heading: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  detail: {
    fontSize: fontSize.medium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  deleteButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.danger,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
});
