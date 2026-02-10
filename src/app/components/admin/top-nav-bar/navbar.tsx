import React, {useState} from "react";
import InputField from "../../../components/input-field/input-field";
import './style.scss'
import imgsConstant from "../../../constant/imgs.constant";
const NavBar = ()=>{
  const Icons = imgsConstant.Icons;
    return (
      <div className="admin-navbar-container">
        <div className="nav-content">
          <InputField
              type="search"
              placeholder="Search by Product name"
              searchType="default"
            />
            <div className="nav-icons">
                <span className="user-icon">
                  <img className="icon-img" src={Icons.notificaionIcon} alt="" />
                </span>
                <span className="user-icon">
                  <img src={Icons.user} alt="" className="icon-img" />
                </span>

            </div>
            </div>
        </div>
    )
}

export default NavBar