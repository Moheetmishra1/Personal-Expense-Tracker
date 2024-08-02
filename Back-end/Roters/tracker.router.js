const express= require("express")
const {loginToAccount,createAccount, updateUserCategory, refreshLogin} = require("../controllers/trackerController.controller");
const { addExpense, AllExpenses, updateExpense, deleteExpense } = require("../controllers/Expense.controler");
const auth = require("../helper/Autho");
const { loginAuth } = require("./loginAuth");

let router = express.Router()

router.post("/signup",createAccount);
router.post("/login",loginToAccount);
// router.get("/login",auth,);
router.get("/refreshlogin",loginAuth,refreshLogin);

// //! Crud operations  
router.post("/addexpense",auth,addExpense)                                //^.....................................
router.get("/allexpenses/",auth,AllExpenses)                //        //^............................
router.put("/updateexpense",auth,updateExpense);                      //^..........................
router.delete("/deleteexpense",auth,deleteExpense)                     //^..............
// //! crud Opertions end......


router.post("/updateusercategory",auth,updateUserCategory)          //^...................




module.exports= router