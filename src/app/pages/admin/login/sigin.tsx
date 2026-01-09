import React, {useEffect, useState} from "react";
import { AppDispatch } from 'app/store';
import ToastComponent from '../../../components/toast/toast';
import localStorageService from '../../../services/local-storage.service';
import { RootState } from '../../../store';
import { RequestPassword } from '../../../slices/request-password.slice';
import "./style.scss";
import { logout, Login } from "../../../slices/login.slice";
import InputField from "../../../components/input-field/input-field";
import Button from "../../../components/btns/btn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const AdminSignInPage = () =>{
  // const imgs = icons.Images
  const [forgotPswd, setForgpswd] = useState<boolean>(false);
  const {isLoading, isAuthenticated}   = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [title, setTitle] = useState<string>('')
  const [msg, setMsg] = useState<string>('')
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastType, setToastType] = useState<string>('')
  const [formData, setFormData] = useState({
    email: '',
    password:'',
  })
  const [errMsg, setErrMsg] = useState({
    email: '',
    password:''
  })
   const handleErr = (name: string, event:any)=>{
    if(name=="email"){
      setErrMsg((prev)=>({
        ...prev,
        email: !emailPattern.test(event.target.value) ? 'Enter a valid email address': '' 
      }))
    }
    
    if(name=="password"){
      setErrMsg((prev)=>({
        ...prev,
        password: formData.password.length<8 ?'Password must be 8 character long': '' 
      }))
    }
  }
  const closeToast = ()=>{
      setShowToast(false)
    }
  const getData=(name:string, data:any)=>{
    setFormData((prev)=>({
      ...prev, 
      [name]:data
    }))
       
  }
    useEffect(()=>{
      logout()
    })

    
    const userLogin=()=>{
    dispatch(Login(formData) as any).then((res:any)=>{
      console.log(res, 'response')
      if(res.payload.status_code==200 && (res.payload.user.is_admin || res.payload.user.is_staff)){
      //  const previousUrl = (location.state as { from?: string })?.from || searchParams.get('redirect') || '/'
        // navigate(decodeURIComponent(previousUrl))
        setShowToast(true);
        console.log(res, 'res')
        setTitle('Login Successful');
        setMsg('Login successfully');
        setToastType('success')
        localStorageService.saveItem('user', res)
        navigate('/dashboard')
      }else{
        console.log(res)
        setTitle('Unauthorize access');
        setToastType('err')
        setMsg('Your are not authorized to access this page')
      }
      setShowToast(true);
        setTimeout(()=>setShowToast(false),5000)
    })
  }

   return (
    <div className="admin-login-container">
      <div className="admin-form-div">
        {
        !forgotPswd ?
            <div className="admin-login-form">
              <span className="title">Sign in to continue to Admin Dashboard</span>
              <div className="field">
                <InputField
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onBlur={handleErr} 
                  onChange={getData} 
                  err={errMsg.email}
                />
              </div>
              <div className="field">
                <InputField
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onBlur={handleErr} 
                  onChange={getData} 
                  err={errMsg.password}
                />

              </div>

              <span className="forgot" onClick={()=>setForgpswd(true)}>Forgot Password?</span>


              <Button
                name="Sign In"
                type="primary"
                handleClick={userLogin}
                disabled={(!formData.email || !emailPattern.test(formData.email)) || !formData.password || formData.password.length <8}
                loading={isLoading}
              />
            </div>
          :
          <div className="forgot-pswd-div"></div>
        }
      </div>
      
      <ToastComponent 
        title={title}
        message={msg}
        isOpen={showToast}
        type={toastType}
        handleClose={closeToast}
      />
    </div>  
  );
}


export default AdminSignInPage