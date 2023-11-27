
const Order = require('../models/orderSchema')
const Cart = require('../models/cartSchema')
const Razorpay = require('razorpay');
const crypro = require('crypto')
const env = require('dotenv');


//uploading order
exports.uploadOrder = async (req, res) => {
    console.log('inside add order')
    const { userId, orderId, products, address, orderStatus, rate } = req.body

    const body = { userId, orderId, products, address, orderStatus, rate }

    try {

        const isOrderPresent = await Order.findOne({ orderId })
        console.log(isOrderPresent)
        if (isOrderPresent != null) {
            res.status(400).json('Order already present')
        } else {
            const response = await Order.insertMany(body)
            if (response) {
                await Cart.deleteMany({ userId })
            }
            res.status(200).json(response)
        }

    } catch (error) {
        res.status(400).json(error)
    }
}

//fetching order details
exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params

    try {
        const response = await Order.findOne({ orderId })
        res.status(200).json(response)



    } catch (error) {
        res.status(400).json(error)
    }
}

//for payment
exports.doPayment = async (req, res) => {

    const {  orderId } = req.body
    console.log(orderId)

    try {

        const response=await Order.findOne({ orderId:orderId})
        console.log(response)

        var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

        var options = {
            amount: response.rate *100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: crypro.randomBytes(10).toString('hex')
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err)
                res.staus(400).json(err)
            } else {
                res.status(200).json(order)
            }
        });
    } catch (error) {
        res.status(400).json(error)
    }
}

//payment verification
exports.verifyPayment = async (req, res) => {
    try {

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
        console.log( razorpay_payment_id, razorpay_order_id, razorpay_signature )
        const signature = razorpay_order_id + "|" + razorpay_payment_id ;

        const generated_signature=crypro.createHmac("sha256",process.env.KEY_SECRET)
        .update(signature.toString()).digest('hex')

        console.log(generated_signature)

        if (generated_signature == razorpay_signature) {
            res.status(200).json('Payment verification successful')
        } else {
            res.status(400).json('Invalid signature sent')
        }

    } catch (error) {
        res.status(400).json(error)
    }
}

//payment status updation
exports.updateStatusSuccess=async(req,res)=>{
    
    const {orderId,paymentDetails}=req.body
    console.log(paymentDetails)
    try {

        const response=await Order.findOne({orderId})
        response.orderStatus=''
        response.orderStatus='Placed'
        response.paymentDetails.push(paymentDetails)
        response.save()
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.updateStatusFailed=async()=>{
    const {orderId}=req.params
    try {

        const response=await Order.findOne({orderId})
        response.orderStatus=''
        response.orderStatus='Payment failed'
        response.save()
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get placed orders
exports.getPlacedOrder=async(req,res)=>{
    const {userId}=req.params
    try {
    
        const response=await Order.find({userId,orderStatus:'Placed'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//cancelling an order
exports.cancelOrder=async(req,res)=>{
    const {orderId,userId}=req.params

    try {

        const response=await Order.findOne({orderId})
        response.orderStatus=''
        response.orderStatus='Cancelled order'
        response.save()
        const response2=await Order.find({userId,orderStatus:'Placed'})
        res.status(200).json(response2)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get all placed orders
exports.getAllPlacedOrder=async(req,res)=>{
    try {
        const response=await Order.find({orderStatus:'Placed'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//update delivery date
exports.updateDate=async(req,res)=>{
    const {orderId,expectedDate}=req.body
    try {
        const details=await Order.findOne({orderId})
        details.deliveryDate=expectedDate
        details.save()
        const response=await Order.find({orderStatus:'Placed'})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

//to ship order and update delivery date
exports.shipOrder=async(req,res)=>{
    const {orderId}=req.body
    try {

        const details=await Order.findOne({orderId})
        details.orderStatus=''
        details.orderStatus='Shipped'
       details.save()
        const response=await Order.find({orderStatus:'Placed'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//getting shipped orders
exports.getShipped=async(req,res)=>{

    try {
        const response=await Order.find({orderStatus:'Shipped'})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

//out for delivery
exports.outForDelivery=async(req,res)=>{

    const {orderId}=req.body
    try {

        const details=await Order.findOne({orderId})
        details.orderStatus=''
        details.orderStatus='Out for delivery'
       
        details.save()
        const response=await Order.find({orderStatus:'Shipped'})
        res.status(200).json(response)

        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get out for delivery
exports.getOutForDelivery=async(req,res)=>{
    try {

        const response=await Order.find({orderStatus:'Out for delivery'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//delivered
exports.delivered=async(req,res)=>{
    const {orderId,expectedDate}=req.body

    try {

        const details=await Order.findOne({orderId})
        details.orderStatus=''
        details.orderStatus='Delivered'
       
        details.save()
        const response=await Order.find({orderStatus:'Out for delivery'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get delivered order
exports.getDelivered=async(req,res)=>{
    try {

        const response=await Order.find({orderStatus:'Delivered'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get cancelled order
exports.getCancelled=async(req,res)=>{
    try {

        const response=await Order.find({orderStatus:'Cancelled order'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//update refund status
exports.updateRefund=async(req,res)=>{
    const {orderId}=req.body
    try {
        const details=await Order.findOne({orderId})
        details.orderStatus=''
        details.orderStatus='Refunded'
        details.save()
        const response=await Order.find({orderStatus:'Cancelled order'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//get refunded
exports.getRefunded=async(req,res)=>{
    try {

        const response=await Order.find({orderStatus:'Refunded'})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//handle order
exports.trackOrder=async(req,res)=>{
    const {orderId}=req.params
    try {
        const response=await Order.findOne({orderId})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

//get all orders
exports.getAllOrders=async(req,res)=>{
    try {
        const response=await Order.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

//get my all orders

exports.getMyAllOrders=async(req,res)=>{
    const {userId}=req.params
    try {
        const response= await Order.find({userId})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}