let express=require("express")
const { authRoute } = require("./web/authRoutes")
const { homeRoute } = require("./web/homeRoute")

let webRoute=express.Router() //Api Create 

webRoute.use("/user",authRoute)
webRoute.use("/home",homeRoute)
module.exports={webRoute}