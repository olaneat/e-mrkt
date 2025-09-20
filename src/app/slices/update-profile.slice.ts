import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileDTO, mapProfileDTO, ERROR_MESSAGES } from "../dto/profile.dto";
import AddressService from "../services/address.service";
import { UpdateAddress } from "./update-address.slice";

interface ProfileState{
    updateProfile:ProfileDTO | null
    updateProfileLoading: boolean,
    updateProfileError:any | null
}
const initialState: ProfileState = {
    updateProfile: null,
    updateProfileLoading:false, 
    updateProfileError:null
}


// interface ProfileDataDTO {
//     first_name: string,
//     last_name: string,
//     address: string,
//     lga:string,
//     phone_number:string,
//     state:string
//     id:string
//     img:string

// }

export const UpdateProfileData = createAsyncThunk<
    ProfileDTO,
    ProfileDTO,
   { rejectValue: string }
>(
    'profile/update-profile',
    async (profileForm:ProfileDTO, {rejectWithValue}) => {
        try{
            const payload:ProfileDTO ={
                address: profileForm.address,
                first_name: profileForm.first_name,
                last_name: profileForm.last_name,
                lga: profileForm.lga,
                phone_number: profileForm.phone_number,
                state: profileForm.state,
                id: profileForm.id,
                img: profileForm.img
            } 
            const update =  await AddressService.UpdateAddress(profileForm.id, payload);
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
            state.updateProfile = null;
            state.updateProfileLoading = false,
            state.updateProfileError = null
        }
    },
    extraReducers(builder) {
        builder.addCase(UpdateAddress.pending, (state)=>{
            state.updateProfile = null,
            state.updateProfileLoading = true,
            state.updateProfileError =null            
        })
        builder.addCase(UpdateAddress.fulfilled, (state, action)=>{
            state.updateProfileLoading = false,
            state.updateProfile = action.payload
            state.updateProfileError = null
        })
        builder.addCase(UpdateAddress.rejected, (state, action)=>{
            state.updateProfileError = action.error
            state.updateProfileLoading = false
            state.updateProfile = null
        })
    },
 })


 export const {clearAddress } = updateAddressSlice.actions;
 export default updateAddressSlice.reducer