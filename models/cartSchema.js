const mongoose=require('mongoose')

//schema of the cart
const cartSchema=new mongoose.Schema({
    productModel:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true  
    },
    price:{
        type:Number,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number
    }
})

//converting schema into a model
const Cart=mongoose.model('Cart',cartSchema)
module.exports=Cart