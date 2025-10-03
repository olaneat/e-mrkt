import React,{ useState, useEffect} from "react";
import { useSelector} from "react-redux";
import { ProductDTO } from "app/dto/products.dto";
import { CategoryDTO } from "app/dto/categories.dto";
import { DisplayProducts } from '../../slices/product-list.slice'
import { useDispatch } from "react-redux";
import env from "../../../environment/env";
import "./product-list.scss"
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";

interface props {
  products: ProductDTO[]; 
  categories: CategoryDTO[]
}
const ProductList: React.FC<props>= ({ products, categories }) =>{
  useEffect(()=>{

  },[categories])
    return(
      <div className="product-container">
        <div className="flash-products">
          {products?.slice(0,6)?.map((product:ProductDTO)=>{
            return(
              <Link to={`/product/${product.id}/detail`} className="flash-product" key={product.id}>
                <div className="img">
                  <div className="flash-img">
                    <img src={`${env.IMG_URL}${product.img}`} alt=""  className="img"/>
                  </div>
                </div>
                <div className="txt">
                  <span className="name">
                    {product.name}
                  </span>
                  <span className="price">
                    <span className="new-price">
                    {Number(product.price!).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}
                    </span> 
                    
                          
                  </span>

                </div>
              </Link>

              )
          })}
        </div>
        {/* <div className="see-all">View all products</div> */}
        <div className="product-list">
        <div className="product-title">
            <div className="style">
              <span className="icon"></span>
              <div className="txt">Our Products</div>
            </div>
            <div className="title">Explore Our Products</div>
            <div className="products">
              {products?.slice(7,19)?.map((prod:ProductDTO)=>{
                return(
                  <Link to={`/product/${prod.id}/detail`} className="product" key={prod.id}>
                    <span className="name">{prod.name}</span>
                    
                    <div className="img">
                      <img src={`${env.IMG_URL}/${prod.img}`} alt="" />

                    </div>
                    <span className="price">
                      {Number(prod.price!).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}
                    </span>

                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        
        <div className="category-div">
        <div className="category-title">
            <div className="style">
              <span className="icon"></span>
              <div className="txt">Catergory</div>
            </div>
            <div className="title">Shop by category</div>
          </div>
        <div className="flash-products">
          {categories?.slice(0, 6).map((category:CategoryDTO)=>{
            return(
              <Link to={`product-by-category/${category.id}`} className="flash-product" key={category.id}>
                <div className="img">
                  <div className="flash-img">
                    <img src={`${env.IMG_URL}${category.img}`} alt=""  className="img"/>
                  </div>
                </div>
                <div className="txt">
                  <span className="name">
                    {category.name}
                  </span>
                  <span className="price">
                   
                    
                          
                  </span>

                </div>
              </Link>

              )
          })}
        </div>
        </div>
        {/* <div className="category-div">
          
          <div className="category-list">
            {
              categories?.slice(0, 6).map((category:CategoryDTO)=>{
              return(
                <div className="cat" key={category.id}>
                  <Link to={`/product-by-category/${category.id}`} className="category">
                    <img src={`${env.IMG_URL}${category.img}`} alt=""  className="category-img" />
                    <span className="category-name">{category.name}</span>
                  </Link>
                </div>
              )
            })
            }
          </div>
          
        </div> */}

        
      </div>
    )
}

export default ProductList