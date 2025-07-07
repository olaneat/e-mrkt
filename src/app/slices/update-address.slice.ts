import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileDTO, mapProfileDTO, ERROR_MESSAGES } from "../dto/profile.dto";
import AddressService from "../services/address.service";

interface AddressState{
    address:AddressDTO | null
    isLoading: boolean,
    error:any | null
}
const initialState: AddressState = {
    address: null,
    isLoading:false, 
    error:null
}


interface AddressDTO {
    first_name: string,
    last_name: string,
    address: string,
    lga:string,
    phone_number:string,
    state:string

}

export const UpdateAddress = createAsyncThunk<
    ProfileDTO,
    ProfileDTO,
   { rejectValue: string }
>(
    'address/update-address',
    async (addressForm:ProfileDTO, {rejectWithValue}) => {
        try{
            const payload:AddressDTO ={
                address: addressForm.address,
                first_name: addressForm.first_name,
                last_name: addressForm.last_name,
                lga: addressForm.lga,
                phone_number: addressForm.phone_number,
                state: addressForm.state
            } 
            const update =  await AddressService.UpdateAddress(addressForm.id, payload);
            return update.data
        }catch(error: any){
           const errorMessage =
            error.response?.data?.msg ||
            error.message ||
            'Failed to Update profile. Please try again.';
            return rejectWithValue(errorMessage); 
        }
    }
 )


 const updateAddressSlice = createSlice({
    name:'update-address',
    initialState,
    reducers:{
        clearAddress(state){
            state.address = null;
            state.isLoading = false,
            state.error = null
        }
    },
    extraReducers(builder) {
        builder.addCase(UpdateAddress.pending, (state)=>{
            state.address = null,
            state.isLoading = true,
            state.error =null            
        })
        builder.addCase(UpdateAddress.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.address = action.payload
            state.error = null
        })
        builder.addCase(UpdateAddress.rejected, (state, action)=>{
            state.error = action.error
            state.isLoading = false
            state.address = null
        })
    },
 })


 export const {clearAddress } = updateAddressSlice.actions;
 export default updateAddressSlice.reducer