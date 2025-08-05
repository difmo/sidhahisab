import React from 'react';

const OrderCard = ({ order }) => {
    if (!order) return null;

    return (
        <div style={styles.card}>
            <h3>Order #{order.id}</h3>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <ul>
                {order.items.map((item, idx) => (
                    <li key={idx}>
                        {item.name} x {item.quantity} - ₹{item.price}
                    </li>
                ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total}</p>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }
};

export default OrderCard;