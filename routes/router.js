
const express=require('express')

const router=express.Router()

const productController=require('../controllers/productController')
const userController=require('../controllers/userController')
const wishlistController=require('../controllers/wishlistController')
const cartController=require('../controllers/cartController')
const adminController=require('../controllers/adminController')
const addressController=require('../controllers/addressController')
const orderController=require('../controllers/orderController')

//route for get product

router.get('/getproducts',productController.getProducts)

//getting route for a particular product
router.get('/getparticular/:id',productController.getParticularProduct)



//get product according to brandname
router.get('/getbybrand/:brand',productController.getByBrand)

//registering an user
router.post('/registeruser',userController.registerUser)

//user login
router.post('/userlogin',userController.userLogin)

//add item to wishlist
router.post('/addtowishlist',wishlistController.addToWishlist)

//get wishlist
router.get('/getwishlist/:userId',wishlistController.getWishlistProduct)

//delete product from wishlist
router.delete('/removeproduct/:userId/:productId',wishlistController.removeWishlist)

//add products to cart
router.post('/addtocart',cartController.addTocart)

//get all cart products
router.get('/getcartproducts/:userId',cartController.getAllCartProducts)

//increment product cont
router.get('/increment/:cartId/:userId',cartController.increment)

//decrement product cont
router.get('/decrement/:cartId/:userId',cartController.decrement)

//delete product
router.delete('/removefromcart/:userId/:cartId',cartController.removeFromCart)



//adding address into mongodb
router.post('/addaddress',addressController.addAddress)

//getting all address
router.get('/getaddress/:userId',addressController.getAllAddress)

//for deleting a function
router.get('/deleteaddress/:userId/:addressId',addressController.removeAddress)

//for uploading order
router.post('/addorder',orderController.uploadOrder)

//getting order details using order is
router.get('/getorderdetails/:orderId',orderController.getOrderDetails)

//for doing payment
router.post('/dopayment',orderController.doPayment)

//for payment verification
router.post('/verifypayment',orderController.verifyPayment)

//payment status success
router.post('/success',orderController.updateStatusSuccess)

//payment status failed
router.get('/failed/:orderId',orderController.updateStatusFailed)

//getting user details
router.get('/getuser/:userId',userController.getUser)

//getting placed order details
router.get('/getplacedorders/:userId',orderController.getPlacedOrder)

//cancelling order from user side
router.get('/cancelorder/:orderId/:userId',orderController.cancelOrder)

//get my all orders
router.get('/getmyorders/:userId',orderController.getMyAllOrders)


//Admin routes

//admin login
router.post('/adminlogin',adminController.adminLogin)

//get all users for admin
router.get('/getallusers',userController.getAllUsers)

//get all placed order
router.get('/getallplacedorderforadmin',orderController.getAllPlacedOrder)

//shipping
router.post('/shiporder',orderController.shipOrder)

//getting shipped orders
router.get('/shippedorders',orderController.getShipped)

//out for delivery
router.post('/outfordelivery',orderController.outForDelivery)

//get out for delivery
router.get('/getoutfordelivery',orderController.getOutForDelivery)

//update delivered
router.post('/delivered',orderController.delivered)

//get delivered
router.get('/getdelivered',orderController.getDelivered)

//get cancelled orders
router.get('/cancelled',orderController.getCancelled)

//update refund
router.post('/refund',orderController.updateRefund)

//get refunded
router.get('/getrefunded',orderController.getRefunded)

//update delivery date
router.post('/updatedate',orderController.updateDate)

//get order
router.get('/trackorder/:orderId',orderController.trackOrder)

//get all orders
router.get('/getorderlength',orderController.getAllOrders)

//adding a new product by admin
router.post('/addproduct',productController.addProduct)

//deleting a particular product by admin
router.delete('/deleteproduct/:id',productController.deleteProduct)

//deleting a user
router.delete('/deleteuser/:userId',userController.deleteUser)

module.exports = router;