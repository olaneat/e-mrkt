import env from "../../environment/env";
import { SignUpDTO, LoginDTO, ProfileDTO } from "../dto/auth.dto";
import api from "../../app/interceptor/auth.interceptor";
interface TokenPayload {
  exp: number;
  [key: string]: any;
}

const SignUp = (data:SignUpDTO)=>{
    const url = `${env.BASE_URL}/account/registration`;
    return api.post(url, data).then();
}

const Login = (data:LoginDTO) =>{
    const url = `${env.BASE_URL}/account/login`;
    return api.post(url, data).then();
}

const isTokenExpired =(token:string | null, loginTime:number | null):boolean =>{
    if(!token) return true;

    try {
    const payload: TokenPayload = JSON.parse(atob(token.split('.')[1]));
    const isJwtExpired = payload.exp * 1000 < Date.now();
    const isTimeUp = Date.now() - loginTime! > 24 * 60 * 60 * 1000;
    return isJwtExpired || isTimeUp;
  } catch (error) {
    return true;
  }
}

const changePassword = (data:any)=>{
  const url = `${env.BASE_URL}/account/${data.id}/change-password`;
  return api.patch(url, data).then();
}

const AuthService = {
    Login,
    SignUp,
    isTokenExpired,
    changePassword
}

export default AuthService;