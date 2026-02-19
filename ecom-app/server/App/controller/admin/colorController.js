
let colorCreate=(req,res)=>{
    let obj={
        _status:true,
        _message:"Controller Function | Color Added"
    }
    res.send(obj)
}

let colorView=(req,res)=>{
    let obj={
        _status:true,
        _message:"Color View"
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