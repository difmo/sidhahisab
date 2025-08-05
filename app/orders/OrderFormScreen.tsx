import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface OrderFormData {
    customerName: string;
    orderDate: string;
    items: { name: string; quantity: string; price: string }[];
}

const OrderFormScreen: React.FC = () => {
    const [form, setForm] = useState<OrderFormData>({
        customerName: '',
        orderDate: '',
        items: [{ name: '', quantity: '', price: '' }],
    });

    const handleItemChange = (index: number, field: keyof typeof form.items[0], value: string) => {
        const updatedItems = form.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setForm({ ...form, items: updatedItems });
    };

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { name: '', quantity: '', price: '' }] });
    };

    const removeItem = (index: number) => {
        setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
    };

    const handleSubmit = () => {
        // Submit logic here
        console.log(form);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>New Order</Text>
            <TextInput
                style={styles.input}
                placeholder="Customer Name"
                value={form.customerName}
                onChangeText={text => setForm({ ...form, customerName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Order Date (YYYY-MM-DD)"
                value={form.orderDate}
                onChangeText={text => setForm({ ...form, orderDate: text })}
            />
            <Text style={styles.sectionTitle}>Items</Text>
            {form.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    <TextInput
                        style={styles.itemInput}
                        placeholder="Item Name"
                        value={item.name}
                        onChangeText={text => handleItemChange(index, 'name', text)}
                    />
                    <TextInput
                        style={styles.itemInput}
                        placeholder="Qty"
                        keyboardType="numeric"
                        value={item.quantity}
                        onChangeText={text => handleItemChange(index, 'quantity', text)}
                    />
                    <TextInput
                        style={styles.itemInput}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={item.price}
                        onChangeText={text => handleItemChange(index, 'price', text)}
                    />
                    {form.items.length > 1 && (
                        <TouchableOpacity onPress={() => removeItem(index)}>
                            <Text style={styles.removeBtn}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            <Button title="Add Item" onPress={addItem} />
            <View style={styles.submitContainer}>
                <Button title="Submit Order" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6,
        padding: 8,
        marginRight: 8,
        fontSize: 15,
    },
    removeBtn: {
        color: '#d00',
        fontSize: 20,
        padding: 4,
    },
    submitContainer: {
        marginTop: 30,
    },
});

export default OrderFormScreen;