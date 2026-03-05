import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../../components/admin/sidebar/sidbar";
import './style.scss'
import imgsConstant from "../../../constant/imgs.constant";
import BarChart from "../../../components/admin/bar-chart";
import OrderListComponent from "../../../components/admin/recent-orders";
import { OrdersDTO } from "../../../dto/orders.dto";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchStatusCount } from "../../../slices/status-count.slice";
import { RootState } from "../../../store";
// import 

const  DashboardPage = () => {
  const [size, setSize] = useState<boolean>(true);
  const dispatch = useDispatch();
  const {statusCount, isStatusCountLoading, StatusCountError} = useSelector((state:RootState)=>state?.OrderStatusCount);
  const isFirstRender = useRef(true);
  const allIcons = imgsConstant.Icons;
  
  const getSize = (value:boolean)=>{
    setSize(value)
    
  }


  const getStatusCount = () =>{ 
    dispatch(fetchStatusCount() as any).then();
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
        <BarChart />
      </div>
      <div className="recent-orders">
        <OrderListComponent />
      </div>

    
    </div>
  );
};

export default DashboardPage;