import React, { useRef, useEffect }  from "react";
import Icons from "../../constant/imgs.constant";
import './modal.scss'
interface modalProps{
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

const ModalComponent = ({
    isOpen,
    onClose,
    hasCloseBtn,
    children}:modalProps
)=>{
  const modalRef = useRef<HTMLDialogElement>(null);
  const icons = Icons;

  const handleClose =()=>{
    if(onClose){
      onClose()
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  useEffect(()=>{
    const modalElement = modalRef.current;
    if(!modalElement) return;

    if(isOpen){
      modalElement.showModal()
    }else{
      modalElement.close()

    }
    
  }, [isOpen])
  return (
      
    <dialog ref={modalRef} id="modal" className="modal-container" >
      <div id="content">{children}</div>
    </dialog>
  )


    
}

export default ModalComponent