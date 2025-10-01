import api from "../interceptor/auth.interceptor";
import env from "../../environment/env";


const InitiatePayment = (data: any) => {
    console.log(data, 'da')
    const url = `${env.BASE_URL}/orders/initiate-payment`;
    setTimeout(()=>{}, 100000000)
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