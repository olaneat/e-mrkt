import axios from "axios";
import env from "../../environment/env";
import { SignUpDTO, LoginDTO, ProfileDTO } from "../dto/auth.dto";


const SignUp = (data:SignUpDTO)=>{
    const url = `${env.baseUrl}/account/registration`;
    return axios.post(url, data).then();
}

const Login = (data:LoginDTO) =>{
    const url = `${env.baseUrl}/account/login`;
    return axios.post(url, data).then();
}



const AuthService = {
    Login,
    SignUp,

}

export default AuthService;