import  CartService  from "../services/cart.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDTO } from "app/dto/card.dto";

interface OrderDTO{
    user:string;
    items:CartDTO[],

}

interface OrderReponse {
    response:{
        ref:number
        message:string,
        success:boolean
    }
}

interface OrderState{
    isLoading:boolean;
    error:string | null;
    response:OrderReponse['response'] | null;
}
const initialState:OrderState = {
    isLoading: false,
    error: null,
    response: null
};
  export const Order = createAsyncThunk<
  OrderReponse, // Return type
  OrderDTO, // Argument type
  { rejectValue: string } // ThunkAPI reject value type
>('order/initiateOrder', async (orderData: OrderDTO, { rejectWithValue }) => {

        try {
            const response = await CartService.InitiatePayment(orderData);
            return response.data;
        } catch (error:any) {
                const errorMessage =
                    error.response.data.message ||
                    error.message ||
                    'Failed to initiate order. Please try again.';
                return rejectWithValue(errorMessage);

        }
    }
);


const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.response = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Order.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(Order.fulfilled, (state, action) => {
                state.isLoading = false;
                state.response = action.payload.response;
                state.error = null;
            })
            .addCase(Order.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to initiate order. Please try again.';
            });
    },
});

export const { clearOrder } = OrderSlice.actions;
export default OrderSlice.reducer;