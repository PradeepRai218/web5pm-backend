let express=require("express")
let subSubcategoryRoutes=express.Router()

const multer  = require('multer')
const { subSubcategoryCreate, subSubcategoryView, getParentCategory, getSubCategory } = require("../../controller/admin/subSubcategoryController")
// const upload = multer({ dest: 'uploads/category' }) //half Control Access

//full control on storing files to disk.

let storage =multer.diskStorage(
    {
        destination:function( req,file,cb  ){
          
            
            cb(null,"uploads/subsubcategory")
        },
        filename:function(req,file,cb){
            cb(null, Date.now()+file.originalname)
        }
    }
)

let upload=multer({storage:storage})


//upload.single() single Image Upload

//upload.field(  { } )


subSubcategoryRoutes.post("/add", upload.single('image'),subSubcategoryCreate)

subSubcategoryRoutes.get("/view", subSubcategoryView)

subSubcategoryRoutes.get("/parent", getParentCategory)
subSubcategoryRoutes.get("/subcategory/:id", getSubCategory)
module.exports={subSubcategoryRoutes}