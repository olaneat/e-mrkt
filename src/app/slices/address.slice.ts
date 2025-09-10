import AddressService from "../services/address.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileDTO, mapProfileDTO, ERROR_MESSAGES } from "../dto/profile.dto";


interface AddressState{
    address:ProfileDTO | null
    loading: boolean,
    err:string | null
}
const initialState: AddressState = {
    address: null,
    loading:false, 
    err:null
}
export const DisplayAddress = createAsyncThunk<
    ProfileDTO,
    string,
    {rejectValue: string }
    >
    ( 'profile detail',
        async (id, {rejectWithValue }) => {
            try{
                const response = await AddressService.GetAddress(id);
                let detail = mapProfileDTO(response.data.data);
                return detail
            }catch(error:any){
                return rejectWithValue(
                    error.response?.data?.error || ERROR_MESSAGES.FETCH_FAILED
                )
            }
         }
)

 
const AddressDetailSlice = createSlice({
    name: 'address-detail',
    initialState,
    reducers:{
        cleaAddressDetail(state){
            state.address = null;
            state.loading = false;
            state.err = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(DisplayAddress.pending, (state)=>{
            state.loading = true;
            state.err = null
        })
        .addCase(DisplayAddress.fulfilled, (state, action: PayloadAction<ProfileDTO>)=>{
            state.address = action.payload,
            state.loading = false,
            state.err = null
        })
        .addCase(DisplayAddress.rejected, (state, action)=>{
            state.loading = false;
            state.err = action.payload || ERROR_MESSAGES.FETCH_FAILED
        })
    },
    
})


export const {cleaAddressDetail} = AddressDetailSlice.actions
export default AddressDetailSlice.reducer