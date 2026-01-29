import React, {useState} from "react";
import Sidebar from "../sidebar/sidbar";
import { Outlet } from "react-router";
import './style.scss'

const AdminAuthPage =()=>{
    const [expanded, setIsExpanded ] = useState<boolean>(true);

    return (
      <div className="main-auth-page">
        <div >
          <Sidebar
            onToggle={(expand)=>{setIsExpanded(expand),  console.log(expanded)}}
          />

        </div>
        <div className={ expanded ? 'main-body full-screen' : ' half main-body'} >
          <Outlet/>
        </div>   
      </div>
    )
}

export default AdminAuthPage;