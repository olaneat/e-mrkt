import React, {useState, useEffect} from "react";
import './style.scss'
import Icons from "../../constant/imgs.constant";
export interface toast{
    type:string,
    message:string,
    title:string
    timer?:any,
    handleClose: ()=> void
    position?:string,
    isOpen:boolean
    isClose?:boolean

}

const ToastComponent = ({type, message, title, timer, position, handleClose, isOpen, isClose }:toast)=>{
    
    
    const close=()=>{
        if(isClose){
            console.log('close auto')
            setTimeout(()=>{
                handleClose()
            }, 500)
        }
    }


    useEffect(()=>{
        close();
    }, [])
    const icons = Icons;
    return (
        <div>
          {isOpen ?
            <div className="toast-container">
              {type == 'success' ?
                <div className="toast-content">
                  <img src={icons.success} alt="" className="img" />
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