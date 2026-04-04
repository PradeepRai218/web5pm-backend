let express=require("express")
const { authRoute } = require("./web/authRoutes")
const { homeRoute } = require("./web/homeRoute")
const { orderRoute } = require("./web/orderRoute")

let webRoute=express.Router() //Api Create 

webRoute.use("/user",authRoute)
webRoute.use("/home",homeRoute)
webRoute.use("/order",orderRoute)
module.exports={webRoute}