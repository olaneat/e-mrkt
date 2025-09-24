import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileDTO, mapProfileDTO, ERROR_MESSAGES } from "../dto/profile.dto";
import { UpdateAddress } from "./update-address.slice";
import ProfileService from "../services/profile.service";

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
    any,
   { rejectValue: string }
>(
    'profile/update-profile',
    async (profileForm:any, {rejectWithValue}) => {
        try{
            
            const id = typeof profileForm.get === 'function' ? profileForm.get('id') : profileForm.id;
            const update =  await ProfileService.UpdateProfile(id, profileForm);
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