import React, {useEffect, useState, useRef} from "react";
import './style.scss'
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Button from "../../components/btns/btn";
import { DisplayAddress } from "../../slices/address.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import localStorageService from "../../services/local-storage.service";
import env from "../../../environment/env";
import { increaseQuantity, reduceQuantity, clearCart } from "../../slices/cart.slice";
import ModalComponent from "../../components/modal/modal";
import Icons from "../../constant/imgs.constant";
import InputField from "../../components/input-field/input-field";
import { AddressDTO } from "app/dto/address.dto";
import { UpdateAddress } from "../../slices/update-address.slice";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import JSONstates from  '../../constant/states.json'
import SelectField, {DropdownHandle} from "../../components/input-field/custom-select-field";
import EmptyStateComponent from "../../components/empty-state/empty-state";
import Imgs from "../../constant/imgs.constant";
import ToastComponent from "../../components/toast/toast";
import {Order} from "../../slices/order-slice";
import { useLocation, useNavigate } from 'react-router-dom';
import LoaderComponent from "../../components/loader/loader";

const Checkout = () =>{
    const dispatch = useDispatch();
    const {address, addressIsLoading,  err } = useSelector((state:RootState)=> state.address)
    const { categories, isLoading, error } = useSelector((state: RootState) => state.category);
    const {orderLoading} = useSelector((state:RootState)=>state.orders)
    const {updateAddressError, updateAddressLoading} = useSelector((state:RootState)=>state.updateAddress)
    const cart= useSelector((state:RootState)=>state.cart)
    const user = useSelector((state:RootState)=>state.user);
    const [addressModal, setAddressModal] = useState(false);
    const [editAddressModal, setEditAddressModal] = useState(false);
    const [newAddressModal, setNewAddressModal] = useState(false);
    const [states, setStates] = useState<any>();
    const [lgas, setlgas] = useState<any>();
    const dropdownRef = useRef<DropdownHandle>(null);
    const stateData = JSONstates;
    const imgUrl = Imgs.Images
    const [title, setTitle] = useState<string>('')
    const [msg, setMsg] = useState<string>('')
    const [showToast, setShowToast] = useState<boolean>(false);
    const paystackCheckoutUrl = useRef<HTMLAnchorElement>(null);;
    const [toastType, setToastType] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();
    const [previousUrl, setPreviousUrl] = useState<string | null>(null);
    const [ref, setRef] = useState<any>()
    const [formData, setFormData] = useState<any >({
      address: editAddressModal ? address?.address! : '',
      phone_number: editAddressModal ? address?.phone_number! :"",
      last_name:   editAddressModal? address?.last_name! : "",
      first_name:  editAddressModal? address?.first_name! : "",
      state: editAddressModal ?  address?.state! : "",
      lga : editAddressModal ? address?.lga! : "",
      id: editAddressModal ? address?.id  :""
    })
    
    const [errMsg, setErrMsg] = useState({
      address: "",
      phoneNumber: "",
      firstName: "",
      lastName: ""
    })

    const getData = (name:string, data:AddressDTO) =>{
      setFormData((prev:any)=>({
        ...prev,
        [name]:data
      }))

      if(name=='state'){
        createLgas(data)
      }
    }

    const icons = Icons.Icons;
  
    useEffect(()=>{
      displayAddress();
      console.log(addressIsLoading, 'lo')
      createStates(stateData)
      if(address?.state){
        createLgas(address.state)
      }
    }, [])

    useEffect(()=>{
      const prevUrl:string = location.state?.from || sessionStorage.getItem('previousUrl');
      if (prevUrl?.includes('https://checkout.paystack.com/')) {
    
      }
    }, )


  const displayAddress =()=>{
    let id = user.user!.id
    dispatch(DisplayAddress(id) as any)
    if(address?.state){
        createLgas(address.state);
      }
  }

  const changeQuantity = (action:string, id:string)=> (event: React.MouseEvent<HTMLSpanElement>) =>{
    if(action=='increase'){
      dispatch(increaseQuantity({id}))
    }
    else{
      dispatch(reduceQuantity({id}))
    }
  }

  const delCart = () =>{
    dispatch(clearCart() )
  }

  const openModal = (type:string)=>{
    if(type=='address'){
      setAddressModal(true);
    }
    else if(type== 'edit_address'){
      setEditAddressModal(true);
      setAddressModal(false);
      setNewAddressModal(false);
      setFormData(address)
    }
    else if(type == 'new_address'){
      setEditAddressModal(false);
      setAddressModal(false);
      setNewAddressModal(true);
    }
  }
  const closeModal = ()=>{
    if(editAddressModal){
      setEditAddressModal(false)
      // setAddressModal(true);
    }else if( addressModal){
        setAddressModal(false);
    
    }    
    
  }



  const createStates = (data:any)=>{
    let states:string[] = []
    data.map((item:any)=>{
      states.push(item?.state?.name)
    })
    setStates(states);
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


   const closeToast = ()=>{
      setShowToast(false)
    }

  const updateAddress =()=>{   
    dispatch(UpdateAddress(formData) as any).then((res:any)=>{
      if(res.type='address/update-address/fulfilled'){
        dispatch(DisplayAddress(formData.id) as any)
        setTitle('Address Updated Successfully');
        setMsg('Your shipping address has been updated successfully.');
        setToastType('success');
        setShowToast(true);
        setTimeout(()=>setShowToast(false),5000)
        closeModal();
      }else{
        setTitle('Address Update Failed');
        setMsg(res.payload || 'An error occurred while updating your address. Please try again.');
        setToastType('error');
        setShowToast(true);
        setTimeout(()=>setShowToast(false),5000)
      
      }
    })
  }
  
  const intiatePayment =()=>{
    if(!address?.address || !address.phone_number){
      setShowToast(true);
      setToastType('warning');
      setTitle('Address Required');
      setMsg('Please add a shipping address to proceed with checkout');
      setTimeout(()=>setShowToast(false),5000)
    }
    else{
      const payload = {
        user: user?.user!.id!,
        items:cart.cart,
        callback_url:`${env.HOST_URL}/verify-payment`
      }
      dispatch(Order(payload)as any).then((res:any)=>{
        if(res.payload.status_code==201){
           setShowToast(true);
          setToastType('success');
          setTitle('Payment Initiated');
          setMsg(res.payload.message);
          let data:any  = res.payload.data
          setRef(data);
          // paystackConfig = {
          //   email:user?.user!.email,
          //   reference: data.reference,
          //   amount: data.total_amount * 100,
          //   publicKey: env.TEST_PK,
          //   onSuccess: handleSuccess
          // }

          if(data.payment_url){
            setTimeout(()=>window.open(data.payment_url, '_self'), 1000)
          }
          setTimeout(()=>setShowToast(false),5000)

        }else{
          setShowToast(true);
          setToastType('error');
          setTitle('Payment Failed');
          setMsg( 'An error occurred while initiating payment. Please try again.');
          setTimeout(()=>setShowToast(false),5000)

        }
      })
    }
  }
 
  if(addressIsLoading || isLoading ){
    <div>
      <LoaderComponent title="Loading Store..."/>
    </div>
  }
  return (
    <div className="checkout-container">
      <div className="checkout-inner-div">
        <div className="nav">
          <NavBar catgeories={categories || []} />

        </div>

      {
        cart.cart.length>0
         ?
          <div className="checkout-body">
            <div className="checkout-lft">
              <div className="shipping-detail">
                <span className="item-title">Shipping address</span>
                { address?.address || address?.phone_number ? 
                  <div className="shipping-user-detail">
                    <span className="detailll">
                      <span className="full-name">{address?.first_name} {address?.last_name}</span>
                      <span className="contact-detail">{address?.phone_number}</span>
                      <span className="contact-detail">{address?.address}</span>
                      <span className="contact-detail">{address?.lga}, {address?.state}</span>
                    </span>
                    <span className="change-detail" onClick={()=>openModal('address')}>Change</span>
                  </div>
                  :

                  <Button name="Add Address" handleClick={()=>openModal('edit_address')}/>
                }


              </div>
              <div className="payment-div">
                
              </div>
              <div className="cart-items">
                <span className="item-title">Items in Cart</span>
                <div className="cart-lists">
                  {cart.cart.map((item, index) =>{
                    return(
                      <div className="cart-item-detail" key={item.id}>
                        <div className="upper-detail">
                          <img src={`${env.IMG_URL}/${item.img}`} className="img-item" alt="" />
                          <div className="item-infor">
                            <span className="name">{item.name}</span>
                            <div className="price-qua-div">
                              <span className="price">{item.totalPrice.toLocaleString('en-US',{style:"currency", currency: "NGN"})}</span>
                              <div className="quantity">
                                <span className={`increase-btn ${item.quantity<=1 ? 'disble-btn': ''}`} onClick={changeQuantity('decrease', item.id)}>-</span>
                                <span className="quantity">{item.quantity}</span>
                                <span className="increase-btn" onClick={changeQuantity('increase', item.id)}>+</span>


                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="lower-detail">
                          <span className="shipping">
                            Shipping: {item.totalShippingCost.toLocaleString('en-US', {currency:'NGN', style:'currency'})}
                          </span>
                          <span className="shipping">
                            Delivery: 
                          </span>
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="lft-item">

              </div>

            </div>
            <div className="checkout-rgt">
              <span className="summary-header">Summary</span>
              <div className="summary-body">
                <div className="summary-items">
                  <div className="summary-title">Subtotal</div>
                  <div className="summary-item">{cart.totalPrice.toLocaleString('en-US',{style:"currency", currency: "NGN"})}</div>
                </div>
                <div className="summary-items">
                  <div className="summary-title">Shipping fee</div>
                  <div className="summary-item">{cart.shippingCost.toLocaleString('en-US', {currency:'NGN', style:'currency'})}</div>
                </div>
                  <div className="summary-items">
                  <div className="summary-title">Total Feee</div>
                  <div className="summary-item">{(cart.shippingCost + cart.totalPrice).toLocaleString('en-US', {style:'currency', currency:'NGN'})}</div>
                </div>
                <div className="btn">
                  <Button name='Pay' type="primary" loading={orderLoading} handleClick={intiatePayment}/>
                </div>
              </div>

            </div>
            <ModalComponent isOpen={addressModal} hasCloseBtn={true} onClose={closeModal}>
              <div className="display-address-modal">
                <div className="modal-header">
                  <span className="header-txt">Shipping Address</span>
                  <img src={icons.closeIcon} id="closeModal" onClick={closeModal} className="sm-icon" alt="" />
                </div>
                <div className="address-content"> 
                  <span className="name-detail">
                    <span className="full-name">{address?.first_name} {address?.last_name}</span>
                    <span className="edit" onClick={()=>openModal('edit_address')}>edit</span>
                  </span>
                  <span className="contact-detail">{address?.phone_number}</span>
                  <span className="contact-detail">{address?.address}</span>
                  <span className="contact-detail">{address?.state}</span>
                </div>
                <div className="footer">
                  <Button name="add new address" type="primary"></Button>
                </div>

              </div>
            </ModalComponent>

            <ModalComponent 
              isOpen={editAddressModal} 
              hasCloseBtn={true}
              onClose={closeModal}
            
            >
              <div className="address-modal">
                <div className="header">
                    { editAddressModal==true
                      ? <span className="title">Edit Shipping address</span>
                      : <span className="title">Add new address</span>
                    }
                  <img src={icons.closeIcon} className="close"  onClick={closeModal} alt="" />
                </div>
                <div className="address-body">
                  
                  <div className="fields-div">
                    <span className="field-name">Full names</span>
                    <div className="fields">
                      <InputField
                        type="text"
                        data={formData.first_name}
                        name="first_name"
                        onChange={getData}
                        placeholder="First Name"
                      />

                      <InputField
                        type="text"
                        data={formData.last_name}
                        onChange={getData}
                        name="last_name"
                        placeholder="Last Name"

                      />
                    </div>
                    
                  </div>
                  <div className="fields-div">
                    <span className="field-name">Contact Information </span>
                    <div className="fields">
                      <InputField
                        type="text"
                        data={formData.phone_number}
                        name="phone_number"
                        onChange={getData}
                        placeholder="Phone Number"
                      />
                    </div>
                    
                  </div>
                  <div className="fields-div">
                    <span className="field-name">Address </span>
                    <div className="fields">
                      <InputField
                        type="text"
                        onChange={getData}
                        name="address"
                        placeholder="Address"
                        data={formData.address}
                      />
                                      
                    </div>
                    <div className="fields">
                      
                      <SelectField
                        ref={dropdownRef}
                        options={states}
                        label="Select your state"
                        placeholder="Select"
                        preSelectedValue={formData.state}
                        onChange={getData}
                        fieldName="state"
                      />


                      <SelectField
                        ref={dropdownRef}
                        options={lgas}
                        label="Select your LGA"
                        placeholder="Select"
                        preSelectedValue={formData.lga}
                        onChange={getData}
                        fieldName="lga"
                      />
                      
                    </div>
                    
                  </div>
                </div>
                <div className="footer">
                  <div className="btns">
                  <Button name="Confirm" loading={updateAddressLoading}  disabled={formData.address === '' || formData.first_name === '' || formData.last_name === ''} type="primary"  handleClick={updateAddress} />
                  <Button name="Cancel"  handleClick={closeModal}/>

                  </div>

                </div>
              </div>
            </ModalComponent>
          </div>
        :
        <div className="empty-state">
          <EmptyStateComponent
            text="Thank you for your purchase. Your order is being processed."
            title="Payment Successful"
            imgUrl={imgUrl.emptyStateCart}
            btnTxt="Shop Now"
          />
        </div>  
      }
      </div>
      <ToastComponent 
        title={title}
        message={msg}
        isOpen={showToast}
        type={toastType}
        handleClose={closeToast}
      />
      <div className="pg-footer">
        <Footer/>
      </div>  
      
    </div>
  )

}


export default Checkout

