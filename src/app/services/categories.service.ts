import api from "../../app/interceptor/auth.interceptor";
import env from "../../environment/env";
const displayCategories = ()=>{
    const url = `${env.BASE_URL}/products/list-category`
   return  api.get(url).catch()
}
const createCategory = (form:any)=>{
    const url = `${env.BASE_URL}/products/add-category`;
    return api.post(url, form)
    // return api.post(form, {headers: AuthInterceptor()})
}


const updateCategory = (id:string, form:any) =>{
    const url = `${env.BASE_URL}/products/update-category/${id}`
    return api.put(url, form)

    // return api.put(url, form, {headers:AuthInterceptor()})
}

const deleteCategory = (id:string) =>{
    const url = `${env.BASE_URL}/products/delete-category/${id}`;
    return api.delete(url)
    // return api.delete(url, {headers:AuthInterceptor()})
}

const listCategory = ()=>{
    const url = `${env.BASE_URL}/products/list-category`
    return api.get(url)
}

const displayCategoryById = (id:string) =>{
    const url =    `${env.BASE_URL}/products/category-detail/${id}`
    return api.get(url)
}

const createManufacturer = (form:any)=>{
    const url = `${env.BASE_URL}/products/add-manufacturer`
    return api.post(url, form)
    // return api.post(form, {headers: AuthInterceptor()})
}

const manufacturerDetail = (id:string)=>{
    const url = `${env.BASE_URL}/product/manufacturer-detail/${id}`;
    return api.get(url)
}
const updateManufacturer = (id:string, form:any) =>{
    const url = `${env.BASE_URL}/products/update-manufacturer/${id}`;
    return api.put(url, form)

    // return api.put(url, form, {headers:AuthInterceptor()})
}

const deleteManufacturer = (id:string) =>{
    const url = `${env.BASE_URL}/products/delete-manufacturer/${id}`;
    return api.put(url)

    // return api.delete(url, {headers:AuthInterceptor()})
}

const listManufacturer = ()=>{
    const url = `${env.BASE_URL}/products/list-manufacturer`
    return api.get(url)
}

const displayotherProductsByManufacturer = (id:string) =>{
    const url = `${env.BASE_URL}/products/manufacturer-detail/${id}`
    return api.get(url)
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