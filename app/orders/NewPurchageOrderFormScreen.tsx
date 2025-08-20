import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import CustomInput from "@/components/ui/CustomInput";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function NewPurchageOrderFormScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'New Purchase Order',
            headerStyle: { backgroundColor: Colors.dark.primary },
            headerTintColor: Colors.dark.white,
        });
    }, [navigation]);
    const [customerName, setCustomerName] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const handleSave = () => {
        const formData = {
            customerName,
            orderDate,
            productName,
            quantity,
            price,
            amount: Number(quantity) * Number(price),
        };

        console.log("Purchase Order Data:", formData);
        Alert.alert('Purchase Order Saved', JSON.stringify(formData, null, 2)); // Show quick alert
        router.back();
    };

    return (
        <ScrollContainer>

            <View style={styles.container}>
                <RnText style={styles.sectionTitle}>Order Details</RnText>

                <CustomInput
                    placeholder="Customer Name"
                    value={customerName}
                    onChangeText={setCustomerName}
                    style={styles.input}
                />

                <CustomInput
                    placeholder="Order Date (DD-MM-YYYY)"
                    value={orderDate}
                    onChangeText={setOrderDate}
                    style={styles.input}
                />

                <RnText style={[styles.sectionTitle, { marginTop: 20 }]}>
                    Product Details
                </RnText>

                <CustomInput
                    placeholder="Product Name"
                    value={productName}
                    onChangeText={setProductName}
                    style={styles.input}
                />

                <CustomInput
                    placeholder="Quantity"
                    value={quantity}
                    keyboardType="numeric"
                    onChangeText={setQuantity}
                    style={styles.input}
                />

                <CustomInput
                    placeholder="Price ₹"
                    value={price}
                    keyboardType="numeric"
                    onChangeText={setPrice}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <RnText style={styles.saveText}>Save</RnText>
                </TouchableOpacity>
            </View>
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 10,
        color: Colors.light.primary,
    },
    input: {
        marginBottom: 12,
    },
    saveBtn: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 30,
    },
    saveText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
