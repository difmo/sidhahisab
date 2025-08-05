import React, { createContext, useState, useContext } from 'react';

// Create the SyncContext
const SyncContext = createContext();

// SyncProvider component to wrap your app
export const SyncProvider = ({ children }) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState(null);
    const [syncError, setSyncError] = useState(null);

    // Function to start syncing
    const startSync = async () => {
        setIsSyncing(true);
        setSyncError(null);
        try {
            // Simulate sync logic (replace with actual sync code)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLastSyncTime(new Date());
        } catch (error) {
            setSyncError(error.message || 'Sync failed');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <SyncContext.Provider
            value={{
                isSyncing,
                lastSyncTime,
                syncError,
                startSync,
            }}
        >
            {children}
        </SyncContext.Provider>
    );
};

// Custom hook to use the SyncContext
export const useSync = () => useContext(SyncContext);