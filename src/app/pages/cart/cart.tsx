import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import './cart.scss'
import env from "../../../environment/env";
import NavBar from "../../components/navbar/navbar";
import Button from "../../components/btns/btn";
import Icons from "../../constant/imgs.constant";
import { increaseQuantity, removeItem, reduceQuantity } from "../../slices/cart.slice";
import { UseDispatch } from "react-redux";
import Footer from "../../components/footer/footer";
import localStorageService from "../../services/local-storage.service";
import ToastComponent from "../../components/toast/toast";
import EmptyStateComponent from "../../components/empty-state/empty-state";
import images from "../../constant/imgs.constant";
const Cart =() =>{
    // const {cart, totalPrice} = useSelector((state:RootState) => state.cart);
    const cart = useSelector((state:RootState)=>state.cart )
    const icons = Icons.Icons;
    const dispatch  = useDispatch();
    const [totlPrice, setTotalPrice]=useState(0); 
    // const [shippingCost, setshippingCost]=useState(1000); 
    const [authUser, setUser] = useState()
    const navigate = useNavigate(); 
    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastMsg, setToastMsg] = useState<string>('')
    const [toastTitle, setToastTitle] = useState<string>('')
    const imgUrl = images.Images
// const [cart, setCart] = useState();
// 

  const delItem = (id:string)=> (event: React.MouseEvent<HTMLSpanElement>) =>{
    console.log(id)
    dispatch(removeItem({id}) as any)
    openToast('del')
    
  }
    useEffect(()=>{
      calTotal();
    },)

    const changeQuantity = (action:string, id:string)=> (event: React.MouseEvent<HTMLSpanElement>) =>{
      if(action=='increase'){
        dispatch(increaseQuantity({id}))
      }
      else{
        dispatch(reduceQuantity({id}))
      }

      openToast('update');
      
    }

    const calTotal = ()=>{
      let total = cart.totalPrice + cart.shippingCost
      setTotalPrice(total)
    }

    // const openToast()
    const checkOut =()=>{
      let user:any =localStorageService.getItem('user')
     if(user?.refresh_token){
      navigate('/checkout')
     }else{
      navigate('/sign-in')
     }
    }
    
    const closeToast = ()=>{
      setShowToast(false)
    }
    const openToast =(type:string)=>{
      if(type == 'del'){
        setToastMsg('Item deleted Successfully');
        setToastTitle('Cart updated successfully');
      
      }else if(type == 'update'){
        setToastMsg('Item quantity updated Successfully')
        setToastTitle('Cart updated successfully')
      }
      setShowToast(true)
      setTimeout(()=>setShowToast(false), 5000)
    }
    return(

      <div className="cart-container">
        <div className="nav">
          <NavBar />
        </div>
        <span className="breadcrumb">
          <Link to={'/'}  className="home"> Home</Link>/
          <span className="cart">Cart</span> 
        </span>
        {
          cart.cart.length>0 ?
            <div className="cart-detail">
              <div className="lft-cart">
                <div className="carts">
                  {
                    cart.cart.map((item, index)=>{
                      return(
                        <div className="cart" key={item.id}>
                          <div className="single-item">
                            <span className="count">{index+1}</span>
                            <img src={`${env.IMG_URL}/${item.img}`} alt="" className="item-img" />
                            <div className="cart-item-detail">
                              <span className="item-name max" >{item.name} </span>
                              <div className="price-div">
                                <span className="price-detail">
                                  <span className="unit-price"> Unit price:</span>
                                  <span className="price">
                                    {item.price.toLocaleString('en-US', {style: 'currency',currency: 'NGN'})}
                                  </span>
                                </span>
                                <div className="item-quantity">
                                  <span className="change-quantity" onClick={changeQuantity('reduce', item.id)}>-</span>
                                  <span className="chart-item-quantity">{item.quantity}</span>
                                  <span className="change-quantity" onClick={changeQuantity('increase', item.id)}>+</span>
                                </div>
                              </div>
                              <div className="price-detail">
                                <span className="unit-price">Total Price:</span>
                                <span className="price">
                                  {item.totalPrice.toLocaleString('en-US', {style: 'currency', currency: 'NGN'})}
                                </span>

                              </div>
                            </div>
                          </div>
                          <span className="del-icon" onClick={delItem(item.id)}>
                            <img src={icons.trashIcon}  className="img"/>

                          </span>
                          
                        </div>
                        
                      )
                    })
                  }
                </div>
              </div>
              <div className="rgt-cart">
                <div className="summary-header">Summary</div>
                <div className="summary-body">
                  <div className="summary-items">
                    <span className="summary-title">Items total Price:</span>
                    <span className="summary-item">
                      {cart.totalPrice.toLocaleString('en-US',{style:'currency',currency: 'NGN'})}
                    </span>
                  </div>
                
                  <div className="summary-items">
                    <span className="summary-title">total Items:</span>
                    <span className="summary-item">{cart.cart.length}</span>

                  </div>
                  <div className="shipping-items">
                    <span className="shipping-title">Shipping:</span>
                    <span className="summary-item">{cart.shippingCost.toLocaleString('en-US',{style:'currency', currency: 'NGN'})}</span>
                  </div>
                  <div className="est-items">
                    <span className="est-title">Estimated Total:</span>
                    <span className="summary-item">
                      {totlPrice.toLocaleString('en-US',{style:'currency',currency: 'NGN'})}
                      </span>
                  </div>
                </div>
                <div className="cart-btn">
                  <Button name="Checkout" type="primary" handleClick={checkOut}/>
                </div>
              </div>

            </div>
          : <div className="empty-div">
              <EmptyStateComponent
              text="Items added to your cart will display here"
              title="Your Cart is Empty"
              imgUrl={imgUrl.emptyStateCart}
            />
          </div>
        } 
        <Footer/>

        <ToastComponent 
          message={toastMsg} 
          title={toastTitle} 
          isOpen={showToast}
          handleClose={closeToast}
          type="success"
        />
      </div>
    )
}



export default Cart



