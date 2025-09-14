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
    const [title, setTitle] = useState<string>('');
    const navigate = useNavigate();
    const {isLoading} = useSelector((state:RootState)=>state.verifyPayment)
    
    useEffect(()=>{
      if (!trxref || !reference) {
      // Handle missing params early
      setTitle('Payment Error');
      setToastMsg('Invalid payment reference. Please try again.');
      setToastType('error');
      setShowToast(true);
      // setTimeout(() => navigate('/'), 3000); // Redirect after error
      return;
    }
        verify()
    },[trxref, reference, dispatch, navigate])


    const verify = ()=>{
         if (!trxref || !reference) return
        dispatch(verifyPayment(trxref!) as any)
        .unwrap()
        .then((res:any)=>{
            setShowToast(true),
            setTitle('Payment Successful')
            setToastType('success')
            setToastMsg("Payment successfully verified")
            setTimeout(()=>setShowToast(false),2000)
            setTimeout(()=>{
              dispatch(clearCart())
                navigate('/')
            }, 3000)

        })
        .catch((err:any) => {
        setTitle('Payment Failed');
        setToastMsg( 'Verification failed. Please contact support.');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        setTimeout(() => navigate('/'), 3000);
      });
    
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
        title={title}
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