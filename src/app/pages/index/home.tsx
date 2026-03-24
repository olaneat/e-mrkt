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
import { useGetProductsQuery } from "../../slices/new-product.slice"


const HomePage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {products, loading, err} = useSelector((state:RootState)=>state.products )
  // const { 
  //   data: products, 
  //   isLoading, 
  //   isFetching,
  // } = useGetProductsQuery(undefined, {
  //   // THIS COMBO MAKES OFFLINE WORK PERFECTLY
  //   refetchOnMountOrArgChange: false,
  //   refetchOnFocus: false,
  //   refetchOnReconnect: false,
  //   // Show cached data immediately, even if stale
  //   selectFromResult: ({ data, isLoading, isFetching }) => ({
  //     data: data ?? [], // use cached data if available
  //     isLoading: isLoading && !data, // only show loading first time
  //     isFetching,
  //   }),
  // });
  const { categories, isCategoryLoading, categoryError } = useSelector((state: RootState) => state.category);
   const [itemsPerPage, setItemPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [totalItems, setTotalItem] = useState<number>(500);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isLoadingOverall =  isCategoryLoading || loading;
   useEffect(()=>{
    getCategories();
    getProducts()

  }, []);


  const getProducts = () =>{
      // dispatch(DisplayProducts('args') as any);
    let data :PaginationQuery = {
      page:page, 
      size:10
    }  
    dispatch(DisplayProducts(data))
  }


  const getCategories = () =>{
    dispatch(displayCategories() as any)
  }

  

if (isLoadingOverall) {
    return (
      <div>
        <LoaderComponent  title="Loading store"/>
      </div>
    );
  }

  return(
        
    <div>
      <NavBar pageType="list"/>  
      <div className="body"> 
        <div className="top-div">
          
          <div className="slider">
          <Slider />
          </div>
        </div>
        <div className="list">
          <CountdownTimer />
          <ProductList  products={products?.results || []} categories={categories || []} />
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

export interface PaginationQuery{
  page:number,
  size:number
}