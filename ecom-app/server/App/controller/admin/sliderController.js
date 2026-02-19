
let sliderCreate=(req,res)=>{
    let obj={
        _status:true,
        _message:"Controller Function | slider Added"
    }
    res.send(obj)
}

let sliderView=(req,res)=>{
    let obj={
        _status:true,
        _message:"slider View"
    }
    res.send(obj)
}
let sliderDelete=(req,res)=>{
    let obj={
        _status:true,
        _message:"slider Delete"
    }
    res.send(obj)
}
let sliderUpdate=(req,res)=>{
    let obj={
        _status:true,
        _message:"slider Update"
    }
    res.send(obj)
}

let sliderChangeStatus=(req,res)=>{
    let obj={
        _status:true,
        _message:"slider ChangeStatus"
    }
    res.send(obj)
}

module.exports={sliderCreate,sliderView,sliderDelete,sliderUpdate,sliderChangeStatus}