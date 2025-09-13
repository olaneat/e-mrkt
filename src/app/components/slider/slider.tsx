import React, {useEffect, useState} from "react"; 
import sliderImg from "../../components/slider/slider-img"
import "./slider.css";

const Slider = ()=>{
    const imgs = sliderImg
    const[slide, setSlide] = useState(0);
    const [sliderImgs, setIamges] = useState<any>()
    useEffect(()=>{
        setTimeout(()=>{nextSlide},3000)
        const interval = setInterval(()=>{
            setSlide((prevIndex) =>
                prevIndex === imgs.length - 1
                    ? 0
                    : prevIndex + 1
            );
            slide === imgs.length -1 ? 0 :slide+1
        }, 10000);
    }, [imgs.length]);

   const nextSlide =()=>{
    setSlide(slide === imgs.length -1 ? 0 :slide+1)
   }
   const prevSlide =()=>{
    setSlide(slide===0 ? 0 : slide-1)
   }
 
    return (
      <div className="container">
        <div className="carousel">
          
          {imgs.map((item:any, index:any)=>{
            return(
              <img key={index} src={item.url} className={slide==index ? "slide": "hide-slide"}/>
            ) 
          })}
          
        </div>
        <span className="indicators">
          {imgs.map((_:any, index:any)=>{
            return <div 
              key={index} 
              className={slide==index ? "indicator": 'inactive-indicator'} 
              onClick={()=>{setSlide(index)}}
              >
            
              </div>
          
          })}
        </span>
      </div>
    )
}
export default Slider