export interface ProductDTO {
    name?:string;
    id?:string;
    category?:string;
    img?:string
    price?:number

}
export const mapProductDTO = (data:any): ProductDTO =>({
    id: data.id ?? undefined,
    name: data.name ?? undefined,
    img: data.img ?? undefined,
    price: data.price ?? undefined,
    category: data.category ?? undefined
})

export const mapProductListDTO = (data: any): ProductDTO[] => {
    const mapped = Array.isArray(data)
      ? data.map((item) => mapProductDTO(item))
      : [];
    // Debug: Log mapped data (development only)
    // if (process.env.NODE_ENV === 'development') {
    // }
    return mapped;
  };
  export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch categories', // Updated for categories
  };
  

  export interface OrderSearchDTO{
    searchText: string
    status?:string
  } 