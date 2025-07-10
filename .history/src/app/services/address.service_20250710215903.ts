import env from "../../environment/env";
import api from "../interceptor/auth.interceptor";
const CreateAddress = ()=>{
  const url = `${env.BASE_URL}/profile/create`;
  return api.post(url).then();
}

const GetAddress = (id:string) =>{
  const url = `${env.BASE_URL}/profile/${id}/display`;
  return api.get(url).then();
}

const UpdateAddress = (id:string, data:any)=>{
  const url = `${env.BASE_URL}/profile/${id}/update`;
  return api.put(url, data).then();
}

const AddressService = {
    GetAddress,
    UpdateAddress,
    CreateAddress,
}
export default AddressService

