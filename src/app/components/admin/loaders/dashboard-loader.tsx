import React, {useEffect} from "react";
import './style.scss'

export interface DataType {
    type: "card"| "barchart" | "table"
} 

const DashboardLoader =(data:DataType) =>{
  const rows:any[] =[1, 2, 4, 5]
  if (data.type === 'card') {
    return (
      <div className="stat-card-skeleton">
        {rows.map((item, index)=>(
          <div className="item" key={index}>
            <div className="skeleton-icon skeleton"></div>
            <div className="card-content">
              <div className="skeleton-title skeleton"></div>
              <div className="skeleton-count skeleton"></div>
            </div>
          </div>
        ))}
      </div>          
    );
  }
  
  if (data.type === 'barchart') {
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
  
  if (data.type === 'table') {
    return (
      <div className="table-skeleton">
        <div className="table-header">
          <div className="skeleton-title skeleton"></div>
          <div className="skeleton-search skeleton"></div>
        </div>
        
        <table className="skeleton-table">
          {/* <thead>
            <tr>
              <th><div className="skeleton-th skeleton"></div></th>
              <th><div className="skeleton-th skeleton"></div></th>
              <th><div className="skeleton-th skeleton"></div></th>
              <th><div className="skeleton-th skeleton"></div></th>
              <th><div className="skeleton-th skeleton"></div></th>
            </tr>
          </thead> */}
          <tbody>
            {[...Array(rows)].map((_, index) => (
              <tr key={index} className="loader-row">
                <td><div className="skeleton skeleton-text-small"></div></td>
                <td><div className="skeleton skeleton-text"></div></td>
                <td><div className="skeleton skeleton-badge"></div></td>
                <td><div className="skeleton skeleton-text"></div></td>
                <td><div className="skeleton skeleton-text"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}


export default DashboardLoader