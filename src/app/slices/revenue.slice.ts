import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderSearchDTO } from "../dto/products.dto";
import { RevenueAnalysisDTO, ERROR_MESSAGES } from "../dto/revenue.dto";
import AdminService from "../services/admin.services";



interface RevenueState {
    revenue:RevenueAnalysisDTO | null,
    isReveenueLoading:boolean,
    revenueErr: string | null
}
const initialState:RevenueState ={
    revenue: null,
    isReveenueLoading:false, 
    revenueErr: ''
}
export const RevenueMetrics = createAsyncThunk<
  any,
  string,
  {rejectValue:string}
>(
  'revenue-metrics',
  async(values, {rejectWithValue})=>{
    try{
        const response = await AdminService.getRevenueMetrics(values);
        return response


    }catch(error:any){
        return rejectWithValue(
            error.response?.data?.err || ERROR_MESSAGES.FETCH_FAILED
            
        )
    }    
  }
)



const RevenueSlice = createSlice({
  name: 'revenue-metrics',
  initialState,
  reducers:{
    clearRevenue(state){
      state.isReveenueLoading = false;
      state.revenue = null;
      state.revenueErr = ""
    }
  },
  extraReducers: (builder) =>{
    builder
    .addCase(RevenueMetrics.fulfilled, (state, action: PayloadAction<RevenueAnalysisDTO>)=>{
        state.isReveenueLoading = false;
        state.revenue = action.payload;
        state.revenueErr = null
    })
    .addCase(RevenueMetrics.pending, (state)=>{
        state.isReveenueLoading = true;
        state.revenue = null;
        state.revenueErr = ""
    })
    .addCase(RevenueMetrics.rejected, (state, action)=>{
        state.revenue = null;
        state.isReveenueLoading = false;
        state.revenueErr = action.payload || ERROR_MESSAGES.FETCH_FAILED
    })
  }
})

export const {clearRevenue} =RevenueSlice.actions;
export default RevenueSlice.reducer;