import React, { useEffect, useRef, useState } from 'react'
import "../CSS/AddExpense.css"
import { useStateUpdateHook } from '../Helper/useStateUpdate'
import axios from 'axios'
import { useSelector } from 'react-redux'

function AddExpense({}) {
  let {islogin} = useSelector(store=>store.cart)
  let [expense,setExpense] = useStateUpdateHook({amount:"",category:"",date:"",description:""})
  let [category,setCategory] = useState([])
  let refAmount =useRef()
  let refCatagory =useRef()
  let refDate =useRef()
  let refDesc =useRef()
  let cat = useRef("initialCategory")
  // console.log(user );

  let addExpense = async (e)=>{
    e.preventDefault()

    try{
      // console.log(user._id);
          if(!expense.category){expense.category="Food"}
      let {data} =await axios.post("http://localhost:4044/api/v1/addexpense",{...expense,userId:islogin._id})
      // console.log(data);
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

  let addCategory = async()=>{

      let cate= cat.current.value;
      if(cate){
          let {data}=await axios.post(`http://localhost:4044/api/v1/updateusercategory/${islogin._id}`,{cate})
        setCategory([...data.data])
        cat.current.value=""
      }
    
  }

  let intialCategory= async()=>{
    try{
      let {data} = await axios.get(`http://localhost:4044/api/v1/getuserdetail/${islogin._id}`)
      if(!data.err){
        setCategory(data.data.category)
  
      }
    }catch(err){
      console.log(err);
    }
  }
useEffect( ()=>{
  intialCategory()
},[])

  return (
    <>
     <div>


    

<h1 style={{textAlign:"center"}}>Personal Expenses Tracker</h1>
<form id="expense-form" className='homeForm' onSubmit={addExpense}>
  <label htmlFor="amount">Amount:</label>
  <input type="number" className='specialInput' ref={refAmount}  id="amount" name="amount" required onKeyUp={setExpense} />

  <label htmlFor="category" className='HomeAddExpense'>Category:</label>
  <span><select id="category" className='homeSelect' ref={refCatagory} name="category"  onChange={setExpense}>
         <option    value="">Select a category</option>
    {/* {console.log(user)} */}
    {category.map((a,index)=>{
      return <option key={index}  value={a}>{a.toUpperCase()}</option>
    })}
    
  
  </select></span>

  <label htmlFor="date">Date:</label>
  <input type="date" id="date" className='specialInput' ref={refDate} name="date" required onChange={setExpense} />

  <label htmlFor="description">Description:</label>
  <textarea id="description" className='specialInput' ref={refDesc} name="description" required onKeyUp={setExpense}></textarea>

  <button type="submit" className='addExpense'>Add Expense</button>
</form>


<div className='customCategory'><h2>Add Custom Category</h2>

  <input type="text" ref={cat} /><button onClick={addCategory}>Add</button>
  </div>

<section id="expense-list">
  <ul id="expenses">
  </ul>
</section>

  </div>
     
    </>
  )
}

export default React.memo(AddExpense)