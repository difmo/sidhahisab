// screens/AddProductFormScreen.tsx
import ScrollContainer from '@/components/RnScrollContainer';
import CustomInput from '@/components/ui/CustomInput';
import { Colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddProductFormScreen() {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        productName: '',
        productPrice: '',
        hsnCode: '',
        category: '',
        measureUnit: '',
        description: '',
        isActive: false,
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add New Product',
            headerStyle: { backgroundColor: Colors.dark.primary },
            headerTintColor: Colors.dark.white,
        });
    }, [navigation]);

    const handleChange = (key: keyof typeof form, value: string | boolean) => {
        setForm({ ...form, [key]: value });
    };

    const handleSave = () => {
        console.log('Form Data:', form);
        Alert.alert('Customer Saved', JSON.stringify(form, null, 2)); // Show quick alert
        navigation.goBack();
    };

    const handleReset = () => {
        setForm({
            productName: '',
            productPrice: '',
            hsnCode: '',
            category: '',
            measureUnit: '',
            description: '',
            isActive: false,
        });
    };

    return (
        <ScrollContainer>
            <View style={{ gap: 16, paddingBottom: 32, paddingHorizontal: 8, paddingTop: 16 }}>

                <CustomInput
                    placeholder="Product Name"
                    value={form.productName}
                    onChangeText={(text) => handleChange('productName', text)}
                />
                <CustomInput
                    placeholder="Product Price"
                    keyboardType="numeric"
                    value={form.productPrice}
                    onChangeText={(text) => handleChange('productPrice', text)}
                />
                <CustomInput
                    placeholder="HSN Code"
                    value={form.hsnCode}
                    onChangeText={(text) => handleChange('hsnCode', text)}
                />
                <CustomInput
                    placeholder="Category"
                    value={form.category}
                    onChangeText={(text) => handleChange('category', text)}
                />
                <CustomInput
                    placeholder="Measure Unit(s)"
                    value={form.measureUnit}
                    onChangeText={(text) => handleChange('measureUnit', text)}
                />
                <CustomInput
                    placeholder="Product Description"
                    value={form.description}
                    onChangeText={(text) => handleChange('description', text)}
                    multiline
                />

                <View style={styles.checkboxRow}>
                    <Checkbox
                        value={form.isActive}
                        onValueChange={(val) => handleChange('isActive', val)}
                        style={{ marginRight: 8 }}
                    />
                    <Text>Is Active</Text>
                </View>

                <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                        <Text style={styles.resetText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, gap: 12 },
    checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    btnRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
    resetBtn: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    resetText: { color: '#333' },
    saveBtn: {
        flex: 1,
        backgroundColor: Colors.light.primary,
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    saveText: { color: '#fff' },
});
