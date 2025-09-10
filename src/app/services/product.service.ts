import env from "../../environment/env";
import { ProductDTO } from "../dto/products.dto";
import api from "../../app/interceptor/auth.interceptor";
import axios from "axios";

 const getProductList = ()=>{
   const url = `${env.BASE_URL}/products/list`;
    return api.get(url);
 }

 const getProductDetail=(id:any)=>{
   const url = `${env.BASE_URL}/products/product-detail/${id}`;
   return api.get(url);
 }


 const addNewProduct = (data:ProductDTO) =>{
   const url = `${env.BASE_URL}/products/add-product`
   return api.post(url, data);
 }

 const updateProduct = (data:ProductDTO, id:string) =>{
   const url = `${env.BASE_URL}/products/update-product/${id}`
   return api.put(url, data);
 }
 
 const deleteProduct = (id:string) =>{
   const url = `${env.BASE_URL}/products/delete-product${id}`;
   return api.delete(url)
 }

 const displayProductByCategory =(id:string)=>{
  const url =''
  // const url = `${env.BASE_URL}/products/product-category-list/${id}`;
  return api.get(url)
 }
 

 const  ProductService = {
    getProductList,
    getProductDetail,
    addNewProduct,
    updateProduct,
    deleteProduct,
    // displayProductByCategory
 }
 export default ProductService;
