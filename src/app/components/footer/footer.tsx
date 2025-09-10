import React, {useState} from "react";
import './style.scss'
import Icons from "../../constant/imgs.constant";
const Footer = ()=>{

  const [email, setEmail]= useState<string>("");
  const icons = Icons.Icons
  function sendMail(){
    console.log(email)
  }
    
    return (
      <div className="footer-container">
        <div className="footer-body">
          <div className="info-div">
            <span className="footer-title">Exclusive</span>
            <span className="footer-txt">Subscribe</span>
            <span className="email-span">
              <input type="email"
                placeholder="Enter your email" 
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
              <img src={icons.SendIcon} alt="" className="email-icon" onClick={sendMail} />
            </span>

          </div>
            <div className="info-div">
              <span className="footer-title">Support</span>
              <span className="footer-txt">
                <img src={icons.locationIcon} className="footer-icon" alt="" /> 
                No 13 Behind Aso Rock FCT, Abuja
              </span>
              <span className="footer-txt">
              <img src={icons.whiteMail} className="footer-icon" alt="" /> 
                info@olastorez.com
              </span>
              <span className="footer-txt">
              <img src={icons.whitePhone} className="footer-icon" alt="" /> 
                +234-7012-345-678
              </span>

            </div>
            <div className="info-div">
              <span className="footer-title">Account</span>
              <span className="footer-txt">My account</span>
              <span className="footer-txt">Login/Signup</span>
              <span className="footer-txt">Cart</span>
            </div>
            <div className="info-div">
              <span className="footer-title">Quick Link</span>
              <span className="footer-txt">Privacy Policy</span>
              <span className="footer-txt">Term of use</span>
              <span className="footer-txt">Contact</span>
              

            </div>
        </div>
        <div className="copy-rite">
          &copy; Copyright olaneat 2025 
        </div>
      </div>
    )
}


export default Footer