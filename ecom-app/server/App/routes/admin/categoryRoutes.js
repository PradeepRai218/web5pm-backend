let express=require("express")
let categoryRoutes=express.Router()
const { categoryCreate, categoryView } = require("../../controller/admin/categoryController")
const multer  = require('multer')
const { fileUplaod } = require("../../middleware/fileUpload")
// const upload = multer({ dest: 'uploads/category' }) //half Control Access

//full control on storing files to disk.

let storage =fileUplaod("category")

let upload=multer({storage:storage})


//upload.single() single Image Upload

//upload.field(  { } )


categoryRoutes.post("/add", upload.single('image'),categoryCreate)

categoryRoutes.get("/view", categoryView)



module.exports={categoryRoutes}