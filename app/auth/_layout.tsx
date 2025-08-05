import { Stack } from 'expo-router';
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loginwithemail" options={{ title: 'Login' }} />
      <Stack.Screen name="loginwithphone" options={{ title: 'SignUp' }} />
      <Stack.Screen name="otp" options={{ title: 'OTP Verification' }} />
    </Stack>
  );
}
