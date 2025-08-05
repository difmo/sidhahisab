import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface OrderDetailProps {
    orderId: string;
    customerName: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: string;
    onBack?: () => void;
}

const mockOrder: OrderDetailProps = {
    orderId: 'ORD123456',
    customerName: 'John Doe',
    date: '2024-06-10',
    items: [
        { id: '1', name: 'Product A', quantity: 2, price: 100 },
        { id: '2', name: 'Product B', quantity: 1, price: 200 },
    ],
    total: 400,
    status: 'Completed',
};

const OrderDetailScreen: React.FC = () => {
    const order = mockOrder;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => {}}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>Order Details</Text>
            <View style={styles.section}>
                <Text style={styles.label}>Order ID:</Text>
                <Text style={styles.value}>{order.orderId}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Customer:</Text>
                <Text style={styles.value}>{order.customerName}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{order.date}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{order.status}</Text>
            </View>
            <Text style={styles.subHeading}>Items</Text>
            <ScrollView style={styles.itemsList}>
                {order.items.map(item => (
                    <View key={item.id} style={styles.itemRow}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemQty}>x{item.quantity}</Text>
                        <Text style={styles.itemPrice}>₹{item.price}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>₹{order.total}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    backButton: { marginBottom: 10 },
    backText: { fontSize: 16, color: '#007AFF' },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    section: { flexDirection: 'row', marginBottom: 8 },
    label: { fontWeight: '600', width: 100 },
    value: { flex: 1 },
    subHeading: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 8 },
    itemsList: { maxHeight: 200, marginBottom: 16 },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
    itemName: { flex: 2 },
    itemQty: { flex: 1, textAlign: 'center' },
    itemPrice: { flex: 1, textAlign: 'right' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingVertical: 8, borderTopWidth: 1, borderColor: '#eee' },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalValue: { fontSize: 18, fontWeight: 'bold' },
});

export default OrderDetailScreen;