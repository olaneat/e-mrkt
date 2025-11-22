export interface OrderDTO{
    user:string;
    reference:number;
    email:string
    price:number

}

export interface OrderItemDTO{
    id:string
    name:string
    img:string
    quantity:number
    price:number
}
export interface OrdersDTO{
    items: OrderItemDTO[]
    reference:string
    id:string

}
export interface OrdersDTO{
    id:string,
    reference:string,
    items: OrderItemDTO[]
    status:string,
    createdAt:string

}

export const mapOrder =(orders:any)=>{
    return orders.map((order:any)=>({
        reference: order.reference ?? undefined,
        id: order.id ?? undefined,
        status: order.status ?? undefined,
        createdAt: order.created_at,
        items: Array.isArray(order.items) ? order.items.map((item:any)=>({
            id: item.id ?? undefined,
            name: item.name ?? undefined,
            img: item.img ?? undefined,
            quantity: item.quantity ?? undefined,
            price: item.price ?? undefined,
        })): []
    }))
}
