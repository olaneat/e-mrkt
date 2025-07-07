import { createAsyncThunk, createSlice , PayloadAction} from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { ProductDetailDTO, mapProductDetailDTO, ERROR_MESSAGES } from "../dto/product-detail.dto";
interface ProductState {
  product: ProductDetailDTO | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  product: null,
  isLoading: false,
  error: null,
};
export const displayProductDetail = createAsyncThunk<
  ProductDetailDTO,
  string, // Use string to match ProductDetail.id
  { rejectValue: string }
  >('display Product Detail',
    async (id, { rejectWithValue }) => {
      try {
        const response = await ProductService.getProductDetail(id);
        console.log(response.data)
         let detail = mapProductDetailDTO(response.data); // Use plain function
         console.log(detail, 'det')
         return detail
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || ERROR_MESSAGES.FETCH_FAILED
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
      state.error = null;
      state.isLoading = false; // Ensure consistent reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(displayProductDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(displayProductDetail.fulfilled, (state, action: PayloadAction<ProductDetailDTO>) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(displayProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || ERROR_MESSAGES.FETCH_FAILED;
      });
  },
});

// const ProductDetailSlce = createSlice({
//     name:"product-detail",
//     initialState,
//     reducers: {
//         clearProductDetail(state) {
//           state.product = null;
//           state.error = null;
//         },
//       },
//       extraReducers: (builder) => {
//         builder
//           .addCase(displayProductDetail.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//           })
//           .addCase(
//             displayProductDetail.fulfilled,
//             (state, action: PayloadAction<ProductDetailDTO>) => {
//               state.isLoading = false;
//               state.product = action.payload;
//               state.error = null; // Clear error on success
//             }
//           )
//           .addCase(displayProductDetail.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload || 'Failed to fetch product';
//           });
//       },
//     // reducers:{},
//     // extraReducers(builder) {
//     //     builder.addCase(displayProductDetail.fulfilled, (state, action)=>{
//     //         state.isLoading = false;
//     //         state.error = action.payload;
//     //         state.product = action.payload
//     //     })
//     // },
// })


export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;