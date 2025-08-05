import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Sidhahisab Billing App</h1>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#1976d2',
        padding: '16px',
        color: '#fff',
        textAlign: 'center',
    },
    title: {
        margin: 0,
        fontSize: '2rem',
        fontWeight: 'bold',
    },
};

export default Header;