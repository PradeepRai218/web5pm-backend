let express=require("express")
const { getParentCategory, getSubCategory, getSubSubCategory, getColor, getMaterials, productCreate, productView, productDetails } = require("../../controller/admin/productController")
let multer  = require('multer')
const { fileUplaod } = require("../../middleware/fileUpload")

let productRoutes=express.Router()



let storage = fileUplaod("product")
let upload = multer({ storage: storage })

productRoutes.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 20 }
  ]),
  productCreate
)

productRoutes.get("/view", productView)

productRoutes.get("/view/:slug", productDetails)

productRoutes.get("/parent", getParentCategory) //Men,Women,Kids

productRoutes.get("/subcategory/:id", getSubCategory) //Parent Category Id --> Subcategory List

productRoutes.get("/subsubcategory/:id", getSubSubCategory)
//Sub Category Id --> Sub Subcategory List
productRoutes.get("/color", getColor)


productRoutes.get("/materials", getMaterials)

module.exports={productRoutes}