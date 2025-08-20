import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function UserProfile() {
  const navigation = useNavigation();
  const router = useRouter();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerStyle: {
        backgroundColor: Colors.dark.primary,
      },
      headerTintColor: Colors.dark.white,
    });
  }, [navigation]);

  const handleEditProfile = () => {
    console.log("Edit Profile Pressed");
     router.push("/others/EditProfile"); // route name we'll define
  };

  return (
    <ScrollContainer>
      <View style={{ gap: 0, paddingBottom: 32, paddingHorizontal: 8, paddingTop: 16 }}>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://avatar.iran.liara.run/public/boy"
            }}
            style={styles.profileImage}
          />
        </View>

        <RnText style={styles.sectionTitle}>Profile Details</RnText>
        <View style={styles.section}>
          <Detail label="Name" value="John Doe" />
          <Detail label="Email" value="john.doe@example.com" />
          <Detail label="Phone" value="123-456-7890" />
        </View>

        <RnText style={styles.sectionTitle}>Address Details</RnText>
        <View style={styles.section}>
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

        <RnText style={styles.sectionTitle}>Bank Details</RnText>
        <View style={styles.section}>
          <Detail label="Account Holder Name" value="" />
          <Detail label="Account Number" value="" />
          <Detail label="IFSC Code" value="" />
          <Detail label="Bank Name" value="" />
          <Detail label="Branch Name" value="" />
          <Detail label="GstNo" value="" />
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
          <RnText style={styles.editBtnText}>Edit Profile</RnText>
        </TouchableOpacity>
      </View>
    </ScrollContainer>
  );
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailColumn}>
    <RnText style={styles.label}>{label}</RnText>
    <RnText style={styles.value}>{value || "-"}</RnText>
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  section: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.light.primary,
  },
  detailColumn: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
  editBtn: {
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  editBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
