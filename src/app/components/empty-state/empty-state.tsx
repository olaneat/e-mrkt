import React, {useEffect, useState} from "react";
import env from "environment/env";
import Button from "../btns/btn";
import './style.scss'
import { useNavigate } from "react-router";
export interface EmptyState{
    imgUrl?:string,
    title?:string
    text?:string
}

const EmptyStateComponent =({imgUrl, title, text}: EmptyState)=>{
  const navigate = useNavigate();
  const goHome =()=>{
    navigate('/')

  }
  
    return(
    <div className="empty-container">
      <span className="img-container">
        <img src={imgUrl} alt="" className="empty-img" />
      </span>
      <span className="title">{title}</span>
      <span className="txt">{text}</span>
    
      <Button 
        type="primary"
        name="Expore Items"
        handleClick={goHome}
      />
    </div>
  )
}

export default EmptyStateComponent