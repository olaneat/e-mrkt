import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.services";
import localStorageService from "../services/local-storage.service";
interface LoginRequestDTO {
    email: string;
    password: string;
  }

interface LoginResponseDTO {
  user: {
    id: string;
    email: string;
    first_name?: string; // Optional, adjust based on your API
    last_name?: string
  };
  refresh_token: string;
  access_token: string;

}
interface LoginState {
    user: LoginResponseDTO['user'] | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: any | null;
  }

// Initial state
const initialState: LoginState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  export const Login = createAsyncThunk<
  LoginResponseDTO, // Return type
  LoginRequestDTO, // Argument type
  { rejectValue: string } // ThunkAPI reject value type
>('auth/login', async (form: LoginRequestDTO, { rejectWithValue }) => {
  try {
    const response = await AuthService.Login(form);
    console.log(response.data, 'res')
    return response.data; // { user, token }
  } catch (err: any) {
    console.log(err.response.data.non_field_errors[0], 'err')
    const errorMessage =
      err.response.data.non_field_errors[0] ||
      err.message ||
      'Failed to log in. Please try again.';
    return rejectWithValue(errorMessage);
  }
});


const LoginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.token = null
            localStorageService.clearItem();
        },
        clearError: (state) => {
            state.error = null;
          },
    },
    extraReducers(builder) {
        builder
        .addCase(Login.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(Login.fulfilled, (state, action)=>{
            state.isAuthenticated = true;
            state.error = null
            state.user = action.payload.user;
            state.token = action.payload.refresh_token;
            console.log(state, 'state')
            localStorageService.saveItem('user',action.payload);
            

        })
        .addCase(Login.rejected, (state, action)=>{
          console.log(action, 'action')
            state.isLoading = false;
            state.error = action.error
        })
    },
})


export const { logout, clearError } = LoginSlice.actions;
export default LoginSlice.reducer;