import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../../components/admin/sidebar/sidbar";
import './style.scss'
import imgsConstant from "../../../constant/imgs.constant";
import BarChart from "../../../components/admin/bar-chart";
import OrderListComponent from "../../../components/admin/rent-orders";
import { OrdersDTO } from "../../../dto/orders.dto";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchStatusCount } from "../../../slices/status-count.slice";
import { RootState } from "../../../store";
// import 

const  DashboardPage = () => {
  const [size, setSize] = useState<boolean>(true);
  const dispatch = useDispatch();
  const {statusCount, isStatusCountLoading, StatusCountError} = useSelector((state:RootState)=>state.OrderStatusCount);
  const isFirstRender = useRef(true);
  const allIcons = imgsConstant.Icons;
  const [BarChartValue, setBarchartValue] = useState();
  const dummyData:any = [
    { name: 'Mon', value: 30 },
    { name: 'Tue', value: 80 },
    { name: 'Wed', value: 45 },
    { name: 'Thur', value: 60 },
    { name: 'Fri', value: 20 },
    { name: 'Sat', value: 90 },
    { name: 'Sun', value: 100 },
  ]
  
  const OrderList:OrdersDTO[] = [
    {
      id: '19283',
      reference: '129k83j',
      items: [],
      createdAt: '20-09-1923',
      status:'pending'
    },
    {
      id: '1219283',
      reference: 'a12k83j',
      items: [],
      createdAt: '21-09-2025',
      status:'Delivered'
    },
    {
      id: '19284',
      reference: '129k8j',
      items: [],
      createdAt: '22-01-2026',
      status:'in_transit'
    }
  ]
  const getSize = (value:boolean)=>{
    setSize(value)
    
  }


  const getStatusCount = () =>{ 
    dispatch(fetchStatusCount() as any).then((res:any)=>{
     });
  }

  useEffect(()=>{
    getStatusCount();
  }, [])

  return (
    <div className="dashboard-container">
      <div className="status-cards">
        <div className="card new-order">
          <img src={allIcons.newOrdersIcon} className="order-status-icon" alt="" />
          <div className="order-contents">
            <div className="order-title">New Orders</div>
            <div className="order-count">{statusCount?.pending_payment}</div>
          </div>
        </div>
        <div className="card pending">
          <img src={allIcons.pendingIcon} className="pending-icon" alt="" />
          <div className="order-contents">
            <div className="order-title">Pending Orders</div>
            <div className="order-count">{statusCount?.processing_count}</div>
          </div>
        </div>
        <div className="card shipped">
          <img src={allIcons.TransitIcon} className="order-status-icon" alt="" />
          <div className="order-contents">       
            <div className="order-title">In Transit Orders</div>
            <div className="order-count">{statusCount?.intransit_count}</div>
          </div>
        </div>
        <div className="card delivered">
          <img src={allIcons.deliveredIcon} className="order-status-icon" alt="" />
          <div className="order-contents">
            <div className="order-title">Delivered Orders</div>
            <div className="order-count">{statusCount?.delivered_count}</div>
          </div>
        </div>
      </div>
      <div className="overall-card">
        <BarChart data={dummyData}/>
      </div>
      <div className="recent-orders">
        <OrderListComponent data={OrderList}/>
      </div>

    
    </div>
  );
};

export default DashboardPage;