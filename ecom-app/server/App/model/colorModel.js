const mongoose = require('mongoose');

const colorSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
          
        },
        code:{
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

let colorModel=mongoose.model("color",colorSchema)

module.exports=colorModel