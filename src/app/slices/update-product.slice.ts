import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductDetailDTO } from "../dto/product-detail.dto";
import ProductService from "../services/product.service";



interface UpdateProductState{   
    updateProduct: ProductDetailDTO | null,
    isProductingUpdating: boolean,
    isUpdateError: any | null
 }

const  initialState: UpdateProductState = {
    updateProduct: null,
    isProductingUpdating: false,
    isUpdateError: null
 }

 export const UpdateProduct = createAsyncThunk<
    ProductDetailDTO,
    any,

    {rejectValue: string}
 >(
    'product/update-product',
    async(ProductForm:any, {rejectWithValue})=>{  
        try{
            console.log('Updating product with form data:', ProductForm, 'jell');
            const rawId =
                typeof ProductForm.get === 'function'
                    ? ProductForm.get('id')
                    : ProductForm.id;

            const id = typeof rawId === 'string' ? rawId : '';
            console.log('Updating product with id:', id, 'and form data:', ProductForm);
            const response = await ProductService.updateProduct(ProductForm, id);
            return response.data
        }catch(error:any){
            const errorMessage =
            error.response?.data?.msg ||
            error.message ||
            'Failed to update product. Please try again.';
            return rejectWithValue(errorMessage); 
        }
     }
 )


 const UpdateProductSlice = createSlice({
    name: 'update-product',
    initialState,
    reducers:{
        clearUpdateProduct(state){
            state.updateProduct = null;
            state.isProductingUpdating = false;
            state.isUpdateError = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(UpdateProduct.pending, (state)=>{
            state.isProductingUpdating = true;
            state.isUpdateError = null
        }),
        builder.addCase(UpdateProduct.fulfilled, (state, action: PayloadAction<ProductDetailDTO>)=>{
            state.updateProduct = action.payload;
            state.isProductingUpdating = false;
            state.isUpdateError = null
        }),
        builder.addCase(UpdateProduct.rejected, (state, action)=>{
            state.isProductingUpdating = false;
            state.isUpdateError = action.payload || 'Failed to update product';
        })
    }
 })

 export const {clearUpdateProduct} = UpdateProductSlice.actions;
 export default UpdateProductSlice.reducer
 
 export interface ResponseDTO{
  message: string,
  status:string
}