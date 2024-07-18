import {createSlice}  from "@reduxjs/toolkit"
import { login as Login, logout as Logout } from "../reduxActions/signupLoginActions"

const initialState= {
    islogin:""
}

const expenseSlice=  createSlice({
    name:"expenseSliceName",
    initialState,
    reducers:{
        Login,
        Logout        
    }
})



let login= expenseSlice.actions.Login;
let logout= expenseSlice.actions.Logout;

let red=  expenseSlice.reducer;
console.log("red");
//  export default red;

 

export {login,logout,red}