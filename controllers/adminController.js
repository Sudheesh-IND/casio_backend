const Admin=require('../models/adminSchema')

//admin login
exports.adminLogin=async(req,res)=>{

    const {email,password}=req.body
    try {

        const response=await Admin.find({email,password})
        console.log(response)
        if(response){
            res.status(200).json(response)
        }else{
            res.status(400).json('user not found')
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

