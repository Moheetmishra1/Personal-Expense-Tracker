import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "../../CSS/Home.css"
import { useStateUpdateHook } from '../../Helper/useStateUpdate';
import axios from 'axios';
import { login } from '../../../Redux/React_Slice/expense.reduxSlice';

function Home() {
  let {islogin} = useSelector(store=>store.cart)
  // let [expense,setExpense] = useState({amount:"",catagory:"",data:"",description:""})
    let [expense,setExpense] = useStateUpdateHook({amount:"",category:"",date:"",description:""})

    let addExpense = async (e)=>{
      e.preventDefault()

      console.log(expense);
      try{
        let data =await axios.post("http://localhost:4044/api/v1/addexpense",{...expense,_id:islogin._id})
        console.log(data);

      }catch(err){
        console.log(err);
      }
      

    }

    useEffect(()=>{
      login(sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user"))||{amount:"",category:"",date:"",description:""})
      
    },[])
  
  // console.log(islogin);
  return (
    <div>


    

  <h1 style={{textAlign:"center"}}>Personal Expenses Tracker</h1>
  <form id="expense-form" className='homeForm' onSubmit={addExpense}>
    <label htmlFor="amount">Amount:</label>
    <input type="number"  id="amount" name="amount" required onKeyUp={setExpense} />

    <label htmlFor="category">Category:</label>
    <select id="category" className='homeSelect' name="category" required onChange={setExpense}>
      <option value="">Select a category</option>
      <option value="Food">Food</option>
      <option value="Transportation">Transportation</option>
      <option value="Housing">Housing</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Other">Other</option>
    </select>

    <label htmlFor="date">Date:</label>
    <input type="date" id="date" name="date" required onChange={setExpense} />

    <label htmlFor="description">Description:</label>
    <textarea id="description" name="description" required onKeyUp={setExpense}></textarea>

    <button type="submit" className='addExpense'>Add Expense</button>
  </form>

  <section id="expense-list">
    <h2>Expenses:</h2>
    <ul id="expenses">
    </ul>
  </section>



























    </div>
  )
}

export default Home