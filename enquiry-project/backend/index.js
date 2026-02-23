let express=require("express")
require("dotenv").config()
let App=express()
let cors=require("cors")
const {  dbConnection } = require("./App/config/dbConnection")
const { ObjectId } = require("mongodb")
App.use(cors())
App.use(express.json())


App.post('/enquiry/create',async (req,res)=>{

    let db=await dbConnection()
    let studentConnection=await db.createCollection(process.env.STUDENTCOLLECTION)

    let {enPhone,enEmail}=req.body

    let checkUser=await studentConnection.findOne({enPhone,enEmail})

    if(checkUser){
        let obj={
            _status:false,
            _message:"Email Or Phone Already Exits...",
          
        }
        res.send(obj)
    }
    else{
        let insertRes=await studentConnection.insertOne(req.body)
    // console.log(req.body);
    

        let obj={
            _status:true,
            _message:"Enquiry Created",
            insertRes
        }
        res.send(obj)
    }

    
})


App.get('/enquiry/view',async (req,res)=>{

    let db=await dbConnection()
    let studentConnection=await db.collection(process.env.STUDENTCOLLECTION)
    let data=await studentConnection.find().toArray()
     let obj={
        _status:true,
        _message:"Enquiry Found",
         data
    }
    res.send(obj)

})


App.delete('/enquiry/delete/:id',async (req,res)=>{
    let {id}=req.params
    console.log(id);
    let db=await dbConnection()
    let studentConnection=await db.collection(process.env.STUDENTCOLLECTION)

    let delRes=await studentConnection.deleteOne({_id:new ObjectId(id)})

     let obj={
        _status:true,
        _message:"Data Deleted",
        delRes
    }
     res.send(obj)
})

App.put('/enquiry/update/:id',async (req,res)=>{
    
    console.log(req.body);
    
     let {id}=req.params

     console.log(id);
     
     let db=await dbConnection()
    let studentConnection=await db.collection(process.env.STUDENTCOLLECTION)
     let updateRes= await studentConnection.updateOne(
        { _id:new ObjectId(id) },
        {
            $set:req.body
        }


     )

     let obj={
        _status:true,
        _message:"Data Updated",
        updateRes
       
    }
     res.send(obj)


})
App.listen(process.env.PORT || 8000,()=>{
    console.log(process.env.PORT);
    
})