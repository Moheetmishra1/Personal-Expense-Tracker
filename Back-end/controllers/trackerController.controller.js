const userSchemaModel = require("../Models/USerSchema.model");
// const { find } = require("../Models/USerSchema.model");
const {numberCheck,emailCheck,nameCheck,passwordCheck} = require("../validation")
const encryptPassword= require("../encryption/hashPassword.encrypt");
const decryptPassword = require("../encryption/decryptPassword.encrypt");
let bcrypt  = require("bcryptjs")

const loginToAccount = async (req,res,next)=>{

    try{
    const {username,password} = req.body;
    
    let email,mobile;
    let err=""
    if(Number(username)){
        err= numberCheck(username)
        mobile=username
    }else{
        err=emailCheck(username)
        email=username.trim()
    }
    if(err){
       return  res.send(404).json({error:true,message:err})
    }

    let obj = await userSchemaModel.findOne({$or:[{email},{mobile}]})
    console.log("enter",email,password,obj.password);
    if(obj){
        let check =  await decryptPassword(password,obj.password) 
        if(check){
            res.status(200).json({error:false,message:"Authentication matched.",data:obj})
        }else{
            res.status(200).json({error:true,message:"Password is incorrect."})
        }

    }else{
        res.status(404).json({error:true,message:"Username not exist."})

    }
    }catch(err){
        next(err);
    }

}

const createAccount = async (req,res,next)=>{
    let {fname,lname,email,mobile,password,confirmpassword,dob,gender} = req.body;
   
    let err  = nameCheck(fname)|| (lname && nameCheck(lname))|| emailCheck(email)|| numberCheck(mobile) ||passwordCheck(password)
    
    if(err){
      return  res.json({error:true,message:err})
    }
    err= passwordCheck(confirmpassword);
    if(err){
      return  res.json({error:true,message:("Confirm "+ err)})
    }
    if(password !== confirmpassword){
       return res.json({error:true,message:"Password and confirm password are not matching."})
    }
    fname= fname.trim()
    lname=lname && lname.trim()
    email=email.trim()
    password= password.trim()
    confirmpassword= confirmpassword.trim()
    gender= gender.trim()
    dob= dob.trim()

    try{
        let user= await userSchemaModel.findOne({$or:[{email},{mobile}]});
        if(user){
            return res.status(404).json({error:true,message:"Mobile or email already exist."})
        }

        const hash= await encryptPassword(password)
        console.log(hash);
        user = await userSchemaModel.create({fname,lname, password:hash,email,mobile,dob,gender})
        res.json({error:false,message:"User's account created.", data:user})
        console.log("Successfull account created.");

    }catch(err){
        next(err)
    }

}

module.exports= {loginToAccount,createAccount}