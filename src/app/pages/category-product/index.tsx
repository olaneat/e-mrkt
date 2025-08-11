import React,{ useEffect} from "react";
import { RootState } from "app/store";
import { useDispatch, UseDispatch, useSelector, UseSelector } from "react-redux";
import { useParams } from "react-router";
import { DisplayProductsByCategory } from "../../slices/category-product.slice";


const ProductByCategory = ()=>{
  // const ProductByCategory = useSelector((state:RootState)=>state.productByCatgeory)
  const params = useParams();
  const dispatch = useDispatch();


  useEffect(()=>{
    displayProduct();
  }, [])

  const displayProduct = ()=>{
    let catId:any = params.id;
    dispatch(DisplayProductsByCategory(catId) as any);
  }


  return (
    <div></div>
  )
}


export default ProductByCategory