import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppContext } from '../context/AppContext';
import { colors, spacing, fontSize } from '../constants/theme';

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useAppContext();

  const [form, setForm] = useState({
    date: new Date(),
    amount: '',
    description: '',
    location: '',
    type: 'Credit',
    category: 'Shopping',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = () => {
    if (
      !form.amount ||
      !form.description ||
      !form.location ||
      !form.type ||
      !form.category
    ) {
      Alert.alert('Please fill all fields');
      return;
    }

    addTransaction({
      ...form,
      date: form.date.toISOString(),
      amount: parseFloat(form.amount),
    });

    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setForm({ ...form, date: selectedDate });
    }
  };

  // ✅ Allow only digits in amount field
  const handleAmountChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setForm({ ...form, amount: numeric });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Transaction</Text>

      <Text style={styles.label}>Date</Text>
      <Button
        title={form.date.toLocaleDateString()}
        onPress={() => setShowDatePicker(true)}
        color={colors.primary}
      />
      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      <TextInput
        placeholder="Amount"
        value={form.amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={form.location}
        onChangeText={(text) => setForm({ ...form, location: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Transaction Type</Text>
      <Picker
        selectedValue={form.type}
        onValueChange={(value) => setForm({ ...form, type: value })}
        style={styles.picker}
      >
        <Picker.Item label="Credit" value="Credit" />
        <Picker.Item label="Debit" value="Debit" />
        <Picker.Item label="Refund" value="Refund" />
      </Picker>

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={form.category}
        onValueChange={(value) => setForm({ ...form, category: value })}
        style={styles.picker}
      >
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Travel" value="Travel" />
        <Picker.Item label="Utility" value="Utility" />
      </Picker>

      <Button title="Add Transaction" onPress={handleAdd} color={colors.primary} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.text,
  },
  label: {
    fontSize: fontSize.medium,
    fontWeight: '600',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    color: colors.text,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 6,
    fontSize: fontSize.medium,
  },
  picker: {
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
});
