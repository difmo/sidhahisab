import { default as styles } from '@/app/tabStyles/home.styles';
import AppHeader from '@/components/AppHeader';
import ScrollContainer from '@/components/RnScrollContainer';
import RnText from '@/components/RnText';
import { Colors } from '@/constants/Colors';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';

const dashboardCards = [
  {
    title: 'Orders',
    value: 0,
    color: '#FFE5E5',
    icon: <FontAwesome5 name="box" size={20} color="#FF5862" />,
  },
  {
    title: 'Quotations',
    value: 0,
    color: '#E8F9F1',
    icon: <Ionicons name="document-text-outline" size={20} color="#00B894" />,
  },
  {
    title: 'Customers',
    value: 0,
    color: '#F4E8FF',
    icon: <FontAwesome5 name="users" size={20} color="#A66DD4" />,
  },
];

const featureActions = [
  { title: 'New Sales Order', icon: 'add-shopping-cart' },
  { title: 'New Purchase Order', icon: 'receipt' },
  { title: 'Add Product', icon: 'add-box' },
];

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2;

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollContainer>
      <AppHeader />

      {/* Dashboard Cards */}
      <View style={styles.cardWrapper}>
        {Array.from({ length: Math.ceil(dashboardCards.length / 2) }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {dashboardCards.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: item.color,
                    width: cardWidth,
                    marginRight: index === 0 ? 10 : 0, // spacing between columns
                  },
                ]}
              >
                <View style={styles.cardIconWrapper}>{item.icon}</View>
                <RnText style={styles.cardTitle}>{item.title}</RnText>
                <RnText style={styles.cardValue}>{item.value}</RnText>
              </View>
            ))}
          </View>
        ))}
      </View>


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
