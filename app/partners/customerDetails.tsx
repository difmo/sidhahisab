import ScrollContainer from '@/components/RnScrollContainer';
import RnText from '@/components/RnText';
import { Colors } from '@/constants/Colors';
import inventoryService from '@/services/inventoryService';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function CustomerDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // 👈 get id from route
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Customer Details',
      headerStyle: { backgroundColor: Colors.dark.primary },
      headerTintColor: Colors.dark.white,
    });
  }, [navigation]);
  // 🔹 Fetch Customer by ID
  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getCustomerById(id as string);
      setCustomer(response.data); // assuming API returns customer object
    } catch (error) {
      console.error('Error fetching customer:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCustomer();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.center}>
        <RnText>No customer found</RnText>
      </View>
    );
  }

  // 🔹 Render each field
  const renderField = (label: string, value: any) => (
    <View style={styles.fieldRow} key={label}>
      <RnText style={styles.label}>{label}</RnText>
      <RnText style={styles.value}>{value || '—'}</RnText>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>

      <ScrollContainer>
        <ScrollView style={styles.container}>
          {renderField('Name', customer.name)}
          {renderField('Email', customer.email)}
          {renderField('Phone', customer.phone)}
          {renderField('Address', customer.address)}
          {renderField('Billing Address', customer.billingAddress)}
          {renderField('Shipping Address', customer.shippingAddress)}
          {renderField('GST No', customer.gstNo)}
          {renderField('Customer Type', customer.customerType)}
          {renderField('Image URL', customer.imageURL)}
          {renderField('Created Date', customer.createdDate)}
          {renderField('Updated Date', customer.updatedDate)}
          {renderField('Is Active', customer.isActive ? 'Yes' : 'No')}
          {renderField('Is Deleted', customer.isDeleted ? 'Yes' : 'No')}
          {renderField('Street Address', customer.streetAddress)}
          {renderField('City', customer.city)}
          {renderField('State', customer.state)}
          {renderField('Country', customer.country)}
          {renderField('Pincode', customer.pinCode)}
          {renderField('Nearby', customer.nearby)}
          {renderField('Street No', customer.streetNo)}
          {renderField('Account Holder Name', customer.accountHolderName)}
          {renderField('Account Number', customer.accountNumber)}
          {renderField('IFSC Code', customer.ifSCCode)}
          {renderField('Bank Name', customer.bankName)}
          {renderField('Branch Name', customer.branchName)}
        </ScrollView>
      </ScrollContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  fieldRow: {
    marginBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
});
