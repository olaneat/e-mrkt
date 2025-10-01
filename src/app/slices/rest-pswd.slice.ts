import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.services";
import { ResetPasswordDTO } from "app/dto/auth.dto";


interface ResetPasswordResponse{
    message:string
}

interface ResetPasswordState{
    response:ResetPasswordResponse['message'] | null;
    isResetPasswordLoading: boolean,
    isResetPasswordError: string | null
}

const initialState:ResetPasswordState ={
    response:null,
    isResetPasswordError:null,
    isResetPasswordLoading:false
}

export const resetPassword = createAsyncThunk<
ResetPasswordResponse,  
ResetPasswordDTO,
 {rejectValue:string}
>( 'auth/reset-password',
    async (form:ResetPasswordDTO, {rejectWithValue})=>{
    try {
        const response  = await AuthService.ResetPassword(form);
        return response.data;
    }catch(error:any){
        const errorMessage =error
        return rejectWithValue(errorMessage);
    }
})


const ResetPasswordSlice =  createSlice({
    name: 'auth/reset-password',
    initialState,
    reducers:{
        clearError :(state)=>{
            state.isResetPasswordError = null;
        }
    },
    extraReducers(builder){
        builder
        .addCase(resetPassword.fulfilled, (state, action)=>{
            state.isResetPasswordError = null;
            state.isResetPasswordLoading = false;
            state.response = action.payload.message;
        }),
        builder.addCase(resetPassword.pending, (state)=>{
            state.isResetPasswordError = null;
            state.isResetPasswordLoading = true
        }),
        builder.addCase(resetPassword.rejected, (state, action)=>{
            state.isResetPasswordError = action.payload || ""
            state.isResetPasswordLoading = false
        })

    }
})




export const {clearError} = ResetPasswordSlice.actions
export default ResetPasswordSlice.reducer