const { amountCheck } = require("../expenseValidation");
const { ExpenseSchema } = require("../Models/ExpenseSchema.model");
const USerSchemaModel = require("../Models/USerSchema.model");


const addExpense= async (req,res,next)=>{
    let {amount,date,description,category,userId}=req.body;
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
          return   res.status(201).json({error:true,message:"User's id is not matching from database."})
        }
    }catch(err){
        next(err)
    }
}




let AllExpenses= async (req,res,next)=>{
    try{

        let {userid}=req.params;
        let data = await ExpenseSchema.find({userId:userid});
        res.status(201).json({error:false,message:"expense is sending",data:(data||[])})
    }catch(err){
        next(err)
    }
}   


let updateExpense= async (req,res,next)=>{
    try{
        let {id}= req.params;
        let {filter} = req.query
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
        let obj = await ExpenseSchema.findById(id)
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
        let obj =await ExpenseSchema.findById(pid)
        if(obj){
            res.status(201).json({error:false,message:"Expense Found.",data:obj})
        }else{
            res.status(201).json({error:true,message:"Expense not found."})
        }


    }catch(err){
        next(err)
}
}

let month= async(req,res,next)=>{
    try{
        let {filter,q,start,end} = req.query
        // let {q} 
        console.log("W =  ",start," end = ",end);
        let today = new Date();
        today=today.toISOString().slice(0,10)
   
        let expenses;
        if(filter ==="today"){
            expenses = await ExpenseSchema.find({
                date: today
                ,
              userId:q});
            console.log(expenses);
           

        }

        if(filter=="month"){
            let month= today.slice(0,8)+"01"
          console.log(month);

            expenses = await ExpenseSchema.find({
                date: {
                    $lte:today,
                    $gte:month
                }
                ,
              userId:q});
            console.log(expenses);
        }

        if(start&&end){
            expenses = await ExpenseSchema.find({
                date: {
                    $lte:end,
                    $gte:start
                }
                ,
              userId:q});
        }
        
        if(expenses){
            res.status(201).json({error:false,message:"Sending the list",data:expenses})
        }else{
            res.status(201).json({error:true,message:"Sending the list"})
            
        }


    }catch(err){
        next(err)
    }
}

let getQuery= async(req,res,next)=>{
    try{
        let {filter} = req.query
        console.log(filter);
        


    }catch(err){
        next(err)
    }
}

let today= async( req,res,next)=>{
    console.log("enter");
    try{
        let {id}= req.params
        let today = new Date();
        today=today.toISOString().slice(0,10)
   
        const expenses = await ExpenseSchema.find({
            date: today
            ,
          userId:id});
        console.log(expenses);
        if(expenses){
            res.status(201).json({error:false,message:"Sending the list",data:expenses})
        }else{
            res.status(201).json({error:true,message:"Sending the list"})
            
        }
      




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
exports.today=today
exports.month=month