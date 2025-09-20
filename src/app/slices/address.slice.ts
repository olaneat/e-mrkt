import AddressService from "../services/address.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressDTO, mapAddressDTO, ERROR_MESSAGES,  } from "../dto/address.dto";


interface AddressState{
    address:AddressDTO | null
    addressIsLoading: boolean,
    err:string | null
}
const initialState: AddressState = {
    address: null,
    addressIsLoading:false, 
    err:null
}
export const DisplayAddress = createAsyncThunk<
    AddressDTO,
    string,
    {rejectValue: string }
    >
    ( 'profile detail',
        async (id, {rejectWithValue }) => {
            try{
                const response = await AddressService.GetAddress(id);
                let detail = mapAddressDTO(response.data.data);
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
            state.addressIsLoading = false;
            state.err = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(DisplayAddress.pending, (state)=>{
            state.addressIsLoading = true;
            state.err = null
        })
        .addCase(DisplayAddress.fulfilled, (state, action: PayloadAction<AddressDTO>)=>{
            state.address = action.payload,
            state.addressIsLoading = false,
            state.err = null
        })
        .addCase(DisplayAddress.rejected, (state, action)=>{
            state.addressIsLoading = false;
            state.err = action.payload || ERROR_MESSAGES.FETCH_FAILED
        })
    },
    
})


export const {cleaAddressDetail} = AddressDetailSlice.actions
export default AddressDetailSlice.reducer