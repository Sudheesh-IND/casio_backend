
const Addresse=require('../models/addressSchema')

//insert address into mongodb
exports.addAddress=async(req,res)=>{
    const {name,address,pincode,phone,city,state,userId}=req.body

    const body={
        name,address,pincode,phone,city,state,userId
    }

    try {

        const response=await Addresse.insertMany(body)
        
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//getting all address
exports.getAllAddress=async(req,res)=>{
    const {userId}=req.params

    try {
        const response=await Addresse.find({userId})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

//delete address
exports.removeAddress=async(req,res)=>{
    const {userId}=req.params
    const {addressId}=req.params
    try {
        
        await Addresse.deleteOne({_id:addressId})
        const response=await Addresse.find({userId})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}