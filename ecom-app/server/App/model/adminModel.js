const mongoose = require('mongoose');

const adminSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"Please Fill The email"],
           
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please Fill correct value "],
        },
         password:{
            type:String,
            required:[true,"Please Fill The password"],
           
          
        },
        image:String,
        
        companyLogo:String,
        companyName:String,
        companyAddress:String,
        companyPhone:String,
        companyEmail:String,
        companyMap:String,
       
       
         updated_at: {
            type: Date,
            default: Date.now()
        },
         deleted_at: {
            type: Date,
            default: null
        },
    }
)

let adminModel=mongoose.model("admin",adminSchema)

module.exports=adminModel