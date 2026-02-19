let express=require("express")
let cors=require("cors")
require("dotenv").config()
let App=express()
App.use(cors())
App.use(express.json())

let checkToken=(req,res,next)=>{
    
    if(req.query.token=="" || req.query.token==null || req.query.token==undefined){
        let obj={
            _status:false,
            _message:"Please Send the Token"
        }
       return  res.status(400).json(obj)
    }

    if(req.query.token!=process.env.TOKEN){
         let obj={
            _status:false,
            _message:"Please Send the Correct  Token Value"
        }
       return  res.status(400).json(obj)
    }
    next()
}

App.use(checkToken)



App.get('/news',(req,res)=>{


   let obj={
    _status:true,
    _data:[
        {
            title:"News1",
             desc:"News1"
        },
        {
            title:"News2",
             desc:"News2"
        }
    ]
   }
   res.status(200).json(obj)
//    res.send(obj)
})


App.get('/product',(req,res)=>{


   let obj={
    _status:true,
    _data:[
        {
            title:"product",
             desc:"product"
        },
        {
            title:"product",
             desc:"product"
        }
    ]
   }
   res.status(200).json(obj)
//    res.send(obj)
})

App.listen(process.env.PORT ?? 8000,()=>{
    console.log(process.env.PORT)
})