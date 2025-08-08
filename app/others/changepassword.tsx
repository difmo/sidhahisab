import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import passwordService from '@/services/passwordService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function ChangePassword() {
  const [secure, setSecure] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Change Password",
      headerStyle: {
        backgroundColor: Colors.dark.primary,
      },
      headerTintColor: Colors.dark.white,
    });
  }, [navigation]);

  const toggleVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };


  const handleForgotPassword = () => {
    router.push({ pathname: '/others/forgotpasword' });
  };


  const handleUpdatePassword = async () => {
    if (currentPassword.length < 4) {
      setError('Current password must be at least 4 characters');
      return;
    }

    if (newPassword.length < 4) {
      setError('New password must be at least 4 characters');
      return;
    }

    if (confirmPassword !== newPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await passwordService.updatePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      const { token, refreshToken } = response.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      setLoading(false);
      router.replace('/(tabs)/home');  // Navigate to home after success
    } catch (err: any) {
      setLoading(false);
      console.error('Update password error:', err);
      const errorMessage =
        err?.response?.data?.message || 'Failed to update password. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <ScrollContainer>
      <View style={styles.container}>
        <RnText style={styles.heading}>Update Password</RnText>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Current Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={18} color="#999" />
          <TextInput
            placeholder="Current Password"
            secureTextEntry={!showPassword.current}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => toggleVisibility("current")}>
            <Icon name={showPassword.current ? "eye-off" : "eye"} size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* New Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={18} color="#999" />
          <TextInput
            placeholder="New Password"
            secureTextEntry={!showPassword.new}
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => toggleVisibility("new")}>
            <Icon name={showPassword.new ? "eye-off" : "eye"} size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Confirm New Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={18} color="#999" />
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry={!showPassword.confirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => toggleVisibility("confirm")}>
            <Icon name={showPassword.confirm ? "eye-off" : "eye"} size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow} >
          <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.updateButton, loading && { opacity: 0.6 }]}
            onPress={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Icon name="refresh-ccw" size={16} color="#fff" />
                <Text style={styles.updateText}>Update Password</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  forgotButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  forgotText: {
    color: "#333",
    fontWeight: "500",
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.primary || "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  updateText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "500",
  },
});
