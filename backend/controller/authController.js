const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const ownerModel = require('../model/ownerModel')
const { response } = require('express')
// const cc = require('../public/images')
 function handleError (err) {
    console.log('on handle error');
    if(err.code == 11000) {
        const emailMatch = err.message.match(/email: "(.*?)"/);
    if(emailMatch) return 'this email already registered !'
  
    }
}
module.exports = {
    
    signup(req, res) {
       try {
        const { username, email, password } = req.body.user
        const image = req.body.user?.image
        console.log(image,5365);
        console.log(req.body.user,5365);
        userModel.create({ username, email, password, image }).then((response) => {
            const token = jwt.sign({ email: response.email }, process.env.USER_JWT_SECRET, { expiresIn: 300 })
            res.json({ success: true, message: 'user registered successfully', token , user:response})
        }).catch((err) => {
            console.log(err.code);
            console.log(err.message);
           const error = handleError(err)
            res.status(200).json({ success: false, message: error })
        })
       } catch (error) {
        console.log('2nd cahchae');
        console.log(error.message);
       }
    },
    async login(req, res) {
        const { email, password } = req.body.users
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password).then((response) => {
                console.log(response, 'login response');
                if (response) {
                    console.log('creating a jwt');
                    const token = jwt.sign({ email: email }, process.env.USER_JWT_SECRET, { expiresIn: 300 })
                    res.json({ success: true, message: 'login successful', token , user})
                } else {
                    res.json({ success: false, message: 'invalid password' })
                }
            })
        } else {
            res.json({ success: false, message: 'invalid email' })
        }
    },
     async updateUser (req,res) {
        try {
       
            const {id,username,email,phone,dob} = req.body.user
  console.log(dob,888);
            userModel.findOneAndUpdate(
                { _id: id },
                {
                  $set: {
                    username: username,
                    email: email,
                    phone:phone,
                    dob:dob,
                  }
                },
                {new:true}
              )
                .then(response => {
                    console.log(response);
                  res.status(200).json({success:true,userData:response,message:'details updated successfully'})
                })
                
              

        } catch (error) {
            res.status(501).json({ success: false, message:error.message,userData:null})
        }
    },
     async uploadProfileImage (req,res) {
        try {
            console.log('hhaaaai');
            console.log(req.file.filename,67,req.headers.userid);
            const user = await userModel.findOne({_id:req.headers.userid})
            if(user.image){
                console.log(user.image);
                fs.unlink(path.join(__dirname,'../../backend/public/images/',user.image),(err)=>{})
                
            }
            userModel.findOneAndUpdate({_id:req.headers.userid},{
                $set:{
                    image:req.file.filename
                }
            },{new:true}).then((response)=>{
                console.log(response,000);
            res.status(200).json({ success: true, message:'profile picture updated successfully', user:response})

            }
            )
        } catch (error) {
            console.log(error.message);
            res.status(501).json({ success: false, message:error.message})
        }
    },

    // owner authentications

    ownerRegister ( req, res ) {
        try {
            const image = req.body.user?.image
            const { username, email, password} = req.body.owner
            console.log(req.body,'owner req.body');
            ownerModel.create({ username, email, password, image }).then((response) => {
                console.log(response,8989);
              const token =  jwt.sign({ email:response.email }, process.env.OWNER_JWT_SECRET, { expiresIn: 300})
                res.status(200).json({ success:true, owner:response, token})
            }).catch ((err) =>{
                let errorMessage = handleError(err)
                res.status(401).json({ success: false, message: errorMessage })
            })
        } catch (error) {
            const err = handleError(error)
            res.status(401).json({ success: false, message: err })
        }
    },
    async ownerLogin  ( req, res) {
        try {
            const { email, password} = req.body.owner
            console.log(email,password);
            const owner = await ownerModel.findOne({email})
            if(owner){
                bcrypt.compare(password, owner.password).then( (response) => {
                    if ( response ) {
                        console.log('resonse');
                        const token = jwt.sign({ email:owner.email }, process.env.OWNER_JWT_SECRET, { expiresIn: 300 })
                        res.json({ success: true, message: 'login successful', token, owner})
                    }else{
                        console.log('wrong password');
                res.status(200).json({ success:false, message:'invalid password'})
                    }
                })
            }else{
                console.log('owner not there');
                res.status(200).json({ success:false, message:'invalid email'})
            }
        } catch (error) {
            
           const err = handleError(error)
           console.log('error handledddd');
           res.status(200).json({ success: false, message: err })
        }
    }
}