const colorModel = require("../../model/colorModel")

let colorCreate=async (req,res)=>{


    // console.log(req.body);

    // let insertObj={
    //     name:req.body.name
    // }
    
    let color=await colorModel.insertOne(req.body) //

    let obj={
        _status:true,
        _message:"Controller Function | Color Added",
        color
    }
    res.send(obj)
}

let colorView=async (req,res)=>{

    let data=await colorModel.find()
    let obj={
        _status:true,
        _message:"Color View",
        data
    }
    res.send(obj)
}
let colorDelete=(req,res)=>{
    let obj={
        _status:true,
        _message:"Color Delete"
    }
    res.send(obj)
}
let colorUpdate=(req,res)=>{
    let obj={
        _status:true,
        _message:"Color Update"
    }
    res.send(obj)
}

let colorChangeStatus=(req,res)=>{
    let obj={
        _status:true,
        _message:"Color ChangeStatus"
    }
    res.send(obj)
}

module.exports={colorCreate,colorView,colorDelete,colorUpdate,colorChangeStatus}