import ScrollContainer from '@/components/RnScrollContainer';
import CustomInput from '@/components/ui/CustomInput';
import { Colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddCustomerFormScreen() {
  const navigation = useNavigation();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gst, setGst] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  // Checkboxes
  const [sameAsAddress, setSameAsAddress] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add New Customer',
      headerStyle: { backgroundColor: Colors.dark.primary },
      headerTintColor: Colors.dark.white,
    });
  }, [navigation]);

  // Save handler
  const handleSave = () => {
    const formData = {
      customerName,
      phone,
      address,
      email,
      gst,
      billingAddress,
      shippingAddress,
      sameAsAddress,
      sameAsBilling,
      isActive,
    };

    console.log('Form Data:', formData); // Print in console
    Alert.alert('Customer Saved', JSON.stringify(formData, null, 2)); // Show quick alert
    navigation.goBack(); // Navigate back
  };

  // Reset handler
  const handleReset = () => {
    setCustomerName('');
    setPhone('');
    setAddress('');
    setEmail('');
    setGst('');
    setBillingAddress('');
    setShippingAddress('');
    setSameAsAddress(false);
    setSameAsBilling(false);
    setIsActive(false);
  };

  return (
    <ScrollContainer>
      <View style={{ gap: 16, paddingBottom: 32, paddingHorizontal: 8, paddingTop: 16 }}>
        <Text style={styles.title}>Add New Customer</Text>

        <CustomInput placeholder="Customer Name" value={customerName} onChangeText={setCustomerName} iconName="account" />
        <CustomInput placeholder="Phone" value={phone} onChangeText={setPhone} iconName="phone" keyboardType="phone-pad" />
        <CustomInput placeholder="Address" value={address} onChangeText={setAddress} iconName="home" multiline />
        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} iconName="email" keyboardType="email-address" />
        <CustomInput placeholder="GST" value={gst} onChangeText={setGst} iconName="file-document" />

        <View style={styles.checkboxRow}>
          <Checkbox value={sameAsAddress} onValueChange={setSameAsAddress} style={{ marginRight: 8 }} />
          <Text>Same as Address</Text>
        </View>

        <CustomInput placeholder="Billing Address" value={billingAddress} onChangeText={setBillingAddress} multiline />
        
        <View style={styles.checkboxRow}>
          <Checkbox value={sameAsBilling} onValueChange={setSameAsBilling} style={{ marginRight: 8 }} />
          <Text>Same as Billing Address</Text>
        </View>

        <CustomInput placeholder="Shipping Address" value={shippingAddress} onChangeText={setShippingAddress} multiline />

        <TouchableOpacity style={styles.pdfButton}>
          <Text style={styles.pdfText}>📄 PDF</Text>
        </TouchableOpacity>

        <View style={styles.checkboxRow}>
          <Checkbox value={isActive} onValueChange={setIsActive} style={{ marginRight: 8 }} />
          <Text>Is Active</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pdfButton: { backgroundColor: Colors.light.primary, padding: 10, borderRadius: 6, alignSelf: 'flex-start', marginVertical: 10 },
  pdfText: { color: '#fff' },
  resetButton: { flex: 1, backgroundColor: '#ccc', padding: 12, borderRadius: 6, marginRight: 10, alignItems: 'center' },
  resetText: { color: '#333' },
  saveButton: { flex: 1, backgroundColor: Colors.light.primary, padding: 12, borderRadius: 6, alignItems: 'center' },
  saveText: { color: '#fff' },
});
