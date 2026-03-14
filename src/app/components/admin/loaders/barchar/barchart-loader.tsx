import React from "react";
import './style.scss'

const BarChartLoaderComponent = () =>{
    return (
      <div className="barchart-skeleton">
        {/* <div className="chart-header">
          <div className="skeleton-title-large skeleton"></div>
          <div className="skeleton-subtitle skeleton"></div>
        </div>
        
        <div className="y-axis-labels">
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-label skeleton"></div>
          <div className="skeleton-label skeleton"></div>
        </div>
         */}
        <div className="chart-container">
          <div className="bars-container">
            {[...Array(13)].map((_, i) => (
              <div key={i} className="bar-wrapper">
                <div 
                  className="bar-skeleton skeleton" 
                  style={{ height: `${Math.floor(Math.random() * 60) + 30}%` }}
                ></div>
                <div className="skeleton x-axis-label"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

}

export default BarChartLoaderComponent