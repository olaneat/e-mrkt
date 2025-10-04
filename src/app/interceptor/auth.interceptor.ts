import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import env from "../../environment/env";
import localStorageService from "../services/local-storage.service";
const api: AxiosInstance = axios.create({
  baseURL: env.BASE_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};

    // Attach Bearer token
    const user = localStorageService.getItem("user");
    const token = user?.payload?.access_token || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorageService.removeItem('user')
      window.location.href = "sign-in";
    }
    return Promise.reject({
      message: error.message,
      status: error.response?.status,
      data: error.response?.data || error.message,
    });
  }
);

export default api;


// import axios, { AxiosInstance,  InternalAxiosRequestConfig, AxiosResponse} from "axios";
// import env from "../../environment/env";
// import localStorageService from "../services/local-storage.service";
// const api: AxiosInstance = axios.create({
//     baseURL: env.BASE_URL,
    
// });

// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     config.headers = config.headers || {};
//     const user = localStorageService.getItem('user');
//     let token = user?.payload?.access_token || null
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//     (response:AxiosResponse)=>response,
//     (error)=>{
//       if(error.response.status == 401){
//           window.location.href = 'sign-in'
//       }
//       return Promise.reject({
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data || error.message,
//       });
//     }
// )


// export default api