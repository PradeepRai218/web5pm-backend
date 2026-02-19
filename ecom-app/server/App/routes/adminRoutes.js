let express=require("express")
const { colorRoute } = require("./admin/colorRoutes")
const { materialRoute } = require("./admin/materialRoutes")
const { sliderRoute } = require("./admin/sliderRoutes")

let adminRoute=express.Router() //Api Create 
//http://localhost:8000/admin-api/color
adminRoute.use("/color",     colorRoute)

adminRoute.use("/material",materialRoute)

adminRoute.use("/slider",sliderRoute)

// //http://localhost:8000/admin-api/login
// adminRoute.post('/login',(req,res)=>{
//     let obj={
//         _status:true,
//         _message:"Login Done"
//     }

//     res.send(obj)
// })

module.exports={adminRoute}