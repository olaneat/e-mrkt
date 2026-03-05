import React, {useEffect, useState, useRef} from "react";
import './style.scss'
import { OrdersDTO } from "../../../dto/orders.dto";
import SelectField, { DropdownHandle } from "../../input-field/custom-select-field";
import InputField from "../../input-field/input-field";
import { getRecentOrderList } from "../../../slices/recent-order-list.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { se } from "date-fns/locale";
export interface OrdersProps{
    data:OrdersDTO[]
}
const OrderListComponent = () =>{
    const dropdownRef = useRef<DropdownHandle>(null);
    const dispatch = useDispatch();
    const {recentOrders, isRecentOrderLoading, err} = useSelector((state:RootState)=>state.RecentOrderList);
    const [selectedFilter, setSelectedFilter] = useState<any> ({
        status: "",
        searchText: ""
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
      console.log(name, value, 'name and value')
        setSelectedFilter((prev:any)=>({
            ...prev, 
            [name]:value
        }))
        console.log(selectedFilter, 'selected filter')
        dispatch(getRecentOrderList(selectedFilter) as any);
    }
    useEffect(()=>{
        displayOrders();
        console.log(recentOrders, 'recent orders')
    }, [])


    const displayOrders = () =>{
      console.log('displaying orders')
      dispatch(getRecentOrderList(selectedFilter) as any);
    }
  
    return( 
        <div className="recent-orders-container">
          <span className="order-title">Recent Orders</span>
          <div className="filter-div">
            <div className="filter">
              <SelectField 
                preSelectedValue={selectedFilter?.filter ? selectedFilter?.filter:filterList[0]}
                label="filter"
                fieldName="status"
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
                name="searchText"
                onChange={getData}
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
              {recentOrders.length>0 ?
                <div className="order-detail-list">
                  <div className="order">
                    {recentOrders.map((order:any, index)=>(
                      <div className="content" key={order.id}>
                        <span className="order-id">{index+1}</span>
                        <span className="order-id">{order.reference}</span>
                        <span className="order-status">{order.status}</span>
                        <span className="date-created">{format(order.createdAt,"MMMM do, yyyy 'at' h:mm a")}</span>
                        <span className="total-cost">{Number(order.total_amount).toLocaleString('en-US',
                          { style: 'currency', currency: 'NGN' })} 
                        </span>
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



