import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { FontSize } from "@/constants/FontSize";
import { hp, wp } from "@/utils/Dimensions";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View
} from "react-native";



export default function Settings() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Settings",headerStyle: {
                backgroundColor: Colors.dark.primary, // Customize this
              },
              headerTintColor: Colors.dark.white, // Customize this
             });
  }, [navigation]);

    return (
        <ScrollContainer>




            <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
                {/* Invoice Image & Tenant Settings */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RnText style={styles.cardTitle}>Invoice Image & Tenant Settings</RnText>
                        <TouchableOpacity style={styles.editBtn}>
                            <RnText style={styles.editBtnText}>Edit</RnText>
                        </TouchableOpacity>
                    </View>

                    <SettingRow label="Order Type" value="Product Order" isDropdown={undefined} />
                    <SettingRow label="Currency" value="INR" isDropdown />
                    <ToggleRow label="Enable Multiple Price" value />
                    <ToggleRow label="Invoice Image" />
                    <ToggleRow label="Gate Pass" />
                    <ToggleRow label="Show Tax" value />
                    <ToggleRow label="QR Scanner" />
                    <ToggleRow label="Product Offer" />
                    <ToggleRow label="WhatsApp Notification" value />
                </View>

                {/* Dashboard Layout Settings */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RnText style={styles.cardTitle}>Dashboard Layout Settings</RnText>
                        <TouchableOpacity style={styles.editBtn}>
                            <RnText style={styles.editBtnText}>Customize Layout</RnText>
                        </TouchableOpacity>
                    </View>

                    <ToggleRow label="Order Information" />
                    <ToggleRow label="Growth Revenue" />
                    <ToggleRow label="Top Customers" />
                    <ToggleRow label="Latest Transactions" />
                    <ToggleRow label="Assigned Tasks" />
                    <ToggleRow label="Product Inventory" />
                </View>

                {/* Signature Manager */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RnText style={styles.cardTitle}>Signature Manager</RnText>
                        <TouchableOpacity style={styles.uploadBtn}>
                            <RnText style={styles.uploadBtnText}>⬆ Upload</RnText>
                        </TouchableOpacity>
                    </View>

                    {/* Signature Table Header */}
                    <View style={styles.tableHeader}>
                        <RnText style={styles.tableCellHeader}>Image</RnText>
                        <RnText style={styles.tableCellHeader}>Created At</RnText>
                        <RnText style={styles.tableCellHeader}>Actions</RnText>
                    </View>
                    {/* No Data */}
                    <View style={styles.noDataContainer}>
                        <RnText style={styles.noDataText}>No data</RnText>
                    </View>
                </View>
            </ScrollView>
        </ScrollContainer>
    );
}



type ToggleRowProps = {
    label: string;
    value?: boolean;
};

const ToggleRow = ({ label, value = false }: ToggleRowProps) => (
    <View style={styles.row}>
        <RnText style={styles.label}>{label}</RnText>
        <Switch value={value} onValueChange={() => { }} />
    </View>
);

type SettingRowProps = {
    label: string;
    value: string;
    isDropdown?: boolean;
};

const SettingRow = ({ label, value, isDropdown }: SettingRowProps) => (
    <View style={styles.row}>
        <RnText style={styles.label}>{label}</RnText>
        {isDropdown ? (
            <TouchableOpacity style={styles.dropdown}>
                <RnText>{value}</RnText>
            </TouchableOpacity>
        ) : (
            <RnText style={styles.valueText}>{value}</RnText>
        )}
    </View>
);


const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
    },
    banner: {
        width: "100%",
        aspectRatio: 3.5, // keeps proportions consistent
        resizeMode: "cover",
        borderRadius: 12,
        marginBottom: 40,
    },

    profileSection: {
        marginTop: 60,
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
    uploadLogo: {
        width: 100,
        height: 100,
        backgroundColor: "#f9f9f9",
        position: "absolute",
        top: 164,
        left: 20,
        zIndex: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        overflow: "hidden", // ensures content inside is clipped circularly
        padding: hp(0.2),            // padding around the image
        borderRadius: hp(50),         // make it fully round
        borderWidth: hp(0.25),       // responsive border width
        borderColor: Colors.light.greenText,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingVertical: 6,
        paddingHorizontal: 10,
        padding: 2,            // padding around the image
    },
    logoBtnText: {
        marginTop: 5,
        fontSize: 12,
        color: Colors.light.greenText,
        fontWeight: "bold",
    },
    businessInfo: {
        flex: 1,
    },
    businessName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    businessUrl: {
        color: "#555",
        fontSize: 12,
    },
    qrBtn: {
        padding: 5,
    },
    qrBtnText: {
        color: "#007bff",
        fontSize: 12,
    },
    tabRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#f9f9f9",
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#007bff",
    },
    tabText: {
        fontSize: 13,
        fontWeight: "600",
    },
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
    logoutBtn: {
        marginTop: 20,
        backgroundColor: "#dc3545",
        marginHorizontal: 20,
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
    titleContainer: {
        marginTop: hp(3),
        flexDirection: 'row',
        paddingVertical: hp(2),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontWeight: 'bold',
        color: Colors.light.greenText,
        fontSize: FontSize.extraLarge,
    },
    notificationContainer: {
        position: 'relative',
        padding: wp(2),
        borderRadius: wp(6),
        borderColor: Colors.light.greenText,
        borderWidth: 1,
    },
    notificationDot: {
        position: 'absolute',
        top: wp(1),
        right: wp(1),
        width: wp(2),
        height: wp(2),
        borderRadius: wp(1),
        backgroundColor: Colors.light.redText,
    },
    storiesContainer: {
        marginBottom: hp(2),
    },
    storiesList: {
        paddingLeft: wp(2),
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(118,202,187,0.2)',
        borderRadius: wp(5),
        marginVertical: hp(1),
        padding: wp(1.5),
    },


    activeTabText: {
        color: Colors.light.redText,
        fontWeight: 'bold',
        // dont
    },
    questionsContainer: {
        alignItems: 'center',
        paddingTop: hp(2),
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
    planTitle: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
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


    tabsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },

    tabButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderBottomWidth: 2,
        borderColor: "transparent",
        marginRight: 10,
    },

    activeTabButton: {
        borderColor: "#2563EB", // Blue
    },
    downloadButton: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },

    downloadButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },

    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F3F4F6",
        padding: 12,
        borderRadius: 8,
    },

    tableHeaderText: {
        flex: 1,
        fontWeight: "600",
        fontSize: 13,
        color: "#555",
    },

    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#eee",
        borderRadius: 8,
        elevation: 1,
        marginTop: 6,
    },

    tableCell: {
        flex: 1,
        fontSize: 13,
        color: "#333",
    },

    downloadIcon: {
        fontSize: 18,
        color: "#1E40AF",
    },

    paginationText: {
        textAlign: "center",
        color: "#999",
        marginTop: 12,
        fontSize: 12,
    },



    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },


    editBtn: {
        backgroundColor: "#2563EB",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },

    editBtnText: {
        color: "#fff",
        fontWeight: "bold",
    },

    uploadBtn: {
        backgroundColor: "#2563EB",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },

    uploadBtnText: {
        color: "#fff",
        fontWeight: "bold",
    },


    valueText: {
        fontSize: 14,
        color: "#666",
    },

    dropdown: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },


    tableCellHeader: {
        flex: 1,
        fontWeight: "bold",
        color: "#555",
        fontSize: 13,
    },

    noDataContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },

    noDataText: {
        color: "#999",
        fontSize: 13,
    },

});
