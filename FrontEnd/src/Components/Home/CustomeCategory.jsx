import React, { useRef } from 'react'
import customCategory from "../../CSS/Home/CustomCategory.module.css"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {login} from "../../../Redux/React_Slice/expense.reduxSlice"

function CustomeCategory({renderingFunction}) {
  let {islogin} = useSelector(store=>store.cart)

    let inputRef = useRef("custom input value")
    let dispatch = useDispatch()



    const addCategory = async (e)=>{
        e.preventDefault()
        try{ 
        let cate= inputRef.current.value;
        if(cate){
            let {data}=await axios.post(`http://localhost:4044/api/v1/updateusercategory/${islogin._id}`,{cate})
            console.log(data  );
          inputRef.current.value=""
          let obj = {...islogin,category:data.data}
           dispatch(login(obj))
          renderingFunction()
         

        }
    }catch(err){
        console.log(err);
    }

    }
  return (
   
    
    <div className={customCategory.customCategory}><h2>Add Custom Category</h2>
    
    <form onSubmit={addCategory}>  <input type="text" ref={inputRef}  /><input type='submit' className={customCategory.submit} /></form>
      </div>
  )
}

export default React.memo(CustomeCategory)