import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../../context/StoreContext'
import axios from 'axios';

export const LoginPopUp = ({setShowLogin}) => {

    const {url,token,setToken}=useContext(StoreContext);
    const [currState,setCurrState]=useState("Login")
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin=async(event)=>{
        event.preventDefault();//prevents reloading
        let newUrl=url;
        if(currState==="Login"){
            newUrl+="/api/user/login"
        }
        else{
            newUrl+="/api/user/register"
        }
        const response=await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.messge);
        }
    }


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
            </div>
            <div className='login-popup-inputs'>
                {currState==="Login"?<></>:
                <input name='name' onChange={onChangeHandler} value={data.name}  type='text' placeholder='Your name' required autoComplete="off"/>
                }
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required autoComplete="off"/>
                <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Passsword' required autoComplete="new-password" />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>By continuing, i agree to the terms of use and privacy policy</p>
            </div>
            {currState==="Login"?
            <p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:<></>}
            {currState==="Sign Up"?
            <p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>:<></>}
        </form> 
    </div>
  )
}
