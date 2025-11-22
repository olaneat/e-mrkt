import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NavBar from "../../components/navbar/navbar";
import './style.scss'
import { RootState } from "app/store";
import Footer from "../../components/footer/footer";
import InputField from "../../components/input-field/input-field";
import {getOrderList} from "../../slices/orders.slice";
import env from "../../../environment/env";
import debounce from 'lodash.debounce';
import { OrderSearchDTO } from "../../dto/products.dto";
import LoaderComponent from "../../components/loader/loader";
import EmptyStateComponent from "../../components/empty-state/empty-state";
import imgsConstant from "../../constant/imgs.constant";
const Orders = ()=>{
  const {categories} = useSelector((state:RootState)=>state.category);
  const tabs:any[] =  [
    {key:"", value:'all'},
    {key:'pending_payment', value: "pending"},
    {key:'processing', value: 'Processing'},
    {key:'In-transit', value: 'In transit'},
    {key:'cancelled', value: 'Cancelled'},
    {key:'Delivered', value: 'delivered'},
  ]
  const {orders, isLoading, err} = useSelector((state:RootState)=>state.OrderList);
  const [tabName, setTabName] = useState('all')
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any>();
  const dispatch = useDispatch();
  const imgUrl = imgsConstant
  
  let [queryParams, queryParamsParams] = useState<OrderSearchDTO>({
    searchText: searchParams.get('ref') || "",
    status:  searchParams.get('status') || undefined,
  });
 
  const toggleTab =(value:any)=>{
    queryParams.status = value.key
    setTabName(value.value);
    queryParamsParams((prevParams) => ({
      ...prevParams,
      status: tabName,
    }));

    // return newValue;
    // });
    dispatch(getOrderList(queryParams) as any); 
}

  const displayOrderList = ()=> {
    dispatch(getOrderList(queryParams) as any); 
  }



  useEffect(()=>{
    if(queryParams.status){
      setTabName(queryParams.status)
    }
    if(queryParams.searchText){
      setData(queryParams.searchText)
    }
    displayOrderList();
  },[])

  useEffect(()=>{
    const params = new URLSearchParams();
    if(tabName ){
      if(tabName !=="all"){
        params.set('status', tabName.trim());
      }
    }
    if(queryParams.searchText){
      params.set('searchText',queryParams.searchText.trim());
    }

    setSearchParams(params, {replace:true})
  }, [queryParams, setSearchParams])

  const getThirdDay =(dateInput: string | Date)=> {
    const date = new Date(dateInput);
    // move 3 days ahead
    date.setDate(date.getDate() + 3);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;

  }

  const getSearchValue = (name:string, value:string)=>{
    queryParams.searchText = value
    queryParamsParams((prev)=>({
      ...prev,
      [name]:value
    }))
   searchOrder(queryParams);
  }
  const searchOrder =  useCallback(
    debounce(async(value:OrderSearchDTO)=>{
      if(value.searchText.length<1){
        return
      }
      dispatch(getOrderList(value) as any);
      // setSearchParams(value.searchText);
    }, 3000),
    []
  )
    
  const getDate =(value:string)=>{
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }
  if(isLoading){
    return(
      <LoaderComponent title="loading orders"/>
    )
  }
  if(orders.length<1){
    <EmptyStateComponent title="No orders found" text=""/>
  }
  return (
      <div className="order-container">
        <NavBar catgeories={categories|| []} pageType="detail"/>
        <div className="orders-div" >
          <span className="title">My Orders</span>
          <div className="outer-div">
            <div className="nav-div">
              <div className="tabs">
                {tabs.map((tab)=>{
                  return (
                    <span key={tab.key} className={`tab ${tabName==tab.value ? 'active': 'tab'}`} onClick={()=>toggleTab(tab)}>
                      {tab.value}
                    </span>
                  )
                })}
              </div>
              <div className="search">
                <InputField 
                  type="search" 
                  name="searchText" 
                  placeholder="Search by Order Id" 
                  searchType="default" 
                  onChange={getSearchValue}
                  data={queryParams.searchText}  
                />
              </div>
            </div>

            <div className="orders">
            
              {
              orders.length>0 ?
                <div className="order-list">
                <div className="order">
                  {orders.map((order:any, idx:number)=>{
                    return (
                      <div className="order-row" key={idx}>
                        {
                          order.items.map((item:any, id:string)=>{
                            return (
                              <div key={id} className="item-detail">
                                <div className="detail">
                                  <img src={`${env.IMG_URL}/${item.img}`} alt={item.name} className="item-img"/>
                                  <span className="order-info">
                                    <span className="item-name">
                                      {item.name}
                                    </span>
                                    <span className="reference">Order ID: {order.reference}</span>
                                    <span className={`status ${
                                      order.status=='completed' ? 'complete':
                                      order.status=='processing' ? 'processing':
                                      order.status=='cancelled' ? 'cancelled':
                                      order.status =='in-transit' ? 'in-transit': 
                                      order.status=='delivered' ? 'delivered':
                                      order.status=='pending_payment' ? 'pending':
                                      ''
                                      }`}
                                    >
                                      {order.status.replace('_', ' ')}
                                    </span>

                                    <div className="delivery-info">
                                      {
                                        order.status=='deliver' ?
                                        <span className="date-info">Delivered on {getThirdDay(order.createdAt)}</span>
                                        : <span className="date-info">On {getDate(order.createdAt)}</span> 
                                        
                                      }
                                    </div>
                                  </span>
                                </div>
                              </div>
                            )
                          })
                        
                        }
                      </div>
                    )
                  })}
                </div>
                </div> 
              : 
                <EmptyStateComponent imgUrl={imgUrl.Images.emptyStateCart} title="No items in your order" text="Start shopping to fill this space" btnTxt="Expore more" />

              
            }
               

            </div>

          </div>

        </div>
        <Footer/>
      </div>
    
  )
}

export default Orders