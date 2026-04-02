let express=require("express")
let subcategoryRoutes=express.Router()

const multer  = require('multer')
const { subcategoryCreate, subcategoryView, getParentCategory } = require("../../controller/admin/subcategoryController")
const { fileUplaod } = require("../../middleware/fileUpload")
// const upload = multer({ dest: 'uploads/category' }) //half Control Access

//full control on storing files to disk.

let storage =fileUplaod("subcategory")

let upload=multer({storage:storage})





subcategoryRoutes.post("/add", upload.single('image'),subcategoryCreate)

subcategoryRoutes.get("/view", subcategoryView)

subcategoryRoutes.get('/parent',getParentCategory)



module.exports={subcategoryRoutes}