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
      console.log(loading, 'load')
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
                    <img src={`${env.IMG_URL}${product.img}`} alt="" />
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
                      <span className="name">{prod.name}</span>
                      
                      <div className="img">
                        <img src={`${env.IMG_URL}/${prod.img}`} alt="" />

                      </div>
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