const mongoose=require('mongoose')

//making the address schema

const addressSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true

    },
    pincode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
   
})

const Addresse=mongoose.model('Address',addressSchema)
module.exports=Addresse