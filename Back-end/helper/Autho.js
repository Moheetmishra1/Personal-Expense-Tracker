const jwt= require("jsonwebtoken")
require("dotenv").config()

let auth =  (req,res,next)=>{
    try{    
    let authToken = req.headers.authorization
    if( !authToken || !authToken.startsWith("Bearer")){
        throw new Error("Token Required")
    }
    let token= authToken.split(" ")[1]
    let decode= jwt.verify(token,process.env.Auth_Secret_Key)
    req.user= decode;
     next()
}
catch(err){
    next(err)
}

}

module.exports= auth;