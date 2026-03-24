import React, { useState }  from "react";
import imgsConstant from "../../../constant/imgs.constant";
import './style.scss'
import { Link } from "react-router-dom";




interface SidebarProps {
  onToggle?: (isExpanded: boolean) => void;   // ← new prop
}

const Sidebar:React.FC<SidebarProps> = ({onToggle}) => {
    const [itemName, setItemName] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const sidebarList: DataType[] = [
        {name: 'Dashboard', url: 'dashboard'},
        {name: 'Orders', url: 'orders'},
        {name: 'Users', url: 'user-list'},
        {name: 'Products', url: 'product-list'},
        {name: 'FAQ', url: 'fao'},
        {name: 'Policy', url: 'policy'},
    ]
    const icons = imgsConstant.Icons
    const toggleWidth = () => {
        // setWidth(fullWidth);
        setIsVisible(!isVisible);
        onToggle?.(isVisible)
    };
    const selectItem =(item:string)=>{
        console.log(item)
        setItemName(item);
    }
    return (
        <div>
            {
                isVisible ?
                <div className={isVisible ? "sidebar expanded-sidebar" : "sidebar collapsed"} >
                    <div className="sidebar-container">
                        
                        {isVisible && (
                            <div className="sidebar-content">
                                <div className="header-div">
                                    <span className="sidebar-title">Neat Storez</span>
                                    <img onClick={()=>toggleWidth()} className="toggle-icon" src={icons.hideToggle} alt="" />
                                </div>
                                <span className="sidebar-list">
                                    {sidebarList.map((item, index)=>{
                                        return<Link to={item.url} key={index} className="link-text">
                                            <span 
                                                key={index} 
                                                className={itemName == item.name  ? 'active side': 'side'}
                                                onClick={()=>selectItem(item.name)}
                                                >
                                                    {item.name}
                                            </span>
                                        
                                        </Link>
                                    })}
                                </span>
                                <div className="footer">
                                    
                                </div>
                            </div>
                        )}

                    </div>  
                </div>

            :
             <span onClick={()=>toggleWidth()}><img className="toggle-icon" src={icons.showToggle} alt="" /> </span>     
            }

        </div>
      
    );
};

export default Sidebar;

export interface DataType{
    name: string;
    url:string
}