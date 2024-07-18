import { configureStore }  from "@reduxjs/toolkit";
import {red} from "./React_Slice/expense.reduxSlice"

// console.log(reducerRedux)
 let store = configureStore({
    reducer:{
        cart:red,
    }
});

export default store;