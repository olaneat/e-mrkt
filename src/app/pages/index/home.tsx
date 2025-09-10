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
import { RootState, AppDispatch } from "../../store";
import LoaderComponent from "../../components/loader/loader"
import { DisplayProducts } from '../../slices/product-list.slice'



const HomePage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {products, loading, err} = useSelector((state:RootState)=>state.products )
  const { categories, isLoading, error } = useSelector((state: RootState) => state.category);
  
  const isLoadingOverall = loading || isLoading;
   useEffect(()=>{
    getCategories();
    getProducts()
    console.log(loading, 'over')
    console.log(isLoading, 'is lo')

  }, []);


  const getProducts = () =>{
      // dispatch(DisplayProducts('args') as any);  
      console.log('heh', products)
      dispatch(DisplayProducts())
    }


  const getCategories = () =>{
    dispatch(displayCategories() as any)
  }

  

if (isLoadingOverall) {
    return (
      <div>
        <LoaderComponent />
      </div>
    );
  }

  return(
        
    <div>
      <NavBar catgeories={categories || []} />  
      <div className="body"> 
        <div className="top-div">
          
          <div className="slider">
          <Slider />
          </div>
        </div>
        <div className="list">
          <CountdownTimer />
          <ProductList  products={products || []} categories={categories || []} />
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