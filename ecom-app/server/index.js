const mongoose = require('mongoose');
let express=require("express")
require("dotenv").config()
let cors=require("cors")
const { adminRoute } = require("./App/routes/adminRoutes")
let App=express()


App.use(cors())
App.use(express.json())

//http://localhost:8000/admin-api
App.use("/admin-api",    adminRoute)




mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then((res)=>{
    App.listen(process.env.PORT || 8000,()=>{
         console.log("Server Start",process.env.PORT);
    
    })
})




//http://localhost:8000