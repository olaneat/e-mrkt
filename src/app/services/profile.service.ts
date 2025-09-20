import env from "../../environment/env";
import api from "../interceptor/auth.interceptor";
const CreateProfile = ()=>{
  const url = `${env.BASE_URL}/profile/create`;
  return api.post(url).then();
}

const GetProfile = (id:string) =>{
  const url = `${env.BASE_URL}/profile/${id}/display`;
  return api.get(url).then();
}

const UpdateProfile = (id:string, data:any)=>{
  const url = `${env.BASE_URL}/profile/${id}/update`;
  return api.put(url, data).then();
}

const ProfileService = {
    GetProfile,
    UpdateProfile,
    CreateProfile,
}
export default ProfileService

