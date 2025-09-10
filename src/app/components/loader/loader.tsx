import React, {useEffect} from "react"
import './style.scss'



const LoaderComponent = () =>{

return (
    <div className="page-loader">
      <span className="loader"></span>
      <p className="loading-text">Loading store...</p>
    </div>
  );

  // return (
  //   <div className="loader-ripple">
  //     <div></div>
  //     <div></div>
  //     <p className="loading-text">Getting things ready...</p>
  //   </div>
  // );

  // return (
  //   <div className="loader-bar">
  //     <div className="bar"></div>
  //     <p className="loading-text">Loading products...</p>
  //   </div>
  // );

  //  return (
  //   <div className="loader-bag">
  //     <div className="bag"></div>
  //     <p className="loading-text">Loading store...</p>
  //   </div>
  // );
  // return (
  //   <div className="page-loader-dots">
  //     <div className="dot"></div>
  //     <div className="dot"></div>
  //     <div className="dot"></div>
  //     <p className="loading-text">Loading store...</p>
  //   </div>
  // );

  // return (
  //   <div className="page-loader">
  //     <div className="spinner"></div>
  //     <p className="loading-text">Please wait, loading store...</p>
  //   </div>
  // )
}

export default LoaderComponent