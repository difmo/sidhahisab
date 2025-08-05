import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SyncScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sync Data</Text>
            <Text style={styles.description}>
                This is a dummy sync screen. Press the button below to simulate syncing your data.
            </Text>
            <Button title="Sync Now" onPress={() => alert('Sync started!')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#555',
    },
});

export default SyncScreen;