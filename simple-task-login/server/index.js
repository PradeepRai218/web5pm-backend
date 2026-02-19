let express=require("express")
require("dotenv").config()// Start Working
const users = require("./user") //Named / Default
let App=express()
let cors=require("cors")


App.use(cors())
App.use(express.json())

App.post("/user/login",(req,res)=>{
    let obj
    let {email,password}=req.body;

    let userEmail=users.find((obj)=>obj.email==email)
//     //userEmail = {
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     password: "password123",
//     phoneNumber: "555-0101",
//   }

    if(userEmail){
        userEmail.password
        if(userEmail.password==password){
            obj={
                _status:true,
                _message:"Login User",
                _user:userEmail
              
            }
            res.send(obj)
        }
        else{
            obj={
                _status:false,
                _error:"Invalid Paswword",
              
            }
            res.send(obj)
        }
    }
    else{
        obj={
            _status:false,
            _error:"Invalid Email Id",
          
        }
        res.send(obj)
    
    }
    
})

// console.log(process.env.DBNAME);

App.listen(process.env.PORT,()=>{
    console.log(process.env.PORT);
    
})