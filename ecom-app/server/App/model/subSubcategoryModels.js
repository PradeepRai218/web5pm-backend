const mongoose = require('mongoose');

const subSubcategorySchema=mongoose.Schema(
    {
        name:{ //T-Shirts
            type:String,
            required:[true,"Please Fill The ccategory"],
          
          
          
        },
        image:String, //Image Path
        parentCategory:{
            type:String, //69aff1e7e26ec931fbd1fc9f Men
            ref:"category"
        },
        subCategory:{
            type:String, //69aff1e7e26ec931fbd1fc9f
            ref:"subCategory"
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

let subSubcategoryModel=mongoose.model("subSubCategory",subSubcategorySchema)

module.exports=subSubcategoryModel