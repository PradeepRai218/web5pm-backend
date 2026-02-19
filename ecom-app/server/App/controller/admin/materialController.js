
let materialCreate=(req,res)=>{
    let obj={
        _status:true,
        _message:"Controller Function | material Added"
    }
    res.send(obj)
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