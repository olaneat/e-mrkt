import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import './style.scss'
import Imgs from '../../constant/imgs.constant'
interface CustomDropdownProps {
  options: any[];
  value?: string;
  onChange: (name:string, value: any) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  preSelectedValue?:string
  fieldName:string
}

export interface DropdownHandle {
  toggleDropdown: () => void;
  selectValue: (value: string) => void;
}


const SelectField =  forwardRef<DropdownHandle, CustomDropdownProps>(
  ({ options, preSelectedValue, onChange, label, placeholder, className, disabled, fieldName }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState<Boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null);
  const icons = Imgs.Icons
  const showDropDown = ()=>{
    //   isDropDownOpen != isDropDownOpen
      setDropDownOpen(!isDropDownOpen)
  }

  const getData = (value:string) =>{
    setSelectedValue(value)
    onChange(fieldName, value)
  }

  useEffect(()=>{
  }, [])



  useImperativeHandle(ref, () => ({
    toggleDropdown: () => setIsOpen((prev) => !false),
      selectValue: (val: string) => {
        setSelectedValue(val)
      },
    }));

  return (
    <div className='select-field-div'>
      <span className="field-span">
        <div className="field dropdown-field" onClick={showDropDown}>
          { preSelectedValue
            ? <span className="select-txt"> {preSelectedValue} </span>
            :<span>
              {selectedValue 
                ? <span className="select-txt">{selectedValue}</span>
                : <span className="select-txt">{placeholder}</span>

              }
            </span>
          }
          { isDropDownOpen
            ? <span className="dropdown-list" key={preSelectedValue}>
              {options?.map((item)=>(
                <span className="dropdown-option" key={item.id} onClick={()=>getData(item)}>{item}</span>
              ))}
            </span>
            : ""
          }
          <img src={icons.chevronDown} className='select-icon' alt="" />
        </div>
      </span>
    </div>
  )
}
)
export default SelectField