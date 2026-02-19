let express=require("express")
const { sliderCreate, sliderView, sliderDelete, sliderUpdate, sliderChangeStatus } = require("../../controller/admin/sliderController")

let sliderRoute=express.Router()

//http://localhost:8000/admin-api/slider/add
sliderRoute.post('/add',sliderCreate)
//http://localhost:8000/admin-api/slider/view
sliderRoute.get('/view',sliderView)
sliderRoute.delete('/delete',sliderDelete)
sliderRoute.put('/update',sliderUpdate)


sliderRoute.put('/change-status',sliderChangeStatus)

module.exports={sliderRoute}