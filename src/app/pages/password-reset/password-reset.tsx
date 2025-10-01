import React,{ useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar'
import Footer from "../../components/footer/footer"
import { RootState, AppDispatch } from "../../store";
import InputField from "../../components/input-field/input-field";
import Button from "../../components/btns/btn";
import './style.scss'
import { resetPassword } from "../../slices/rest-pswd.slice";
import { useNavigate } from "react-router-dom";
import { ResetPasswordDTO } from "../../dto/auth.dto";
import ToastComponent from "../../components/toast/toast";

const PasswordReset = ()=>{
    const dispatch = useDispatch();
    const params = useParams();
    const [uuid, setUuid] = useState('');
    const [token, setToken] = useState('');
    const {categories} = useSelector((state:RootState)=>state.category)
    const [toastTitle, setToastTitle] = useState<string>('');
    const [toastMsg, setToastMsg] = useState<string>('')
    const [toastType, setToastType] = useState<string>('')
    const [showtoast, setShowToast] = useState<boolean>(false)
    const navigate = useNavigate()
    const {isResetPasswordError, isResetPasswordLoading, response} = useSelector((state:RootState)=>state.resetPassword)
    const [formData, setFormData] = useState<ResetPasswordDTO>({
        password: '',
        confirm_password: '',
        token: "",
        uuidb64:""
    })

    const [errMsg, setErrMsg] =useState({
        password: '',
        conirm_password:''
    })
    const handleErr =(name:string)=>{
        if(name=='password'){
            setErrMsg((prev)=>({
                ...prev,
                password: formData.password.length< 8 ?'Password must be 8 character long': '' 
            }))
        }else if(name=='confirm_password'){
            setErrMsg((prev)=>({
                ...prev,
                conirm_password: formData.confirm_password !== formData.password ?'Password do not match': '' 
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
        if(showtoast){
            setTimeout(()=>{
            setShowToast(false)

            },5000)
        }
    }
    useEffect(()=>{
        const url = new URLSearchParams(window.location.search);
        setToken(url.get('token')!)
        setUuid(url.get('uuid64')!)
        // setToken(pa)
    })


    const changePassword = ()=>{
        formData.token = token;
        formData.uuidb64 = uuid

        dispatch(resetPassword(formData) as any).then((res:any)=>{
            if(res.payload.status==200){
                setToastMsg(res.payload.message)
                setToastTitle('Password Updated')
                setShowToast(true);
                setToastType("success")
                setTimeout(()=>{
                    navigate('/')
                }, 4000)
            }else{
                setToastMsg(res.payload.data.message)
                setToastTitle('Occur Occured')
                setShowToast(true);
                setToastType("err")
            }
            setTimeout(()=>{
                setShowToast(false)
            }, 4000)
        })
    }

    return (
      <div className="reset-password-container">
          <NavBar catgeories={categories || []}/>
        
            <div className="change-pwd-body">
                <div className="pswd-form">
                    <span className="title">Reset Password</span>
                    <div className="password-field">
                    <InputField 
                        name='password'
                        type="password"
                        onBlur={handleErr}
                        onChange={getData}
                        placeholder="Enter New Password"
                        err={errMsg.password}
                    />
                    </div>
                    <div className="password-field">
                    <InputField 
                        name='confirm_password'
                        type="password"
                        onBlur={handleErr}
                        onChange={getData}
                        placeholder="Confirm  Password"
                        err={errMsg.conirm_password}
                    />
                    </div>
                    <Button name="Update Password" type="primary" disabled={!formData.password|| formData.confirm_password !==formData.password} loading={isResetPasswordLoading} handleClick={changePassword}/>
                </div>

                <ToastComponent
                    title={toastTitle}
                    message={toastMsg}
                    type={toastType}
                    isOpen={showtoast}
                    handleClose={closeToast}
                />
            </div>
        <Footer/>
      </div>
    )
}


export default PasswordReset