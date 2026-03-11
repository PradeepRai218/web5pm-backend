let express=require("express")
let subcategoryRoutes=express.Router()

const multer  = require('multer')
const { subcategoryCreate, subcategoryView } = require("../../controller/admin/subcategoryController")
// const upload = multer({ dest: 'uploads/category' }) //half Control Access

//full control on storing files to disk.

let storage =multer.diskStorage(
    {
        destination:function( req,file,cb  ){
          
            
            cb(null,"uploads/subcategory")
        },
        filename:function(req,file,cb){
            cb(null, Date.now()+file.originalname)
        }
    }
)

let upload=multer({storage:storage})


//upload.single() single Image Upload

//upload.field(  { } )


subcategoryRoutes.post("/add", upload.single('image'),subcategoryCreate)

subcategoryRoutes.get("/view", subcategoryView)



module.exports={subcategoryRoutes}