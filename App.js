import React, { useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './screens/SignInScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import TransactionDetailScreen from './screens/TransactionDetailScreen';

import { AppProvider } from './context/AppContext';
import { colors } from './constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Screen
              name="SignIn"
              options={{ headerShown: false }}
            >
              {(props) => (
                <SignInScreen {...props} onLogin={() => setIsLoggedIn(true)} />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="Dashboard"
                options={{
                  title: 'Dashboard',
                  headerRight: () => (
                    <Button
                      onPress={() => setIsLoggedIn(false)}
                      title="Logout"
                      color={colors.danger}
                    />
                  ),
                }}
              >
                {(props) => <DashboardScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen
                name="AddTransaction"
                component={AddTransactionScreen}
                options={{ title: 'Add Transaction' }}
              />
              <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetailScreen}
                options={{ title: 'Transaction Details' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
