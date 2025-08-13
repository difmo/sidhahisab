import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CustomInputProps {
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  multiline?: boolean;
  style?: object;
}

export default function CustomInput({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  style,
}: CustomInputProps) {
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.inputContainer, multiline && styles.multilineContainer, style]}>
      {iconName && (
        <MaterialCommunityIcons name={iconName} size={18} color="#555" style={styles.icon} />
      )}

      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />

      {secureTextEntry && (
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Text style={styles.showText}>{secure ? 'SHOW' : 'HIDE'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  multilineContainer: {
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  textArea: {
    height: 80,
  },
  showText: {
    color: '#007BFF',
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
});
