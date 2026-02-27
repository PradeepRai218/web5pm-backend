const colorModel = require("../../model/colorModel")

let colorCreate=async (req,res)=>{


    // console.log(req.body);

    // let insertObj={
    //     name:req.body.name
    // }
    try{

        let {name}=req.body //pink
                                                    // "green"
        let checkColor=await colorModel.findOne({name:name,deleted_at:null})
        if(checkColor){
            let obj={
                _status:false,
                _message:"Color Name Alredy Exist...",
                
            }
            res.send(obj)
        }
        else{
            let color=await colorModel.insertOne(req.body) //

            let obj={
                _status:true,
                _message:" Color Added",
                color
            }
            res.send(obj)
        }
       
    }
    catch(err){

        let error=[]
        for(let key in err.errors){
             let obj={}
            obj[key]=err.errors[key].message
            error.push(obj)
        }
        // console.log(err.errors);
         let obj={
            _status:false,
            error
           
        }
        res.send(obj)
        
    }
    
}

let colorView=async (req,res)=>{

    let filter={
        deleted_at:null
    }
    let data=await colorModel.find(filter)
    let obj={
        _status:true,
        _message:"Color View",
        data
    }
    res.send(obj)
}
let colorDelete= (req,res)=>{
    let {ids}=req.body
    console.log(ids);
    
    colorModel.updateMany(
        {
            _id:ids
        },
        {
            $set:{
                deleted_at:Date.now()
            }
        }
    )
    .then((apiRes)=>{
            let obj={
            _status:true,
            _message:"Color Delete"
            }
        res.send(obj)
    })
    .catch((err)=>{
        console.log(err);
          let obj={
            _status:false,
           
            }
        res.send(obj)
        
    })

    // colorModel.deleteMany({_id:ids})
    // .then((apiRes)=>{
    //         let obj={
    //         _status:true,
    //         _message:"Color Delete"
    //         }
    //     res.send(obj)
    // })
    // .catch((err)=>{
    //     console.log(err);
    //       let obj={
    //         _status:false,
           
    //         }
    //     res.send(obj)
        
    // })
    
    
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