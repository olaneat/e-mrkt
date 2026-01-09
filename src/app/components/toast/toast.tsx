import React, {useState, useEffect} from "react";
import './style.scss'
import Icons from "../../constant/imgs.constant";
export interface toast{
    type?:string,
    message:string,
    title:string
    timer?:any,
    handleClose: ()=> void
    position?:string,
    isOpen:boolean
    // autoClose?:(value:boolean)=>void


}

const ToastComponent = ({type, message, title, handleClose, isOpen}:toast)=>{
    

  useEffect(()=>{})
  const icons = Icons.Icons;
  return (
    <div>
      {isOpen ?
        <div className={`toast-container ${type=='success' ? 'success': 'error'}`}>
          {type == 'success' ?
            <div className="toast-content">
              <img src={icons?.success} alt="" className="img" />
              <div className="toast-body">
            <span className="toast-title">{title}</span>
            <span className="toast-txt">{message} </span>
              </div>

              <img src={icons.closeIcon} className="img close" alt=""  onClick={handleClose}/>
            </div>
          : type == 'warning'
            ? <div className="toast-content">
              <img src={icons.warning} alt="" className="img" />
              <div className="toast-body">
                <span className="toast-title">{title}</span>
                <span className="toast-txt">{message} </span>
              </div>

              <img src={icons.closeIcon} className="img close" alt=""  onClick={handleClose}/>
            </div>
          : 
            <div className="toast-content">
              <img src={icons.error} alt="" className="img" />
              <div className="toast-body">
                <span className="toast-title">{title}</span>
                <span className="toast-txt">{message} </span>
              </div>

              <img src={icons.closeIcon} className="img close" alt=""  onClick={handleClose}/>
            </div>
          }    
        </div>
      : ""}  
    </div>
      
  )

}


export default ToastComponent