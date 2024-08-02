const jwt = require( "jsonwebtoken");

require("dotenv").config()

let loginAuth =  async (req,res,next)=>{
    let authToken= req.headers.authorization;
    try{

    if(authToken && authToken.startsWith("Bearer")){
        let token = authToken.split(" ")[1]
            let decode =  jwt.verify(token,process.env.Auth_Secret_Key)
            req.user = decode ;
            next();    

    }else{
        res.status(201).json({error:true,message:"Token is incorrect."})
    }}
    catch(err){
        next(err)
    }

}


exports.loginAuth=  loginAuth