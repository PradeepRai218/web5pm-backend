const productModel = require("../../model/productModel");

let getProductByType=async (req,res)=>{
    let {type}=req.params
    let filter = {
    deleted_at: null,
    productType:type,
    status:true,
  };
  let data = await productModel
  .find(filter)
  .populate("parentCategory", "name")
  .populate("subCategory", "name")
  .populate("subSubCategory", "name")
  .populate("color", "name")
  .populate("material", "name");


  let obj = {
    _status: true,  
    _message: "Product View ",
    data,
    STATICPATH: process.env.PRODUCTPATH
  }
  res.send(obj);
}


let getProductDetail=async (req,res)=>{
    let {slug}=req.params
    let filter = {
    deleted_at: null,
    slug:slug,
    status:true,
  };
  let data = await productModel
  .findOne(filter)
  .populate("parentCategory", "name")
  .populate("subCategory", "name")
  .populate("subSubCategory", "name")
  .populate("color", "name")
  .populate("material", "name");


  let obj = {
    _status: true,  
    _message: "Product View ",
    data,
    STATICPATH: process.env.PRODUCTPATH
  }
  res.send(obj);
}

module.exports={getProductByType,getProductDetail}