import api from "../interceptor/auth.interceptor";
import env from "../../environment/env";
import { OrderStatusDTO } from "../dto/status.dto";


const getOrderStatusCount = () =>{
    const url = `${env.BASE_URL}/admin/status-count`;
    return api.get(url).then((response) => response.data.data as OrderStatusDTO);
}

const AdminService = {
    getOrderStatusCount

}

export default AdminService;