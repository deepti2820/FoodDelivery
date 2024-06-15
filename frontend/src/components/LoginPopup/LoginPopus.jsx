import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopus.css"
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
function LoginPopus({setShowLogin}) {
    const [currentState,setCurrentSatate]=useState("Sign-up")

    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })


    const onChnageHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(prev=>({...prev,[name]:value}))
    }

    const {url,setToken}=useContext(StoreContext);

    const onLogin=async (event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currentState==="Login"){
            newUrl+="/api/user/login"
        }else{
            newUrl+="/api/user/register"
        }

        const response= await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }
    
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin}  className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
            {currentState==='Login'?<></>: <input type="text" name="name" onChange={onChnageHandler} value={data.name} placeholder='Your name' required />}
                <input name="email" onChange={onChnageHandler} value={data.email} type="email" placeholder='Your email' required/>
                <input type="password" name="password" onChange={onChnageHandler} value={data.password} placeholder='Password' required />
            </div>
            <button type='submit'>{currentState==='Sign-up'?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>          
            {currentState==='Login'
            ?<p onClick={()=>setCurrentSatate("Sign-up")}>Create a new account? <span>Click here</span></p> 
            :<p onClick={()=>setCurrentSatate("Login")}>Already have an account? <span>Login here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopus