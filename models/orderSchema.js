
const mongoose=require('mongoose')

//schema for orders

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    address:{
        type:Array,
        required:true
    },
    orderStatus:{
        type:String,
        required:true
    },
    deliveryDate:{
        type:String,
       
    },
    rate:{
        type:String,
        required:true
    },
    paymentDetails:{
        type:Array
    }
})

const Order=mongoose.model('Order',orderSchema)
module.exports=Order