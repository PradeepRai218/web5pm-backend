const mongoose = require('mongoose');

const materialSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
          
        },
       
        order:{
             type:Number,
            required:true,
        },
        status:{
            type:Boolean,
            default:true
        },
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

let materialModel=mongoose.model("material",materialSchema)

module.exports=materialModel