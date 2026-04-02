const { createSlug } = require("../../config/helper");
const categoryModel = require("../../model/categoryModels");
const colorModel = require("../../model/colorModel");
const materialModel = require("../../model/materialModel");
const productModel = require("../../model/productModel");
const subcategoryModel = require("../../model/subcategoryModels");
const subSubcategoryModel = require("../../model/subSubcategoryModels");

let productCreate = async (req, res) => {
  let { name } = req.body; //Puma Mens Logo Polo Shirt
  // console.log(req.body);

  let insertObj={...req.body}
  console.log(req.files); //Array=[ ]
 let slug=createSlug(name)

   insertObj['slug']=slug

  if(req.files){
      if(req.files.image){
        insertObj['image']=req.files.image[0].filename
      }
      if(req.files.gallery){
          insertObj['gallery']=  req.files.gallery.map((obj)=>obj.filename)
      }
  }



  try {
     
      // "green"
   
      const regex = new RegExp(`^${name.trim()}$`, 'i');
  
      let productCheck = await productModel.findOne({ name: regex, deleted_at: null });
      if (productCheck) {
        let obj = {
          _status: false,
          _message: "Product Name Already Exist...",
        };
        res.send(obj);
      } else {
        let product = await productModel.insertOne(insertObj); //
  
        let obj = {
          _status: true,
          _message: " Product Added",
          product,
        };
        res.send(obj);
      }
    } catch (err) {
      let error = [];
      for (let key in err.errors) {
        let obj = {};
        obj[key] = err.errors[key].message;
        error.push(obj);
      }
      // console.log(err.errors);
      let obj = {
        _status: false,
        error,
      };
      res.send(obj);
    }

  // console.log(insertObj);
  

  let obj = {
    _status: true,
  };
  res.send(obj);
};

let getParentCategory = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true,
  };
  let data = await categoryModel.find(filter).select("name");
  let obj = {
    _status: true,
    _message: "category View ",

    data,
  };
  res.send(obj);
};

let getSubCategory = async (req, res) => {
  let { id } = req.params;
  let filter = {
    parentCategory: id,
    deleted_at: null,
    status: true,
  };
  let data = await subcategoryModel.find(filter).select("name");
  let obj = {
    _status: true,
    _message: "Sub category View ",

    data,
  };
  res.send(obj);
};

let getSubSubCategory = async (req, res) => {
  let { id } = req.params; //Topwear _id
  console.log(id);

  let filter = {
    subCategory: id,
    deleted_at: null,
    status: true,
  };
  let data = await subSubcategoryModel.find(filter).select("name");
  let obj = {
    _status: true,
    _message: "Sub Sub category View ",
    data,
  };
  res.send(obj);
};

let getColor = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true,
  };
  let data = await colorModel.find(filter).select("name");
  let obj = {
    _status: true,
    _message: "Color View ",
    data,
  };
  res.send(obj);
};

let getMaterials = async (req, res) => {
  let filter = {
    deleted_at: null,
    status: true,
  };
  let data = await materialModel.find(filter).select("name");
  let obj = {
    _status: true,
    _message: "Materials View ",
    data,
  };
  res.send(obj);
};




let productView = async (req, res) => {
  let filter = {
    deleted_at: null,
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


let productDetails = async (req, res) => {
  let { slug } = req.params;
  let filter = {
    slug,
    deleted_at: null,
  };
  let data = await productModel.findOne(filter)
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


module.exports = {
  productCreate,
  getParentCategory,
  getSubCategory,
  getSubSubCategory,
  getColor,
  getMaterials,
  productView,
  productDetails
};
