import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";



interface SearchResponseDTO{
     name:string,
    id:string,
    type:string
}
interface SearchState{
   respoonse: SearchResponseDTO[]|null,
   isSearchLoading:boolean,
   searchError:any | null
}


const initialState :SearchState = {
    respoonse: null,
    isSearchLoading: false,
    searchError: null
}

export const SearchItem = createAsyncThunk<
    SearchResponseDTO[],
    string,
    {rejectValue:string}
>(
    'products/search',
    async (value:string, {rejectWithValue})=>{
        try{
            const response = await ProductService.searchItem(value);
            return response.data
        }catch(error:any){
            return rejectWithValue(
                error
            )
        }
    }

)



const SearchItemSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        clearSearch(state){
            state.isSearchLoading = false
            state.respoonse = null,
            state.searchError = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(SearchItem.fulfilled, (state, action)=>{
            state.isSearchLoading = false,
            state.respoonse = action.payload
            console.log(state.respoonse, 'res')
            state.searchError = null
        })
        .addCase(SearchItem.rejected, (state, action )=>{
            state.isSearchLoading = false,
            state.searchError = action.error,
            state.respoonse = null
        })
        .addCase(SearchItem.pending, (state)=>{
            state.isSearchLoading = true,
            state.respoonse = null
        })
    }
})


export const {clearSearch} = SearchItemSlice.actions;
export default SearchItemSlice.reducer