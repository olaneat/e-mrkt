import React, {useEffect, useState}from "react";


function SliderContent({activeIndex}: any, {sliderImage}:any ) {
  const [value, setValue] =  useState<any>()
  useEffect(()=>{
    setValue(sliderImage)
  })
    return (
      <section>
        {value.map((slide:any, index:any) => (
          <div
            key={index}
            className={index === activeIndex ? "slides active" : "inactive"}
          >
            <img className="slide-image" src={slide.urls} alt="" />
            <h2 className="slide-title">{slide.title}</h2>
            <h3 className="slide-text">{slide.description}</h3>
          </div>
        ))}
      </section>
    );
  }
  
  export default SliderContent;