import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';

export default function SignInScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      Alert.alert('Invalid credentials', 'Please enter username and password as "admin"');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Sign In" onPress={handleLogin} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    marginBottom: spacing.xl,
    textAlign: 'center',
    color: colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 6,
    fontSize: fontSize.medium,
  },
});
