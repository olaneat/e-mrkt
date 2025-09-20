import ProfileService from "../services/profile.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileDTO, mapProfileDTO, ERROR_MESSAGES } from "../dto/profile.dto";


interface ProfileState{
    Profile:ProfileDTO | null
    profileLoading: boolean,
    profileErr:string | null
}
const initialState: ProfileState = {
    Profile: null,
    profileLoading:false, 
    profileErr:null
}
export const DisplayProfile = createAsyncThunk<
    ProfileDTO,
    string,
    {rejectValue: string }
    >
    ( 'profile detail',
        async (id, {rejectWithValue }) => {
            try{
                const response = await ProfileService.GetProfile(id);
                let detail = mapProfileDTO(response.data.data);
                return detail
            }catch(error:any){
                return rejectWithValue(
                    error.response?.data?.error || ERROR_MESSAGES.FETCH_FAILED
                )
            }
         }
)

 
const ProfileDetailSlice = createSlice({
    name: 'Profile-detail',
    initialState,
    reducers:{
        cleaProfileDetail(state){
            state.Profile = null;
            state.profileLoading = false;
            state.profileErr = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(DisplayProfile.pending, (state)=>{
            state.profileLoading = true;
            state.profileErr = null
        })
        .addCase(DisplayProfile.fulfilled, (state, action: PayloadAction<ProfileDTO>)=>{
            state.Profile = action.payload,
            state.profileLoading = false,
            state.profileErr = null
        })
        .addCase(DisplayProfile.rejected, (state, action)=>{
            state.profileLoading = false;
            state.profileErr = action.payload || ERROR_MESSAGES.FETCH_FAILED
        })
    },
    
})


export const {cleaProfileDetail} = ProfileDetailSlice.actions
export default ProfileDetailSlice.reducer