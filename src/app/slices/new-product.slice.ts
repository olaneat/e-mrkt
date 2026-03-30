import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductService from '../services/product.service';
import { ProductDetailDTO } from 'app/dto/product-detail.dto';

interface ProductState{
  CreateProduct: ProductDetailDTO | null
  isCreateProductLoading: boolean,
  CreateProducttError: any | null
}

const initialState : ProductState = {
  CreateProduct : null,
  isCreateProductLoading: false,
  CreateProducttError: null
}
export interface ResponseDTO{
  message: string,
  status:string
}


export const CreateProduct = createAsyncThunk<
  any,
  any,
  {rejectValue: string}
>(
  'product/create-new',
  async(product:any, {rejectWithValue})=>{
    try{
      console.log(product, 'form')
      const response = await ProductService.addNewProduct(product);
      return response.data
    } catch(error:any){
      const errorMessage =
        error.response?.data?.msg ||
        error.message ||
        'Failed to create product. Please try again.';
        return rejectWithValue(errorMessage); 
    }
  }
)

const CreateProductSlice = createSlice({
  name: 'create-product',
  initialState,
  reducers: {
    clearProduct(state){
      state.CreateProduct = null;
      state.CreateProducttError = null;
      state.isCreateProductLoading = false
    },
  },
  extraReducers(builder){
    builder.addCase(CreateProduct.fulfilled, (state, action)=>{
      state.CreateProduct = action.payload;
      state.CreateProducttError = null;
      state.isCreateProductLoading = false
    }),
    builder.addCase(CreateProduct.pending, (state)=>{
      state.CreateProduct = null;
      state.isCreateProductLoading = true;
      state.CreateProducttError = null
    }),
    builder.addCase(CreateProduct.rejected, (state, action)=>{
      state.CreateProduct = null,
      state.CreateProducttError = action.error;
      state.isCreateProductLoading = false
    })
  }
})



export const {clearProduct} = CreateProductSlice.actions
export default CreateProductSlice.reducer