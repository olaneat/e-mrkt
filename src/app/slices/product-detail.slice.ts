import { createAsyncThunk, createSlice , PayloadAction} from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { ProductDetailDTO, mapProductDetailDTO, ERROR_MESSAGES } from "../dto/product-detail.dto";
interface ProductState {
  product: ProductDetailDTO | null;
  loading: boolean;
  err: string | null;
}

// Initial state
const initialState: ProductState = {
  product: null,
  loading: false,
  err: null,
};
export const displayProductDetail = createAsyncThunk<
  ProductDetailDTO,
  string, // Use string to match ProductDetail.id
  { rejectValue: string }
  >('display Product Detail',
    async (id, { rejectWithValue }) => {
      try {
        const response = await ProductService.getProductDetail(id);
         let detail = mapProductDetailDTO(response.data); // Use plain function
         return detail
      } catch (err: any) {
        return rejectWithValue(
          err.response?.data?.err || ERROR_MESSAGES.FETCH_FAILED
        );
      }
    } 
  );

const productDetailSlice = createSlice({
  name: 'product-detail',
  initialState,
  reducers: {
    clearProductDetail(state) {
      state.product = null;
      state.err = null;
      state.loading = false; // Ensure consistent reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(displayProductDetail.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(displayProductDetail.fulfilled, (state, action: PayloadAction<ProductDetailDTO>) => {
        state.loading = false;
        state.product = action.payload;
        state.err = null;
      })
      .addCase(displayProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload || ERROR_MESSAGES.FETCH_FAILED;
      });
  },
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;