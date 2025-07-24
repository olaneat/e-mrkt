import React, {useEffect, useState} from "react";
import  './stye.scss'
import { SignUpDTO } from "app/dto/auth.dto";
import Icons  from "../../constant/imgs.constant";
import Images from "../../constant/imgs.constant"
import Button from "./../../components/btns/btn";
import InputField from "./../../components/input-field/input-field";
import { Signup } from "../../slices/auth.slice";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { Link } from "react-router-dom";



const SignUpComponent=()=>{
  const dispatch = useDispatch<AppDispatch>();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [disabledFlag, setDisableFlag] = useState(true); 
  const [formData, setFormData] = useState({
    email: '',
    password:'',
    confirmPassword:'',
    username:''
  })
  const [errMsg, setErrMsg] = useState({
        email: '',
        confirmPassword:'',
        password:''
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
     if(!errMsg.email){

      setDisableFlag(false);
     } 
     if(!errMsg.confirmPassword){
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
    const iconUrl = Icons.Icons
    const imgUrl = Images.Images
    
    const createUser = () =>{
      dispatch(Signup(formData) as any)
      .wrap(
      )
    }
    
    useEffect(()=>{
    })

    
    
    return (
      <div className="signup-container">
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
                <Button name="Create account" disabled={disabledFlag} handleClick={createUser}  className="btn" type="primary" />
            </div>
            <div className="already">Already have an account? 
              <Link className="sign-in" to={'/sign-in'}>
              <span >Sign in</span>
              </Link>
              
            </div>
          </div>
        </div>
          <img src={imgUrl.signUpImg} alt="" className="bg-img" />
      </div>
    )

}



export default SignUpComponent;