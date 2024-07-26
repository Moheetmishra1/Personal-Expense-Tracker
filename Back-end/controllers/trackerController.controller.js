// const { find } = require("../Models/USerSchema.model");
const {numberCheck,emailCheck,nameCheck,passwordCheck} = require("../validation")
const encryptPassword= require("../encryption/hashPassword.encrypt");
const decryptPassword = require("../encryption/decryptPassword.encrypt");
const userSchema= require("../Models/USerSchema.model");
const subscription = require("../helper/Mail");
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
        let obj  = await userSchema.findOne({$or:[{email},{mobile}]});
       
    console.log(obj);
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
    }catch(err){ console.log("enter to catch error", err); next(err);    }
}



const createAccount = async (req,res,next)=>{
    console.log("enter to create");
    let {first,last,email,mobile,password,confirmPassword,dob,gender,category} = req.body;
   
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
        user = await userSchema.create({first,last, password:hash,email,mobile,dob,gender,category})
        res.json({error:false,message:"User's account created.", data:user})
        subscription(email)
        console.log("Successfull account created.");

    }catch(err){
        next(err)
    }

}

let updateUserCategory= async(req,res,next)=>{

    try{
        let {id} = req.params;
        let obj = await userSchema.findById(id)
        if(obj){
            console.log("Enter for update category",req.body);
            let data = await userSchema.findByIdAndUpdate(id,{$set:{category:[...obj.category,(req.body.cate[0].toUpperCase()+req.body.cate.slice(1).toLowerCase())]}})
            res.status(201).json({error:false,message:"Update the change",data:[...obj.category,req.body.cate]})
        }
        else{
            res.status(201).json({error:true,message:"user is not available"})
            
        }

    }catch(err){
        next(err);
    }
}


let getUserDetail = async(req,res,next)=>{
    try{
        let {id}= req.params;

        let obj = await userSchema.findById(id)
        if(obj){
            res.status(201).json({error:false,message:"User is exist",data:obj})
        }else{
            res.status(202).json({error:true,message:"User is not exist"});
        }

    }catch(err){
        next(err)
    }
}

module.exports= {loginToAccount,createAccount,updateUserCategory,getUserDetail}