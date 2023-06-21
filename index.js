//dot env
require('dotenv').config()

//import db
require('./db/connection')

//import cors
const cors = require('cors')

//import express 
const express =require('express')

//import routes
const router = require('./routes/router')

const jwt=require('jsonwebtoken')

//create a server app using express
const server=express()

//use cors in server application
server.use(cors())
server.use(express.json())
server.use(router)

//route
// server.get('/',(res,req)=>{
//     res.status(200).json('Homerocks Service Response')
// })

//to run server application
server.listen(5000,()=>{
    console.log(`Sever Listening on port 5000`);
})





