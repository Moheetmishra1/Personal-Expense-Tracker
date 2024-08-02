const { amountCheck } = require("../expenseValidation");
const { ExpenseSchema } = require("../Models/ExpenseSchema.model");
const USerSchemaModel = require("../Models/USerSchema.model");

const addExpense= async (req,res,next)=>{
    let {amount,date,description,category}=req.body;
    let err = amountCheck(amount)
    if(err){
        return res.status(201).json({error:true,message:err})
    }
    if( !date){
        return res.status(201).json({error:true,message:"Date is Mandatory."})

    }
    if(!category){
        category="Food"
    }
        let obj =await  USerSchemaModel.findOne({email:req.user.email})
        if(obj){
            let data = await ExpenseSchema.create({userId:obj._id ,amount,description,category,date})
                 res.status(201).json({error:false,message:"expense store successfully",data:data})

        }
        else{
          return   res.status(201).json({error:true,message:"User's id is not matching from database."})
        }
   
}




let AllExpenses= async (req,res,next)=>{
    let {filter,field,q} = req.query
    let id=q;
    
    
    let obj  = await USerSchemaModel.findOne({email:req.user.email});
   
    if(obj){

    let today = new Date();
    today=today.toISOString().slice(0,10)

    let expenses;
    if(filter ==="today"){
        expenses = await ExpenseSchema.find({
            date: today  ,
          userId:obj._id});
       

    }

    if(filter == "monthly"){
        let firstDay= today.slice(0,8)+"01"
        let lastDay = today.slice(0,8)+"28"


        expenses = await ExpenseSchema.find({
            date: { 
                $gte:firstDay,
                $lte:lastDay
            }   ,
          userId:obj._id});

    }

    if(field){
        field = field.split(",")
        let start= field[0];
        let end= field[1]
        
        expenses = await ExpenseSchema.find({
            date: {
                $lte:end,
                $gte:start
            }
            ,
          userId:obj._id});
    }

    if(id){
        expenses= await ExpenseSchema.findById(id)        
    }


    if( !filter && !field && !id){
        expenses= await ExpenseSchema.find({userId:obj._id})
    }
    
    if(expenses){
        res.status(201).json({error:false,message:"Sending the list",data:expenses})
    }else{
        res.status(201).json({error:true,message:"Sending the list"})
        
    }

}else{
    res.status(201).json({error:true,message:"User not exist"})
}

   
}   


let updateExpense= async (req,res,next)=>{
   
        let {q} = req.query

        try{
            let expense = await ExpenseSchema.findById(q)
            if(expense){
                await ExpenseSchema.findByIdAndUpdate(q,req.body)
                res.status(201).json({error:false,message:"Updatetd"})

            }else{
                res.status(201).json({error:true,message:"Expense nto found."})
            }
        }catch(err){
            next(err)
        }
        
   
}
let deleteExpense= async (req,res,next)=>{

        let {q}= req.query;
    console.log(q,req.query);
    

        let obj = await ExpenseSchema.findById(q)
        
        if(obj){
           await ExpenseSchema.findByIdAndDelete(q)
           let data = await ExpenseSchema.find({userId:obj.userId})
            res.status(201).json({error:false,message:"Expense delete successfully",data})
        }
        else{
            res.status(201).json({error:true,message:"expense is not exits."})
        }
  
}





exports.addExpense= addExpense
exports.AllExpenses= AllExpenses
exports.updateExpense=updateExpense
exports.deleteExpense=deleteExpense
