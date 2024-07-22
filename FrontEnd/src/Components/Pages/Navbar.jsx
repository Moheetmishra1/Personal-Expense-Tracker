import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import  {logout}  from "../../../Redux/React_Slice/expense.reduxSlice"
import "../../CSS/Navbar.css"




function Navbar() {
    let {islogin} = useSelector((store)=>store.cart);
    let dispatchLogout= useDispatch()
    

  return (
    <div className='navbarBox'>

       {islogin &&  <NavLink to="/">Home</NavLink>}
       {!islogin && <NavLink to="/login">Login</NavLink>}
       {!islogin && <NavLink to="/signup">Signup</NavLink>}
       {islogin && <NavLink to="/paymenthistory">History</NavLink>}

        {islogin && <div className="logoutIcon">
            
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" style={{borderRadius:"100%"}} />
            <button  className='logout' onClick={()=>{console.log("start");sessionStorage.clear();  dispatchLogout(logout())}}>  Sign Out </button>
            

            {/* <button href="sign-up.html" class="btn btn-sm btn-light mb-0"><i class="bi bi-person-circle me-1"></i>Sign up</button> */}


        </div>}
    </div>
   
  )
}

export default Navbar