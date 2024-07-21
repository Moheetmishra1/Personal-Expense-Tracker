import React, { useEffect, useRef } from 'react'
import "../../CSS/Login.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { useStateUpdateHook } from '../../Helper/useStateUpdate'
import { emailCheck, nameCheck, numberCheck, passwordCheck } from '../../validation';
import {useDispatch} from "react-redux";
import axios from 'axios';
import { login } from '../../../Redux/React_Slice/expense.reduxSlice';


function Login() {
  
  let [user,setUser] = useStateUpdateHook({username:"",password:""});
  let loginError= useRef("")
  let dispatch= useDispatch()
  let navToHome= useNavigate()
  let showPassword= useRef("Not refer.")
  

  function passwordShow(){
    if(showPassword.current.type==="password"){
        showPassword.current.type = "type"
    }else{
      showPassword.current.type = "password"
    }
  }

  async function sendDetails(e){
    e.preventDefault()

    loginError.current.innerHTML=""
    loginError.current.style="color:red"

    let email,mobile,err;
    if(Number(user.username)){

      mobile=user.username
      err= numberCheck(mobile);
    }else{
      email= user.username
      err= emailCheck(email)
    }
    console.log(err, "error checing for username",Number(user.username),email,mobile);
    if(err){
      return  loginError.current.innerHTML=err
    }
     err= passwordCheck(user.password)
     if(err){
      return  loginError.current.innerHTML=err
    }
console.log(user);
      try{
        let {data}= await axios.post("http://localhost:4044/api/v1/login",user)
        console.log("seraching ", data);
        if(data.error){
            loginError.current.innerHTML=data.message
        }else{
        loginError.current.innerHTML="Login successfully"
        loginError.current.style="color:green"
        // console.log(data);
        // user=data.data
       await dispatch(login(user))
       sessionStorage.setItem("user",JSON.stringify(data.data))
        navToHome("/")

        }


      }catch(err){
        console.log(err);
      }
      } 
console.log(user," is login ");

let useEffectLogin = async(data)=>{
  try{
    let d = await axios.post("http://localhost:4044/api/v1/login",{username:data.email,password:data.password})
      if(d.error){
        dispatch(login(data));
        navToHome("/")
      }

  }catch(err){
    console.log(err);
  }
}

useEffect(()=>{
  let data = sessionStorage.getItem("user");
  if(data !== 'undefined'){
    console.log(typeof data);
    data =JSON.parse(data);
    useEffectLogin(data)

  }
 


},[])



  return (
    <div className='loginBox'>

<img className="img-fluid mx-auto d-block mb-5" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg" alt="" />
<span  className="loginError"  ref={loginError}></span>
      <div className="loginformBox">

        <form action="POST"  className='loginForm'  onSubmit={sendDetails} >
          <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" onChange={setUser}  />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name="password"  onChange={setUser} ref={showPassword} />
          </div>
        <p className="login-remember"><label><input  type="checkbox"  value="forever" onClick={passwordShow} /> show</label></p>

          <button className='loginSubmit' >Submit</button>
        </form>
        <p className="">Don't have an account yet? <NavLink to="/signup">Sign up</NavLink></p>
      </div>







    </div>
    
  )
}

export default Login