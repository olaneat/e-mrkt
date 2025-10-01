import React, {useState, useEffect} from 'react'
import './syle.scss'
import Icons from "../../constant/imgs.constant";
import InputField from './../../components/input-field/input-field';
import Button from './../../components/btns/btn';
import { Link } from 'react-router-dom';
import {Login } from '../../slices/login.slice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams} from "react-router-dom";
import { AppDispatch } from 'app/store';
import ToastComponent from '../../components/toast/toast';
import localStorageService from '../../services/local-storage.service';
import { RootState } from '../../store';
import { RequestPassword } from '../../slices/request-password.slice';



const SignInComponent = () =>{
  const iconUrl = Icons.Icons;
  const imgUrl = Icons.Images;

  const dispatch = useDispatch<AppDispatch>();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [title, setTitle] = useState<string>('')
  const [msg, setMsg] = useState<string>('')
  const [showToast, setShowToast] = useState<boolean>(false);
  const {isLoading, isAuthenticated}   = useSelector((state:RootState)=>state.user)
  const {isRequestPswdErr, isRequestPswsLoading, response} = useSelector((state:RootState)=>state.requestPassword)
  const [toastType, setToastType] = useState<string>('')
  const [forgotPswd, setForgpswd] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    email: '',
    password:'',
  })
  const [errMsg, setErrMsg] = useState({
    email: '',
    password:''
  })
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  const getData=(name:string, data:any)=>{
    setFormData((prev)=>({
      ...prev, 
      [name]:data
    }))
       
  }
  
   const closeToast = ()=>{
      setShowToast(false)
    }

  const userLogin=()=>{
    dispatch(Login(formData) as any).then((res:any)=>{
      if(res.payload.status_code==200){
       const previousUrl = (location.state as { from?: string })?.from || searchParams.get('redirect') || '/'
        navigate(decodeURIComponent(previousUrl))
        setShowToast(true);
        console.log(res, 'res')
        setTitle('Login Successful');
        setMsg('Login successfully');
        localStorageService.saveItem('user', res)
      }else{
        console.log(res)
        setTitle('Login failed')
        setToastType('err')
        setMsg(res?.payload)
      }
      setShowToast(true);
        setTimeout(()=>setShowToast(false),5000)
    })
  }


  const requestPswd  = ()=>{
    if(forgotPswd){
      dispatch(RequestPassword(formData)).then((res:any)=>{
        setShowToast(true);
        if(res.type=="auth/forgot password/fulfilled"){
          setTitle('Password ')
          setMsg(res.payload.message);
          setToastType('success')
        
          
        }else{
          setTitle('Error Occur');
          setErrMsg(res.error.message);
          setToastType('err');
        }
      })
      setTimeout(()=>{setShowToast(false)},2000)
    }
  }

  useEffect(()=>{
    localStorageService.removeItem('user')
  })
  return (
    <div className='sign-container'>
      <img src={imgUrl.loginImg} alt="" className='login-img' />
      {
        !forgotPswd ?
          <div className="rite">
            <span className="sign-title">Login to access your Account</span>
            <span className='sign-sub'>Enter Your detail below</span>

            <div className="form">
              <div className="field">
                <InputField 
                  type="email"
                  name="email" 
                  onBlur={handleErr} 
                  onChange={getData} 
                  err={errMsg.email}
                  placeholder="Enter your email address"

                />
              </div>
              <div className='field'>
                <InputField 
                  type="password"
                  name="password" 
                  onBlur={handleErr} 
                  onChange={getData} 
                  err={errMsg.password}
                  placeholder="Enter your Password"

                />
              </div>
              <div className="forgt-pswd" onClick={()=>setForgpswd(true)}>
                Forgot password ?
              </div>
              <div className="signup-btns">
                <Button name="Login" disabled={(!formData.email || !emailPattern.test(formData.email)) || !formData.password || formData.password.length <8} loading={isLoading} handleClick={userLogin} type="primary" />
              </div>
              <div className="already">Don't have an account? 
                  <Link className="sign-in" to={'/sign-up'}>
                  <span >Register</span>
                  </Link>
              </div>
            </div>
          </div>
        :
        <div className='forgt-pswd-div'>
          <div className="field">
            <InputField 
              type="email"
              name="email" 
              onBlur={handleErr} 
              onChange={getData} 
              err={errMsg.email}
              placeholder="Enter your email address"

            />
          </div>
          <div className="signup-btns">
            <Button name="Cotinue" disabled={!emailPattern.test(formData.email) || !formData.email} loading={isRequestPswsLoading} handleClick={requestPswd} type="primary" />
          </div>
        </div>
      }
        
      <ToastComponent 
        title={title}
        message={msg}
        isOpen={showToast}
        type={toastType}
        handleClose={closeToast}
      />
    </div>
  )
}

export default SignInComponent