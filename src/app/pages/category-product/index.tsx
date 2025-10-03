import React,{ useEffect} from "react";
import { RootState } from "app/store";
import { useDispatch, UseDispatch, useSelector, UseSelector } from "react-redux";
import { useParams } from "react-router";
import { DisplayProductsByCategory } from "../../slices/category-product.slice";
import LoaderComponent from "../../components/loader/loader";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import './style.scss'
import { Link } from "react-router-dom";
import imgsConstant from "../../constant/imgs.constant";
import env from "../../../environment/env";
import EmptyStateComponent from "../../components/empty-state/empty-state";
const ProductByCategory = ()=>{
  // const ProductByCategory = useSelector((state:RootState)=>state.productByCatgeory)
  const params = useParams();
  const icons = {...imgsConstant.Icons, ...imgsConstant.Images}

  const dispatch = useDispatch();
  const {categoryProducts, loading, err} = useSelector((state:RootState)=>state.productByCategory)
  const {categories} = useSelector((state:RootState)=>state.category)
  useEffect(()=>{
    displayProduct();
  }, [])

  const displayProduct = ()=>{
    let catId:any = params.id;
    dispatch(DisplayProductsByCategory(catId) as any);
  }



  {loading
    ? <div>
        <LoaderComponent title="Loading store"/>
      </div>
    : 
    ""
  }
  return (
    <div className="category-list-container">
      <div className="content-header">
        <NavBar pageType="list" catgeories={categories || []}/>
        <div className="parent-div">
          <div className="breadcrum">
            <Link to={'/'} className="name">Home</Link>
              <img src={icons.chevronRite} alt="" className="nav-img" />
            <span className="name cat-name">{categoryProducts?.category} </span>
          </div>
          {
            categoryProducts?.products.length! <=0 && !loading ?
              <div className="empty-state">
                <EmptyStateComponent btnTxt="Try exploring other categories" imgUrl={icons.emptyStateCart} title="No products here yet"/>
              </div>
            :
              <div className="products-list">
                {
                  categoryProducts?.products.map((product)=>(
                    <Link to={`/product/${product.id}/detail`} className="product" id={product.id}>
                      <img src={`${env.IMG_URL}/${product.img}`} alt="" className="product-imf" />
                      <span className="product-name">{product.name}</span>
                      <span className="price">{Number(product.price).toLocaleString('en-US', {currency:'NGN', style:'currency'})}</span>
                    </Link>
                  ))
                }

              </div>
          }
        </div>

      </div>
      <Footer/>
    </div>
  )
}


export default ProductByCategory