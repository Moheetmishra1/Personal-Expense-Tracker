import React, { useCallback, useEffect, useRef, useState } from 'react'
import "../CSS/AddExpense.css"
import { useStateUpdateHook } from '../Helper/useStateUpdate'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CustomeCategory from './Home/CustomeCategory'

function AddExpense() {
  let {islogin} = useSelector(store=>store.cart)
  let [expense,setExpense] = useStateUpdateHook({amount:"",category:"",date:"",description:""})
  let refAmount =useRef()
  let refCatagory =useRef()
  let refDate =useRef()
  let refDesc =useRef()
  let cat = useRef("initialCategory")


  let addExpense = async (e)=>{
    e.preventDefault()

    try{
          if(!expense.category){expense.category="Food"}
      let {data} =await axios.post("http://localhost:4044/api/v1/addexpense",{...expense,userId:islogin._id})
     if(!data.error){
      refAmount.current.value="";
      refCatagory.current.value=""
      refDate.current.value=""
      refDesc.current.value=""
     }
    }catch(err){
      console.log(err);
    }
  }
console.log("addexpense");


  return (
    <>
     <div className='addExpenseBox'>


    

<h1 style={{textAlign:"center"}}>Personal Expenses Tracker</h1>
<form id="expense-form" className='homeForm' onSubmit={addExpense}>
  <label htmlFor="amount">Amount:</label>
  <input type="number" className='specialInput' ref={refAmount}  id="amount" name="amount" required onKeyUp={setExpense} />

  <label htmlFor="category" className='HomeAddExpense'>Category:</label>
  <span><select id="category" className='homeSelect' ref={refCatagory} name="category"  onChange={setExpense}>
         <option    value="">Select a category</option>
    {islogin.category.map((a,index)=>{
      return <option key={index}  value={a}>{a.toUpperCase()}</option>
    })}
    
  
  </select></span>

  <label htmlFor="date">Date:</label>
  <input type="date" id="date" className='specialInput' ref={refDate} name="date" required onChange={setExpense} />

  <label htmlFor="description">Description:</label>
  <textarea id="description" className='specialInput' ref={refDesc} name="description" required onKeyUp={setExpense}></textarea>

  <button type="submit" className='addExpense'>Add Expense</button>
</form>




<section id="expense-list">
  <ul id="expenses">
  </ul>
</section>

  </div>
     
    </>
  )
}

export default React.memo(AddExpense )