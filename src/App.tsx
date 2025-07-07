import React from "react"
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Index from './app/pages/index/home'
import ProductDetail from "../src/app/pages/product-detail/product-detail"
import Cart from "./../src/app/pages/cart/cart"
import SignUpComponent from "./app/pages/signup/signup"
import SignInComponent from "./app/pages/sign-in/signin"
import Checkout from "./app/pages/checkout/checkout"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="registration" element={<SignUpComponent/>}/>
        <Route path="/product/:id/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignInComponent/>}/>
        <Route path="/checkout" element={<Checkout/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
