import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartDTO } from 'app/dto/card.dto';
// interface CartDTO {
//     id: string; // Use string for flexibility (e.g., UUIDs)
//     name: string; // Item name for display
//     price: number; // Unit price of the item
//     quantity: number; // Number of items in cart
//     totalPrice: number; // price * quantity
//     img:string
//     shippingCost: number
//     totalShippingCost: number

//   }

  interface CartState {
    cart: CartDTO[];
    totalPrice: number; // Total price of all items
    shippingCost:number
    cartIsloading:boolean
  }

  const initialState: CartState = {
    cart: [],
    totalPrice: 0,
    shippingCost:0,
    cartIsloading:false
  };

const calculateTotalCost = (cart:CartDTO[]) =>{
    return cart.reduce((total, item)=> total + item.totalPrice, 0)
}
const calculateTotalShippingCost = (cart:CartDTO[]) =>{
    return cart.reduce((total, item)=> total + item.totalShippingCost, 0)
}
const  CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
      addToCart(state, action: PayloadAction<CartDTO>) {
        const newItem = action.payload;
        const existingItem = state.cart.find((item) => item.id === newItem.id);
  
        if (existingItem) {
          existingItem.quantity += newItem.quantity || 1;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;

        } else {
          state.cart.push({
            ...newItem,
            quantity: newItem.quantity || 1,
            totalPrice: (newItem.quantity || 1) * newItem.price,
            totalShippingCost: (newItem.quantity || 1) * newItem.shippingCost
          });
        }
        state.totalPrice = calculateTotalCost(state.cart);
        state.shippingCost = calculateTotalShippingCost(state.cart)
      },
        increaseQuantity(
            state,
            action: PayloadAction<{ id: string}>
          ) {
            const { id } = action.payload;
            const item = state.cart.find((item) => item.id === id);
            if (item) {
              item.quantity+=1;
              item.totalPrice = item.quantity * item.price;
              item.totalShippingCost = item.quantity * item.shippingCost
              state.totalPrice = calculateTotalCost(state.cart);
              state.shippingCost = calculateTotalShippingCost(state.cart)
            }
        },
        reduceQuantity(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            const item = state.cart.find((item) => item.id === id);
      
            if (item) {
              if (item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice = item.quantity * item.price;
                item.totalShippingCost = item.quantity * item.shippingCost
                state.shippingCost = calculateTotalShippingCost(state.cart)
              } else {
                // Remove item if quantity would become 0
                state.cart = state.cart.filter((CartDTO) => CartDTO.id !== id);
              }
              state.totalPrice = calculateTotalCost(state.cart);

            }
        },
        removeItem(state, action: PayloadAction<{ id: string }>) {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            state.totalPrice = calculateTotalCost(state.cart);
            state.shippingCost = calculateTotalShippingCost(state.cart)
            
        },
        clearCart(state) {
            state.cart = [];
            state.totalPrice = 0;
            state.shippingCost = 0
        },
    }   
});

export const { addToCart, increaseQuantity, reduceQuantity, removeItem, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;