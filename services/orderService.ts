export interface Order {
    id: number;
    customerName: string;
    items: Array<{ productId: number; quantity: number }>;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
}

const dummyOrders: Order[] = [
    {
        id: 1,
        customerName: 'John Doe',
        items: [
            { productId: 101, quantity: 2 },
            { productId: 102, quantity: 1 },
        ],
        totalAmount: 300,
        status: 'completed',
    },
    {
        id: 2,
        customerName: 'Jane Smith',
        items: [
            { productId: 103, quantity: 5 },
        ],
        totalAmount: 500,
        status: 'pending',
    },
];

export const orderService = {
    getOrders: (): Promise<Order[]> => {
        return Promise.resolve(dummyOrders);
    },
    getOrderById: (id: number): Promise<Order | undefined> => {
        return Promise.resolve(dummyOrders.find(order => order.id === id));
    },
};