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




export const DisplayProducts = createAsyncThunk<
  ProductDTO[],
  void,
  {  rejectValue: string}
  >(
    'product list',
    async (_, { rejectWithValue }) => {
      try {
        const response = await ProductService.getProductList();
        return mapProductListDTO(response.data);
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || ERROR_MESSAGES.FETCH_FAILED
        );
      }
    }
);

const ProductSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        clearProducts(state) {
          state.products = null;
          state.err = null;
          state.loading = false;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(DisplayProducts.pending, (state) => {
            state.loading = true;
            state.err = null;
          })
          .addCase(DisplayProducts.fulfilled, (state, action: PayloadAction<ProductDTO[]>) => {
            state.loading = false;
            state.products = action.payload;
            state.err = null;
          })
          .addCase(DisplayProducts.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload || ERROR_MESSAGES.FETCH_FAILED;
          });
      },
    
})


export const {clearProducts}  = ProductSlice.actions
export default ProductSlice.reducer