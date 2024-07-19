const { amountCheck } = require("../expenseValidation");
const { ExpenseSchema } = require("../Models/ExpenseSchema.model");
const USerSchemaModel = require("../Models/USerSchema.model");


const addExpense= async (req,res,next)=>{
    let {amount,date,description,category,_id}=req.body;
    let err = amountCheck(amount)
    if(err){
        return resizeBy.status(201).json({error:true,message:err})
    }
    if( !date){
        let a=new Date()
        date= `${a.getFullYear()}-${a.getMonth()}-${a.getDate()}`
    }
    if(!category){
        category="Food"
    }
    

    try{
        let obj =await  USerSchemaModel.findById({_id})
        if(obj){
            let data = await ExpenseSchema.create({user_id:_id,amount,description,category,date})
                 res.status(201).json({error:true,message:"expense store successfully",data:data})

        }
        else{
          return   res.status(201).josn({error:true,message:"User's id is not matching from database."})
        }
    }catch(err){
        next(err)
    }
}

exports.addExpense= addExpense