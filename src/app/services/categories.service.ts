import axios from "axios";
import env from "../../environment/env";
const displayCategories = ()=>{
    const url = `${env.BASE_URL}/products/list-category`
   return  axios.get(url).catch()
}
const createCategory = (form:any)=>{
    const url = `${env.BASE_URL}/products/add-category`;
    return axios.post(url, form)
    // return axios.post(form, {headers: AuthInterceptor()})
}


const updateCategory = (id:string, form:any) =>{
    const url = `${env.BASE_URL}/products/update-category/${id}`
    return axios.put(url, form)

    // return axios.put(url, form, {headers:AuthInterceptor()})
}

const deleteCategory = (id:string) =>{
    const url = `${env.BASE_URL}/products/delete-category/${id}`;
    return axios.delete(url)
    // return axios.delete(url, {headers:AuthInterceptor()})
}

const listCategory = ()=>{
    const url = `${env.BASE_URL}/products/list-category`
    return axios.get(url)
}

const displayCategoryById = (id:string) =>{
    const url =    `${env.BASE_URL}/products/category-detail/${id}`
    return axios.get(url)
}

const createManufacturer = (form:any)=>{
    const url = `${env.BASE_URL}/products/add-manufacturer`
    return axios.post(url, form)
    // return axios.post(form, {headers: AuthInterceptor()})
}

const manufacturerDetail = (id:string)=>{
    const url = `${env.BASE_URL}/product/manufacturer-detail/${id}`;
    return axios.get(url)
}
const updateManufacturer = (id:string, form:any) =>{
    const url = `${env.BASE_URL}/products/update-manufacturer/${id}`;
    return axios.put(url, form)

    // return axios.put(url, form, {headers:AuthInterceptor()})
}

const deleteManufacturer = (id:string) =>{
    const url = `${env.BASE_URL}/products/delete-manufacturer/${id}`;
    return axios.put(url)

    // return axios.delete(url, {headers:AuthInterceptor()})
}

const listManufacturer = ()=>{
    const url = `${env.BASE_URL}/products/list-manufacturer`
    return axios.get(url)
}

const displayotherProductsByManufacturer = (id:string) =>{
    const url = `${env.BASE_URL}/products/manufacturer-detail/${id}`
    return axios.get(url)
}



const CategoryService = {
    displayCategories,
    updateCategory,
    displayCategoryById,
    displayotherProductsByManufacturer,
    updateManufacturer,
    deleteCategory,
    deleteManufacturer,
    listCategory,
    listManufacturer,
    createManufacturer,
    createCategory,
    manufacturerDetail
}


export default CategoryService