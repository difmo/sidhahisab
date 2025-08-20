import AppHeader from '@/components/AppHeader';
import RnText from '@/components/RnText';
import { Colors } from '@/constants/Colors';
import inventoryService from '@/services/inventoryService';
import { hp, wp } from '@/utils/Dimensions';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function Products() {
  const router = useRouter();
  const featureActions = [
    { title: 'Add New Product', icon: 'add-shopping-cart' },
    { title: 'Download bar code', icon: 'receipt' },
    { title: 'Import Products', icon: 'upload' },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getProducts();
      const data = await response.data;
      console.log('Fetched products:', data);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 Search filter
const handleSearch = (text: string) => {
  const keyword = text.toLowerCase();
  const filtered = products.filter((product) =>
    product.name?.toLowerCase().includes(keyword)
  );
  setFilteredProducts(filtered);
};


  // Reusable Button
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

  // FlatList Item
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        {/* Top Row */}
        <View style={styles.topRow}>
          {/* Checkbox + Image */}
          <View style={styles.leftRow}>
            {/* <MaterialIcons
              name="check-box-outline-blank"
              size={22}
              color="#888"
            /> */}
            <Image
              source={{
                uri:
                  item.imageUrl ||
                  "https://www.sidhahisab.com/assets/images/productdummy.png",
              }}
              style={styles.image}
            />
          </View>

          {/* Name + Description */}
          <View style={styles.midRow}>
            <RnText style={styles.productName}>{item.name}</RnText>
            {item.description ? (
              <RnText style={styles.productDesc}>{item.description}</RnText>
            ) : null}
          </View>
          {/* Action buttons (edit/delete) */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/products/AddProductFormScreen', params: { id: item.productId } })}
              style={styles.iconButton}
            >
              <MaterialIcons name="edit" size={20} color={Colors.light.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Delete Product",
                  `Are you sure you want to delete "${item.name}"?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: async () => {
                        try {
                          await inventoryService.deleteProduct(item.productId);
                          setProducts((prev) => prev.filter((p) => p.productId !== item.productId));
                          setFilteredProducts((prev) => prev.filter((p) => p.productId !== item.productId));
                          Alert.alert("Deleted", "Product removed successfully!");
                        } catch (error) {
                          console.error("Error deleting product:", error);
                          Alert.alert("Error", "Could not delete product");
                        }
                      },
                    },
                  ]
                )
              }
              style={styles.iconButton}
            >
              <MaterialIcons name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <View style={styles.infoItem}>
            {/* <MaterialIcons name="attach-money" size={16} color="#444" /> */}
            <RnText style={styles.infoText}>₹ {item.price}</RnText>
          </View>

          <View style={styles.infoItem}>
            {/* <MaterialIcons name="confirmation-number" size={16} color="#444" /> */}
            <RnText style={styles.infoText}>{item.sku || "—"}</RnText>
          </View>

          <View style={styles.infoItem}>
            {/* <MaterialIcons name="inventory" size={16} color="#444" /> */}
            <RnText style={styles.infoText}>Qty: {item.quantity ?? 0}</RnText>
          </View>

          <View style={[styles.infoItem, { width: 20 }]}>
            {/* <MaterialIcons name="qr-code" size={16} color="#444" />
            <RnText style={styles.infoText}>HSN: {item.hsnCode || "—"}</RnText> */}
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Header */}
      <View style={{ paddingHorizontal: 16 }}>
        <AppHeader />
      </View>

      {/* Search Bar */}
<View style={[styles.topBar, { paddingHorizontal: 16 }]}>
  <TextInput
    placeholder="Search by Product Name"
    style={styles.searchInput}
    value={search}
    onChangeText={(text) => {
      setSearch(text);
      handleSearch(text); // pass the text for filtering
    }}
  />
</View>


      {/* Modal */}
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
                  if (action.title === 'Add New Product') {
                    router.push('/products/AddProductFormScreen');
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

      {/* Product List */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.primary} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.productId?.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyRow}>
              <RnText style={styles.emptyText}>No products found</RnText>
            </View>
          }
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#f9f9f9',
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    width: 48,
    height: 48,
    
    borderRadius: 6,
    resizeMode: "contain",
  },
  midRow: {
    flex: 1,
  },
  productName: {
    color: Colors.light.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
  productDesc: {
    fontSize: 13,
    color: "#777",
  },
  menuButton: {
    padding: 6,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "700",
  },
  listContainer: {
    padding: wp(3),
    paddingBottom: hp(5),
  },

  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },

  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: hp(1),
    resizeMode: 'cover',
  },



  productPrice: {
    color: 'green',
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
  },



  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    zIndex: 10,
  },

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
    paddingLeft: 12,
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

  emptyRow: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
