import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Order = {
    id: string;
    customerName: string;
    date: string;
    total: number;
    status: 'Pending' | 'Completed' | 'Cancelled';
};

const orders: Order[] = [
    { id: '1', customerName: 'John Doe', date: '2024-06-10', total: 1200, status: 'Completed' },
    { id: '2', customerName: 'Jane Smith', date: '2024-06-09', total: 800, status: 'Pending' },
    // Add more orders as needed
];

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'Completed': return '#4CAF50';
        case 'Pending': return '#FFC107';
        case 'Cancelled': return '#F44336';
        default: return '#757575';
    }
};

const OrderListScreen: React.FC = () => {
    const renderItem = ({ item }: { item: Order }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.customer}>{item.customerName}</Text>
                <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.total}>₹{item.total}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Order List</Text>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    list: { paddingBottom: 16 },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    customer: { fontSize: 18, fontWeight: '600' },
    status: { fontSize: 16, fontWeight: '500' },
    date: { fontSize: 14, color: '#757575' },
    total: { fontSize: 16, fontWeight: 'bold', color: '#2196F3' },
});

export default OrderListScreen;