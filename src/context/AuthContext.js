import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './contexts/AuthContext';

import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import Spinner from './components/Spinner';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const Navigation = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <Spinner />; // Affiche un loader pendant la vérification
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
