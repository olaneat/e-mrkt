import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidbar";
import NavBar from "../top-nav-bar/navbar";
import { Outlet } from "react-router";
import './style.scss'

const AdminAuthPage =()=>{
    const [expanded, setIsExpanded ] = useState<boolean>(true);
    const toggleSideBar =()=>{
      if(expanded){
        setIsExpanded(false)

      }else{
        setIsExpanded(true)
      }
      console.log(expanded, 'exp')

    }
    useEffect(()=>{
      if(window.innerWidth < 768){
        console.log('window size', window.innerWidth)
        setIsExpanded(true)
        console.log(expanded, 'jajajajaj')
      }
      
    })
    return (
      <div className="main-auth-page">
        <div className="nav-bar">
          <NavBar/>
        </div>

        <div className="side-bar">
          <Sidebar
            onToggle={toggleSideBar}
          />

        </div>
        <div className={ expanded ? 'main-auth-page full-screen' : ' half main-auth-page'} >
          <Outlet/>
        </div>   
      </div>
    )
}

export default AdminAuthPage;