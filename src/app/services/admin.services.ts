import api from "../interceptor/auth.interceptor";
import env from "../../environment/env";
import { OrderStatusDTO } from "../dto/status.dto";
import { OrdersDTO, OrderResponseDTO } from "app/dto/orders.dto";
import { OrderSearchDTO } from "../dto/products.dto";


const getOrderStatusCount = () =>{
    const url = `${env.BASE_URL}/admin/status-count`;
    return api.get(url).then((response) => response.data.data as OrderStatusDTO);
}

const getTotalOrders=(data:OrderSearchDTO)=>{
    const url = `${env.BASE_URL}/admin/order-list`;
    console.log(url, 'url')
    let query = "";
    if(data.searchText){
        query =`?search=${encodeURIComponent(data.searchText)}&`
    }
    if(data.status){
        query += `?status=${encodeURIComponent(data.status)}`
    }
    return api.get(url + query).then()
    // return api.get(url).then((response) =>response.data)

}
    
const getRevenueMetrics = (period:string, start?:string, end?:string) =>{
    const url = `${env.BASE_URL}/admin/revenue-metrics`;
    let query = "";
    if(period){
        query = `?period=${encodeURIComponent(period)}`
    }
    if(start || end){
        query += `?start=${encodeURIComponent(start || "")}&end=${encodeURIComponent(end || "")}`
    }
    return api.get(url+query).then((response) => response.data);
}


const AdminService = {
    getOrderStatusCount,
    getTotalOrders,
    getRevenueMetrics

}

export default AdminService;