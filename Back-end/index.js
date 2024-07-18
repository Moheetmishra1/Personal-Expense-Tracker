const express = require("express")
const router = require("./Roters/tracker.router")
const connectToDatabase = require("./Data/data")
require("dotenv").config()

const app = express()


app.use(express.json())
app.use("/api/v1",router)


app.use((err,resqre,next)=>{
    res.status(201).json({error:true,message:err});
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

