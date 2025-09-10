import React, {useEffect, useState} from "react";
import './style.scss'


interface ButtonProps {
  name: string;
  imgurl?: string;
  type?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  handleClick?: () => void;
}

const Button: React.FC<ButtonProps> =({name,imgurl, type, disabled, loading, handleClick,  })=>{
    useEffect(()=>{})
    return(
        <div className={disabled || loading? 'disable': 'full'}>
          <div className={type=='primary' ? "parent-btn primaryBtn": "parent-btn secondaryBtn"} onClick={handleClick} >
            {
              loading ?
              (
                <div className="btn-loader"></div>

              )
              :(
                <div>
                  <span>{name}</span>
                  <span>
                    <img className="img" src={imgurl} alt="" />
                  </span>
                </div>

              ) 
            }
          </div>
        </div>
    )

}

export default Button