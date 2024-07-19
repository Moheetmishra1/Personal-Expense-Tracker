const userSchemaModel = require("../Models/USerSchema.model");
// const { find } = require("../Models/USerSchema.model");
const {numberCheck,emailCheck,nameCheck,passwordCheck} = require("../validation")
const encryptPassword= require("../encryption/hashPassword.encrypt");
const decryptPassword = require("../encryption/decryptPassword.encrypt");
// let bcrypt  = require("bcryptjs")

const loginToAccount = async (req,res,next)=>{
    try{
    const {username,password} = req.body;
    
    let email,mobile;
    let err=""
    if(Number(username) === "NaN"){
        err= numberCheck(username)
        mobile=username
    }else{
        err=emailCheck(username)
        email=username.trim()
    }
    if(err){
       return  res.send(201).json({error:true,message:err})
    }
    let obj =await  userSchemaModel.findOne({$or:[{email},{mobile}]});
    console.log(obj,obj._id,typeof obj._id);
    if(obj){
        let check =  await decryptPassword(password,obj.password) 
        if(check){
            res.status(200).json({error:false,message:"Authentication matched.",data:obj})
        }else{
            res.status(200).json({error:true,message:"Password is incorrect."})
        }

    }else{
        res.status(201).json({error:true,message:"Username not exist."})

    }
    }catch(err){ console.log("enter to catch error"); next(err);    }
}



const createAccount = async (req,res,next)=>{
    console.log("enter to create");
    let {first,last,email,mobile,password,confirmPassword,dob,gender} = req.body;
   
    let err  = nameCheck(first)|| (last && nameCheck(last))|| emailCheck(email)|| numberCheck(mobile) ||passwordCheck(password)
    
    if(err){
      return  res.json({error:true,message:err})
    }
    err= passwordCheck(confirmPassword);
    if(err){
      return  res.json({error:true,message:("Confirm "+ err)})
    }
    if(password !== confirmPassword){
       return res.json({error:true,message:"Password and confirm password are not matching."})
    }
    first= first.trim()
    last=last && last.trim()
    email=email.trim()
    password= password.trim()
    confirmPassword= confirmPassword.trim()
    gender= gender.trim()
    dob= dob.trim()

    try{
        let user= await userSchemaModel.findOne({$or:[{email},{mobile}]});
        if(user){
            return res.status(200).json({error:true,message:"Mobile or email already exist."})
        }

        const hash= await encryptPassword(password)
        user = await userSchemaModel.create({first,last, password:hash,email,mobile,dob,gender})
        res.json({error:false,message:"User's account created.", data:user})
        console.log("Successfull account created.");

    }catch(err){
        next(err)
    }

}

module.exports= {loginToAccount,createAccount}