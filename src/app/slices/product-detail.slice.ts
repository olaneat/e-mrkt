import { createAsyncThunk, createSlice , PayloadAction} from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { ProductDetailDTO, mapProductDetailDTO, ERROR_MESSAGES } from "../dto/product-detail.dto";
interface ProductState {
  product: ProductDetailDTO | null;
  isDetailloading: boolean;
  detailErr: string | null;
}

// Initial state
const initialState: ProductState = {
  product: null,
  isDetailloading: false,
  detailErr: null,
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
      state.detailErr = null;
      state.isDetailloading = false; // Ensure consistent reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(displayProductDetail.pending, (state) => {
        state.isDetailloading = true;
        state.detailErr = null;
      })
      .addCase(displayProductDetail.fulfilled, (state, action: PayloadAction<ProductDetailDTO>) => {
        state.isDetailloading = false;
        state.product = action.payload;
        state.detailErr = null;
      })
      .addCase(displayProductDetail.rejected, (state, action) => {
        state.isDetailloading = false;
        state.detailErr = action.payload || ERROR_MESSAGES.FETCH_FAILED;
      });
  },
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;