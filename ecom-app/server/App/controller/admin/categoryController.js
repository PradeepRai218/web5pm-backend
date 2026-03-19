const { createSlug } = require("../../config/helper");
const categoryModel = require("../../model/categoryModels");

let categoryCreate = async (req, res) => {
  console.log(req.body); //Form Data->Multer Add

  let insertObj = { ...req.body }; //{ name: 'men', order: '1' }
   let { name } = req.body; //men
   let slug=createSlug(name)

   insertObj['slug']=slug

  if (req.file) {
    if (req.file.filename) {
      insertObj["image"] = req.file.filename;
    }
  }
  //{ name: 'men', order: '1' ,image:'1773052709653MV Banner.webp'}

  try {
   
    // "green"

    const regex = new RegExp(`^${name.trim()}$`, 'i');

    let checkCategory = await categoryModel.findOne({ name: regex, deleted_at: null });
    if (checkCategory) {
      let obj = {
        _status: false,
        _message: "Category Name Alredy Exist...",
      };
      res.send(obj);
    } else {
      let Category = await categoryModel.insertOne(insertObj); //

      let obj = {
        _status: true,
        _message: " Category Added",
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

let categoryView = async (req, res) => {
  let filter = {
    deleted_at: null,
  };
  let data = await categoryModel.find(filter);
  let obj = {
    _status: true,
    _message: "category View ",
    path:process.env.CATEGORYPATH,
    data,
  };
  res.send(obj);
};

module.exports = { categoryCreate,categoryView };
