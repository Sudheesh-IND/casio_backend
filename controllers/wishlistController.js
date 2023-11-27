
const Wishlist=require('../models/wishlistSchema')

//inserting the product into wishlist

exports.addToWishlist=async(req,res)=>{

    const{productModel,imageUrl,brand,price,productId,userId}=req.body

    const body={
        productModel,imageUrl,brand,price,productId,userId
    }
    try {

       const isItemPresent=await Wishlist.findOne({userId,productId})

       if(isItemPresent){
        res.status(400).json('Product already exist on wishlist')
       }else{
         await Wishlist.insertMany(body)
         const response=await Wishlist.find({userId})
         res.status(200).json(response)
       }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//delete item from wishlist
exports.removeWishlist=async(req,res)=>{

    const {email,id}=req.params

    try {

        const isDeleted=await Wishlist.deleteOne({email,id})
        if(isDeleted){
            const response=await Wishlist.find({email})
            res.status(200).json(response)
        }

    } catch (error) {
        
        res.status(400).json('cannot be deleted')
    }
    
}

//get products in wishlist
exports.getWishlistProduct=async(req,res)=>{
    const {userId}=req.params
    console.log(userId)
    try {

        const response=await Wishlist.find({userId})
        console.log(response)
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}