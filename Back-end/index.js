const express = require("express")
const router = require("./Roters/tracker.router")
const connectToDatabase = require("./Data/data")
const cors = require("cors")
require("dotenv").config()

const app = express()


app.use(express.json())
app.use(cors())
app.use("/api/v1",router)


app.use((err,req,res,next)=>{
    res.status(201).json({error:true,message:err.message});
})


app.all("*",(req,res,next)=>{
    res.status(404).json({error:true,message:"Page not found."})
})

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

