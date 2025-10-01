import React, {useEffect, useRef, useState}  from "react";
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
import SelectField,  {DropdownHandle}  from "../../components/input-field/custom-select-field";
import JSONstates from  '../../constant/states.json'
import { ProfileDTO } from "../../dto/profile.dto";
import { DisplayProfile } from "../../slices/profile.slice";
import { UpdateProfileData } from "../../slices/update-profile.slice";
import env from "../../../environment/env";
import { logout } from "../../slices/login.slice";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { categories, isLoading, error } = useSelector((state: RootState) => state.category);
  const { Profile, profileLoading, profileErr} = useSelector((state: RootState) => state.profile);
  const {changePswdLoading} = useSelector((state:RootState)=> state.changePswd)
  const {updateProfile, updateProfileLoading, updateProfileError} = useSelector((state:RootState)=> state.updateProfle)
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string >('');
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState<string >('');
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [states, setStates] = useState<any>();
  const [lgas, setlgas] = useState<any>();
  const [openPswdModal, setOpenPswModal] = useState(false);
  const [previewLink, setpreviewLink] = useState('');

  const icons = Icons.Icons
  const stateData = JSONstates;
  const dropdownRef = useRef<DropdownHandle>(null);
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
  
  const createStates = (data:any)=>{
    let values:string[] = []
    data.map((item:any)=>{
      values.push(item?.state?.name)
    })
    setStates(values);
    
  }
  const   createLgas = (data:any)=>{
    let locals:string[] = [];
    setlgas([])
    const state:any = stateData.find(item => item.state.name == data )
    state.state.locals.forEach((x:any)=>{
      locals.push(x.name)
    })
    setlgas(locals)
  }
  const closeModal =(type:string) =>{
    if(type=='change_pswd'){
      setOpenPswModal(false)

    }
    setActiveTab('profile')
  }
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
    new_password: string;
    confirm_Password: string;
  }
  const [updateProfileForm, setUpdateProfileForm]= useState<ProfileDTO>({
    first_name:  '',
    last_name: "",
    state : " ",
    lga: " ",
    phone_number:  " ",
    profile_image : " ",
    address: " ",
    id:  " " 

  })

  const getValue=(name:string, value:FormDTO,)=>{
    {setFormData((prevState:any) => ({
      ...prevState,
      [name]: value
    }));
}
    
  }

  const handleFileUpload = (e:any)=>{
    const selectField = e.target.files[0];
    let name ="profile_image";
    setpreviewLink(URL.createObjectURL(selectField));
    // updateProfileForm.profile_image = 
    getProfileData(name, selectField)
  }

  const getProfileData = (name:string, value:ProfileDTO) =>{
    setUpdateProfileForm((prevState:any)=>({
      ...prevState,
      [name]:value
    }))
    if(name=='state'){
      createLgas(value)
    }
  }

  const openModal=()=>{
    setOpenPswModal(true)
    setActiveTab('profile')
  }

  useEffect(()=>{
    createStates(stateData)
    getProfile();
  },[categories])


  useEffect(()=>{
     if(Profile){
      if(Profile.state){
        createLgas(Profile?.state)
      }
      setUpdateProfileForm({
        first_name: Profile?.first_name || '',
        last_name: Profile?.last_name || "",
        state : Profile?.state || "",
        lga: Profile?.lga || "",
        phone_number: Profile?.phone_number || "",
        profile_image : Profile?.profile_image || "",
        address: Profile?.address ? Profile.address  :"",
        id: Profile?.id ?Profile.id : "" 
      })
    }
  },[Profile])

