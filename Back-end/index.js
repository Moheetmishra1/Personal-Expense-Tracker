const express = require("express")
const router = require("./Roters/tracker.router")
const asyncWrapper  =  require("express-async-handler")
const connectToDatabase = require("./Data/data")
const cors = require("cors")
require("dotenv").config()


asyncWrapper()
const app = express()


app.use(express.json())
app.use(cors())
app.use("/api/v1",router)



//! Page not found
app.all("*",(req,res,next)=>{
    res.status(404).send("<h1 style='color:red;text-align:center;'>Page not found....</h1>")
    console.log(req);
})

//! Server side error
app.use((err,req,res,next)=>{
    res.status(201).json({error:true,message:err.message});
})


//! Connecting to Db and assign the port
async function connectMongoDb(){
    try{
        await connectToDatabase(process.env.mongodbServerURL)
        console.log("Mongodb is connected");
        const PORT = process.env.PORT
        app.listen(PORT,()=>{console.log(`Server is connected at port ${PORT}`)})
    }catch(err){
        console.log(err);
    }
} 

 connectMongoDb()

