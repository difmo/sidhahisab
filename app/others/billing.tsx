import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";



export default function Billing() {
      const navigation = useNavigation();
    
      useLayoutEffect(() => {
        navigation.setOptions({ title: "Billing",headerStyle: {
                    backgroundColor: Colors.dark.primary, // Customize this
                  },
                  headerTintColor: Colors.dark.white, // Customize this
                 });
      }, [navigation]);
    
    return (
        <ScrollContainer>
            <View style={{ padding: 16, gap: 16 }}>
                <RnText style={styles.sectionTitle}>Billing & Payment History</RnText>

                <View style={styles.tabsContainer}>
                    {["All", "Success", "Pending", "Failed"].map((tab, index) => (
                        <TouchableOpacity key={index} style={styles.tabButton}>
                            <RnText style={styles.tabText}>{tab}</RnText>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.downloadButton}>
                        <RnText style={styles.downloadButtonText}>Download All</RnText>
                    </TouchableOpacity>
                </View>

                <View style={styles.tableHeader}>
                    <RnText style={styles.tableHeaderText}>Action</RnText>
                    <RnText style={styles.tableHeaderText}>Transaction ID</RnText>
                    <RnText style={styles.tableHeaderText}>Plan Name</RnText>
                </View>

                <View style={styles.tableRow}>
                    <TouchableOpacity>
                        <RnText style={styles.downloadIcon}>⬇️</RnText>
                    </TouchableOpacity>
                    <RnText style={styles.tableCell}>INV-000000</RnText>
                    <RnText style={styles.tableCell}>Free Trial</RnText>
                </View>

                <RnText style={styles.paginationText}>Showing 1-1 of 1 items</RnText>
            </View>
        </ScrollContainer>
    );
}


const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
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
    tabText: {
        fontSize: 13,
        fontWeight: "600",
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
});
