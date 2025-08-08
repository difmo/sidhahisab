import passwordService from '@/services/passwordService';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const validateUserName = (email: string) => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!isValid) {
      setError('Enter a valid email address');
      return false;
    }
    return true;
  };
  const handleResetPassword = async () => {
    if (!validateUserName(email)) return;

    if (email.length < 4) {
      setError('Email must be at least 4 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await passwordService.forgotPassword({
        email,
      });
      console.log('Forgot password response:', response.data);
      setLoading(false);
      setSuccessMessage(response.data || 'Reset link sent to your email.');
      // router.push('/auth/loginwithemail');
    } catch (err: any) {
      setLoading(false);
      // router.dismissAll();
      setLoading(false);
      // console.error('Forgot password error:', err);
      const errorMessage =
        err?.response?.data?.message || 'Reset password failed. Check your email.';
      setError(errorMessage);
    }
  };


  const goBackToLogin = () => {
    router.push('/auth/loginwithemail');
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>sidhahisab</Text>
        <Text style={styles.subtitle}>Reset Password</Text>

        <Text style={styles.sectionTitle}>Forgot Password</Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Enter Your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          maxLength={100}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}



        <TouchableOpacity style={styles.otpButton} onPress={handleResetPassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}> Send Reset Link</Text>
          )}
        </TouchableOpacity>


        <TouchableOpacity onPress={goBackToLogin}>
          <Text style={styles.backLink}>Back to Password Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/loginwithemail')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#a64cf2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#a64cf2',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#ccc',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#ff4d4f',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 13,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  successText: {
    color: '#4caf50',
    fontSize: 13,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  otpButton: {
    backgroundColor: '#a64cf2',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cba6f7',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  backLink: {
    color: '#a64cf2',
    marginTop: 18,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: '#a64cf2',
    fontWeight: '600',
  },
});


export default ForgotPassword;
