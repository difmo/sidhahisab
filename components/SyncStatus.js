import React from 'react';

const SyncStatus = ({ isSyncing, lastSynced }) => {
    return (
        <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '6px', display: 'inline-block' }}>
            {isSyncing ? (
                <span style={{ color: '#007bff' }}>Syncing...</span>
            ) : (
                <span style={{ color: '#28a745' }}>
                    Last synced: {lastSynced ? new Date(lastSynced).toLocaleString() : 'Never'}
                </span>
            )}
        </div>
    );
};

export default SyncStatus;