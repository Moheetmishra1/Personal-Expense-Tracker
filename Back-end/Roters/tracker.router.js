const express= require("express")
const {loginToAccount,createAccount} = require("../controllers/trackerController.controller");
const { addExpense } = require("../controllers/Expense.controler");

let router = express.Router()

router.post("/login",loginToAccount);
router.post("/signup",(q,w,e)=>{console.log("go");e();},createAccount);
router.post("/addexpense",addExpense)

module.exports= router