import api from "../interceptor/auth.interceptor";
import env from "../../environment/env";


const InitiatePayment = (data: any) => {
    const url = `${env.BASE_URL}/orders/initiate-payment`;
    return api.post(url, data).then();
};

const verifyPayment = (reference:string) =>{
    const url = `${env.BASE_URL}/orders/verify-payment/${reference}`;
    return api.get(url).then();
}



const CartService = {
    InitiatePayment,
    verifyPayment
}

export default CartService;