

require('dotenv').config()
const cors=require('cors')
//import express
const express=require('express')

require('./connection')

const router=require('./routes/router')





const server=express()

server.use(cors())
server.use(express.json())
server.use(router)

const PORT=5000

server.listen(PORT,()=>{
     console.log('Server connected to port 5000')
})