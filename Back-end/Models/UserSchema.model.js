const {Schema, model} = require("mongoose")

const userSchema =new Schema({
    first:{
        require:[true,"First name is Mandantory"],
        type:String ,
    },
    last:{
       default:"",
        type:String ,
    },
    password:{
        require:[true, "Password is Mandantory"],
        type:String,        
    }
    ,
    email:{
        require:[true,"Email is Manadatory"],
        type:String 
    },
    mobile:{
        require:[true,"Mobile is Mandatory"],
        type:Number
    },
    dob:{
        required:{message:"D.O.B is Mandatory"},
        type:String
    },
    gender:{require:[true,"Gender is Mandatory"],
        type:String
    },
    category:{
        require:true,
        type:[String],
       
        default : ["Food","Housing","Transportaion"]
    }

    

},{timestamps:true});


module.exports = model("userSchema",userSchema)