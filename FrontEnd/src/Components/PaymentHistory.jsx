import React, { useEffect, useState } from 'react'
import "../CSS/PaymentHistory.css"
import PaymentHistoryItem from './PaymentHistoryItem'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PaymentHistory() {


    let {islogin} = useSelector(store=>store.cart)
    let [expenseHistory,setHistory] = useState([])
    let [rendering,setRendering] = useState(true)
    let navToUpdate= useNavigate()
  let [category,setCategory] = useState("All")

  function updateCategory({target:{value}}  ){
    setCategory(value)
  }






let deleteExpense = async (id)=>{
    try{
        let  data= await axios.delete(`http://localhost:4044/api/v1/deleteexpense/${id}`)
        setRendering(!rendering)
    }catch(err){
        console.log(err);
    }
}

let updateExpense = async(id)=>{
  navToUpdate(`/update/${id}`)
   
}

let fetchHistory = async ()=>{
    let {data} =await axios.get(`http://localhost:4044/api/v1/allexpenses/${islogin._id}`)
    setHistory([...(data.data)])
    console.log(data.data);
}

useEffect(()=>{
    fetchHistory()

},[rendering])









  return (
    <div className="payment-history-grid">
      <div>
      <h2>Expenses:</h2>
      <select name="categoryList"  onChange={updateCategory}>
      <option value="All">All</option>

        {islogin.category.map((a,index)=>{
         return  <option key={index} value={a} style={{width:"80px"}}>{a}</option>
        })}
      </select>
      </div>

    {expenseHistory.filter((a)=>{return category==="All"?true:category===a.category}).map((payment) => (
    (  <PaymentHistoryItem
        key={payment._id} 
        id={payment._id}
        date={payment.date}
        amount={payment.amount}
        category={payment.category}
        update={updateExpense}
        deleteExpense= {deleteExpense}

      />)
    ))}
  </div>
  )
}

export default PaymentHistory