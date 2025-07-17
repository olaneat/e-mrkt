import React, {useState, useEffect} from 'react'
import './syle.scss'
import Icons from "../../constant/imgs.constant";
import InputField from './../../components/input-field/input-field';
import Button from './../../components/btns/btn';
import { Link } from 'react-router-dom';
import {Login } from '../../slices/login.slice'
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useSearchParams} from "react-router-dom";
import { AppDispatch } from 'app/store';
import ToastComponent from '../../components/toast/toast';

const SignInComponent = () =>{
  const imgUrl = Icons;
  const dispatch = useDispatch<AppDispatch>();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [disabledFlag, setDisableFlag] = useState(true); 
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
     
    if(!errMsg.email){
      setDisableFlag(false);
    } 
    
    else{
      setDisableFlag(true);
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
      if(res.type=="auth/login/fulfilled"){
        
       const previousUrl = (location.state as { from?: string })?.from || searchParams.get('redirect') || '/'
        // const redirectTo = searchParams.get('redirect') || (location.state as {from?:string})?.from || '/'
        // console.log(redirectTo, 'url')
        navigate(decodeURIComponent(previousUrl))
      }else{
        setTitle('Login failed')
        let errMsg = res.payload
        setToastType('err')
        setMsg(res?.payload)
      }
      setShowToast(true);
      setTimeout(()=>setShowToast(false),5000)
    })
  }
  return (
    <div className='sign-container'>
        <div className="lft">
          <img src={imgUrl.signUpImg} alt="" />
        </div>
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
            <div className="signup-btns">
              <Button name="Login" disabled={disabledFlag} className="btn" handleClick={userLogin} type="primary" />
            </div>
            <div className="already">Don't have an account? 
                <Link className="sign-in" to={'/registration'}>
                <span >Register</span>
                </Link>
            </div>
          </div>
        </div>
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