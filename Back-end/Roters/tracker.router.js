const express= require("express")
const {loginToAccount,createAccount} = require("../controllers/trackerController.controller")

let router = express.Router()

router.post("/login",loginToAccount);
router.post("/signup",(q,w,e)=>{console.log("go");e()},createAccount);

module.exports= router