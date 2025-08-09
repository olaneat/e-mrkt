import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { setMessage } from "./msg";
import CategoryService from "../services/categories.service";
import { CategoryDTO, ERROR_MESSAGES, mapCategoryListDTO} from '../dto/categories.dto';
interface CategoryState {
    categories: CategoryDTO[] | null;
    error: string | null;
    isLoading :boolean;
}
const initialState: CategoryState = {
    categories: null,
    isLoading: false,
    error: null
}

export const newCategorySlice = createAsyncThunk(
    'category/new-category',
    async(form, thunkAPI)=>{
        try{
            const response = await  CategoryService.createCategory(form)
            return response.data
            // thunkAPI.dispatch(setMessage(response.data.msg))
        }
        catch(err:any){
            const msg = (err.data.msg && 
                err.response.data.msg &&
                err.response
            ) 
            ||  err.message || err.toSting()
            // thunkAPI.dispatch(setMessage(msg))
            // return thunkAPI.rejectWithValue()    
        }
    }
    
)


export const displayCategories= createAsyncThunk<
  CategoryDTO[],
  void,
  {  rejectValue: string}
  >(
    'category/display categories list',
    async (_, { rejectWithValue }) => {
      try {
        const response = await CategoryService.displayCategories();
        return mapCategoryListDTO(response.data);
      } catch (error: any) {
        // const msg =
        //   error.response?.data?.msg ||
        //   error.message ||
        //   ERROR_MESSAGES.FETCH_FAILED;
        // return rejectWithValue(msg);
        return rejectWithValue(
          error.response?.data?.error || ERROR_MESSAGES.FETCH_FAILED
        );
      }
    }
);



const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearCategories(state) {
          state.categories = null;
          state.error = null;
          state.isLoading = false;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(displayCategories.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(displayCategories.fulfilled, (state, action: PayloadAction<CategoryDTO[]>) => {
            state.isLoading = false;
            state.categories = action.payload;
            state.error = null;
          })
          .addCase(displayCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || ERROR_MESSAGES.FETCH_FAILED;
          });
      },
    //     builder.addCase(newCategorySlice.fulfilled, (state:any, action:any)=>{
    //         return Object.assign({},state, {
    //             category : state.categories.concat(action.payload)
    //         })
    //     },)
    //   builder.addCase(newCategorySlice.rejected, (state, action)=>{
    //     return Object.assign({}, state, {
    //         category: state.categories
    //     })
    // })
        
})


export const  {clearCategories} = CategorySlice.actions;
export default CategorySlice.reducer


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import CategoryService from "../services/categories.service";
// const initialState = {};
// export const DisplayCategories = createAsyncThunk(
//     'category/list',
//     async()=>{
//         try {
//             const response = await CategoryService.displayCategories()
//             return response.data
//         }catch(err:any){
//             const msg = (
//                 err.response && err.data.msg
//                 && err.response.data.msg
//             ) || err.message || 
//             err.toString()
//         }
//     }
// )

// const CategorySlice = createSlice({
//     name: 'category-list',
//     initialState, 
//     reducers: {},
//     extraReducers(builder) {
//         builder.addCase(DisplayCategories.fulfilled,(state:any, action:any)=>{
//             return Object.assign({}, state, {
//                 categories: state.categories.concat(action.payload)
//             })
//         })
//         builder.addCase(DisplayCategories.rejected,(state:any, action:any)=>{
//             return Object.assign({}, state, {
//                 categories: state.categories
//             })
//         })
//     },
// })


