// const { find } = require("../Models/USerSchema.model");
const {numberCheck,emailCheck,nameCheck,passwordCheck} = require("../validation")
const encryptPassword= require("../encryption/hashPassword.encrypt");
const decryptPassword = require("../encryption/decryptPassword.encrypt");
const userSchema= require("../Models/USerSchema.model")
// let bcrypt  = require("bcryptjs")

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
       return  res.send(201).json({error:true,message:err})
    }
        console.log(email,mobile);
        let obj  = await userSchema.findOne({$or:[{email},{mobile}]});
       
    console.log(obj);
    if(obj){
        let check =  await decryptPassword(password,obj.password) 
        if(check){
            console.log(obj);
            res.status(200).json({error:false,message:"Authentication matched.",data:obj})
            
        }else{
            res.status(200).json({error:true,message:"Password is incorrect."})
        }

    }else{
        res.status(201).json({error:true,message:"Username not exist."})

    }
    }catch(err){ console.log("enter to catch error", err); next(err);    }
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
        let user= await userSchema.findOne({$or:[{email},{mobile}]});
        if(user){
            return res.status(200).json({error:true,message:"Mobile or email already exist."})
        }

        const hash= await encryptPassword(password)
        user = await userSchema.create({first,last, password:hash,email,mobile,dob,gender})
        res.json({error:false,message:"User's account created.", data:user})
        console.log("Successfull account created.");

    }catch(err){
        next(err)
    }

}

module.exports= {loginToAccount,createAccount}