import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [checkingLogin, setCheckingLogin] = useState(true);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // if (token) {
        //   console.log(`Token exists, redirecting to home ${token}`);
        //   // Navigate and stop further rendering of RootLayout's auth stack
        //   router.push('/(tabs)/home');
        //   return; // Prevent continuing into the <Stack> rendering
        // }
        if (token) {
          return <Redirect href="/(tabs)/home" />;
        } else {
          return <Redirect href="/auth/loginwithemail" />;
        }
      } catch (e) {
        console.error("Failed to check login status", e);
      } finally {
        setCheckingLogin(false);
      }
    };
    checkLoginStatus();
  }, []);

  // While checking or fonts are loading, show spinner
  if (!fontsLoaded || checkingLogin) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render only if user is NOT redirected
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="others" options={{ headerShown: false }} />
        <Stack.Screen name="partners" options={{ headerShown: false }} />
        <Stack.Screen name="AddCustomerFormScreen" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
