import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
    const [customerName, setCustomerName] = useState('');
    const [orderItems, setOrderItems] = useState([{ name: '', quantity: 1 }]);

    const handleItemChange = (index, field, value) => {
        const updatedItems = orderItems.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setOrderItems(updatedItems);
    };

    const addItem = () => {
        setOrderItems([...orderItems, { name: '', quantity: 1 }]);
    };

    const removeItem = (index) => {
        setOrderItems(orderItems.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ customerName, orderItems });
        }
        setCustomerName('');
        setOrderItems([{ name: '', quantity: 1 }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Order Form</h2>
            <div>
                <label>Customer Name:</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    required
                />
            </div>
            <h3>Order Items</h3>
            {orderItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={e => handleItemChange(index, 'name', e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))}
                        required
                        style={{ width: '60px', marginLeft: '8px' }}
                    />
                    {orderItems.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} style={{ marginLeft: '8px' }}>
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addItem}>Add Item</button>
            <div style={{ marginTop: '16px' }}>
                <button type="submit">Submit Order</button>
            </div>
        </form>
    );
};

export default OrderForm;