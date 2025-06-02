import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import AppNav from "./src/Navigation/AppNav";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./src/context/AuthContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Chargez ici vos ressources (polices, données, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <AppNav />
        </View>
      </AuthProvider>
    </QueryClientProvider>
  );
}
