import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function UserProfile() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile", headerStyle: {
        backgroundColor: Colors.dark.primary, // Customize this
      },
      headerTintColor: Colors.dark.white, // Customize this
    });
  }, [navigation]);

  return (
    <ScrollContainer>
      <View style={styles.section}>
        <RnText style={styles.sectionTitle}>Profile Details</RnText>
        <Detail label="Name" value="John Doe" />
        <Detail label="Email" value="john.doe@example.com" />
        <Detail label="Phone" value="123-456-7890" />
      </View>

      <View style={styles.section}>
        <RnText style={styles.sectionTitle}>Address Details</RnText>
        <Detail label="Street No" value="" />
        <Detail
          label="Street Address"
          value="Rantnakar khand, south city, Raibarely road"
        />
        <Detail label="Near By" value="" />
        <Detail label="Pin Code" value="226025" />
        <Detail label="City" value="Lucknow" />
        <Detail label="State" value="UP" />
        <Detail label="Country" value="India" />
      </View>

      <View style={styles.section}>
        <RnText style={styles.sectionTitle}>Bank Details</RnText>
        <Detail label="Account Holder Name" value="" />
        <Detail label="Account Number" value="" />
        <Detail label="IFSC Code" value="" />
        <Detail label="Bank Name" value="" />
        <Detail label="Branch Name" value="" />
        <Detail label="GstNo" value="" />
      </View>
    </ScrollContainer>
  );
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <RnText style={styles.label}>{label}:</RnText>
    <RnText style={styles.value}>{value || "-"}</RnText>
  </View>
);

const styles = StyleSheet.create({
  section: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 140,
    fontWeight: "600",
    fontSize: 13,
  },
  value: {
    fontSize: 13,
  },
});
