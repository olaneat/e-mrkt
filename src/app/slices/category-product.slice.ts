import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { CategoryProductDTO, ERROR_MESSAGES, mapProductDTO } from "../dto/cat-prodct.dto";

interface ProductState{
    
    categoryProducts: CategoryProductDTO | null,
    err: string | null,
    loading : boolean,
    category:string| null
}

const initialState:ProductState = {
    categoryProducts: null,
    loading: false,
    err:null,
    category: null
};

export const DisplayProductsByCategory = createAsyncThunk <
  CategoryProductDTO,
  string,
 { rejectValue: string }
>(
  'product/display-product-by-catgory',
  async (id, { rejectWithValue }) =>{
   try {
        const response = await ProductService.displayProductByCategory(id);
        console.log(response, 'res') 
        let detail = mapProductDTO(response.data); // Use plain function
         console.log(detail, 'de  ')
         return detail
      } catch (error:any){
      return rejectWithValue(
        error.response?.data?.error || ERROR_MESSAGES.FETCH_FAILED
      )
    }
  }
)










const ProductByCategorySlice = createSlice({
  name: 'product/display-product-by-catgory',
  initialState,
  reducers: {
    clearProduct(state){
        state.loading = false,
        state.err = null,
        state.categoryProducts = null;
        state.category = null
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(DisplayProductsByCategory.fulfilled,(state, action)=>{
      console.log(action.payload, 'action')
      state.categoryProducts = action.payload,
      state.err = null,
      state.loading = false
      
    })
    .addCase(DisplayProductsByCategory.pending, (state)=>{
        state.err = null,
        state.loading = true,
        state.categoryProducts = null
    })
    .addCase(DisplayProductsByCategory.rejected, (state, action)=>{
        state.err = action.payload || ERROR_MESSAGES.FETCH_FAILED,
        state.loading = false,
        state.categoryProducts = null
    })
  }    
})







export const {clearProduct} = ProductByCategorySlice.actions
export default ProductByCategorySlice.reducer
