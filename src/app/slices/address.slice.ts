import AddressService from "../services/address.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileDTO, mapProfileDTO, ERROR_MESSAGES } from "../dto/profile.dto";


interface AddressState{
    address:ProfileDTO | null
    isLoading: boolean,
    error:string | null
}
const initialState: AddressState = {
    address: null,
    isLoading:false, 
    error:null
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
                console.log(detail, 'de')
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
            state.isLoading = false;
            state.error = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(DisplayAddress.pending, (state)=>{
            state.isLoading = true;
            state.error = null
        })
        .addCase(DisplayAddress.fulfilled, (state, action: PayloadAction<ProfileDTO>)=>{
            state.address = action.payload,
            state.isLoading = false,
            state.error = null
        })
        .addCase(DisplayAddress.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload || ERROR_MESSAGES.FETCH_FAILED
        })
    },
    
})


export const {cleaAddressDetail} = AddressDetailSlice.actions
export default AddressDetailSlice.reducer