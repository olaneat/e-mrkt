import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { RootState,  } from "app/store";
import './style.scss'
import { useDispatch } from "react-redux";
import { DisplayProducts } from "../../../../slices/product-list.slice";
import Button from "../../../../components/btns/btn";
import InputField from "../../../../components/input-field/input-field";
import env from "../../../../../environment/env";
import imgsConstant from "../../../../constant/imgs.constant";
import DashboardLoader from "../../../../components/admin/loaders/dashboard-loader";
import EmptyStateComponent from "../../../../components/empty-state/empty-state";
import ModalComponent from "../../../../components/modal/modal";
import { ProductDTO } from "app/dto/products.dto";
import PaginationComponent from "../../../../components/pagination/pagination";
import { useSearchParams } from 'react-router-dom';



const AdminProductList = () =>{
  const {products, loading, err} = useSelector((state: RootState)=>state.products)
  const [modal, SetOpenModal] = useState<boolean>(false)
  const [searchParams, setParams] = useSearchParams();
  const [productId, setProductId] = useState<string>("") 
  const currentPage = Number(searchParams.get('page')) || 1;

  const dispatch = useDispatch();
  const icons = imgsConstant.Icons;

  const getProductLIst = () =>{
    let data :PaginationQuery = {
        page:page, 
        size:10
    }
    dispatch(DisplayProducts(data) as any);
    setItemPerPage(10),
    setPage(1)
  }
  
  
  useEffect(()=>{
    getProductLIst();
    setTotalItem(products?.count!)
  
  }, [])


  const  setSelectedtPage =(page:number) =>{
    if(page < 1 || page>totalPages) return;
    setPage(page);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page',  page.toString());
    setParams(newSearchParams, {preventScrollReset:true})
  }

  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItem] = useState<number>(500);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const openModal =(product?: ProductDTO)=>{
    setProductId(product?.id!)
    SetOpenModal(true)
  }

  const deleteProduct =()=>{
    console.log('are u sure ')
    console.log(productId, 'id')
  }
  return (
    <div>
      {
        loading ? 
        <div><DashboardLoader type="table" /></div>
        :
        <div>
          { products?.results?.length! > 0 ?
            <div className="parent-container">
              <div className="breadcrumb">Product List</div>
              <div className="upper-div">
                <div className="search-input">
                    <InputField searchType="default" type="search" placeholder="search "/>
                </div>
                <div className="add-btn">
                    <Button type="primary" name="Add Product"/>

                </div>
              </div>
              <div className="lower-div">
                <table>
                  <thead>
                      <tr>
                      <th>S/N</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products?.results?.map((product, index)=>{
                      return(
                          <tr key={product.id}>
                          <td>{index+1}</td>
                          <td className="">
                              <span className="product-name-tr">
                              <img src={`${env.IMG_URL}${product.img}`} alt="" className="iprod-mg" />
                              <span className="product-name">{product.name!.toLowerCase()}</span>
                              </span>
                          </td>
                          <td>{product.quantity}</td>
                          <td>{product.price?.toLocaleString('en-US', {
                              style: "currency",
                              currency: "NGN",
                          })}</td>
                          <td>
                              <span className="action-icons">
                              <img src={icons.visiblePswd} alt="" className="action-icon" />
                              <img src={icons.EditIcon} alt="" className="action-icon" />
                              <img src={icons.DeleteIcon} alt="" className="action-icon" onClick={()=>{openModal(product)}} />
                              
                              </span>
                          </td>
                          </tr>
                      )

                      })}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <PaginationComponent
                  currentPage={page}
                  totalPages={totalPages}
                  siblingCount={1}
                  onPageChange={setSelectedtPage}
                />
              </div>
            </div>        
            : <div>
              <EmptyStateComponent title="Opps" text="No Product added yet" imgUrl=""/>
            </div>
          }

        </div>  
      }

      <ModalComponent
        isOpen={modal}
        onClose={()=>SetOpenModal(false)}
        hasCloseBtn={true}
      >
        <div className="del-modal">
          <div className="del-header">
            <span className="del-header-txt">Confi</span>
            <img src={icons.closeIcon} onClick={()=>SetOpenModal(false)} alt="" className="close-icon" />
          </div>
          <div className="del-body">Confirm You want to delete the product </div>
          <div className="del-footer">
            <Button type="secondary" name="Cancel" handleClick={()=>SetOpenModal(false)}></Button>
            <Button type="primary" name="Confirm Dele" handleClick={()=>deleteProduct()}></Button>
          </div>
        </div>


      </ModalComponent>
      
    </div>
  )
}

export default AdminProductList


export interface PaginationQuery{
  page:number,
  size:number
}