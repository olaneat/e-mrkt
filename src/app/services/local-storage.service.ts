import env from "environment/env";


const saveItem = (key:string, value:any)=>{
    let data = JSON.stringify(value)
    localStorage.setItem(key, data)
}



const getItem = (key:any) =>{
   return JSON.parse(localStorage.getItem(key)!)
} 

const clearItem = ()=>{
    localStorage.clear()
}


const localStorageService = {
    saveItem,
    getItem,
    clearItem
}

export default localStorageService;