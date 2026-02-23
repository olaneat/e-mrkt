import { createAsyncThunk, createSlice , PayloadAction} from "@reduxjs/toolkit";
import AdminService from "../services/admin.services";
import { OrderStatusDTO } from "../dto/status.dto";

interface StatusCountState{
    statusCount: OrderStatusDTO | null,
    isStatusCountLoading: boolean,
    StatusCountError: string | null
}

const initialState: StatusCountState = {
    statusCount: null,
    isStatusCountLoading: false,
    StatusCountError: null
}

export const fetchStatusCount = createAsyncThunk<
    OrderStatusDTO,
    void,
    { rejectValue: string }
>(     
    'display Order by order count',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AdminService.getOrderStatusCount();
            return response
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || 'Failed to fetch order status count'
            );
        }
    }
)


const StatusCountSlice = createSlice({
    name: 'statusCount',
    initialState,
    reducers:{
        clearStatusCount(state){
            state.statusCount = null;
            state.isStatusCountLoading = false;
            state.StatusCountError = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchStatusCount.pending, (state)=>{
            state.isStatusCountLoading = true;
            state.StatusCountError = null
        })
        .addCase(fetchStatusCount.fulfilled, (state, action: PayloadAction<OrderStatusDTO>)=>{
            state.statusCount = action.payload,
            state.isStatusCountLoading = false,
            state.StatusCountError = null
        })
        .addCase(fetchStatusCount.rejected, (state, action)=>{
            state.isStatusCountLoading = false;
            state.StatusCountError = action.payload || 'Failed to fetch order status count'
        })
    }
})

export const {clearStatusCount} = StatusCountSlice.actions

export default StatusCountSlice.reducer