import { createApi} from '@reduxjs/toolkit/query/react';
import { ProductDTO, mapProductListDTO } from '../dto/products.dto';
import ProductService from '../services/product.service';
import { rtkBaseQuery } from '../services/rksQuery';

// export const productListData = createApi({
//     reducerPath: 'product-list',
//     baseQuery: rtkBaseQuery,
//     endpoints: (builder)=>({
//         getProducts: builder.query<ProductDTO[], void>({
//             query: () =>'',
//               extraOptions: { maxRetries: 0 },
//                 keepUnusedDataFor: 60 * 60 * 24 * 30,// keep cache for 30 days
//             transformResponse: (response:any)=>{
//                 return mapProductListDTO(response)
//             }
//         })
//     })

// }) 
export const productListData = createApi({
  reducerPath: 'product-list',
  baseQuery: async () => ({ data: null }), // dummy
  endpoints: (builder) => ({
    getProducts: builder.query<ProductDTO[], void>({
      async queryFn() {
        if (!navigator.onLine) {
          return { data: undefined }; // OFFLINE → use cache
        }
        try {
          const result = await ProductService.getProductList();
          return { data: mapProductListDTO(result.data) };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: 'Failed' } };
        }
      },
      keepUnusedDataFor: 60 * 60 * 24 * 30, // 30 days cache
      // NO refetchOnMount HERE — E GO CAUSE ERROR
    }),
  }),
});
export const { useGetProductsQuery}  = productListData
