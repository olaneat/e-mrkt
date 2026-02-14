import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/sidebar/sidbar";
import './style.scss'
import imgsConstant from "../../../constant/imgs.constant";
import BarChart from "../../../components/bar-chart";

const  DashboardPage = () => {
  const [size, setSize] = useState<boolean>(true);
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
  
  const getSize = (value:boolean)=>{
    setSize(value)
  
  }

  useEffect(()=>{

  })
  return (
    <div className="dashboard-container">
      <div className="status-cards">
        <div className="card new-order">
          <img src={allIcons.newOrdersIcon} className="order-status-icon" alt="" />
          <div className="order-contents">
            <div className="order-title">New Orders</div>
            <div className="order-count">10</div>
          </div>
        </div>
        <div className="card pending">
          <img src={allIcons.pendingIcon} className="pending-icon" alt="" />
          <div className="order-contents">
            <div className="order-title">Pending Orders</div>
            <div className="order-count">10</div>
          </div>
        </div>
        <div className="card shipped">
          <img src={allIcons.TransitIcon} className="order-status-icon" alt="" />
          <div className="order-contents">       
            <div className="order-title">Shipped Orders</div>
            <div className="order-count">10</div>
          </div>
        </div>
        <div className="card delivered">
          <img src={allIcons.deliveredIcon} className="order-status-icon" alt="" />
          <div className="order-contents">
            <div className="order-title">Delivered Orders</div>
            <div className="order-count">10</div>
          </div>
        </div>
      </div>
      <div className="overall-card">
        <BarChart data={dummyData}/>
      </div>
      <div className="recent-orders"></div>

    
    </div>
  );
};

export default DashboardPage;