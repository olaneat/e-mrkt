import React, {useEffect, useState} from "react"
import NavBar from '../../components/navbar/navbar'
import './home.scss'
import ProductList from "../products/product-list"
import Slider from "../../components/slider/slider"
import { useDispatch, useSelector} from "react-redux";
import { displayCategories } from "../../slices/categories.slice";
import CountdownTimer from "../../components/countdown/countDown"
import Footer from "../../components/footer/footer"
import { CategoryDTO } from "../../dto/categories.dto"
import { RootState } from "app/store"
const HomePage = () => {



  useEffect(()=>{
    getCategories();
  },[]) 
  const dispatch = useDispatch();
  // const [Categories, setCategories] = useState<CategoryDTO[]>([]);
  const { categories, isLoading, error } = useSelector((state: RootState) => state.category);


 
  const getCategories = () =>{
    dispatch(displayCategories() as any)
  }

  useEffect(()=>{
  })

    return(
        <div>
          <NavBar />  
          <div className="body"> 
            <div className="top-div">
              <div className="categories">
                <span className="category"> 
                  {
                    categories?.slice(0, 8)?.map((category:CategoryDTO)=>(
                      <span key={category?.id} className="category"> {category?.name}</span>
                    ))
                  }
                </span>
              </div>
              <div className="slider">
              <Slider />
              </div>
            </div>
            <div className="list">
              <CountdownTimer />
              <ProductList />
            </div>
            <div>
            </div>
          </div>
            <div className="footer-div">
              <Footer />
            </div>
        </div>

    )
}

export default HomePage;