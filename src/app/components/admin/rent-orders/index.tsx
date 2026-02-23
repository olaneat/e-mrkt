import React, {useEffect, useState, useRef} from "react";
import './style.scss'
import { OrdersDTO } from "../../../dto/orders.dto";
import SelectField, { DropdownHandle } from "../../../components/input-field/custom-select-field";
import InputField from "../../..//components/input-field/input-field";


export interface OrdersProps{
    data:OrdersDTO[]
}
const OrderListComponent = ({data}:OrdersProps) =>{
    const [orders, setOrders] = useState<OrdersDTO[]>([])
    const dropdownRef = useRef<DropdownHandle>(null);
    const [selectedFilter, setSelectedFilter] = useState<any> ({
        filter: ""
    })
    const filterList: any[] =  [
        "All",
        "Pending Payment",
        "Processing",
        "In-transit",
        "Cancelled",
        "Delivered"
    ]
    const filterList2: any[] =  [
        {key:"", value:'all'},
        {key:'pending_payment', value: "pending"},
        {key:'processing', value: 'Processing'},
        {key:'In-transit', value: 'In transit'},
        {key:'cancelled', value: 'Cancelled'},
        {key:'Delivered', value: 'delivered'},
    ];

    const getData = (name:string, value:string)=>{
        setSelectedFilter((prev:any)=>({
            ...prev, 
            [name]:value
        }))
    }
    useEffect(()=>{
        setOrders(data)
        console.log(data, 'data')
        // Fetch recent orders data from API and update state
        // Example: fetch('/api/recent-orders').then(res => res.json()).then(data => setOrders(data));
    }, [])

    return( 
        <div className="recent-orders-container">
          <span className="order-title">Recent Orders</span>
          <div className="filter-div">
            <div className="filter">
              <SelectField 
                preSelectedValue={selectedFilter?.filter ? selectedFilter?.filter:filterList[0]}
                label="Filter"
                fieldName="filter"
                options={filterList}
                ref={dropdownRef}
                onChange={getData}
              
              />
            </div>
            <div className="search">
              <InputField 
                type="search"
                placeholder="Search by Order Id"
                searchType="default"
              />
            </div>

          </div>
          <div className="oders-list-div">
            <div className="order-list-title-div">
              <span className="order-title">S/N</span>
              <span className="order-title">Order ID</span>
              <span className="order-title">Order Status</span>
              <span className="order-title">Date Created</span>
              <span className="order-title">Total Cost</span>
            </div>
              {orders.length>0 ?
                <div className="order-detail-list">
                  <div className="order">
                    {orders.map((order:any, index)=>(
                      <div className="content" key={order.id}>
                        <span className="order-id">{index+1}</span>
                        <span className="order-id">{order.reference}</span>
                        <span className="order-status">{order.status}</span>
                        <span className="date-created">{order.createdAt}</span>
                        <span className="total-cost">9282928393</span>
                      </div>

                    ))}
                  </div>
                </div>
              : 
              <div className="empty-order-detail-list">
                <span className="order-empty-title">No orders yet</span>
                <span className="order-empty-txt">When customers place orders, they’ll appear here.</span>
              </div>
            }
          </div>
        </div>
    )
};


export default OrderListComponent;



