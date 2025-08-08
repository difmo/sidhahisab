import AppHeader from '@/components/AppHeader';
import ScrollContainer from '@/components/RnScrollContainer';
import RnText from '@/components/RnText';
import { Colors } from '@/constants/Colors';
import { hp, wp } from '@/utils/Dimensions';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

const products = [
  {
    id: '1',
    image: 'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    hsn: '8528',
    name: 'Smart TV',
    price: '₹25,000',
    quantity: '15 - pcs',
    reorder: '5',
    category: 'Electronics',
    description: '42-inch smart LED TV',
  },
  {
    id: '2',
    image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg',
    hsn: '8471',
    name: 'Laptop',
    price: '₹55,000',
    quantity: '10 - pcs',
    reorder: '3',
    category: 'Computers',
    description: 'i5, 8GB RAM, 512GB SSD',
  },
  {
    id: '3',
    image: 'data:image/jpeg;base64,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',
    hsn: '8471',
    name: 'Headphones',
    price: '₹2,000',
    quantity: '25 - pcs',
    reorder: '10',
    category: 'Audio',
    description: 'Noise-cancelling over-ear headphones',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    hsn: '8471',
    name: 'Keyboard',
    price: '₹800',
    quantity: '30 - pcs',
    reorder: '8',
    category: 'Computers',
    description: 'Wireless keyboard with backlight',
  },
];

export default function Products() {
  const featureActions = [
  { title: 'Add New Product', icon: 'add-shopping-cart' },
  { title: 'Download bar code', icon: 'receipt' },
  { title: 'Import Products', icon: 'upload' },
];
    const [modalVisible, setModalVisible] = useState(false);
  const renderItem = ({ item }: { item: typeof products[0] }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <RnText style={styles.productName}>{item.name}</RnText>
      <RnText style={styles.productPrice}>{item.price}</RnText>
      <RnText style={styles.productDesc}>{item.description}</RnText>
    </View>
  );

  return (
    <ScrollContainer>
      <AppHeader />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.rowWrapper}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
            {/* Floating + Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Modal for Floating Actions */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modalBackdrop}
        >
          <View style={styles.modalSheet}>
            {featureActions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.modalItem}
              >
                <MaterialIcons name={action.icon as any} size={22} color={Colors.light.primary} style={{ marginRight: 10 }} />
                <RnText>{action.title}</RnText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    padding: wp(3),
    paddingBottom: hp(5),
  },
  rowWrapper: {
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp(3),
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: hp(1),
    resizeMode: 'cover',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    color: 'green',
    fontWeight: '600',
    marginBottom: 2,
  },
  productDesc: {
    fontSize: 12,
    color: '#777',
  },
   floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.light.primary,
    padding: 18,
    borderRadius: 50,
    elevation: 5,
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
   cardWrapper: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 12,
    flex: 1,
  },
  cardIconWrapper: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
