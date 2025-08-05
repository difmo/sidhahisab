import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window');
type RouteParams = { phone: string };

const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);

  const route = useRoute();
  const { phone } = route.params as RouteParams;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      Alert.alert('Success', `Logged in as ${phone}`);
      // router.push({ pathname: '/orders' });
    } else {
      Alert.alert('Invalid OTP', 'Please enter correct OTP');
    }
  };

  const handleResendOtp = () => {
    setCountdown(60); // restart the timer
    Alert.alert('OTP Resent', `OTP sent again to ${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.appName}>sidhahisab</Text>
            <Text style={styles.welcome}>Welcome</Text>

            <View style={styles.formContainer}>
              <Text style={styles.signInText}>Sign in</Text>

              {/* Phone input (disabled) */}
              <View style={styles.inputRow}>
                <Icon name="phone" size={20} color="#555" style={styles.inputIcon} />
                <TextInput style={styles.input} value={phone} editable={false} />
              </View>

              {/* OTP input */}
              <View style={styles.inputRow}>
                <Icon name="key" size={20} color="#555" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit OTP"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />
              </View>

              {countdown > 0 ? (
                <Text style={styles.resendText}>Resend in {countdown}s</Text>
              ) : (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </TouchableOpacity>
              )}


              <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
                <Text style={styles.verifyText}>Verify OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Back to Password Login</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/loginwithemail')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;


const styles = StyleSheet.create({
  resendLink: {
    color: '#b166ff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },

  container: {
    flex: 1,
    backgroundColor: '#f3eaff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  logo: {
    height: 70,
    width: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b166ff',
    textTransform: 'lowercase',
  },
  welcome: {
    fontSize: 18,
    color: '#888',
    marginTop: 6,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  signInText: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#eef0f5',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  resendText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
    textAlign: 'right',
  },
  verifyButton: {
    backgroundColor: '#b166ff',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 24,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: '#b166ff',
    marginBottom: 12,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  signupText: {
    color: '#444',
    fontSize: 14,
  },
  signupLink: {
    color: '#b166ff',
    fontWeight: '600',
    fontSize: 14,
  },
});
