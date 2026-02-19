let express=require("express")
const { materialCreate, materialView, materialDelete, materialUpdate } = require("../../controller/admin/materialController")

let materialRoute=express.Router()

//http://localhost:8000/admin-api/material/add
materialRoute.post('/add',materialCreate)
//http://localhost:8000/admin-api/material/view
materialRoute.get('/view',materialView)
materialRoute.delete('/delete',materialDelete)
materialRoute.put('/update',materialUpdate)



module.exports={materialRoute}