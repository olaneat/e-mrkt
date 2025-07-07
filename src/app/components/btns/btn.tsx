import React, {useEffect, useState} from "react";
import './style.scss'


const Button =(props:any)=>{
    useEffect(()=>{})
    return(
        <div className={props.disabled==true? 'disable': 'full'}>
          <div className={props.type=='primary' ? "parent-btn primaryBtn": "parent-btn secondaryBtn"} onClick={props.handleClick} >
            <span>{props.name}</span>
            <span>
              <img className="img" src={props.imgurl} alt="" />
            </span>

          </div>
        </div>
    )

}

export default Button