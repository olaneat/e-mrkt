import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { OrderSearchDTO } from "../dto/products.dto";
import { mapOrder } from "../dto/orders.dto";
interface OrderState {
    orders: any[], 
    isLoading:boolean,
    err: string | null
} 
const initialState: OrderState = {
    orders: [],
    isLoading: false,
    err: null
}
export const getOrderList = createAsyncThunk<
    any, 
    OrderSearchDTO, 
    {rejectValue:string}
>(
    'order/order-lists',
    async(value, {rejectWithValue})=>{
        try{
            const response = await ProductService.getOrders(value);
            let orders = mapOrder(response.data);
            return orders;

        }catch(err:any){
            return rejectWithValue(err.response?.data?.err)
        }
    }
)

const OrdersSlice = createSlice({
    name: 'orders list',
    initialState,
    reducers:{
        clearOrder(state){
            state.orders = [];
            state.err = null;
            state.isLoading = false;
        }    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getOrderList.pending, (state)=>{
            state.isLoading = true;
            state.err = null;
        })
        .addCase(getOrderList.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.orders = action.payload;
            state.err = null;
        })
        .addCase(getOrderList.rejected, (state, action)=>{
            state.isLoading = false;
            state.err = action.payload || 'Failed to fetch orders';
        })
    }
}) 

export const {clearOrder} = OrdersSlice.actions;
export default OrdersSlice.reducer;
// export {getOrderList};