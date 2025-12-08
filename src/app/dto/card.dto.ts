export interface CartDTO {
    id: string; // Use string for flexibility (e.g., UUIDs)
    name: string; // Item name for display
    price: number; // Unit price of the item
    quantity: number; // Number of items in cart
    totalPrice: number; // price * quantity
    img:string
    shippingCost: number
    totalShippingCost: number
    availabeQuantity: number; 
    size:any


  }