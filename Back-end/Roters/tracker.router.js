const express= require("express")
const {loginToAccount,createAccount, updateUser, updateUserCategory, getUserDeatil, getUserDetail} = require("../controllers/trackerController.controller");
const { addExpense, AllExpenses, updateExpense, deleteExpense ,getQuery, singleExpense} = require("../controllers/Expense.controler");

let router = express.Router()

router.post("/login",loginToAccount);
router.post("/signup",(q,w,e)=>{console.log("go");e();},createAccount);
router.post("/updateusercategory/:id",updateUserCategory)
router.get("/getuserdetail/:id",getUserDetail)
router.post("/addexpense",addExpense)
router.get("/allexpenses/:userid",AllExpenses)
router.put("/updateexpense/:id",updateExpense);
router.delete("/deleteexpense/:id",deleteExpense)
router.get("/home",getQuery)
router.get("/singleexpense/:pid",singleExpense)



module.exports= router