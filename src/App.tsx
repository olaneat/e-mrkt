import React, {useEffect} from "react"
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Index from './app/pages/index/home'
import ProductDetail from "../src/app/pages/product-detail/product-detail"
import Cart from "./../src/app/pages/cart/cart"
import SignUpComponent from "./app/pages/signup/signup"
import SignInComponent from "./app/pages/sign-in/signin"
import Checkout from "./app/pages/checkout/checkout"
import { RootState } from "./app/store"
import { useDispatch, useSelector, UseSelector } from "react-redux"
import AuthService from "./app/services/auth.services"
import { logout } from "./app/slices/login.slice"
import { UseDispatch } from "react-redux"
import ProductByCategory from "./app/pages/category-product/index"
import VerifyPayment from "./app/pages/verify-payment/very-payment"
const App = () => {

  const user = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    let response = (AuthService.isTokenExpired(user.token, user.timeStamp))
    if(user.isAuthenticated && response){
      dispatch(logout());
    }
  },[user.token])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="sign-up" element={<SignUpComponent/>}/>
        <Route path="/product/:id/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignInComponent/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/product-by-category/:id" element={<ProductByCategory />} />
        <Route path="/verify-payment" element={<VerifyPayment />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
