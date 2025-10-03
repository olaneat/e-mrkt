export interface ProductDTO{
        name?:string;
        id?:string;
        category?:string;
        img?:string
        price?:number
    }

export interface CategoryProductDTO {
    
    category:string;
    message: string
    products:ProductDTO[]
    status:string

}
export const mapProductDTO = (data:any): CategoryProductDTO =>({
    category: data.category,
    products: data.data,
    message:data.msg,
    status: data.status
})

// export const mapProductListDTO = (data: any): CategoryProductDTO => {
    
//   };
  export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch categories', // Updated for categories
  };
  