
const {MongooseError}=require('mongoose')

const users= require('../models/userSchema')

const jwt=require('jsonwebtoken')

exports.signup=async(req,res)=>{
    const{username,email,phone,password}=req.body

    try{
        const user=await users.findOne({phone})
        if(user){
            res.status(401).json('user already exist')
        }
        else{
            const newUser=new users({username,email,phone,password})
            await newUser.save()
            res.status(200).json('registered successfully')
        }
    }
    catch(error){
        res.status(405).json(error)
    }
    
}

exports.login=async(req,res)=>{

    const{phone,password}=req.body

    try{
        const loginuser=await users.findOne({phone,password})



        if(loginuser){
            const token=jwt.sign({password:password},'sk23')
            console.log(token);
        return res.status(200).json({message:'successfully logged in',token,phone});
        }else{
        return res.status(401).json('invalid data in Login Form');
        }

        }
        catch(error){
        return res.status(401).json(error)
        }

}


exports.checkuser=async (req,res)=>{

//destructuring
const currentPhone= req.params.currentPhone;

console.log(currentPhone);

    try{
        const loginuser=await users.findOne({phone:currentPhone})

        // console.log(loginuser.usertype);
        usertype=loginuser.usertype

        res.status(200).json(usertype)

    }catch(error){
        res.status(401).json(error)
    }

}