import authService from '@/services/authService';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginWithEmail = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validateUserName = (userName: string) => {
    if (!userName) {
      setError('Email is required');
      return false;
    }
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userName);
    if (!isValid) {
      setError('Enter a valid email address');
      return false;
    }
    return true;
  };
  const handleSignIn = async () => {
    if (!validateUserName(userName)) return;

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authService.login({
        username: userName,
        passwordHash: password,
      });
      console.log('Login response:', response.data);
      const { token, refreshToken } = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      setLoading(false);
      router.dismissAll();
      console.log('Navigating to /home');
      router.replace('/(tabs)/home');
    } catch (err: any) {
      setLoading(false);
      console.error('Login error:', err);

      const errorMessage =
        err?.response?.data?.message || 'Login failed. Check your credentials.';
      setError(errorMessage);
    }
  };


  const handleOtpLogin = () => {
    router.push({
      pathname: '/auth/loginwithphone',
      params: { userName },
    });
  };

  const handleSignUp = () => {
    router.push('/auth/loginwithemail'); //Change to your actual sign-up path
  };
  
  const handleForgotPassword = () => {
    router.push({ pathname: '/auth/forgotpasword' }); //Change to your actual forgot password path
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>sidhahisab</Text>
          <Text style={styles.subtitle}>Welcome</Text>

          <Text style={styles.sectionTitle}>Sign in</Text>

          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={18} color="#555" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder=" Username"
              keyboardType="default"
              // maxLength={10}
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={18} color="#555" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Text style={styles.showText}>{secure ? 'SHOW' : 'HIDE'}</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            onPress={handleForgotPassword}
            style={{ alignSelf: 'flex-end' }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>




          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.otpButton} onPress={handleOtpLogin}>
            <Text style={styles.buttonText}>Login with OTP</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginWithEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a64cf2',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#a64cf2',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#777',
    marginBottom: 20,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: '#999',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 12,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  showText: {
    color: '#a64cf2',
    fontWeight: 'bold',
    fontSize: 12,
  },
  forgotText: {
    alignSelf: 'flex-start',
    color: '#a64cf2',
    marginTop: 4,
    fontSize: 13,
    textDecorationLine: 'underline',
    marginBottom: 16,
    fontWeight: '700',
  },
  signInButton: {
    backgroundColor: '#a64cf2',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  otpButton: {
    backgroundColor: '#a64cf2',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  orText: {
    marginHorizontal: 8,
    color: '#aaa',
    fontWeight: '600',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  footerText: {
    color: '#333',
  },
  signUpText: {
    color: '#a64cf2',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});
