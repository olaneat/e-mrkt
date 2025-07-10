import axios from "axios";
import env from "../../environment/env";
import { ProductDTO } from "../dto/products.dto";



 const getProductList = ()=>{
    const url = `${env.BASE_URL}/products/list`;
    return axios.get(url).catch();
 }

 const getProductDetail=(id:any)=>{
   const url = `${env.BASE_URL}/products/product-detail/${id}`;
   return axios.get(url).catch();
 }


 const addNewProduct = (data:ProductDTO) =>{
   const url = `${env.BASE_URL}/products/add-product`
   return axios.post(url, data)
 }

 const updateProduct = (data:ProductDTO, id:string) =>{
   const url = `${env.BASE_URL}/products/update-product/${id}`
   return axios.put(url, data)
 }
 
 const deleteProduct = (id:string) =>{
   const url = `${env.BASE_URL}/products/delete-product${id}`
   return axios.delete(url)
 }
 

 const  ProductService = {
    getProductList,
    getProductDetail,
    addNewProduct,
    updateProduct,
    deleteProduct
 }
 export default ProductService;
