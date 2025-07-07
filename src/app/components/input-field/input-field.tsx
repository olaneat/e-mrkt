import React, {useEffect, useState, forwardRef} from "react";
import Icons from "../../constant/imgs.constant";
import './style.scss'
const InputField = (props:any)=>{
    const imgUrl = Icons;
    
    
    const [showPassword, setShowPassword] = useState(false);
    const [passwordToggle, setPsdToggle] = useState<Boolean>(false)
    const [password, setpswd] = useState()
    const [isShowDropDown, setShowDropDwon] = useState<Boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string>('')
    // const [confpassword, setPsdToggle] = useState<Boolean>(false)
    
    // const [errMsg, setErrMsg] = useState({
    //   email: '',
    //   confirmPassword:'',
    //   password:''
    // })
    useEffect(()=>{
      console.log(props.dropDownValues)
    })
    const togglePassword=()=>{
       setPsdToggle(!passwordToggle)
       setShowPassword((prev)=>(!prev))
    }
    
    const showDropDown = ()=>{
      isShowDropDown != isShowDropDown
      setShowDropDwon(isShowDropDown)
    }
   let  handleChange =(event:any)=>{
    const value = event.target.value
      props.onChange(props.name, value );
    }
    

    let handleBlur=(event:any)=>{
      props.onBlur(props.name, event)
    }

    return (
      <div className="fields">
        {
          props.type=="text" ?
          <span className="field-span">
            {
              props.img ?
              <img src={props.img} className="img" />
              : ""
            }
            <input 
              name={props.name}
              type="text" 
              className="field"  
              placeholder={props.placeholder}
              onChange={handleChange}
              id="text"
              value={props.data}

            />
          </span>
          : props.type=="password"
          ? <span>
            <span className="field-span">
              <input 
                name={props.name}
                className={`pswd-field ${props.err ?'err-field':  props.err?'err-field': '' }`} 
                type={showPassword ? 'text': 'password'} 
                placeholder={props.placeholder}
                onChange={handleChange}
                id="password" 
                onBlur={handleBlur}

              />
              <span onClick={togglePassword}>
                {
                  passwordToggle ?
                    <img src={imgUrl.hidePswd} alt="" className="psd-img" />
                  : <img src={imgUrl.visiblePswd} className="psd-img"/>
              }
              </span>
            </span>
            { props.err
             ? <small className="err-msg"> {props.err}</small>
             : props.err 
             ? <small className="err-msg"> {props.err}</small>
             : ''
            }
            </span>
          : props.type=="search"
          ? <span className="field-span">
              <img src={imgUrl.search} className="img" alt="" />
              <input 
                name={props.name}
                type="search" 
                placeholder={props.placeholder}
                className="field" 
                onChange={handleChange}
                id="search"
              />
          </span>
          : props.type=="email"
          ?<span>
            <span className="field-span">
            <img src={imgUrl.email} alt="" className="img"/>
            <input type="email" 
              name={props.name}
              id="email"
              placeholder={props.placeholder}
              className={`field ${props.err ?'err-field': '' }`} 
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </span>
           { props.err
             ? <small className="err-msg"> {props.err}</small>
             : ''
            }
          </span>
          : props.type=="select"
          ? <span className="field-span">
              {/* <img src={imgUrl.search} className="img" alt="" /> */}
              <div className="field dropdown-field" onClick={showDropDown}>
                { isShowDropDown
                  ? <span className="dropdown-list">
                    {props.dropDownValues.map((item:string, index:string)=>{
                      <span className="dropdown-option">{item}</span>
                    })}
                  </span>
                  : <span className="select">
                    {selectedValue !== ""
                    ? <span className="selectValue"> {selectedValue}</span>
                    : <span className="select-txt"> Select </span>
                    }
                  </span>
                }
              </div>
          </span>
          
          : ""
        }
      </div>
    )
}


export default InputField
