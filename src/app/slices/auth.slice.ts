import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.services";
import { SignUpDTO, LoginDTO } from "../dto/auth.dto";


export const Signup = createAsyncThunk(
    'auth/sign-up',
    async(form:SignUpDTO, thunkAPI)=>{
        try{
            const response = await AuthService.SignUp(form)
            // thunkAPI.dispatch()
            return response.data;
        }
        catch(err:any){
           const msg = (err.data.msg && 
                err.response.data.msg &&
                err.response
            ) 
            ||  err.message || err.toSting()
                
        }
    }
)


let initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
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
            state.user = [...action.payload]
            state.loading = false;
            state.error = false;
        })
        builder.addCase(Signup.pending, (state:any)=>{
            state.loading = false;
            state.error = true;
        })
    },
})


export default SignupSlice.reducer;