const changePassword =()=>{
  dispatch(ChangePswd(formData) as any).then((res:any)=>{
    if(res.payload?.code==200){
      setOpenPswModal(false)
      setTitle('Password changed')
      setMessage(res.payload?.response?.message || 'Password changed successfully')
      setType('success')
      setShowToast(true)
      dispatch(logout())
      setTimeout(()=>{
        setShowToast(false)
      }, 3000)
      setActiveTab('profile')
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

const getProfile = () => {
  dispatch(DisplayProfile(user?.id || '') as any);
}
const updateUserProfile = ()=>{
   const formData = new FormData();
    Object.entries(updateProfileForm).forEach(([key, value]) => {
      formData.append(key, value);
    });
  dispatch(UpdateProfileData(formData) as any).then((resp:any)=>{
    if(resp.payload.status == "success"){
      setTitle('profile Updated')
      setShowToast(true)
      setType('success')
      setMessage(resp.payload.message)
      setTimeout(()=>{setShowToast(false)},2000)
    }else{
      setTitle('Error Occured')
      setShowToast(true)
      setType('error')
      setMessage(resp.payload)
      setTimeout(()=>{setShowToast(false)},2000)

    }
  })
}
  if(profileLoading){
    return(
      <LoaderComponent title="loading ..."/>
  )
}
  return (
    <div className="setting-page">
      <div className="setting-header">
        <div className="lg-nav">
          <NavBar catgeories={categories || []} />
        </div>
        <div className="setting-body">
          <div className="setting-nav">
            <span className={activeTab === 'profile' ? 'active' : 'inactive-tab'} onClick={() => setActiveTab('profile')}>Profile</span>
            <span className={activeTab === 'change_password' ? 'active' : 'inactive-tab'} onClick={openModal}>Change Password</span>
            <span className={activeTab === 'privacy' ? 'active' : 'inactive-tab'} onClick={() => setActiveTab('privacy')}>Privacy</span>
            <span className={activeTab === 'address' ? 'active' : 'inactive-tab'} onClick={() => setActiveTab('address')}>Address Book</span>
          </div>
          <div className="setting-content">
            {activeTab === 'profile' 
              ?(
                <div className="profile-content">
                  <div className={! updateProfileForm.profile_image ? "blank-img" : ""}>
                    <img src={previewLink || `${env.IMG_URL}${updateProfileForm?.profile_image}`} className="profile-img" alt="" />
                  </div>
                  <input type="file" onChange={handleFileUpload} accept="image/*" name="profile_image" />
                  <div className="profile-detail">
                    <div className="profile-group-fields">
                      <div className="field-div">
                        <InputField type="text" 
                          data={updateProfileForm?.first_name} 
                          placeholder="Enter first name" 
                          name="first_name"
                          onChange={getProfileData}
                        />
                      </div>
                      <div className="field-div">
                        <InputField
                          type="text" 
                          data={updateProfileForm?.last_name}
                          placeholder="Enter last name"
                          onChange={getProfileData}
                          name="last_name"
                          

                        />
                      </div>
                    </div>
                    <div className="profile-group-fields">
                      <div className="field-div">
                        <InputField 
                          type="text" 
                          data={updateProfileForm?.phone_number}  
                          placeholder="Enter last name"
                          onChange={getProfileData}
                          name="phone_number"
                         />
                      </div>
                    </div>
                    <div className="profile-group-fields">
                      <div className="field-div">
                        <InputField 
                          type="text" 
                          data={updateProfileForm?.address}  
                          placeholder="Enter state"
                          onChange={getProfileData}
                          name="address"
                         />
                      </div>
                    </div>
                    <div className="profile-group-fields">
                      <div className="fields">
                        <SelectField
                          ref={dropdownRef}
                          options={states}
                          label="Select your state"
                          placeholder="Select Your state"
                          preSelectedValue={updateProfileForm?.state}
                          onChange={getProfileData}
                          fieldName="state"
                      />
                      </div>
                      <div className="fields">
                        <SelectField
                          fieldName="lga"
                          label="Select your LGA"
                          options={lgas}
                          preSelectedValue={updateProfileForm?.lga}
                          placeholder="Select LGA"
                          onChange={getProfileData}
                        />
                      </div>
                    </div>
                    <Button name="Update profile" handleClick={updateUserProfile}  loading={updateProfileLoading} type="primary"   />

                  </div>

                 
                </div>
              ) : (
                <div></div>
              )
            }
            <ModalComponent
              isOpen={openPswdModal}
              onClose={() => setOpenPswModal(false)}
              hasCloseBtn={true}
            >
              <div className="change-pswd-modal">
                <div className="modal-header">
                  <span className="change-pswd-title">Change Password</span>
                  <img onClick={()=>closeModal('change_pswd')} src={icons.closeIcon} className="close-icon" />
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
                    <Button name="Cancel" type="secondary" handleClick={()=>closeModal('change_pswd')}/>
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