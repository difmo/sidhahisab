import AppHeader from "@/components/AppHeader";
import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import authService from "@/services/authService";
import { hp } from "@/utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [conveImage, setConveImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("ANURAG GENERAL STORE");
  const [businessUrl, setBusinessUrl] = useState("ags.sidhahisab.com");
  const [loading, setLoading] = useState(false); // Loader state

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");
      router.replace("/auth/loginwithemail");
    } catch (error) {
      Alert.alert("Logout Failed", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedLogo = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
        const storedQrCode = "https://i.ibb.co/9Hh9wSPL/Untitled-1.png";
        const storedBusinessName = "ANURAG GENERAL STORE";
        const storedBusinessUrl = "ags.sidhahisab.com";
        const storedConveImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

        if (storedLogo) setLogo(storedLogo);
        if (storedQrCode) setQrCode(storedQrCode);
        if (storedBusinessName) setBusinessName(storedBusinessName);
        if (storedBusinessUrl) setBusinessUrl(storedBusinessUrl);
        if (storedConveImage) setConveImage(storedConveImage);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <ScrollContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <AppHeader />
        <Image
          source={{ uri: conveImage || "" }}
          style={styles.banner}
        />

        <TouchableOpacity activeOpacity={0.7} style={styles.uploadLogo}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles.logoImage} />
          ) : (
            <RnText style={styles.logoBtnText}>Upload Logo</RnText>
          )}
        </TouchableOpacity>

        <View style={styles.profileSection}>
          <TouchableOpacity activeOpacity={0.7} style={styles.uploadQR}>
            {qrCode ? (
              <Image
                source={{ uri: qrCode }}
                style={{ width: 100, height: 84, borderRadius: 10, margin: 15 }}
              />
            ) : (
              <RnText style={styles.logoBtnText}>Upload QR</RnText>
            )}
          </TouchableOpacity>

          <View style={styles.businessInfo}>
            <RnText style={styles.businessName}>{businessName}</RnText>
            <RnText style={styles.businessUrl}>{businessUrl}</RnText>
            <TouchableOpacity>
              <RnText style={styles.changeText}>Change QR</RnText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={{ marginTop: 20 }}>
          <MenuItem label="My Profile" subMenuLabel="View and edit your profile" onPress={() => router.push("/others/userprofile")} />
          <MenuItem label="My Plan" subMenuLabel="Manage your subscription plan" onPress={() => router.push("/others/plans")} />
          <MenuItem label="Billing" subMenuLabel="View billing history" onPress={() => router.push("/others/billing")} />
          <MenuItem label="Change Password" subMenuLabel="Update your password" onPress={() => router.push("/others/changepassword")} />
          <MenuItem label="SMTP Configuration" subMenuLabel="Configure email settings" onPress={() => router.push("/others/smtpsetting")} />
          <MenuItem label="Settings" subMenuLabel="App preferences and settings" onPress={() => router.push("/others/settings")} />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <RnText style={styles.logoutText}>Logout</RnText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ScrollContainer>
  );
}

const MenuItem = ({ label, subMenuLabel, onPress }: { label: string; subMenuLabel: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={{ flex: 1 }}>
      <RnText style={styles.menuText}>{label}</RnText>
      <RnText style={styles.subMenuText}>{subMenuLabel}</RnText>
    </View>
    <Ionicons name="chevron-forward" size={16} color="#ccc" style={{ marginLeft: "auto" }} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  banner: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    padding:5,
    backgroundColor: "#f9f9f9",
  },
  uploadLogo: {
    width: 100,
    height: 100,
    backgroundColor: "#f9f9f9",
    position: "absolute",
    top: 205,
    left: 30,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
    padding: hp(0.2),
    borderRadius: 50,
    borderWidth: hp(0.25),
    borderColor: Colors.light.greenText,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  uploadQR: {
    height: 84,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    padding: 2,
  },
  logoBtnText: {
    fontSize: 12,
    color: Colors.light.greenText,
    fontWeight: "bold",
    textAlign: "center",
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  businessUrl: {
    color: "#555",
    fontSize: 12,
    marginBottom: 4,
  },
  changeText: {
    fontSize: 12,
    color: Colors.light.greenText,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
    subMenuText: {
    fontSize: 12,
    fontWeight: "600",
    color:Colors.light.primary,
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#dc3545",
    marginHorizontal: 20,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
