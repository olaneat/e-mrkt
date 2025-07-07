import React, {useEffect, useRef, useState} from "react"
import "./counter.scss"

const CountdownTimer = () => {
  const [startDate, setStartDate] = useState("00:00:00")
  const Ref = useRef();
 
  function getDeadTime(){
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline
  }
  function startTimer(e:any){
    let {total, hour, mins, seconds} =getTimeRemaining(e);
    // console.log(total, 'total')
    // console.log(mins, 'min')
    // console.log(hour, 'hr')
    // console.log(seconds, 'sec')

    if(total>0 ){
      setStartDate(

        (hour > 9 ? hour : "0" + hour) + ": " +
        (mins > 9 ? mins : "0" + mins) + ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      )
    }
  }
  const getTimeRemaining = (e:any) => {
    let parseDate = new Date().toISOString()
    const total = Date.parse(e) - Date.parse(parseDate)
    const hour = Math.floor((total / 60 / 60) *24);
    const seconds = Math.floor((total / 1000)% 60);
    const mins = Math.floor((total/1000 / 60) % 60);
    return {total, hour, mins, seconds}
  };
  function clearTimer(e:any){
    setStartDate("24:00:00")
    if(Ref.current) clearInterval(Ref.current);
    const id:any = setInterval(()=>{
      startTimer(e)
    }, 1000)
    Ref.current = id;
  }

  useEffect(()=>{
    getDeadTime();
    clearTimer(getDeadTime());
  
  }, [])

 


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
          {startDate}
      </div>

        </div>
        <div className="flash-content"></div>

      </div>      
          
    </div>
    )
}

export default CountdownTimer;