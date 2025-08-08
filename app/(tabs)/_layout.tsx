import { Colors } from "@/constants/Colors";
import { wp } from "@/utils";
import {
  FontAwesome5,
  Ionicons,
  Octicons
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
export default function TabLayout() {

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/auth/loginwithemail'); // or wherever login starts
      }else{
        router.replace('/(tabs)/home'); // or wherever login starts
        console.log(`Token found: ${token}`);
      }
    };
    check();
  }, []);


  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          paddingBottom: 16,
          marginBottom: 10,
        },
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.blackText,

        tabBarShowLabel: true,
        tabBarItemStyle: {
          borderRadius: 10,
          margin: 5,
          padding: 0,
        },
        tabBarIconStyle: {
          marginBottom: 8,
          padding: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          color: Colors.light.tabIconDefault,


        },

      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Octicons
                  name="home"
                  size={focused ? 24 : 22}

                  color={focused ? Colors.light.whiteText : Colors.light.tabIconDefault}
                />
              }
            />
          ),
        }}
      />
      {/* Products */}
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <FontAwesome5
                  name="box-open"
                  size={focused ? 24 : 22}
                  color={focused ? Colors.light.whiteText : Colors.light.tabIconDefault}
                />
              }
            />
          ),
        }}
      />



      {/* Partners */}
      <Tabs.Screen
        name="partners"
        options={{
          title: "Partners",
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <FontAwesome5
                  name="user-friends"
                  size={focused ? 24 : 20}
                  color={focused ? Colors.light.whiteText : Colors.light.tabIconDefault}
                />
              }
            />
          ),
        }}
      />

      {/* Profile (Add Story / Center Button) */}
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              center
              icon={
                <Ionicons
                  name="cart"
                  size={focused ? 26 : 24}
                  color={focused ? Colors.light.whiteText : Colors.light.tabIconDefault}
                />
              }
            />
          ),
        }}
      />

      {/* Profile (Add Story / Center Button) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              center
              icon={
                <Ionicons
                  name="person"
                  size={focused ? 26 : 24}
                  color={focused ? Colors.light.whiteText : Colors.light.tabIconDefault}
                />
              }
            />
          ),
        }}
      />

    </Tabs>
  );
}

// 🔘 Tab Icon Wrapper
const TabIcon = ({
  icon,
  focused,
  center = false,
}: {
  icon: React.ReactNode;
  focused: boolean;
  center?: boolean;
}) => (
  <View
    style={[
      styles.iconContainer,
      {
        backgroundColor: focused ? Colors.light.primary : "transparent",
        width: center ? wp(12) : wp(10),
        height: center ? wp(12) : wp(10),
        borderRadius: center ? wp(6) : wp(5),
      },
    ]}
  >
    {icon}
  </View>
);

// 🎯 Custom tab button to remove ripple + ref warning
const CustomTabButton = (props: any) => {
  const { ref, ...rest } = props;
  return (
    <Pressable {...rest} android_ripple={null} style={props.style}>
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
