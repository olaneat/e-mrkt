import api from "../interceptor/auth.interceptor";
import env from "../../environment/env";


const InitiatePayment = (data: any) => {
    console.log('Initiating order with data:', data);
    const url = `${env.BASE_URL}/orders/initiate-payment`;
    console.log('POST URL:', url);
    return api.post(url, data).then();
};


const CartService = {
    InitiatePayment
}

export default CartService;