import React, {useEffect, useState} from "react";
import  './navbar.scss'
import { CategoryDTO } from "app/dto/categories.dto";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { displayCategories } from "../../slices/categories.slice";
import { RootState, AppDispatch } from "../../store";
import Icons from "../../constant/imgs.constant";
import { useNavigate } from "react-router-dom";

const NavBar = () =>{
  const dispatch = useDispatch();
  const icon = Icons.Icons;
  const {cart} = useSelector((state:RootState)=>state.cart )
  const navigate = useNavigate();
  useEffect(()=>{
    getCategories()
  },[])


  const getCategories = () =>{
    dispatch(displayCategories()as any)
   
  }
  const [showSidebar, setShowSidebar] = useState(false)
  const [dropDownMenu, setdropDownMenu] = useState(false);
  const [dropDown, setdropDown] = useState(false);
  const { categories, isLoading, error } = useSelector((state: RootState) => state.category);
  
  // const [Categories, setCategories] = useState<CategoryDTO[]>([]);
 
  useEffect(()=>{

  })

  const toggleSidebar = () =>{
    
    if(showSidebar){
      setShowSidebar(false)
    }else{
      setShowSidebar(true)
    }

  }
 
  const toggleDropdown =()=>{
    if(dropDownMenu){
      setdropDownMenu(false);
    }else{
      setdropDownMenu(true);
    }
  }

  const accountToogle = () =>{
    if(dropDown){
      setdropDown(false);
    }else{
      setdropDown(true)
    }
  }

  const goHome= ()=>{
    navigate('/')
  }
  const titleCase =(element:string) =>{
    if(element == null || element === ""){
      return false;
    }
    return element.replace(/\w\s*/g, 
      function convertTxt(txt:string){
        return txt.charAt(0).toLocaleUpperCase() + txt.substring(1);
      }
    )
  }

  
    return(
      <div>
        <div className="container ">
          <div className="lg-screen">

          <div className="company-name">
            <span className="title" onClick={goHome}>Ola Storez</span>
            <span className="drop-down-btn" onClick={toggleDropdown}>
              <img src={icon.toggleIcon} alt="" />

              {
                dropDownMenu ? (
                  <div className="dropdown">
                    <span className="title">All Categories</span>
                      <span className="categories">

                      { categories?.map((catgory:CategoryDTO)=>
                        (
                        <span key={catgory?.id} className="items"> {catgory?.name?.toLocaleUpperCase()}</span>
                      )
                    )}
                      </span>
                  </div>
                ): ''
              }
            </span>
          </div>
          
          <div className="search-div">
            <input 
              type="search" 
              placeholder="what can i search for u?" 
              className="search-field"
            />
          </div>
          <div className="nav-content" >
           <Link className="link" to="/">
            <span className="item"> Home</span>
          </Link>
            <span  className="txt"  onClick={accountToogle}>
              Account
              
              { dropDown ? (
              <div className="drop-down">

                <Link className="link" to="/sign-in">
                  <span className="items" >Login</span>
                </Link>
                <Link className="link" to="/registration">
                  <span className="items" >Signup</span>
                </Link>
                

              </div>
            ):(
              <div></div>
            )}
            </span>
            
            <Link to="/cart">
              <div className="icon">
                {cart.length>0 
                  ?
                  <span className="badge">{cart.length}</span>
                  : ""
                }
                <img src={icon.cartIcon} alt="" />
              </div>
                
            </Link>

          </div>
          </div>
          <div className="sm-screen">
            { showSidebar ? 
              <div className="sidebar" onClick={toggleSidebar}>
                <div className="top">
                  <div className="lft">
                    <span className="close">X</span>
                    <span className="name">Ola Storez</span>
                  </div>
                  <Link to="/cart">
                  <div className="icon">
                    {cart.length>0 
                      ?
                      <span className="badge">{cart.length}</span>
                      : ""
                    }
                    <img src={icon.cartIcon} alt="" />
                  </div>
                
                </Link>

                </div>

                <div className="list">
                  <Link className="link" to="/">
                    <span className="item"> Home</span>
                  </Link>
                  <Link className="link" to="/sign-in">
                    <span className="items" >Login</span>
                  </Link>
                  <Link className="link" to="/registration">
                    <span className="items" >Signup</span>
                  </Link>

                </div>
                <div className="categories">
                  <span className="title">Popular Categories</span>
                  <div className="cat-list">
                    {
                      categories?.map((catgory:CategoryDTO)=>
                        (
                        <span key={catgory?.id} className="items"> {catgory?.name?.toLocaleUpperCase()}</span>
                      ))
                    }
                  </div>
                </div>
              </div>
              :
              <div className="menu-div">
                <span className="menu-bar" onClick={toggleSidebar}>
                  <img src="icons/menu-icon.svg" alt="" />
                </span>
                <Link to={'/cart'}>
                  <div className="icon">
                    {cart.length>0 
                      ?
                      <span className="badge">{cart.length}</span>
                      : ""
                    }
                    <img src={icon.cartIcon} alt="" />
                  </div>
                
                </Link>
              </div>
            }
            
          </div>
        </div>    
        

      </div>
    )
}


export default NavBar
