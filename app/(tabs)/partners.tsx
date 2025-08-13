import AppHeader from '@/components/AppHeader';
import ScrollContainer from '@/components/RnScrollContainer';
import RnText from '@/components/RnText';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const customersData = [
  {
    id: '1',
    name: 'Ravi Kumar',
    phone: '9876543210',
    email: 'ravi@example.com',
    gst: '29ABCDE1234F2Z5',
    credit: '₹5,000',
    debit: '₹2,000',
    address: 'Bangalore, India',
  },
  {
    id: '2',
    name: 'Anjali Mehta',
    phone: '9123456789',
    email: 'anjali@example.com',
    gst: '07AAAPL1234C1Z6',
    credit: '₹8,200',
    debit: '₹0',
    address: 'Delhi, India',
  },
];

export default function Partners() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);
  const [modalVisible, setModalVisible] = useState(false);

  const featureActions = [
    { title: 'Add New Customer', icon: 'add-shopping-cart' },
    { title: 'Excel Template', icon: 'file-download' },
    { title: 'Import Customers', icon: 'upload' },
  ];

  const handleSearch = () => {
    const keyword = search.toLowerCase();
    const filtered = customersData.filter((customer) =>
      customer.name.toLowerCase().includes(keyword)
    );
    setFilteredCustomers(filtered);
  };

  const renderHeader = () => (
    <View style={styles.rowHeader}>
      {[
        'Customer',
        'Phone',
        'Email',
        'GST',
        'Total Credit',
        'Total Debit',
        'Address',
      ].map((title, index) => (
        <RnText key={index} style={styles.headerCell}>
          {title}
        </RnText>
      ))}
    </View>
  );

  const renderItem = ({ item }: { item: typeof customersData[0] }) => (
    <View style={styles.row}>
      <RnText style={styles.cell}>{item.name}</RnText>
      <RnText style={styles.cell}>{item.phone}</RnText>
      <RnText style={styles.cell}>{item.email}</RnText>
      <RnText style={styles.cell}>{item.gst}</RnText>
      <RnText style={styles.cell}>{item.credit}</RnText>
      <RnText style={styles.cell}>{item.debit}</RnText>
      <RnText style={styles.cell}>{item.address}</RnText>
    </View>
  );

  return (
    <ScrollContainer>
      <AppHeader />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TextInput
          placeholder="Search by Customer Name"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <ActionButton title="Search" onPress={handleSearch} />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Modal for Floating Actions */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modalBackdrop}
        >
          <View style={styles.modalSheet}>
            {featureActions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.modalItem}
                onPress={() => {
                  setModalVisible(false);
                  if (action.title === 'Add New Customer') {
                    router.push('/partners/AddCustomerFormScreen');
                  }
                }}
              >
                <MaterialIcons
                  name={action.icon as any}
                  size={22}
                  color={Colors.light.primary}
                  style={{ marginRight: 10 }}
                />
                <RnText>{action.title}</RnText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Customer Table */}
      <ScrollView horizontal>
        <View>
          {renderHeader()}
          <FlatList
            data={filteredCustomers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={styles.emptyRow}>
                <RnText style={styles.emptyText}>No customers found</RnText>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </ScrollView>
    </ScrollContainer>
  );
}

// Action Button Component
function ActionButton({
  title,
  onPress,
  type = 'primary',
}: {
  title: string;
  onPress?: () => void;
  type?: 'primary' | 'success';
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, type === 'success' && styles.addBtn]}
      onPress={onPress}
    >
      <RnText style={styles.btnText}>{title}</RnText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 180,
    flexGrow: 1,
  },
  btn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  addBtn: {
    backgroundColor: '#28a745',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  headerCell: {
    width: 140,
    fontWeight: 'bold',
    fontSize: 13,
  },
  cell: {
    width: 140,
    fontSize: 13,
  },
  emptyRow: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.light.primary,
    padding: 18,
    borderRadius: 50,
    elevation: 5,
    zIndex: 10,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
