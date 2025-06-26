import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../constants/theme';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { transactions, logout } = useAppContext();

  const handleLogout = () => {
    logout();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('TransactionDetail', { transaction: item })
      }
    >
      <Ionicons
        name={item.type === 'Income' ? 'cash-outline' : 'card-outline'}
        size={28}
        color={item.type === 'Income' ? colors.success : colors.warning}
        style={styles.icon}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title || item.category}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text style={[styles.amount, { color: colors.success }]}>
  ${item.amount}
</Text>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logout */}
      <View style={styles.header}>
        <Text style={styles.heading}>Transaction Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
         
        </TouchableOpacity>
      </View>

      {/* List of transactions */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Ionicons name="add-circle" size={64} color={colors.primary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 10,
    elevation: 2,
  },
  icon: {
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
  },
  date: {
    fontSize: fontSize.small,
    color: colors.gray,
  },
  amount: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.success,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: colors.background,
    borderRadius: 32,
    padding: 4,
    elevation: 6,
  },
});
