const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
     signup(req,res){
        const {username,email,password} = req.body.user
       userModel.create({username,email,password}).then((response)=>{
        const token = jwt.sign({email:response.email},process.env.USER_JWT_SECRET,{expiresIn:60})
        res.json({success:true,message:'user registered successfully',token})
       }).catch((err)=>{
        res.json({success:false,message:err.message})
       })
    },
   async login(req,res){
    console.log('haaai');
        const {email,password} = req.body.user
       const user = await userModel.findOne({email})
       if(user){
        bcrypt.compare(password,user.password).then((response)=>{
            console.log(response,'login response');
            if(response){
                console.log('creating a jwt');
               const token = jwt.sign({email:email},process.env.USER_JWT_SECRET,{expiresIn:60})
                res.json({success:true,message:'login successfull',token})
            }else{
                res.json({success:false,message:'invalid password'})
            }
        })
       }else{
        res.json({success:false,message:'invalid email'})
       }
    }
}