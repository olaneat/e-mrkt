import React, {useEffect, useState, useRef} from "react";
import './style.scss'
import { OrdersDTO } from "../../../dto/orders.dto";
import SelectField, { DropdownHandle } from "../../input-field/custom-select-field";
import InputField from "../../input-field/input-field";
import { getRecentOrderList } from "../../../slices/recent-order-list.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { format } from 'date-fns';
import imgsConstant from "../../../constant/imgs.constant";
import DashboardLoader from "../loaders/dashboard-loader";
export interface OrdersProps{
    data:OrdersDTO[]
}
const OrderListComponent = () =>{
    const dropdownRef = useRef<DropdownHandle>(null);
    const dispatch = useDispatch();
    const icons = imgsConstant.Icons;
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
        const updatedFilter = {
          ...selectedFilter,
          [name]: value
        };
        console.log(updatedFilter, 'selected filter')
        dispatch(getRecentOrderList(updatedFilter) as any);
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
        {isRecentOrderLoading ? (
          <div className="loader">
            <DashboardLoader type="table"/>
          </div>
        ):recentOrders.length > 0 ? (
          <div className="recent-orders">
          
          <div className="orders-list-div">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Order ID</th>
                  <th>Order Status</th>
                  <th>Date Created</th>
                  <th>Total Cost</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order: any, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.reference}</td>
                    <td>{order.status.split("_").join(" ")}</td>
                    <td>
                      {format(order.createdAt, "MMMM do, yyyy 'at' h:mm a")}
                    </td>
                    <td>
                      {Number(order.total_amount).toLocaleString("en-US", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        ) : (
          <div className="empty-order-detail-list">
            <img src={icons.cartIcon} className="empt-icon" alt="" />
            <span className="order-empty-div">
              <span className="order-empty-title">No orders yet</span>
              <span className="order-empty-txt">
                When customers place orders, they’ll appear here.
              </span>
            </span>
          </div>
          )
          
        }
      </div>
    )
};


export default OrderListComponent;



