import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

export default function Myplan() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "My Plan" ,headerStyle: {
            backgroundColor: Colors.dark.primary, // Customize this
          },
          headerTintColor: Colors.dark.white, // Customize this
        });
  }, [navigation]);

  const businessName = "ANURAG GENERAL STORE";
  const businessUrl = "ags.sidhahisab.com";

  return (
    <ScrollContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ gap: 16, marginHorizontal: 16 }}>
          <RnText style={styles.planTitle}>My Plan: Free Trial</RnText>

          {/* Plan Information Card */}
          <View style={styles.card}>
            <RnText style={styles.cardTitle}>Plan Information</RnText>
            <RnText style={styles.cardText}>Free plan with limited features</RnText>
            <RnText style={styles.cardPrice}>
              Price: <RnText style={{ color: Colors.light.greenText }}>0 /month</RnText>
            </RnText>
            <RnText style={styles.cardText}>Subscription Date: 01/07/2025</RnText>
            <RnText style={styles.cardText}>Expire Date: 08/07/2025</RnText>
          </View>

          {/* Features Card */}
          <View style={styles.card}>
            <RnText style={styles.cardTitle}>Features</RnText>
            <View style={styles.featureRow}>
              <RnText style={styles.check}>✔</RnText>
              <RnText style={styles.featureText}>Up to 999999 customers</RnText>
            </View>
            <View style={styles.featureRow}>
              <RnText style={styles.check}>✔</RnText>
              <RnText style={styles.featureText}>Up to 99999 orders per month</RnText>
            </View>
          </View>

          {/* Upgrade Prompt */}
          <View style={styles.upgradeCard}>
            <RnText style={styles.upgradeTitle}>Upgrade Your Plan</RnText>
            <RnText style={styles.upgradeText}>
              Want more features? Consider upgrading to the <RnText style={styles.planTag}>Enterprise Plan</RnText> and unlock even more benefits!
            </RnText>

            <TouchableOpacity style={styles.upgradeButton}>
              <RnText style={styles.upgradeButtonText}>Upgrade Now</RnText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  planTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 2,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 6,
    color: "#000",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  check: {
    fontSize: 16,
    color: "green",
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: "#333",
  },
  upgradeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderColor: "#FFEDD5",
    borderWidth: 1,
    elevation: 3,
  },
  upgradeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#B45309",
    marginBottom: 8,
  },
  upgradeText: {
    fontSize: 13,
    color: "#92400E",
    marginBottom: 14,
  },
  planTag: {
    fontWeight: "bold",
    backgroundColor: "#FEF3C7",
    color: "#92400E",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  upgradeButton: {
    backgroundColor: "#EA580C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  upgradeButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
