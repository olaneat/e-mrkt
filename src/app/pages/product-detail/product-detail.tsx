import React , { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayProductDetail } from "../../slices/product-detail.slice";
import { ProductDetailDTO } from "../../dto/product-detail.dto";
import { useParams } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar'
import Footer from "../../components/footer/footer"
import Button from "../../components/btns/btn";
import './syle.scss'
import env from "../../../environment/env";
import {  addToCart, } from "../../slices/cart.slice";
import { RootState, AppDispatch } from "../../store";

const ProductDetail = () =>{
    const dispatch = useDispatch();
    // const [productDetail, setProductDetail] = useState<ProductDetailDTO>();
    const { product, isLoading, error } = useSelector((state: RootState) => state.product);
    const params = useParams();
    const [tabvalue, setTabValue] = useState<string>("");
    let [quantity, setQuantity] = useState<number>(1)
    let [flag, setFlag] = useState<boolean>(false)

    useEffect(() =>{
        displayProdDetail()
    },[])


    const toggleStatus=(status:string)=>{
      setTabValue(status);
    }

    const displayProdDetail=()=>{
        let productId:any = params.id
        dispatch(displayProductDetail(productId) as any)
        
    }

    const handleChange=(e:any)=>{
      const value = e.target.value;
      const quantity = product!.stock 
      if (/^\d*$/.test(value)  && value <= quantity ) {  
        setQuantity(value);
      }
      if(value > quantity){
        setFlag(true);
      }else{
        setFlag(false);
      }
    }


    const changeQuantity=(type:string)=>{
      if(type == 'add'){
        quantity++
        if(quantity>product!.stock){
          setQuantity(quantity++)    
          setFlag(true)
        }
        else{
        }
        
        if(quantity > product!.stock){
          setFlag(true);
        }else{
          setQuantity(quantity)
          setFlag(false);
        }
        console.log(quantity)
      }else{
        quantity--
        if(quantity>1){
          setQuantity(quantity)
        }else{
          setQuantity(1)
          console.log(quantity)
        }

      }
    }

    const addItemToCart=()=>{
      const payload:any = {
        price: product?.price,
        name: product?.name,
        quantity: quantity,
        id: product?.id,
        img: product?.img,
        totalPrice: quantity * product!.price
      }
      console.log(payload)
      dispatch(addToCart(payload) )
       
    }

    return (
      <div>
        <NavBar />  
        <div className="main-body">
          <div className="nav">
            <span className="home">Home</span>
            <span className="home">{product?.category}</span>
            <span className="product-name">{product?.name}</span>
          </div>
          <div className="main-content">
            <div className="imgs"></div>
            <div className="img">
              <img className="prod-img" src={`${env.imgUrl}/${product?.img}`} alt="" />
            </div>
            <div className="description-div">
              <span className="name">{product?.name}</span>
              <div className="rating-div">
                <span className="rating"> </span>
                <span className="available">
                  { product?.available==true ? 
                    'In Stock': 
                    'Not in stock'
                  }
                </span>
              </div>
              <div className="price-div">
                <span className="name">price: </span>
                <span className="price">{product?.price.toLocaleString('en-US', {
                  style:'currency',
                  currency:'NGN'
                })}</span>
              </div>
             
              <div className="add-cart">
                <div className="outer">
                  <div className="quantity-div">
                    <Button name="-" type="secondary"  handleClick={()=>changeQuantity('minus')} />
                    <div className="quantity">
                      <input type="text" name="" value={quantity} onChange={handleChange} id="" />
                    </div>
                    <Button name="+" type="primary" handleClick={()=>changeQuantity('add')}   />
                  </div>
                  <small className={flag ? "err-msg": "hide"}>Only {product?.stock} items left</small>
                </div>
                  <div className="cart-div">
                    <Button type="primary" name="Add to cart" handleClick={addItemToCart} />
                  </div>

              </div>
              
           
            </div>

            <div className="delivery-info">
              <span className="delivery-title">
                  
                <span className="txt">Delivery & Returns </span>

              </span>
              <span className="delivery-body">
                <span className="header">
                  <img src="/icons/truck.svg" alt="" />
                  <span className="title">Delivery</span>
                </span>
                <span className="est-info">Estimated delivery time 1-9 business days</span>
                <span className="express-delivery">Express Delivery Available</span>
                <span className="picup"><b> For Same-Day-Delivery:</b> Please place your order before 11AM</span>
                <span className="picup">Next-Day-Delivery: Orders placed after 11AM will be delievered the next day</span>
                <span className="picup">Note: Availability may vary by location</span>
              </span>
              <span className="refresh-div">
                <span className="header">
                  <img src="/icons/refresh.svg" alt="" />
                  <span className="title">Return Policy</span>
                </span>
                  <span className="guarrantee">Guaranteed 7-Day Return Policy</span>
                  <span className="more-txt">For details about return shipping options, please visit - </span>
                  <span className="policy">neat store return policy</span>
              </span>
            </div>
            
          </div>
          <div className="other-detail">
            <div className="tabs">
              <div className={tabvalue=='overview' ? "active tab": 'tab'} onClick={()=>toggleStatus('overview')}>Overview</div>
              <div className={tabvalue=='specification' ? "tab hr active": 'tab hr'}  onClick={()=>toggleStatus('specification')}>Specification</div>
              <div className={tabvalue=='review'?"tab active": 'tab'} onClick={()=>toggleStatus('review')}>Reviews</div>
            </div>
            <div className="tab-detail">
              { tabvalue=='overview' 
                ?<span className="description">
                  {product?.description}
                </span>
                : tabvalue=='specification'
                ? 
                <div className="specification-div">
                  


                  {
                    product?.model ?
                    <div className="itemss">
                      <span className="product-color">Model:</span>
                      <span className="desc-txt">{product.model}</span>
                    </div>
                    :""
                  }
                  {
                    product?.brand ?
                    <div className="temss">
                      <span className="product-color">Brand:</span>
                      <span className="desc-txt">{product.brand}</span>
                    </div>
                    :""
                  }
                  {
                    product?.manufacturer ?
                    <div className="itemss">
                      <span className="product-color">Manufactuerer: </span>
                      <span className="desc-txt">{product.manufacturer}</span>

                    </div>
                    :""
                  }
                  
                  {
                    product?.rearCamera ?
                      <div className="itemss">
                        <span className="product-color">Rear camera:</span>
                        <span className="desc-txt">{product.rearCamera}</span>
                      </div>
                    :""
                  }
                  {
                    product?.connectivity ?
                      <div className="itemss">
                        <span className="product-color">connectivty: </span>
                        <span className="desc-txt">{product.connectivity}</span>
                      </div>
                    :""
                    }
                    {
                      product?.frontCamera ?
                      <div className="itemss">
                        <span className="product-color">camera: </span>
                        <span className="desc-txt">{product.frontCamera}</span>

                      </div>
                      :""
                    } 
                    {
                      product?.size ?
                      <div className="itemss">
                        <span className="product-color">size:</span>
                        <span className="desc-txt">{product.size}</span>

                      </div>
                      :""
                    }
                    {
                      product?.slug ?
                      
                      <div className="itemss">
                        <span className="product-color">slug:</span>
                        <span className="desc-txt">{product.slug}</span>
                      </div>
                      :""
                    }
                    {
                      product?.display ?
                      <div className="itemss">
                        <span className="product-color">Display:</span>
                        <span className="desc-txt">{product.display}</span>

                      </div>
                      :""
                    }
                    
                    {
                      product?.colour ?
                      <div className="itemss">
                      <span className="product-color">color:</span>
                      <span className="desc-txt">{product.colour}</span>
                      </div>
                        :""
                    }
                    {
                      product?.bluetooth ?
                      <div className="itemss">
                        <span className="product-color">Bluetooth:</span>
                        <span className="desc-txt">{product.bluetooth}</span>
                      </div>
                      :""
                    }
                      
                      
                    {
                      product?.platform ?
                      <div className="itemss">
                        <span className="product-color">Operating System:</span>
                        <span className="desc-txt">{product.platform}</span>
                      </div>
                      :""
                    }
                    {
                      product?.processor ?
                      <div className="itemss">
                        <span className="product-color">Processor:</span>
                        <span className="desc-txt">{product.processor}</span>
                      </div>
                      :""
                    }
                    
                    {
                      product?.memory ?
                      <div className="itemss">
                        <span className="product-color">Storage: </span>
                        <span className="desc-txt">{product.memory}</span>
                      </div>
                      :""
                    }
                    {
                      product?.battery ?
                      <div className="itemss">
                        <span className="product-color">Battery: </span>
                        <span className="desc-txt">{product.battery}</span>
                      </div>
                      :""
                    }
                    {
                      product?.sim ?
                      <div className="itemss">
                        <span className="product-color">SIM: </span>
                        <span className="desc-txt">{product.sim}</span>
                      </div>
                      :""
                    }

                </div>
                    :tabvalue=='overview'
                    ? <div className="detail"></div>
                    :""
              }
            </div>

          </div>
        </div>
        <Footer />    
      </div>
    )
}

export default ProductDetail