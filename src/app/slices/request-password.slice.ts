import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthService from "../services/auth.services";


interface RequestPasswordState{
    email:string,
    isRequestPswsLoading:boolean,
    isRequestPswdErr:any | null,
    response:RequestPasswordResponse['message'] | null
}

const initialState:RequestPasswordState ={
    email: "",
    isRequestPswdErr: null,
    isRequestPswsLoading: false,
    response: null
}
interface RequestPasswordDTO{
    email:string
}
interface RequestPasswordResponse{
    message:string,

}
export const RequestPassword = createAsyncThunk<
RequestPasswordResponse, 
RequestPasswordDTO,
    {rejectValue:string}
>(
    'auth/forgot password',
    async(data:RequestPasswordDTO, {rejectWithValue})=>{
        try{
            const response = await AuthService.RequestPassword(data);
            return response.data
        }catch(error:any){
            const errorMessage =
            error.response.data.non_field_errors[0] ||
            error.message ||
            'Error occur. Please try again.';
            return rejectWithValue(errorMessage);
        }
    }
)




const RequestPasswordSlice = createSlice({
    name:'request-password',
    initialState,
    reducers :{
        clearError:(state)=>{
            state.isRequestPswdErr = null
        }
    },
    extraReducers(builder){
        builder
        .addCase(RequestPassword.fulfilled, (state, action)=>{
            state.isRequestPswdErr = null,
            state.isRequestPswsLoading = false
            state.response = action.payload.message
        })
        builder.addCase(RequestPassword.pending, (state)=>{
            state.isRequestPswdErr = null
            state.isRequestPswsLoading = true
            
        })
        builder.addCase(RequestPassword.rejected, (state, action)=>{
            state.isRequestPswsLoading = false
            state.isRequestPswdErr = action.error 
        })
    }
})


export const {clearError} =RequestPasswordSlice.actions
export default RequestPasswordSlice.reducer