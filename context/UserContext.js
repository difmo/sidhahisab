import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// UserProvider component to wrap your app and provide user state
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Example: login and logout functions
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};