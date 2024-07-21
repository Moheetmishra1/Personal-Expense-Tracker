import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "../../CSS/Home.css"
import { login } from '../../../Redux/React_Slice/expense.reduxSlice';
import AddExpense from '../AddExpense';

function Home() {
  let {islogin} = useSelector(store=>store.cart)
  // let [expense,setExpense] = useState({amount:"",catagory:"",data:"",description:""})
   

    useEffect(()=>{

      login(sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user"))||{amount:"",category:"",date:"",description:""})
      
    },[])
  
  // console.log(islogin);
  return (
   <>
    <AddExpense userId={islogin._id} />
   </>
  )
}

export default Home