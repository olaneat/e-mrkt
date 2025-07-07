import React, {useEffect, useState} from "react"

const Arrows = (prevSlide:any, nextSlide:any) => {
    return(
        <div>
          <span className="prev" onClick={prevSlide}>&#10094</span>
          <span className="next" onClick={nextSlide}>&#10095</span>
          
        </div>
    )
}

export default Arrows;