import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderSearchDTO } from "../dto/products.dto";
import { mapOrder, mapOrderResponse, OrderResponseDTO } from "../dto/orders.dto";
import AdminService from "../services/admin.services";
interface OrderState {
    recentOrders: OrderResponseDTO | null, 
    isRecentOrderLoading:boolean,
    err: string | null
} 
const initialState: OrderState = {
    recentOrders: null,
    isRecentOrderLoading: false,
    err: null
}
export const getRecentOrderList = createAsyncThunk<
    any, 
    OrderSearchDTO, 
    {rejectValue:string}
>(
    'order/order-lists',
    async(value, {rejectWithValue})=>{
        try{
            const response = await AdminService.getTotalOrders(value);
            const orders = mapOrderResponse(response.data);
            return orders;

        }catch(err:any){
            return rejectWithValue(err.response?.data?.err)
        }
    }
)

const RecentOrdersSlice = createSlice({
    name: 'orders list',
    initialState,
    reducers:{
        clearOrder(state){
            state.recentOrders = null;
            state.err = null;
            state.isRecentOrderLoading = false;
        }    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getRecentOrderList.pending, (state)=>{
            state.isRecentOrderLoading = true;
            state.err = null;
        })
        .addCase(getRecentOrderList.fulfilled, (state, action: PayloadAction<OrderResponseDTO>)=>{
            state.isRecentOrderLoading = false;
            state.recentOrders = action.payload;
            state.err = null;
        })
        .addCase(getRecentOrderList.rejected, (state, action)=>{
            state.isRecentOrderLoading = false;
            state.err = action.payload || 'Failed to fetch orders';
        })
    }
}) 

export const {clearOrder} = RecentOrdersSlice.actions;
export default RecentOrdersSlice.reducer;
// export {getRecentOrderList};