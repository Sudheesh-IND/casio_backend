

const User=require('../models/userSchema')
const Wishlist=require('../models/wishlistSchema')
const Cart=require('../models/cartSchema')
const Order=require('../models/orderSchema')

//registering a new user
exports.registerUser=async(req,res)=>{


    
    try {
       
        const {name,email,password}=req.body
        const body={name,email,password}
      
        //checking is user exists or not
        const isUserExist=await User.find({email})

        if(isUserExist.length>0){
            res.status(400).json('User already exists')
        }else{
            
            const response=await User.insertMany(body)
           
            if(response){
                res.status(200).json('User registered successfully')
            }

        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//user login
exports.userLogin=async(req,res)=>{

    const {email,password}=req.body
    
    try {
      

        const response=await User.findOne({email,password})
        if(response){
            res.status(200).json(response)
        }else{
            res.status(400).json('User not found 1')
        }
        
    } catch (error) {
        res.status(400).json('User not found')
    }
}

//get user details
exports.getUser=async(req,res)=>{
    const{userId}=req.params
    try {

        const response=await User.findOne({_id:userId})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get all users for admin
exports.getAllUsers=async(req,res)=>{

    try {

        const response=await User.find()
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//delete user by admin
exports.deleteUser=async(req,res)=>{
    const {userId}=req.params

    try {

        await Cart.deleteMany({userId})
        await Order.deleteMany({userId})
        await Wishlist.deleteMany({userId})

        const response=await User.deleteOne({_id:userId})
        res.status(200).json(response)
        

        
    } catch (error) {
        res.status(400).json(error)
}
}