import AppHeader from "@/components/AppHeader";
import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { hp } from "@/utils/Dimensions";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const dummyOrders = [
  {
    id: "1",
    customerName: "Ravi Kumar",
    orderId: "ORD12345",
    date: "2025-08-06",
    status: "Pending",
  },
  {
    id: "2",
    customerName: "Anjali Mehta",
    orderId: "ORD12346",
    date: "2025-08-05",
    status: "Completed",
  },
  {
    id: "3",
    customerName: "Rahul Sharma",
    orderId: "ORD12347",
    date: "2025-08-03",
    status: "Cancelled",
  },
];

const featureActions = [
  { title: "Create New Order", icon: "add-shopping-cart" },
  { title: "New Purchase Order", icon: "receipt" },
  { title: "Add Product", icon: "add-box" },
];

export default function Orders() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(dummyOrders);

  const handleSearch = () => {
    const keyword = search.toLowerCase();
    const results = dummyOrders.filter((order) =>
      order.customerName.toLowerCase().includes(keyword)
    );
    setFilteredOrders(results);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <MaterialIcons name="schedule" size={18} color="#f0ad4e" />;
      case "Completed":
        return <MaterialIcons name="check-circle" size={18} color="#28a745" />;
      case "Cancelled":
        return <MaterialIcons name="cancel" size={18} color="#dc3545" />;
      default:
        return null;
    }
  };


  const renderOrder = ({ item }: { item: typeof dummyOrders[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <RnText style={styles.orderTitle}>{item.customerName}</RnText>
        {getStatusIcon(item.status)}
      </View>
      <RnText style={styles.orderDetail}>
        <MaterialIcons name="receipt-long" size={14} /> Order ID: {item.orderId}
      </RnText>
      <RnText style={styles.orderDetail}>
        <MaterialIcons name="event" size={14} /> Date: {item.date}
      </RnText>
      <RnText style={styles.orderDetail}>
        <MaterialIcons name="info-outline" size={14} /> Status: {item.status}
      </RnText>
    </View>
  );

  return (
      <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setModalVisible(true)}
          >
            <Entypo name="plus" size={24} color="#fff" />
          </TouchableOpacity>
    
    <ScrollContainer>
      <AppHeader />

      {/* Search Controls */}
      <View style={styles.controls}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search by Customer Name..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
            <MaterialIcons name="search" size={18} color="#fff" />
            <RnText style={styles.btnText}>Search</RnText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{
          paddingBottom: hp(10),
          paddingTop: 10,
        }}
        ListEmptyComponent={
          <View style={styles.noDataContainer}>
            <RnText style={styles.noDataText}>No orders found</RnText>
          </View>
        }
      />
      {/* Bottom Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modalBackdrop}
        >
          <View style={styles.modalSheet}>
            {featureActions.map((action, idx) => (
              <TouchableOpacity key={idx} style={styles.modalItem}
                onPress={() => {
                  setModalVisible(false);
                  if (action.title === "Create New Order") {
                    router.push("/orders/CreateOrderFormScreen"); // route name we'll define
                  } else if (action.title === "New Purchase Order") {
                    router.push("/orders/NewPurchageOrderFormScreen"); // route name we'll define
                  }

                  else if (action.title === 'Add Product') {
                    router.push('/products/AddProductFormScreen');   // Adjust the route as needed
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
    </ScrollContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  controls: {
    padding: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    gap: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 12,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  orderDetail: {
    fontSize: 13,
    marginTop: 3,
    color: "#444",
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  noDataText: {
    fontSize: 14,
    color: "#999",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,      
    right: 20,        
    backgroundColor: Colors.light.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    zIndex: 10,        // make sure it stays above charts
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});
