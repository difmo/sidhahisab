import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtpScreen from '../screens/auth/OTPScreen';
import OrderListScreen from '../screens/orders/OrderListScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import OrderFormScreen from '../screens/orders/OrderFormScreen';
import LoginWithPhoneScreen from '../screens/auth/LoginWithPhoneScreen';
import LoginWithEmailPasswordScreen from '../screens/auth/LoginWithEmailPasswordScreen';
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="LoginWithEmailPassword" component={LoginWithEmailPasswordScreen}
      options={{ headerShown: false }} />
      <Stack.Screen name="LoginWithPhone" component={LoginWithPhoneScreen}
      options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={OtpScreen}options={{ headerShown: false }} />
      <Stack.Screen name="Orders" component={OrderListScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="OrderDetails" component={OrderDetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="OrderForm" component={OrderFormScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
