import { Colors } from "@/constants/Colors";
import {
  getSelectedTenant,
  getTenants,
  setSelectedTenant, // ✅ make sure you have this in TenantService
} from "@/services/TenantService";
import { hp, wp } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileHeader = () => {
  const [selectedTenant, setSelectedTenantState] = useState<any>(null);
  const [tenantList, setTenantList] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadTenant = async () => {
      const tenants = await getTenants();
      const selected = await getSelectedTenant();

      if (tenants?.length > 0) {
        setTenantList(tenants);
      }
      if (selected) {
        setSelectedTenantState(selected);
      }
    };
    loadTenant();
  }, []);

  const handleTenantSelect = async (tenant: any) => {
    await setSelectedTenant(tenant); // ✅ persist selection
    setSelectedTenantState(tenant);  // ✅ update UI state
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        {/* Tenant Dropdown */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.title}>
              {selectedTenant ? selectedTenant.Name : "Select Tenant"}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#a64cf2" />
          </View>
          <Text style={styles.roleText}>
            {selectedTenant ? selectedTenant.Role : ""}
          </Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={styles.notificationContainer}>
          <MaterialIcons
            name="notifications-none"
            size={24}
            color={Colors.dark.greenText}
          />
        </TouchableOpacity>
      </View>

      {/* Tenant Selection Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Switch Tenant</Text>
            <FlatList
              data={tenantList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleTenantSelect(item)}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#eee",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#555" }}>
                      {item.Name[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {item.Name}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#666" }}>
                      {item.Role}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#a64cf2",
  },
  roleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  titleContainer: {
    marginTop: hp(3),
    flexDirection: "row",
    paddingVertical: hp(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationContainer: {
    padding: wp(2),
    borderRadius: wp(6),
    borderColor: Colors.light.greenText,
    borderWidth: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "60%",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
