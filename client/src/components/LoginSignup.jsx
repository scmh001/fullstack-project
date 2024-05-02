import React, { useState } from 'react'
import './LoginSignup.css'

import user_icon from '@/assets/person.png'
import password_icon from '@/assets/password.png'
import email_icon from '@/assets/email.png'

function LoginSignup() {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className='input'>
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name'/>
        </div>
        <div className='input'>
          <img src={email_icon} alt="email" />
          <input type="email" placeholder='Email'/>
        </div>
        <div className='input'>
          <img src={password_icon} alt="password" />
          <input type="password" placeholder='Password'/>
        </div>
      </div>
      <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
      <div className='submit-container'>
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {setAction("Sign Up")}}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {setAction("Login")}}>Login</div>
      </div>
    </div>
  )
}

export default LoginSignup