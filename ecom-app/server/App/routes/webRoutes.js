let express=require("express")
const { authRoute } = require("./web/authRoutes")

let webRoute=express.Router() //Api Create 

webRoute.use("/user",authRoute)
module.exports={webRoute}