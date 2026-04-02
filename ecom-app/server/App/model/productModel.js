const mongoose = require('mongoose');

const productSchema=mongoose.Schema(
    {
        name:{  //Nike T-Shirt
            type:String,
            required:[true,"Please Fill The product"],
            minLength:[2,"Please Fill min two char..."],
           
          
          
        },
        parentCategory:{ //Men -> _id
            type:String,
            ref:"category",
        },
        subCategory:{ //Topwear --> _id
            type:String,
            ref:"subCategory",
        },
        subSubCategory:{ //T-Shirts --
            type:String,
            ref:"subSubCategory",
        },
        material:[
            { //Cotton 69c65619df0c7a5e93e9b9f9, Polyester 69c65625df0c7a5e93e9b9fc, Silk 69c65631df0c7a5e93e9b9ff
                type:String,
                ref:"material",
            },
        ],
        color:[ //Black 69a1706df9d07ecec6ae686d, Red 69a1758b105558db5f69a235, yellow 69c6566adf0c7a5e93e9ba05
            {
                type:String,
                ref:"color",
            }
        ],
        productType:{
            type:String,
             enum:["1","2","3"], //1->Featured, 2->New Arrival, 3->On Sale
             
        },
        productBestSeller:{
            type:Boolean,
            default:false
        },
        productTopRated:{
            type:Boolean,
            default:false
        },
        shortDescription:String,
        longDescription:String,
        price:Number,
        ActualPrice:Number,
        image:String,
        gallery:[],
        order:{
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

let productModel=mongoose.model("product",productSchema)

module.exports=productModel