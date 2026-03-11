const mongoose = require('mongoose');

const subcategorySchema=mongoose.Schema(
    {
        name:{ //Topwear
            type:String,
            required:[true,"Please Fill The ccategory"],
            minLength:[2,"Please Fill min two char..."],
            match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
          
          
        },
        image:String, //Image Path
        parentCategory:{
            type:String, //69aff1e7e26ec931fbd1fc9f
            ref:"category"
        },
       
        order:{ //1
             type:Number,
            required:true,
        },
        status:{
            type:Boolean,
            default:true
        },
        slug:String,
         created_at: {
            type: Date,
            default: Date.now()
        },
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

let subcategoryModel=mongoose.model("subCategory",subcategorySchema)

module.exports=subcategoryModel