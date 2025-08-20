import ScrollContainer from '@/components/RnScrollContainer';
import CustomInput from '@/components/ui/CustomInput';
import { Colors } from '@/constants/Colors';
import inventoryService from '@/services/inventoryService';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function AddCustomerFormScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams(); // 👈 get id from route
  const [customer, setCustomer] = useState<any | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gst, setGst] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [sameAsAddress, setSameAsAddress] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Loader state
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Customer by ID
  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getCustomerById(id as string);
      const data = response.data;
      console.log('Fetched customer:', data);
      setCustomer(data);

      // 🟢 Fill form with existing customer data
      setCustomerName(data?.name || '');
      setPhone(data?.phone || '');
      setAddress(data?.address || '');
      setEmail(data?.email || '');
      setGst(data?.gst || '');
      setBillingAddress(data?.billingAddress || '');
      setShippingAddress(data?.shippingAddress || '');
      setIsActive(data?.isActive || false);
    } catch (error) {
      console.error('Error fetching customer:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCustomer();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? 'Edit Customer' : 'Add New Customer',
      headerStyle: { backgroundColor: Colors.dark.primary },
      headerTintColor: Colors.dark.white,
    });
  }, [navigation, id]);

  // ✅ Save handler
  const handleSave = async () => {
    try {
      setLoading(true);

      const formData: any = new FormData();
      formData.append("Name", customerName);
      formData.append("Phone", phone);
      formData.append("Address", address);
      formData.append("Email", email);
      formData.append("GST", gst);
      formData.append("BillingAddress", billingAddress);
      formData.append("ShippingAddress", shippingAddress);
      formData.append("IsActive", isActive ? "true" : "false");
      formData.append("CustomerType", "gt");
      formData.append("ImageURL", "dummy.png");
      formData.append("UploadDocument", "doc.pdf");
      formData.append("DomainName", "example.com");

      if (id) {
        // 🟢 Update existing customer
        await inventoryService.updateCustomer(id as string, formData);
        Alert.alert("Success", "Customer updated successfully!");
      } else {
        // 🟢 Create new customer
        await inventoryService.createCustomer(formData);
        Alert.alert("Success", "Customer created successfully!");
      }

      navigation.goBack();
    } catch (error: any) {
      console.error("Error saving customer:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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



        <View style={styles.checkboxRow}>
          <Checkbox value={isActive} onValueChange={setIsActive} style={{ marginRight: 8 }} />
          <Text>Is Active</Text>
        </View>

        {/* Loader OR Save/Reset buttons */}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.light.primary} style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.row}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>{id != null ? "Update" : "Save"} </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pdfButton: { backgroundColor: Colors.light.primary, padding: 10, borderRadius: 6, alignSelf: 'flex-start', marginVertical: 10 },
  pdfText: { color: '#fff' },
  resetButton: { flex: 1, backgroundColor: '#ccc', padding: 12, borderRadius: 6, marginRight: 10, alignItems: 'center' },
  resetText: { color: '#333' },
  saveButton: { flex: 1, backgroundColor: Colors.light.primary, padding: 12, borderRadius: 6, alignItems: 'center' },
  saveText: { color: '#fff' },
});
