

// Define the Invoice type if not imported from elsewhere
type Invoice = {
    id: string | number;
    date: string;
    customerName: string;
    items: Array<{
        name: string;
        quantity: number;
        rate: number;
        amount: number;
    }>;
    total: number;
};

export function printInvoice(invoice: Invoice): void {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
        throw new Error('Unable to open print window');
    }

    const htmlContent = `
        <html>
            <head>
                <title>Invoice #${invoice.id}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                    th { background: #f4f4f4; }
                    .total { font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Invoice</h1>
                <p><strong>Invoice ID:</strong> ${invoice.id}</p>
                <p><strong>Date:</strong> ${invoice.date}</p>
                <p><strong>Customer:</strong> ${invoice.customerName}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>${item.rate}</td>
                                <td>${item.amount}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                            <p class="total">Total: ${invoice.total}</p>
                        </body>
                    </html>
                                `;
                
                    printWindow.document.write(htmlContent);
                    printWindow.document.close();
                }
         