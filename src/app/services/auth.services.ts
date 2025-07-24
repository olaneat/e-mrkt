import axios from "axios";
import env from "../../environment/env";
import { SignUpDTO, LoginDTO, ProfileDTO } from "../dto/auth.dto";

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

const SignUp = (data:SignUpDTO)=>{
    const url = `${env.BASE_URL}/account/registration`;
    return axios.post(url, data).then();
}

const Login = (data:LoginDTO) =>{
    const url = `${env.BASE_URL}/account/login`;
    return axios.post(url, data).then();
}

const isTokenExpired =(token:string | null, loginTime:number | null):boolean =>{
    if(!token) return true;

    try {
    const payload: TokenPayload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload.exp, 'ex')
    const isJwtExpired = payload.exp * 1000 < Date.now();
    const isTimeUp = Date.now() - loginTime! > 24 * 60 * 60 * 1000;
    return isJwtExpired || isTimeUp;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
}


const AuthService = {
    Login,
    SignUp,
    isTokenExpired
}

export default AuthService;