import React, {useEffect, useState} from "react";
import { verifyPayment } from "../../slices/verify-slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate,} from 'react-router-dom';
import ToastComponent from "../../components/toast/toast";
import { RootState } from "../../store";
import { clearCart } from "../../slices/cart.slice";
import LoaderComponent from "../../components/loader/loader";
const VerifyPayment = () =>{
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const trxref = searchParams.get('trxref')
    const reference = searchParams.get('reference');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastType, setToastType] = useState<string>('')
    const [toastMsg, setToastMsg] = useState('')
    const cart = useSelector((state:RootState)=>state.cart )
    const [tile, setTitile] = useState<string>('');
    const navigate = useNavigate();
    const {isLoading} = useSelector((state:RootState)=>state.verifyPayment)
    
    useEffect(()=>{
        verify()
    },[])


    const verify = ()=>{
        console.log(reference, 'ref')

        console.log(trxref, 'params')
        dispatch(verifyPayment(trxref!) as any).then((res:any)=>{
          console.log('payment Verified successful', res)
            setShowToast(true),
            setTitile('Payment Successful')
            setToastMsg(res.payload.message)
            setToastType('success')
            setTimeout(()=>setShowToast(false),2000)
            setTimeout(()=>{
                navigate('/')
                dispatch(clearCart())
            }, 3000)

        })
    
    }

    const closeToast = ()=>{
      setShowToast(false)
    }
  return (
    <div>
      {
      isLoading ?
        <LoaderComponent title="Please wait while we verify your payment"/>
      : 
      <ToastComponent
        title={tile}
        type={toastType}
        message={toastMsg}
        isOpen={showToast}
        handleClose={closeToast}        
      />
      }
    </div>
  )
}

export default VerifyPayment