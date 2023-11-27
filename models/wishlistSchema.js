const mongoose=require('mongoose')

//making schema for wishlist
const wishlistSchema=new mongoose.Schema({
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
    }
})

const Wishlist= mongoose.model('Wishlist',wishlistSchema)
module.exports=Wishlist