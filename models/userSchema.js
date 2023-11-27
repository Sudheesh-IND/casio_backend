
const mongoose=require('mongoose')

//creating a schema for user register

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
  
    
})

//making the schema into amodel
const User=mongoose.model('User',userSchema)
//exporting the model
module.exports=User