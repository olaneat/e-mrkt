import React,{ useState, useEffect} from "react";
import { useSelector} from "react-redux";
import { ProductDTO } from "app/dto/products.dto";
import { CategoryDTO } from "app/dto/categories.dto";
import { DisplayProducts } from '../../slices/product-list.slice'
import { displayCategories } from "../../slices/categories.slice";
import { useDispatch } from "react-redux";
import env from "../../../environment/env";
import "./product-list.scss"
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";

const ProductList = () =>{
    const dispatch = useDispatch<AppDispatch>();
    // const [productList, loading, error] = useSelector((state:RootState)=>state.product)
    const {products, loading, err} = useSelector((state:RootState)=>state.products )
    const { categories, isLoading, error } = useSelector((state: RootState) => state.category);
    const [catProducts, setCatProducts] = useState<ProductDTO[]>([])
    useEffect(()=>{
      getProducts();
      getCategories()
    },[dispatch])

    const percentPrice = (price:number) =>{
        let percentage = (price * 30)/100
        return percentage
    }
    const getProducts = () =>{
      // dispatch(DisplayProducts('args') as any);  
      
      dispatch(DisplayProducts())
    }

    const getCategories = () =>{
      dispatch(displayCategories())
      
    }

    const displayCatProduct =(items:any[])=>{
      let arr: ProductDTO[] = [];
      items.forEach((item:ProductDTO)=>{
        if(item.category == 'electronics'){
          arr.push(item)
        }
        setCatProducts(arr);
      })
    }

    return(

        <div className="product-container">
          <div className="flash-products">
            {products?.slice(0,6)?.map((product:ProductDTO)=>{
              return(
                <Link to={`/product/${product.id}/detail`} className="flash-product" key={product.id}>
                  <div className="img">
                    <div className="flash-price">
                      <span className="price">-30%</span>
                    </div>
                    <img src={`${env.imgUrl}${product.img}`} alt="" />
                  </div>
                  <div className="txt">
                    <span className="name">
                      {product.name}
                    </span>
                    <span className="price">
                      <span className="new-price">
                        N{percentPrice(product.price!)}
                      </span> 
                      <span className="old-price">
                        {product.price}
                      </span>
                            
                    </span>

                  </div>
                </Link>

                )
            })}
          </div>
          <div className="see-all">View all products</div>
          <div className="category-div">
            <div className="category-title">
              <div className="style">
                <span className="icon"></span>
                <div className="txt">Category</div>
              </div>
              <div className="title">Shop by category</div>
            </div>
            <div className="categories">
              <div className="rgt">
                <div className="upper">
                  <div className="lft">
                    <div className="title">Viva</div>
                    <div className="txt">Your electronics choice</div>
                    <div className="shop-btn">Shop now</div>
                  </div>
                  {/* <div className="rgt" >
                    <img key={categories[14]?.id} src={`${env.imgUrl}/${categories[14]?.img}`} /> 
                  </div> */}
                  
                </div>
                <div className="content">
                  {catProducts?.slice(0,3).map((items:ProductDTO)=>{
                    return(
                      <div className="items" key={items.id}>
                        <img src={`${env.imgUrl}/${items.img}`} alt="" />
                        <span className="name">{items.name}</span>
                        <span className="price">N{items.price}</span>
                      </div>
                    )
                  })}
                </div>

              </div>
              <div className="lft">
                <div className="lft-categories">
                  {categories?.slice(1,7).map((category:CategoryDTO)=>{
                    return(
                      <div className="category" key={category.id}>
                        <span className="name">{category.name}</span>
                        
                        <img src={`${env.imgUrl}${category.img}`} alt="" />

                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>

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
                      <div className="img">
                        <img src={`${env.imgUrl}/${prod.img}`} alt="" />

                      </div>
                      <span className="name">{prod.name}</span>
                      <span className="price">{prod.price}</span>

                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
    )
}

export default ProductList