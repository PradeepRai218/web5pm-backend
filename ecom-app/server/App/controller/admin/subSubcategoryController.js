
const categoryModel = require("../../model/categoryModels");
const subcategoryModel = require("../../model/subcategoryModels");
const subSubcategoryModel = require("../../model/subSubcategoryModels");

let subSubcategoryCreate = async (req, res) => {
  console.log(req.body); //Form Data->Multer Add

  let insertObj = { ...req.body }; //{ name: 'men', order: '1',parentCategory:69b14013434c8872d0af46bc }

  if (req.file) {
    if (req.file.filename) {
      insertObj["image"] = req.file.filename;
    }
  }
  //{ name: 'men', order: '1' ,image:'1773052709653MV Banner.webp'}

  try {
    let { name } = req.body; //men
    // "green"

    const regex = new RegExp(`^${name.trim()}$`, 'i');

    let checkCategory = await subSubcategoryModel.findOne({ name: regex, deleted_at: null });
    if (checkCategory) {
      let obj = {
        _status: false,
        _message: "Sub Sub Category Name Alredy Exist...",
      };
      res.send(obj);
    } else {
      let Category = await subSubcategoryModel.insertOne(insertObj); //

      let obj = {
        _status: true,
        _message: "Sub Sub Category Added",
        Category,
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
};

let subSubcategoryView = async (req, res) => {
  let filter = {
    deleted_at: null,
  };
  let data = await subSubcategoryModel.find(filter).populate("parentCategory",'name');
  let obj = {
    _status: true,
    _message: "Sub Sub category View ",
    path:process.env.SUBSUBCATEGORYPATH,
    data,
  };
  res.send(obj);
};

let getParentCategory=async (req,res)=>{
  let filter = {
    deleted_at: null,
    status:true,
  };
  let data = await categoryModel.find(filter).select('name');
  let obj = {
    _status: true,
    _message: "category View ",
  
    data,
  };
  res.send(obj);
}

let getSubCategory=async (req,res)=>{
  let {id}=req.params
  let filter = {
    parentCategory:id,
    deleted_at: null,
    status:true,
  };
  let data = await subcategoryModel.find(filter).select('name');
  let obj = {
    _status: true,
    _message: "Sub category View ",
  
    data,
  };
  res.send(obj);
}
module.exports = { subSubcategoryCreate,subSubcategoryView,getParentCategory,getSubCategory };
