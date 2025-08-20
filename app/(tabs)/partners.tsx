import AppHeader from '@/components/AppHeader';
import ScrollContainer from '@/components/RnScrollContainer';
import RnText from '@/components/RnText';
import { Colors } from '@/constants/Colors';
import inventoryService from '@/services/inventoryService';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function Partners() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const featureActions = [
    { title: 'Add New Customer', icon: 'add-shopping-cart' },
    { title: 'Excel Template', icon: 'file-download' },
    { title: 'Import Customers', icon: 'upload' },
  ];

  // 🔹 Fetch Customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getCustomers();
      const data = await response.data;
      console.log(data);
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = () => {
    const keyword = search.toLowerCase();
    const filtered = customers.filter((customer) =>
      customer.name?.toLowerCase().includes(keyword)
    );
    setFilteredCustomers(filtered);
  };


  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push({ pathname: '/partners/customerDetails', params: { id: item.customerId } })}
    >
      {/* Profile Avatar */}
      <View style={styles.avatar}>
        <RnText style={styles.avatarText}>
          {item.name?.charAt(0)?.toUpperCase()}
        </RnText>
      </View>

      {/* Info */}
      <View style={{ flex: 1, alignItems: 'flex-start', gap: 4, marginLeft: 8 }}>
        <RnText style={styles.customerName} numberOfLines={1}>
          {item.name}
        </RnText>
        <RnText style={styles.customerDetail} numberOfLines={1}>
          {item.phone || "—"}
        </RnText>
        <RnText style={styles.customerDetail} numberOfLines={1}>
          {item.email || "—"}
        </RnText>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/partners/AddCustomerFormScreen', params: { id: item.customerId } })}
          style={styles.actionBtn}
        >
          <MaterialIcons name="edit" size={20} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.customerId)}
          style={[styles.actionBtn, { marginLeft: 8 }]}
        >
          <MaterialIcons name="delete" size={20} color="#d9534f" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  const handleDelete = async (customerId: string) => {
    Alert.alert(
      "Delete Customer",
      "Are you sure you want to delete this customer?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
               setLoading(true);
              await inventoryService.deleteCustomer(customerId);
              Alert.alert("Success", "Customer deleted successfully!");
               setLoading(false);
              setCustomers((prev) => prev.filter(c => c.customerId !== customerId));
              setFilteredCustomers((prev) => prev.filter(c => c.customerId !== customerId));
            } catch (error) {
              console.error("Error deleting customer:", error);
              Alert.alert("Error", "Failed to delete customer.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background, }}>
      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={{ paddingHorizontal: 16 }}>
        <AppHeader />
      </View>
      {/* Top Bar */}
      <View style={[styles.topBar, { paddingHorizontal: 16 }]}>
        <TextInput
          placeholder="Search by Customer Name"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <ActionButton title="Search" onPress={handleSearch} />
      </View>

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
      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.primary} />
      ) : (
        <View style={{ flex: 1, }}>
          <ScrollContainer>
            <FlatList
              data={filteredCustomers}
              keyExtractor={(item) => item.customerId?.toString()}
              renderItem={renderItem}
              ListEmptyComponent={
                <View style={styles.emptyRow}>
                  <RnText style={styles.emptyText}>No customers found</RnText>
                </View>
              }
              contentContainerStyle={{ paddingBottom: 80 }}
            />

          </ScrollContainer>
        </View>
      )}

    </View>
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
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 40,
    paddingRight: 12,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginBottom: 16,
    width: 350,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  customerDetail: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    color: '#999',
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },


});
