import React, { useState }  from "react";
import imgsConstant from "../../constant/imgs.constant";
import './style.scss'




interface SidebarProps {
  onToggle?: (isExpanded: boolean) => void;   // ← new prop
}

const Sidebar:React.FC<SidebarProps> = ({onToggle}) => {
    const [itemName, setItemName] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const sidebarList: string[] = ['Dashboard', 'Orders', 'Users', 'Products', 'FAQ', 'Policy' ]
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
                                        return<span 
                                            key={index} 
                                            className={itemName == item  ? 'active side': 'side'}
                                            onClick={()=>selectItem(item)}
                                            >
                                                {item}
                                        </span>
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