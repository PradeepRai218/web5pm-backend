let express=require("express")
let categoryRoutes=express.Router()
const { categoryCreate, categoryView } = require("../../controller/admin/categoryController")
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/category' }) //half Control Access

//full control on storing files to disk.

let storage =multer.diskStorage(
    {
        destination:function( req,file,cb  ){
          
            
            cb(null,"uploads/category")
        },
        filename:function(req,file,cb){
            cb(null, Date.now()+file.originalname)
        }
    }
)

let upload=multer({storage:storage})


//upload.single() single Image Upload

//upload.field(  { } )


categoryRoutes.post("/add", upload.single('image'),categoryCreate)

categoryRoutes.get("/view", categoryView)



module.exports={categoryRoutes}