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
import { ProfileDTO } from "../../dto/auth.dto";
import { UpdateAddress } from "../../slices/update-address.slice";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import JSONstates from  '../../constant/states.json'
import SelectField, {DropdownHandle} from "../../components/input-field/custom-select-field";
import EmptyStateComponent from "../../components/empty-state/empty-state";
import Imgs from "../../constant/imgs.constant";
// const handleSuccess = ()=>{
//     // delCart()
//   }
// const newConfig = {
//       reference: (new Date()).getTime().toString(),
//       email: "user@example.com",
//       amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//       publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
//       onSuccess: handleSuccess
//   };
// const paystackHook = () =>{
//     const initializePayment = usePaystackPayment(newConfig);
//     return (
//       <div>
//         <Button handleClick={()=>{initializePayment(newConfig)
//           }}/>
//       </div>
//     )
//   }

const Checkout = () =>{
    const dispatch = useDispatch();
    const {address, isLoading,  error } = useSelector((state:RootState)=> state.address)
    const cart= useSelector((state:RootState)=>state.cart)
    const [user, setUser] = useState<any>();
    const [addressModal, setAddressModal] = useState(false);
    const [editAddressModal, setEditAddressModal] = useState(false);
    const [newAddressModal, setNewAddressModal] = useState(false);
    const [states, setStates] = useState<any>();
    const [lgas, setlgas] = useState<any>();
    const dropdownRef = useRef<DropdownHandle>(null);
    const stateData = JSONstates;
    const imgUrl = Imgs.Images
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

    const getData = (name:string, data:ProfileDTO) =>{
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
      createStates(stateData)
    }, [])


  const displayAddress =()=>{
    let user  =  localStorageService.getItem('user')
    setUser(user);
    dispatch(DisplayAddress(user.id) as any)
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
      console.log('jejejej edit')
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
      setAddressModal(true);
    }else if( addressModal){
        setAddressModal(false);
    
    }    
    
  }

  const handleSuccess = ()=>{
    delCart()
  }

  const createStates = (data:any)=>{
    let states:string[] = []
    data.map((item:any)=>{
      states.push(item?.state?.name)
    })
    setStates(states);
  }

  const createLgas = (data:any)=>{
    let locals:string[] = [];
    setlgas([])
    console.log('state', data)
    const state:any = stateData.find(item => item.state.name == data )
    console.log(state, 'ssss')
    state.state.locals.forEach((x:any)=>{
      locals.push(x.name)
    })
    console.log(state)
    setlgas(locals)
    console.log(locals, 'lga')
  }
  const config = {
    email:user?.email,
    reference: (new Date()).getSeconds().toString(),
    amount: (cart.shippingCost + cart.totalPrice) * 100,
    publicKey: env.TEST_PK,
    onSuccess: handleSuccess
  }


  const updateAddress =()=>{   
    dispatch(UpdateAddress(formData) as any).then((res:any)=>{
      if(res.type='address/update-address/fulfilled'){
        dispatch(DisplayAddress(formData.id) as any)
        closeModal();
      }
    })
  }
  const payStackComponent ={
    ...config,
    text: 'Pay',
    
  }

 

  // const handleSelectValue = (name: string, value: string) => {
  //   console.log(value, 'hahahah')
  //   setFormData((prev:any)=>({
  //       ...prev,
  //       [name]:data
  //     }))


  //     console.log(formData, 'form')
  //   dropdownRef.current?.selectValue(value); // Trigger value selection
  // };
  
  return (
    <div className="checkout-container">
      <NavBar/>
      {
        cart.cart.length>0
         ?
          <div className="checkout-body">
            <div className="checkout-lft">
              <div className="shipping-detail">
                <span className="item-title">Shipping address</span>
                <div className="shipping-user-detail">
                  <span className="detailll">
                    <span className="full-name">{address?.first_name} {address?.last_name}</span>
                    <span className="contact-detail">{address?.phone_number}</span>
                    <span className="contact-detail">{address?.address}</span>
                    <span className="contact-detail">{address?.lga}, {address?.state}</span>
                  </span>
                  <span className="change-detail" onClick={()=>openModal('address')}>Change</span>
                </div>
              

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
                                <span className={`change-quantity ${item.quantity<=1 ? 'disble-btn': ''}`} onClick={changeQuantity('decrease', item.id)}>-</span>
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
                  {/* <paystackHook/> */}
                  <PaystackButton {...payStackComponent}/>
                  {/* <Button name='Pay' type="primary"/> */}
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
                  {/* <div className="fields-div">
                    <span className="field-name">Country/Region</span>
                    <SelectField
                      ref={dropdownRef}
                      options={states}
                      label="Select your state"
                      placeholder="Select"
                      preSelectedValue={formData.state}
                      onChange={getData}
                      fieldName="state"
                    />
                  </div> */}
                  <div className="fields-div">
                    <span className="field-name">Full names</span>
                    <div className="fields">
                      <InputField
                        type="text"
                        data={formData.first_name}
                        name="first_name"
                        onChange={getData}
                      />

                      <InputField
                        type="text"
                        data={formData.last_name}
                        onChange={getData}
                        name="last_name"
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
                  <Button name="Confirm" type="primary" handleClick={updateAddress} />
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
      <div className="pg-footer">
        <Footer/>
      </div>


    </div>
  )

}


export default Checkout

