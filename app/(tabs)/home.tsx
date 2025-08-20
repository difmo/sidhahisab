import { default as styles } from '@/app/tabStyles/home.styles';
import AppHeader from '@/components/AppHeader';
import ScrollContainer from '@/components/RnScrollContainer';
import RnText from '@/components/RnText';
import { Colors } from '@/constants/Colors';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart, PieChart } from "react-native-chart-kit";

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
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

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
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          {/* Line Chart - Sales Trend */}
          <RnText style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Sales Trend
          </RnText>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                  strokeWidth: 2,
                },
              ],
            }}
            width={screenWidth - 32}
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
            style={{
              borderRadius: 8,
            }}
          />
          {/* Pie Chart - Orders Distribution */}
          <RnText style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}>
            Orders Distribution
          </RnText>
          <PieChart
            data={[
              { name: "Completed", population: 40, color: "#4CAF50", legendFontColor: "#333", legendFontSize: 12 },
              { name: "Pending", population: 25, color: "#FFC107", legendFontColor: "#333", legendFontSize: 12 },
              { name: "Cancelled", population: 10, color: "#F44336", legendFontColor: "#333", legendFontSize: 12 },
            ]}
            width={screenWidth - 32}
            height={200}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>
        {/* Floating + Button */}
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
                  onPress={() => {
                    setModalVisible(false);
                    if (action.title === 'New Sales Order') {
                      router.push('/orders/CreateOrderFormScreen'); // route name we'll define
                    } else if (action.title === 'New Purchase Order') {
                      router.push('/orders/NewPurchageOrderFormScreen'); // route name we'll define
                    }
                    else if (action.title === 'Add Product') {
                      router.push('/products/AddProductFormScreen');   // Adjust the route as needed
                    }
                  }}
                >
                  <MaterialIcons name={action.icon as any} size={22} color={Colors.light.primary} style={{ marginRight: 10 }} />
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
