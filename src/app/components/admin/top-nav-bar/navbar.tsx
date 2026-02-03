import React, {useState} from "react";
import InputField from "../../../components/input-field/input-field";
const NavBar = ()=>{
 
    return (
        <div className="admin-bar-container">
            <div className="nav-content">
                <InputField
                    type="search"
                />
            </div>
        </div>
    )
}

export default NavBar