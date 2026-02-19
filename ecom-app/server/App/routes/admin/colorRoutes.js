let express=require("express")
const { colorCreate, colorView, colorDelete, colorUpdate, colorChangeStatus } = require("../../controller/admin/colorController")

let colorRoute=express.Router()

//http://localhost:8000/admin-api/color/add
colorRoute.post('/add',  colorCreate)
//http://localhost:8000/admin-api/color/view
colorRoute.get('/view', colorView)
colorRoute.delete('/delete', colorDelete)
colorRoute.put('/update', colorUpdate)


colorRoute.put('/change-status',colorChangeStatus)

module.exports={colorRoute}