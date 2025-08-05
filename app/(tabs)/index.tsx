import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';


import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type RootStackParamList = {
  Otp: { phone: string };
  SignUp: undefined;
  Orders: undefined;
    LoginWithPhone: { phone: string }; 
};

const  HomeScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

  const handleSignIn = () => {
    if (!validatePhone(phone) || password.length < 4) {
      setError('Enter valid phone and password');
      return;
    }
    setError('');
    navigation.navigate('Orders');
  };

  const handleOtpLogin = () => {
   
    navigation.navigate('LoginWithPhone', { phone });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>sidhahisab</Text>
        <Text style={styles.subtitle}>Welcome</Text>

        <Text style={styles.sectionTitle}>Sign in</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={18} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="9519202509"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
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

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cfd8dc',
    borderRadius: 8,
    marginVertical: 6,
    paddingHorizontal: 12,
    width: '100%',
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
    color: '#555',
    fontWeight: 'bold',
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: '#a64cf2',
    marginTop: 8,
    fontSize: 13,
  },
  signInButton: {
    backgroundColor: '#a64cf2',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
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

export default  HomeScreen;
