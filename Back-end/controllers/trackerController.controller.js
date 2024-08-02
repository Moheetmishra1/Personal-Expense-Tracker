// const { find } = require("../Models/USerSchema.model");
const {numberCheck,emailCheck,nameCheck,passwordCheck} = require("../validation")
const encryptPassword= require("../helper/encryption/hashPassword.encrypt");
const decryptPassword = require("../helper/encryption/decryptPassword.encrypt");
const userSchema= require("../Models/USerSchema.model");
const subscription = require("../helper/Mail");
const  jwt= require("jsonwebtoken")

const loginToAccount = async (req,res,next)=>{
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
       
    if(obj){
        let check =  await decryptPassword(password,obj.password) 
        
        let token = jwt.sign({email:obj.email,first:obj.first,last: obj.last},process.env.Auth_Secret_Key,{expiresIn:"10m"})       
        check ?   res.status(200).json({error:false,message:"Authentication matched.",token,data:{email:obj.email,first:obj.first,last:obj.last,category:obj.category}}) :   res.status(200).json({error:true,message:"Password is incorrect."});

    }else{
        res.status(201).json({error:true,message:"Username not exist."})}

}

const refreshLogin = async (req,res)=>{ 

    let {email} = req.user;
    let obj = await userSchema.findOne({email})
    if(obj)
    {
        res.status(201).json({error:false,meassage:"Already login",data:{first:obj.first,last:obj.last,email:obj.email,category:obj.category}})

    }else{
        res.status(201).json({error:true,message:"User not exist."})
    }


}




const createAccount = async (req,res,next)=>{
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
        console.log("it is reading?");

        let user= await userSchema.findOne({$or:[{email},{mobile}]});
        console.log("email in createfile",user);
        if(user){
            return res.status(200).json({error:true,message:"Mobile or email already exist."})
        }

        const hash= await encryptPassword(password)
        
        // let category=["Food","Transportation","Housing","Entertainment"]
        user = await userSchema.create({first,last, password:hash,email,mobile,dob,gender})
        res.json({error:false,message:"User's account created."})
        subscription(email)


}

let updateUserCategory= async(req,res,next)=>{
        console.log("enter update use category");
        let obj = await userSchema.findOne({email:req.user.email})
        if(obj){
            let data = await userSchema.findByIdAndUpdate(obj._id,{$set:{category:[...obj.category,req.body.cate.toUpperCase()]}})
            //^ data return older object's data....
            res.status(201).json({error:false,message:"Update the change",data:[...obj.category,req.body.cate]})
        }
        else{
            res.status(201).json({error:true,message:"user is not available"})
            
        }

}



module.exports= {loginToAccount,createAccount,updateUserCategory,refreshLogin}