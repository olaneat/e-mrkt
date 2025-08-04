import React, {useEffect, useState} from "react";
import  './navbar.scss'
import { CategoryDTO } from "app/dto/categories.dto";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { displayCategories } from "../../slices/categories.slice";
import { RootState, AppDispatch } from "../../store";
import Icons from "../../constant/imgs.constant";
import { useNavigate } from "react-router-dom";
// import localStorageService from "../../services/local-storage.service";
import { logout } from "../../slices/login.slice";
const NavBar = () =>{
  const dispatch = useDispatch();
  const icon = Icons.Icons;
  const {cart} = useSelector((state:RootState)=>state.cart )
  const navigate = useNavigate();
  // const isAuthenticated = useSelector((state:RootState)=>state.login.isAuthenticated)
  const {address} = useSelector((state:RootState)=>state.address)
  const user = useSelector((state:RootState)=>state.user)
  const [authUser, setUser] = useState<any>();
  useEffect(()=>{
    getCategories()
    // let user = localStorageService.getItem('user')
    // setUser(user)
  },[])

  const sigout =()=>{
    dispatch(logout());
    setdropDown(!dropDown);
  }
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
            <span className="drop-down-btn" onClick={toggleDropdown}>
              <img src={icon.toggleIcon} alt="" />

              {
                dropDownMenu ? (
                  <div className="dropdown" onMouseLeave={()=>toggleDropdown}>
                    <span className="title">All Categories</span>
                      <span className="categories">

                      { categories?.map((catgory:CategoryDTO)=>
                        (
                        <span key={catgory?.id} className="items"> {catgory?.name?.toLowerCase()}</span>
                      )
                    )}
                      </span>
                  </div>
                ): ''
              }
            </span>
            <span className="title" onClick={goHome}>Ola Storez</span>
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
            {
              user.isAuthenticated ? 
                <div className="acct-div" onClick={accountToogle}>
                  <img src={icon.whiteUser} className="profile-icon" alt="" />
                  <span className="txt" > Hi, {user?.user?.username}</span>
                  {
                    dropDown ?
                      <span className="drop-down">
                        <span className="profile-div">
                          {
                            user.user?.profileImage
                              ? <img src="" alt=""  className="profile-img"/>
                              : <span className="empty-dp">
                                <img src={icon.whiteUser} alt="" />
                              </span>
                          }
                          <span className="profile-info">
                            <span className="profile">Welcome, {user.user?.username}</span>
                            <span className="signout" onClick={sigout}>Sigout</span>
                          </span>
                        </span>
                        <span className="span-list">
                          <span className="list">
                            <img src={icon.WishList} alt="" />
                            <span className="content">My Orders</span>
                          </span>
                          <span className="list">
                            <img src={icon.payment} alt="" />
                            <span className="content">Payment</span>
                          </span>
                          <span className="list">
                            <img src={icon.like} alt="" />
                            <span className="content">Wish List</span>
                          </span>
                          <span className="list">
                            <img src={icon.Settings} alt="" />
                            <span className="content">Settings</span>
                          </span>
                        </span>  
                      </span>
                    : ""
                  }
                  <img src={icon.chevronDownWhite} className="profile-icon" alt="" />
                </div>
              : 
              <div className="acct-div" onClick={accountToogle}>
                <span className="txt" >
                  Account 
                  {
                    dropDown ?
                    <span className="drop-down list">
                      <Link className="link" to="/sign-in">
                        <span className="items" >Login</span>
                      </Link>
                      <Link className="link" to="/registration">
                        <span className="items" >Signup</span>
                      </Link>
                    </span> 
                    : ""
                  }
                </span>
                <img src={icon.chevronDownWhite} className="profile-icon" alt="" />
              </div>

            }
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
                <div className="nav-slider">
                  <span className="company-name">
                    <Link to='/' className="name-name">
                      <span className="name-name">
                        Ola storez
                      </span>
                    
                    </Link>
                    <img src={icon.closeIcon} alt="" onClick={toggleSidebar} className="close" />
                  </span>
                  <div className="list">
                    <Link className="item" to="/cart">
                      {/* <span className=""> Cart</span> */}
                      <span className="icon">
                        <img src={icon.cartIcon} alt="" />
                        <span className="badge">{cart.length}</span>

                      </span>

                    </Link>
                    { user.isAuthenticated 
                      ?
                      <div className="sm-profile-info">
                        <span className="profile-div">
                          {
                            user.user?.profileImage
                              ? <img src="" alt=""  className="profile-img"/>
                              : <span className="empty-dp">
                                <img src={icon.whiteUser} alt="" />
                              </span>
                          }
                          <span className="profile-info">
                            <span className="profile">Welcome, {user.user?.username}</span>
                            <span className="signout" onClick={sigout}>Sigout</span>
                          </span>
                        </span>
                        <span className="span-list">
                          <span className="span-option">
                            <img src={icon.WishList} alt="" />
                            <span className="span-option-txt">My Orders</span>
                          </span>
                          <span className="span-option">
                            <img src={icon.payment} alt="" />
                            <span className="span-option-txt">Payment</span>
                          </span>
                          <span className="span-option">
                            <img src={icon.like} alt="" />
                            <span className="span-option-txt">Wish List</span>
                          </span>
                          <span className="span-option">
                            <img src={icon.Settings} alt="" />
                            <span className="span-option-txt">Settings</span>
                          </span>
                        </span>  
                      </div>
                      : 
                      <div>
                        <Link className="item" to="/sign-in">
                          <span className="" >Login</span>
                        </Link>
                        <Link className="item" to="/registration">
                          <span className="" >Signup</span>
                        </Link>
                      </div>
                    }

                  </div>
                  <div className="navbar-categories">
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
              </div>
              :
              <div className="menu-div">
                <span className="menu-bar" onClick={toggleSidebar}>
                  <img src={icon.toggleIcon} alt="" />
                </span>
                <div className="nav-header-div">
                  <span className="nav-header-txt">Ola Storez</span>
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
              </div>
            }
            
          </div>
        </div>    
        

      </div>
    )
}


export default NavBar
