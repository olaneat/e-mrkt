import axios, { AxiosInstance,  InternalAxiosRequestConfig, AxiosResponse} from "axios";
import env from "../../environment/env";
import localStorageService from "../services/local-storage.service";
const api: AxiosInstance = axios.create({
    baseURL: env.BASE_URL,
    headers:{
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if(!config.headers){
        config.headers = {} as any
    }
    const user = localStorageService.getItem('user');
    let token = user.payload.access_token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response:AxiosResponse)=>response,
    (error)=>{
        if(error.response.status == 401){
            window.location.href = 'sign-in'
        }
        return Promise.reject();
    }
)


export default api