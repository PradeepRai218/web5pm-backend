const mongoose = require('mongoose');

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Fill The Name"],
            minLength:[2,"Please Fill min two char..."],
            match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
          
          
        },
        email:{
             type:String,
            required:[true,"Please Fill The Email"],
          
             validate: {
                validator: async function (v) {
                    const email = await this.constructor.findOne({ email: v ,deleted_at:null});
                    return !email;
                },
                message: props => `The specified email is already in use.`
            }
        },
         phone:{
             type:String,
            required:[true,"Please Fill The Phone"],
            validate: {
                validator: async function (v) {
                    const phone = await this.constructor.findOne({ phone: v,deleted_at:null});
                    return !phone;
                },
                message: props => `The specified phone is already in use.`
            }
        },
        password:{
             type:String,
            required:[true,"Please Fill The Phone"],
        },
        image:String,
        address:String,
        gender:{  //5
            type:Number,
             enum: ['1', '2'], // 1 Male 2 Female
             default: 1, // Optional: sets a default value
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

let userModel=mongoose.model("user",userSchema)

module.exports={userModel}