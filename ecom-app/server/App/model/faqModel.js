const mongoose = require('mongoose');

const faqSchema=mongoose.Schema(
    {
        question:{
            type:String,
            required:true,
          
        },
        answer:{
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

let faqModel=mongoose.model("faq",faqSchema)

module.exports=faqModel