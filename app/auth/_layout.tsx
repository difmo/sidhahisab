import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
export default function AuthLayout() {
    const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.replace('/(tabs)/home');
      }
    };
    check();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loginwithemail" options={{ title: 'Login' }} />
      <Stack.Screen name="loginwithphone" options={{ title: 'SignUp' }} />
      <Stack.Screen name="otp" options={{ title: 'OTP Verification' }} />
    </Stack>
  );
}
