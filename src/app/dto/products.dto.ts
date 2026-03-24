export interface ProductResponse{
  count:number,
  next:any,
  previous:any, 
  results: ProductDTO[];
}
export interface ProductDTO {
    name?:string;
    id?:string;
    category?:string;
    img?:string
    price?:number
    quantity?:number
}
export const mapProductDTO = (data:any): ProductDTO =>({
    id: data.id ?? undefined,
    name: data.name ?? undefined,
    img: data.img ?? undefined,
    price: data.price ?? undefined,
    category: data.category ?? undefined,
    quantity: data.stock ?? undefined
})

export const mapProductListDTO = (data: any) : ProductResponse =>({
  count: data.count ?? 0,
  next : data.next ?? undefined,
  previous : data.previous ?? undefined,
  results : data.results ?? []  

})

// export const mapProductListDTO = (data: any): ProductResponse => {
    
//     // Debug: Log mapped data (development only)
//     // if (process.env.NODE_ENV === 'development') {
//     // }
//     return mapped;
//   };
// export const mapProductListDTO = (data: any): ProductDTO[] => {
//     const mapped = Array.isArray(data)
//       ? data.map((item) => mapProductDTO(item))
//       : [];
//     // Debug: Log mapped data (development only)
//     // if (process.env.NODE_ENV === 'development') {
//     // }
//     return mapped;
//   };
  export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch categories', // Updated for categories
  };
  

  export interface OrderSearchDTO{
    searchText: string
    status?:string
    peroid?:string
  } 