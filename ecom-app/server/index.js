let express=require("express")
require("dotenv").config()
let cors=require("cors")
const { adminRoute } = require("./App/routes/adminRoutes")
let App=express()


App.use(cors())
App.use(express.json())

//http://localhost:8000/admin-api
App.use("/admin-api",    adminRoute)


App.listen(process.env.PORT || 8000,()=>{
    console.log("Server Start",process.env.PORT);
    
})

//http://localhost:8000