const { amountCheck } = require("../expenseValidation");
const { ExpenseSchema } = require("../Models/ExpenseSchema.model");
const USerSchemaModel = require("../Models/USerSchema.model");


const addExpense= async (req,res,next)=>{
    let {amount,date,description,category,userId}=req.body;
    console.log(userId," add id");
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
        let obj =await  USerSchemaModel.findById(userId)
        if(obj){
            let data = await ExpenseSchema.create({userId:obj._id ,amount,description,category,date})
                 res.status(201).json({error:false,message:"expense store successfully",data:data})

        }
        else{
            console.log(userId);
          return   res.status(201).json({error:true,message:"User's id is not matching from database."})
        }
    }catch(err){
        next(err)
    }
}




let AllExpenses= async (req,res,next)=>{
    console.log("enter to all expense");
    try{

        let {userid}=req.params;
        // console.log(userid, "jjljl");
        let data = await ExpenseSchema.find({userId:userid});
        // console.log(data);
        res.status(201).json({error:false,message:"expense is sending",data:(data||[])})
    }catch(err){
        next(err)
    }
}   


let updateExpense= async (req,res,next)=>{
    try{
        let {id}= req.params;
        let {filter} = req.query
        console.log("Ther filter are ",filter);
        // let {amount,category,data,description} = req.body
        console.log(req.body,"jjjjjjjjjj");
        let obj = await ExpenseSchema.findById(id)
        if(!obj){
            res.status(202).json({error:true,message:"expense object is not exist"})
            return 
        }
        let ExpenseUpdated= await ExpenseSchema.findByIdAndUpdate(id,req.body)
        res.status(201).json({error:false,message:"Expense updates successfully."})

    }catch(err){
        next(err)
    }
}
let deleteExpense= async (req,res,next)=>{
    try{
        let {id}= req.params;
        console.log("delete","khgjg", id);
        let obj = await ExpenseSchema.findById(id)
        console.log("obj  ", obj);
        if(obj){
            await ExpenseSchema.findByIdAndDelete(id)
            res.status(201).json({error:true,message:"Expense delete successfully"})
        }
        else{
            res.status(201).json({error:true,message:"expense is not exits."})
        }
    }catch(err){
        next(err)
    }
}

let singleExpense = async(req,res,next)=>{
    try{
        let {pid}=req.params
        console.log(pid);
        let obj =await ExpenseSchema.findById(pid)
        console.log(obj);
        if(obj){
            console.log("find");
            res.status(201).json({error:false,message:"Expense Found.",data:obj})
        }else{
            res.status(201).json({error:true,message:"Expense not found."})
        }


    }catch(err){
        next(err)
}
}

let getQuery= async(req,res,next)=>{
    try{
        let {filter,sort,q,limit} = req.query
        


    }catch(err){
        next(err)
    }
}

exports.addExpense= addExpense
exports.AllExpenses= AllExpenses
exports.updateExpense=updateExpense
exports.deleteExpense=deleteExpense
exports.getQuery=getQuery
exports.singleExpense=singleExpense