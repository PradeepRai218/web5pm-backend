let express=require("express")
const { colorRoute } = require("./admin/colorRoutes")
const { materialRoute } = require("./admin/materialRoutes")
const { sliderRoute } = require("./admin/sliderRoutes")
const { categoryRoutes } = require("./admin/categoryRoutes")
const { subcategoryRoutes } = require("./admin/subcategoryRoutes")
const { subSubcategoryRoutes } = require("./admin/subSubcategoryRoutes")

let adminRoute=express.Router() //Api Create 
//http://localhost:8000/admin-api/color
adminRoute.use("/color",     colorRoute)

adminRoute.use("/material",materialRoute)

adminRoute.use("/slider",sliderRoute)

adminRoute.use("/category",categoryRoutes)

adminRoute.use("/subcategory",subcategoryRoutes)

adminRoute.use("/subsubcategory",subSubcategoryRoutes)

// //http://localhost:8000/admin-api/login
// adminRoute.post('/login',(req,res)=>{
//     let obj={
//         _status:true,
//         _message:"Login Done"
//     }

//     res.send(obj)
// })

module.exports={adminRoute}