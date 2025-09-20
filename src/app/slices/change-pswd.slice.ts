import AuthService from "../services/auth.services";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangePasswordDTO } from "../dto/auth.dto";


interface changePasswordState{
    changePswdLoading: boolean,
    error:string | null,
    response: ChangePswdResponse['response'] | null
}
const initialState:changePasswordState = {
    changePswdLoading: false,
    error: null,
    response: null
};
interface ChangePswdResponse {
    response: {
        message: string,
        success:boolean
    }
}


export const ChangePswd = createAsyncThunk<
ChangePswdResponse,
ChangePasswordDTO,
{ rejectValue: string }
>('auth/changePswd', async (form: ChangePasswordDTO, {rejectWithValue}) => {
    try {
      const response = await AuthService.changePassword(form);
      return response.data; // Return the data
    } catch (error: any) {
      return rejectWithValue(error); // Pass the full error object
    }
});


const ChangPasswordSlice = createSlice({
    name: 'change-pswd',
    initialState,
    reducers: {
        clearChangePswdState(state){
            state.changePswdLoading = false;
            state.error = null;
            state.response= null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(ChangePswd.pending, (state)=>{
            state.changePswdLoading = true;
            state.error = null;
            state.response = null;
        })
        .addCase(ChangePswd.fulfilled, (state, action: PayloadAction<ChangePswdResponse>)=>{
            state.changePswdLoading = false;
            state.error = null;
            state.response = action.payload.response ;
        })
        .addCase(ChangePswd.rejected, (state, action)=>{
            state.changePswdLoading = false;
            state.error = action.payload || "Failed to change password. Please try again.";
        })
    },
}
)

export const {clearChangePswdState} = ChangPasswordSlice.actions;

export default ChangPasswordSlice.reducer;