
const Product=require('../models/productSchema')


exports.getProducts=async(req,res)=>{
    try {

        const response=await Product.find()
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
        
        
    }
}

//get a particular product based of id

exports.getParticularProduct=async(req,res)=>{

    const {id}=req.params
    try {

       
        const response=await Product.findOne({_id:id})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//add product by admin
exports.addProduct=async(req,res)=>{
    try {
            
        //destructuring
        const {productModel,imageUrl,brand,price}=req.body
        const body={
            productModel,imageUrl,brand,price
        }
        //checking is product found
        const isProductFound=await Product.find({productModel})
        console.log(isProductFound)

        if(isProductFound.length>0){
            res.status(400).json('Product model already present')
        }else{
            //inserting if product not found
             await Product.insertMany(body)
             //finding all the products
             const response=await Product.find()
             res.status(200).json(response)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//deleting product by admin
exports.deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Product.deleteOne({_id:id})

        if(deleted){
            const response=await Product.find()
            res.status(200).json(response)
        }else{
            res.status(400).json('id not found')
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//get products according to brand name
exports.getByBrand=async(req,res)=>{
    const {brand}=req.params
    try {

        const response=await Product.find({brand})
        if(response){
            res.status(200).json(response)
        }else{
            res.status(200).json('Product not found')
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//delete product bu admin

