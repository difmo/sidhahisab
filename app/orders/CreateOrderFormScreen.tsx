import ScrollContainer from "@/components/RnScrollContainer";
import CustomInput from "@/components/ui/CustomInput";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
export default function CreateOrderFormScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Create New Order',
            headerStyle: { backgroundColor: Colors.dark.primary },
            headerTintColor: Colors.dark.white,
        });
    }, [navigation]);
    const [products, setProducts] = useState([
        {
            id: Date.now().toString(),
            name: "",
            quantity: "",
            unit: null,
            price: "",
            amount: 0,
            description: "",
        },
    ]);
    const [unitOpenMap, setUnitOpenMap] = useState<{ [key: string]: boolean }>({});
    const unitItems = [
        { label: "KG", value: "KG" },
        { label: "Unit", value: "Unit" },
    ];

    const updateField = (id: string, field: string, value: string | null) => {
        setProducts((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        [field]: value,
                        amount:
                            field === "quantity" || field === "price"
                                ? (field === "quantity"
                                    ? parseFloat(value as string) || 0
                                    : parseFloat(item.quantity) || 0) *
                                (field === "price"
                                    ? parseFloat(value as string) || 0
                                    : parseFloat(item.price) || 0)
                                : item.amount,
                    }
                    : item
            )
        );
    };
    

    const addProduct = () => {
        const newId = Date.now().toString();
        setProducts((prev) => [
            ...prev,
            {
                id: newId,
                name: "",
                quantity: "",
                unit: null,
                price: "",
                amount: 0,
                description: "",
            },
        ]);
        setUnitOpenMap((prev) => ({ ...prev, [newId]: false }));
    };

    const removeProduct = (id: string) => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        setUnitOpenMap((prev) => {
            const newMap = { ...prev };
            delete newMap[id];
            return newMap;
        });
    };

    const handleSave = () => {
        console.log("Form Data:", products);
        Alert.alert('Customer Saved', JSON.stringify(products, null, 2)); // Show quick alert
    };

    return (
        <ScrollContainer>    <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {products.map((item) => (

                    <View key={item.id} style={{gap: 16, }}>
                        <Text style={styles.addProductText}>Create New Order</Text>
                        <CustomInput
                            placeholder="Product Name"
                            value={item.name}
                            onChangeText={(text) => updateField(item.id, "name", text)}
                            style={styles.input}
                        />
                        <CustomInput
                            placeholder="Qty"
                            value={item.quantity}
                            keyboardType="numeric"
                            onChangeText={(text) => updateField(item.id, "quantity", text)}
                            style={[styles.input, { flex: 0.8 }]}
                        />
                        <View style={[styles.dropdownWrapper, { flex: 1 }]}>
                            <DropDownPicker
                                multiple={false}
                                open={unitOpenMap[item.id] || false}
                                value={item.unit}
                                items={unitItems}
                                setOpen={(value) =>
                                    setUnitOpenMap((prev) => ({ ...prev, [item.id]: typeof value === "function" ? value(prev[item.id] || false) : value }))
                                }
                                setValue={(cb) =>
                                    updateField(item.id, "unit", cb(item.unit) as string)
                                }
                                placeholder="Unit"
                                style={styles.dropdown}
                                dropDownContainerStyle={styles.dropdownContainer}
                            />
                        </View>
                        <View style={styles.row2} key={item.id}>

                            <CustomInput
                                placeholder="Price ₹"
                                value={item.price}
                                keyboardType="numeric"
                                onChangeText={(text) => updateField(item.id, "price", text)}
                                style={[styles.input, { flex: 1 }]}
                            />
                            <View style={[styles.amountBox, { flex: 1 }]}>
                                <Text style={{ fontWeight: "500" }}>₹{item.amount}</Text>
                            </View>
                        </View>


                        <CustomInput
                            placeholder="Description"
                            value={item.description}
                            onChangeText={(text) => updateField(item.id, "description", text)}
                            style={[styles.input, { flex: 2 }]}
                            multiline
                        />
                        {item.id !== products[0].id && (
                            <TouchableOpacity
                                onPress={() => removeProduct(item.id)}
                                style={styles.deleteBtn}
                            >
                                <Ionicons name="trash" size={20} color="red" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <View style={styles.row2} >

                </View>
                <TouchableOpacity onPress={addProduct} style={styles.addBtn}>
                    <Text style={styles.addText}>+ Add Product</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Text style={styles.addText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        </ScrollContainer>

    );
}

const styles = StyleSheet.create({
    addProductText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    container: {
        gap: 16,
        paddingBottom: 32,
        paddingHorizontal: 8,
        paddingTop: 16,
        flex: 1,
    },
    row: {
        // flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 6,
    },
    row2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 6,
    },
    input: {
        flex: 1,
    },
    dropdownWrapper: {
        zIndex: 1000,
    },
    dropdown: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        minHeight: 40,
    },
    dropdownContainer: {
        borderColor: "#ccc",
    },
    amountBox: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 6,
        borderRadius: 4,
    },
    deleteBtn: {
        marginLeft: 4,
    },
    addBtn: {
        padding: 12,
        backgroundColor: "#007bff",
        alignItems: "center",
        borderRadius: 4,
        marginVertical: 5,
    },
    saveBtn: {
        padding: 12,
        backgroundColor: Colors.light.primary,
        alignItems: "center",
        borderRadius: 4,
    },
    addText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
