import React, {useEffect, useRef, useState} from "react"
import "./counter.scss"

const CountdownTimer = () => {
  const initialTime = 7 * 24 * 60 * 60
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  const formatTime = (seconds:any) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };



  return(
    <div className="counter-container">
      <div className="flash">
        <div className="today">
          <span className="icon"></span>
          <span className="txt-title">Today's</span>
        </div>
        <div className="header-div">
          <span className="header-title">Flash sales</span>
          <div className="countdown-display">
            {formatTime(timeLeft)}
          </div>
        </div>

      </div>      
          
    </div>
    )
}

export default CountdownTimer;