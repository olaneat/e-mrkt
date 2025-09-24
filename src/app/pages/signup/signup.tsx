import React, {useEffect, useState} from "react";
import  './stye.scss'
import { SignUpDTO } from "app/dto/auth.dto";
import Icons  from "../../constant/imgs.constant";
import Images from "../../constant/imgs.constant"
import Button from "./../../components/btns/btn";
import InputField from "./../../components/input-field/input-field";
import { Signup } from "../../slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { Link } from "react-router-dom";
import ToastComponent from "../../components/toast/toast";
import { useNavigate } from "react-router-dom";


const SignUpComponent=()=>{
  const dispatch = useDispatch<AppDispatch>();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [title, setTitle] = useState<string>('')
  const {loading} = useSelector((state:RootState)=>state.signup)
  const [msg, setMsg] = useState<string>('')
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastType, setToastType] = useState<string>('')
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpDTO>({
    email: '',
    password:'',
    confirmPassword:'',
    username:''
  })
  const [errMsg, setErrMsg] = useState<SignUpDTO>({
        email: '',
        confirmPassword:'',
        password:'',
        username: ""
      })
  
  const handleErr = (name: string, event:any)=>{
    if(name=="email"){
      setErrMsg((prev)=>({
        ...prev,
        email: !emailPattern.test(event.target.value) ? 'Enter a valid email address': '' 
      }))
      // errMsg.email =!emailPattern.test(event.target.value) ? 'Enter a valid email address': '' 
     }
    
     if(name=="password"){
      setErrMsg((prev)=>({
        ...prev,
        password: formData.password.length<8 ?'Password must be 8 character long': '' 
      }))
     }
     if(name=='confirmPassword' ){
       setErrMsg((prev)=>({
          ...prev,
          confirmPassword: formData.confirmPassword !== formData.password ?'Password do not match': '' 
        }))
     }
     if(name=="username"){
      setErrMsg((prev)=>({
          ...prev,
          username: formData.username.length<0 ?'username must be 3 characters long': '' 
        }))
     }
  }
    const getData=(name:string, data:SignUpDTO)=>{
      setFormData((prev)=>({
        ...prev, 
        [name]:data
      }))
     
    }
    const iconUrl = Icons.Icons
    const imgUrl = Images.Images
    
    const createUser = () =>{
      dispatch(Signup(formData) as any).then((res:any)=>{
        if(res.meta.requestStatus === 'fulfilled'){
          setToastType('success');
          setTitle('Sign up successful!');
          setMsg('Signup successful! Please sign in to continue.');
          setTimeout(()=>{
            navigate('/sign-in')
          },2000)
        }else{
          setTitle('Sign up failed');
          setToastType('error');
          setMsg(res.payload);
        }
        setShowToast(true);
        setTimeout(()=>setShowToast(false),5000)
      })
      
    }
     const closeToast = ()=>{
      setShowToast(false)
    }
  
    
    return (
      <div className="signup-container">
        <img src={imgUrl.loginImg} alt="" className="bg-img" />

        <div className="signup-div">
          <span className="signup-title">Create an account</span>
          <span className="signup-sub">Enter your detail</span>
          <div className="form">
            <span className="field">
            <InputField 
              name="email" 
              type="email" 
              onChange={getData} 
              placeholder="Enter your valid email"
              err={errMsg.email}
              onBlur= {handleErr}

            />
            </span>
            <span className="field">
              <InputField 
                type="text" 
                name="username" 
                onChange={getData} 
                placeholder="Pick your user username" 
                img={iconUrl.user}
                onBlur= {handleErr}
              />
            </span>

            <span className="field">
              <InputField  
                type="password" 
                name="password" 
                onChange={getData} 
                placeholder="Enter Your Password" 
                onBlur= {handleErr}
                err={errMsg.password}

              />
            </span>
            <span className="field">
            <InputField  
              type="password" 
              name="confirmPassword" 
              onChange={getData} 
              placeholder="Enter Your Password" 
              onBlur= {handleErr}
              err={errMsg.confirmPassword}
              />
            </span>

            <div className="signup-btns">
                <Button name="Create account" disabled={!formData.email || formData.password.length<8 || formData.confirmPassword !== formData.password || !formData.username} loading={loading} handleClick={createUser} type="primary" />
            </div>
            <div className="already">Already have an account? 
              <Link className="sign-in" to={'/sign-in'}>
              <span >Sign in</span>
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



export default SignUpComponent;