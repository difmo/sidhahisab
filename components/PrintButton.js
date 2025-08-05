import React from 'react';

const PrintButton = ({ onPrint }) => (
    <button onClick={onPrint} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Thanks
    </button>
);

export default PrintButton;