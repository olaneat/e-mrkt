import React, {useEffect, useState}  from "react";
import "./style.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/navbar/navbar";
import ModalComponent from "../../components/modal/modal";
import Icons from "../../constant/imgs.constant";
import InputField from "../../components/input-field/input-field";
import LoaderComponent from "../../components/loader/loader";
import Button from "../../components/btns/btn";
import { ChangePswd } from "../../slices/change-pswd.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "app/store";
import ToastComponent from "../../components/toast/toast";




const SettingPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { categories, isLoading, error } = useSelector((state: RootState) => state.category);
  const { address, loading, err } = useSelector((state: RootState) => state.address);
  const { changePswdLoading } = useSelector((state: RootState) => state.changePswd);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string >('');
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState<string >('');
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [openPswdModal, setOpenPswModal] = useState(false);
  const icons = Icons.Icons
  const [formData, setFormData] = useState<any>({
    old_password: '',
    new_password: '',
    confirm_password: '',
    id: user?.id || ''
  });

  const [errMsg, setErrMsg] = useState({
    old_password: '',
    confirm_password: '',
    new_password: ''
  })

  const handleErr =(name:string)=>{
     if(name=="new_password"){
      setErrMsg((prev)=>({
        ...prev,
        new_password: formData.new_password.length<8 ?'Password must be 8 character long': '' 
      }))
     }
     if(name=='confirm_password' ){
       setErrMsg((prev)=>({
          ...prev,
          confirm_password: formData.confirm_password !== formData.new_password ?'Password do not match': '' 
        }))
     }
  }
  interface FormDTO {
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }

  const getValue=(name:string, value:FormDTO)=>{
    setFormData((prevState:any) => ({
      ...prevState,
      [name]: value
    }));

  }

  const openModal=()=>{
    setOpenPswModal(true)
    setActiveTab('change_password')
  }

  useEffect(()=>{
  })

const changePassword =()=>{
  dispatch(ChangePswd(formData) as any).then((res:any)=>{
    console.log(res, 'resssssss')
    if(res.payload?.code==200){
      setOpenPswModal(false)
      setTitle('Password changed')
      setMessage(res.payload?.response?.message || 'Password changed successfully')
      setType('success')
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      }, 3000)
    }else{
      let errMsg = res.payload?.data?.errors;
      if(errMsg?.old_password.length > 0){ 
        setErrMsg((prev)=>({
          ...prev,
          old_password:errMsg.old_password[0]
        }))
      }else if(errMsg?.new_password.length > 0){
        setErrMsg((prev)=>({
          ...prev,
          new_password:errMsg.new_password[0]
        }))
      }
    }
  })
}

  if(isLoading || loading){
    return(
      <LoaderComponent title="loading ..."/>
  )
}
  return (
    <div className="setting-page">
      <div className="setting-header">
        <NavBar catgeories={categories || []} />
        <div className="setting-body">
          <div className="setting-nav">
            <span className={activeTab === 'profile' ? 'active' : 'inactive-tab'} onClick={() => setActiveTab('profile')}>Profile</span>
            <span className={activeTab === 'change_password' ? 'active' : 'inactive-tab'} onClick={openModal}>Change Password</span>
            <span className={activeTab === 'privacy' ? 'active' : 'inactive-tab'} onClick={() => setActiveTab('privacy')}>Privacy</span>
            <span className={activeTab === 'address' ? 'active' : 'inactive-tab'} onClick={() => setActiveTab('address')}>Address Book</span>
          </div>
          <div className="setting-content">


            <ModalComponent
              isOpen={openPswdModal}
              onClose={() => setOpenPswModal(false)}
              hasCloseBtn={true}
            >
              <div className="change-pswd-modal">
                <div className="modal-header">
                  <span className="change-pswd-title">Change Password</span>
                  <img onClick={()=>setOpenPswModal(false)} src={icons.closeIcon} className="close-icon" />
                </div>

                <div className="change-pswd-body">

                  <InputField
                    label="Current Password"
                    type="password"
                    name="old_password"
                    placeholder="Enter current password"
                    onBlur={handleErr}
                    err={errMsg.old_password}
                    onChange={getValue}
                  />
                  <InputField
                    label="New Password"
                    type="password"
                    name="new_password"
                    placeholder="Enter new password"
                    onBlur={handleErr}
                    err={errMsg.new_password}
                    onChange={getValue}
                  />
                  <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm new password"
                    onBlur={handleErr}
                    err={errMsg.confirm_password}
                    onChange={getValue}
                  />
                </div>
                <div className="change-footer">
                  <div className="btn">
                    <Button name="Cancel" type="secondary" handleClick={()=>setOpenPswModal(false)}/>
                  </div>
                  <div className="btn">
                    <Button name="Update Password" disabled={!formData.old_password || !formData.confirm_password || formData.new_password !== formData.confirm_password} type="primary" loading={changePswdLoading} handleClick={changePassword} />
                  </div>
                </div>
              </div>
            </ModalComponent>


            <ToastComponent
             title={title } 
              message={message}
              type={type}
              isOpen={showToast}
              handleClose={() => setShowToast(false)}
            /> 
          </div>
        </div>
      </div>
      <Footer/>


    </div>
   )
}

export default SettingPage;