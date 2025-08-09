import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { ProductDTO, ERROR_MESSAGES, mapProductListDTO } from "../dto/products.dto";

interface ProductState{
    products: ProductDTO[] | null,
    err: string | null,
    loading : boolean,
}

const initialState:ProductState = {
    products: null,
    loading: false,
    err:null
};

export const DisplayProductsByCategory = createAsyncThunk <
  ProductDTO[],
  string,
 { rejectValue: string }
>(
  'product/display-product-by-catgory',
  async (id, { rejectWithValue }) =>{
   try {
        const response = await ProductService.displayProductByCategory(id);
         let detail = mapProductListDTO(response.data); // Use plain function
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
        state.products = null;
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(DisplayProductsByCategory.fulfilled,(state, action)=>{
      state.products = action.payload,
      state.err = null,
      state.loading = false
    })
    .addCase(DisplayProductsByCategory.pending, (state)=>{
        state.err = null,
        state.loading = true,
        state.products = null
    })
    .addCase(DisplayProductsByCategory.rejected, (state, action)=>{
        state.err = action.payload || ERROR_MESSAGES.FETCH_FAILED,
        state.loading = false,
        state.products = null
    })
  }    
})







export const {clearProduct} = ProductByCategorySlice.actions
export default ProductByCategorySlice.reducer
