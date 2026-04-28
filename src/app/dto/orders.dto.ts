// dto/orders.dto.ts

export interface OrderItemDTO {
    id: string;
    name: string;
    img: string;
    quantity: number;
    price: number | string;
}

export interface OrdersDTO {
    id: string;
    reference: string;
    status: string;
    createdAt: string;        // ← always camelCase in frontend
    total_amount: number | string;
    items: OrderItemDTO[];
}

export interface OrderResponseDTO {
    count: number;
    next: any;
    previous: any;
    results: OrdersDTO[];
}

// Proper mapping
export const mapOrder = (order: any): OrdersDTO => ({
    id: order.id ?? '',
    reference: order.reference ?? '',
    status: order.status ?? '',
    createdAt: order.created_at ?? order.createdAt ?? '',   // handle both
    total_amount: order.total_amount ?? 0,
    items: Array.isArray(order.items) 
        ? order.items.map((item: any) => ({
            id: item.id ?? '',
            name: item.name ?? '',
            img: item.img ?? '',
            quantity: Number(item.quantity) || 0,
            price: item.price ?? 0,
          }))
        : [],
});

export const mapOrderResponse = (data: any): OrderResponseDTO => ({
    count: data.count ?? 0,
    next: data.next ?? null,
    previous: data.previous ?? null,
    results: Array.isArray(data.results) 
        ? data.results.map(mapOrder) 
        : [],
});