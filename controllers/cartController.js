
const Cart=require('../models/cartSchema')

//insering item into cart
exports.addTocart=async(req,res)=>{

    const {productModel,brand,imageUrl,price,count,userId,productId}=req.body
    const body={
        productModel,brand,imageUrl,price,count,userId,productId,grandTotal:price
    }
    try {

        const isPresent=await Cart.findOne({userId,productId})
        if(isPresent){
            isPresent.count+=1
            isPresent.grandTotal=price*isPresent.count
            isPresent.save()
            const response=await Cart.find({userId})
            res.status(200).json(response)
        }else{
           await Cart.insertMany(body)
           const response=await Cart.find({userId})
           res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//increase item in a cart
exports.increment=async(req,res)=>{
    const {cartId,userId}=req.params
    

    try {

        const product=await Cart.findOne({_id:cartId})
        console.log(product)
        product.count+=1
        product.grandTotal=product.price*product.count
        product.save()
        const response=await Cart.find({userId})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//decrement
exports.decrement=async(req,res)=>{

    const {userId,cartId}=req.params

    try {
        const product=await Cart.findOne({userId,_id:cartId})
        if(product.count==0){
            await Cart.deleteOne({userId,_id:cartId})
            const response=await Cart.find({userId})
            res.status(200).json(response)
        }else{
            const toIncrement=await Cart.findOne({userId,_id:cartId})
            toIncrement.count-=1
            toIncrement.grandTotal=toIncrement.grandTotal-toIncrement.price
            toIncrement.save()
            const response=await Cart.find({userId})
            res.status(200).json(response)
        }
        
        
    } catch (error) {
        res.status(400).json(error)
    }

}

//removing a product from cart
exports.removeFromCart=async(req,res)=>{

    const {userId,cartId}=req.params
    try {
       
        await Cart.deleteOne({_id:cartId})
        const response=await Cart.find({userId})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//getting cart items
exports.getAllCartProducts=async(req,res)=>{

    const {userId}=req.params
    try {

        const response=await Cart.find({userId})
        res.status(200).json(response)
        
    } catch (error) {

        res.status(400).json(error)
        
    }
}