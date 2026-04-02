const materialModel = require("../../model/materialModel");

let materialCreate=async (req,res)=>{
    try {
    let { name } = req.body; //pink
    // "green"
    let checkMaterial = await materialModel.findOne({ name: name, deleted_at: null });
    if (checkMaterial) {
      let obj = {
        _status: false,
        _message: "Material Name Alredy Exist...",
      };
      res.send(obj);
    } else {
      let material = await materialModel.insertOne(req.body); //

      let obj = {
        _status: true,
        _message: " Material Added",
        material,
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

    
}

let materialView=(req,res)=>{
    let obj={
        _status:true,
        _message:"material View"
    }
    res.send(obj)
}
let materialDelete=(req,res)=>{
    let obj={
        _status:true,
        _message:"material Delete"
    }
    res.send(obj)
}
let materialUpdate=(req,res)=>{
    let obj={
        _status:true,
        _message:"material Update"
    }
    res.send(obj)
}

let materialChangeStatus=(req,res)=>{
    let obj={
        _status:true,
        _message:"material ChangeStatus"
    }
    res.send(obj)
}

module.exports={materialCreate,materialView,materialDelete,materialUpdate,materialChangeStatus}