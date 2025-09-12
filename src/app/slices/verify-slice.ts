import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartService from "../services/cart.service";
import { CartDTO } from "app/dto/card.dto";

interface RequestDTO{
    reference:string
}

interface ResponseDTO{
    response:any
}

interface ResponseState{
    isLoading:boolean,
    error:any |null,
    response: ResponseDTO['response'] | null
}

const initialState:ResponseState = {
    isLoading: false,
    error:null,
    response: null
}

export const verifyPayment = createAsyncThunk<
    ResponseDTO,
    string,
    { rejectValue: string }
>('order/verify-payment', async (data:string, { rejectWithValue })=>{

    try{
        const response  = await CartService.verifyPayment(data);
        return response.data
    }
    catch(error:any){
        const errorMessage =
            error.response.data.message ||
            error.message ||
            'Failed to initiate order. Please try again.';
        return rejectWithValue(errorMessage);

    }
})


const VerifyOrderSlice = createSlice({
    name:"verify-payment",
    initialState,
    reducers :{
        clearVeifyOrder: (state)=>{
            state.response = null
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(verifyPayment.fulfilled, (state, action)=>{
                state.error = null,
                state.isLoading = false,
                state.response = action.payload.response
            })
            .addCase(verifyPayment.pending, (state)=>{
                state.isLoading = true,
                state.error = null
            })
            .addCase(verifyPayment.rejected, (state, action)=>{
                state.error = action.error.message || 'Failed to initiate order. Please try again.',
                state.isLoading = false
            })
    }
})

export const {clearVeifyOrder} = VerifyOrderSlice.actions
export default VerifyOrderSlice.reducer