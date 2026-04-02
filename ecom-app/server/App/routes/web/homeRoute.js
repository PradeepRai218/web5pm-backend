let express=require("express")
const { getProductByType, getProductDetail } = require("../../controller/web/homeController")

let homeRoute=express.Router()

// homeRoute.get('/slider')
 homeRoute.get('/get-product/:type',getProductByType)
 homeRoute.get('/get-product-details/:slug',getProductDetail)

module.exports={homeRoute}