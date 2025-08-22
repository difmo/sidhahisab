import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(`Token found: ${token}`);

        if (token) {
          router.replace("/(tabs)/home");   // ✅ correct way
        } else {
          router.replace("/auth/loginwithemail"); // ✅ correct way
        }
      } catch (e) {
        console.log("Auth check failed", e);
        router.replace("/auth/loginwithemail");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return null;
}
