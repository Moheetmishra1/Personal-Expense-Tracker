// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import "../CSS/PeriodicExpend.css"

// function PeriodicExpend() {
//     let {islogin} = useSelector(store=>store.cart);
//     let [Allexpense,setAllExpense] = useState([])
//     const [categories, setCategories] = useState({});

//     let expenseCategory={}
//     for(let i of islogin.category){
//         expenseCategory[i]=0
//     }

//     let today= async ()=>{
//         try{
//             let {data}= await axios.get(`http://localhost:4044/api/v1/query?q=${islogin._id}&filter=today`)
//             if(!data.err){
//                 setAllExpense(data.data)

//             }
//             console.log(data);

//         }catch(err){
//             console.log(err);
//         }
//     }

//     let monthly= async()=>{
//         try{
//             let {data}= await axios.get(`http://localhost:4044/api/v1/query?q=${islogin._id}&&filter=month`)
//             if(!data.err){
//                 setAllExpense(data.data)
//             }
//             console.log(data);

//         }catch(err){
//             console.log(err);
//         }
//     }




//     let allexpense= async ()=>{
//         try{
//             let {data} = await axios.get(`http://localhost:4044/api/v1/allexpenses/${islogin._id}`)
//             console.log(data);
//             setAllExpense(data.data)
//         }catch(err){
//             console.log(err);
//         }
//     }
//     useEffect(()=>{
//         allexpense()


//         const categoriesData = {};

//         Allexpense.forEach(expense => {
//           if (!Allexpense[expense.category]) {
//             Allexpense[expense.category] = 0;
//           }
//           Allexpense[expense.category] += expense.amount;
//         });

//         // setExpenses(expensesData);
//         setCategories(categoriesData);
    
//     },[])

//   return (
//     <>
    
//     <div>PeriodicExpend <button onClick={today}>Today</button> <button onClick={monthly}>Monthly</button></div>


//     <div className="expenses-graph">
//       <h1>Expenses by Category</h1>
//       <BarChart width={500} height={300} data={Object.keys(categories).map(category => ({ name: category, value: categories[category] }))}>
//         <XAxis dataKey="name" />
//         <YAxis />
//         <CartesianGrid stroke="#ccc" />
//         <Tooltip />
//         <Bar dataKey="value" fill="#8884d8" />
//       </BarChart>
//     </div>

    
//     </>
//   )
// }

// export default PeriodicExpend











import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import "../CSS/PeriodicExpend.css"

function PeriodicExpend() {
  const { islogin } = useSelector(store => store.cart);
  const [Allexpense, setAllExpense] = useState([]);
  const [categories, setCategories] = useState({});
  let [graphChange,setGraph] = useState(true);
  let startDate= useRef()
  let endDate = useRef()

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4044/api/v1/allexpenses/${islogin._id}`);
        setAllExpense(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExpenses();

    const processExpenses = () => {
      const categoriesData = {};
      Allexpense.forEach(expense => {
        if (!categoriesData[expense.category]) {
          categoriesData[expense.category] = 0;
        }
        categoriesData[expense.category] += expense.amount;
      });
      setCategories(categoriesData);
    };

    processExpenses();
  }, [graphChange]);

  const today = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4044/api/v1/query?q=${islogin._id}&filter=today`);
      console.log(data);
      setAllExpense(data.data);
      setGraph(!graphChange)
    } catch (err) {
      console.log(err);
    }
  };

  const monthly = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4044/api/v1/query?q=${islogin._id}&&filter=month`);
      console.log(data);
      setGraph(!graphChange)

      setAllExpense(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const rangeDate= async (e)=>{
    e.preventDefault()

    try{
        const { data } = await axios.get(`http://localhost:4044/api/v1/query?q=${islogin._id}&&start=${startDate.current.value}&end=${endDate.current.value}`);
        console.log(data);
        setGraph(!graphChange)
  
        setAllExpense(data.data);


    }catch(err){
        console.log(err);
    }
  }


  

  return (
    <>
      <div>PeriodicExpend <button onClick={today}>Today</button> <button onClick={monthly}>Monthly</button> </div>
      <div><form onSubmit={rangeDate}><input type="date"  ref={startDate} /> <input type="date"   ref={endDate} /> <input type="Submit" /></form> </div>

      <div className="expenses-graph">
        <h1>Expenses by Category</h1>
        <BarChart width={500} height={300} data={Object.keys(categories).map(category => ({ name: category, value: categories[category] }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  );
}

export default PeriodicExpend;