import React, { createContext, useReducer, useContext } from 'react';

// Initial state for orders
const initialState = {
    orders: [],
    selectedOrder: null,
};

// Actions
const ADD_ORDER = 'ADD_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';
const SELECT_ORDER = 'SELECT_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

// Reducer function
function orderReducer(state, action) {
    switch (action.type) {
        case ADD_ORDER:
            return { ...state, orders: [...state.orders, action.payload] };
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload),
            };
        case SELECT_ORDER:
            return { ...state, selectedOrder: action.payload };
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? { ...order, ...action.payload } : order
                ),
            };
        default:
            return state;
    }
}

// Create context
const OrderContext = createContext();

// Context provider
export const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, initialState);

    // Helper methods
    const addOrder = (order) => {
        dispatch({ type: ADD_ORDER, payload: order });
    };

    const removeOrder = (orderId) => {
        dispatch({ type: REMOVE_ORDER, payload: orderId });
    };

    const selectOrder = (order) => {
        dispatch({ type: SELECT_ORDER, payload: order });
    };

    const updateOrder = (updatedOrder) => {
        dispatch({ type: UPDATE_ORDER, payload: updatedOrder });
    };

    return (
        <OrderContext.Provider
            value={{
                orders: state.orders,
                selectedOrder: state.selectedOrder,
                addOrder,
                removeOrder,
                selectOrder,
                updateOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook to use the context
export const useOrder = () => useContext(OrderContext);
