import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/sidbar";
import './style.scss'
const  DashboardPage = () => {
const [size, setSize] = useState<boolean>(true)

  const getSize = (value:boolean)=>{
    setSize(value)
  
  }
  return (
    <div className="dasnboard-container">
      
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
};

export default DashboardPage;