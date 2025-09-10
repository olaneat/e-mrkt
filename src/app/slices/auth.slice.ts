import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.services";
import { SignUpDTO, LoginDTO } from "../dto/auth.dto";

export const Signup = createAsyncThunk(
  'auth/signUp',
  async (form: SignUpDTO, thunkAPI) => {
    try {
      const response = await AuthService.SignUp(form);
     
      return response; // Return the data
    } catch (err: any) {
      console.log('Thunk caught error:', err.response.data.message);
      const msg = err.response.data.message || 'Unknown error';
      console.log('Error message:', msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);


let initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}



const SignupSlice = createSlice({
    name: 'signup',
    initialState, 
    reducers: {},
    extraReducers(builder) {
        builder.addCase(Signup.pending, (state:any)=>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(Signup.fulfilled, (state:any, action:any)=>{
            state.user = action.payload
            state.loading = false;
            state.error = false;
        })
        builder.addCase(Signup.rejected, (state:any, action:any)=>{
            state.loading = false;
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default SignupSlice.reducer;