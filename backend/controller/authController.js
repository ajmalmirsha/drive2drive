const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const ownerModel = require('../model/ownerModel')
const adminModel = require('../model/adminModel')

 function handleError (err) {
    if(err.code === 11000) {
        const emailMatch = err.message.match(/email: "(.*?)"/);
    if(emailMatch) return 'this email already registered !'
    }
 }
module.exports = {
    
    signup(req, res) {
       try {
        const { username, email, password } = req.body.user
        const image = req.body.user?.image
        userModel.create({ username, email, password, image }).then((response) => {
            const token = jwt.sign({ email: response.email }, process.env.USER_JWT_SECRET, { expiresIn: 300 })
            res.status(200).json({ success: true, message: 'user registered successfully', token , user:response})
        }).catch((err) => {
           const error = handleError(err)
            res.status(401).json({ success: false, message: error })
        })
       } catch (error) {
        console.log(error.message);
       }
    },
    async login(req, res) {
        const { email, password } = req.body.users
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password).then((response) => {
                if (response) {
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
                  res.status(200).json({success:true,userData:response,message:'details updated successfully'})
                })         

        } catch (error) {
            res.status(501).json({ success: false, message:error.message,userData:null})
        }
    },
     async uploadProfileImage (req,res) {
        try {
            const user = await userModel.findOne({_id:req.headers.userid})
            if(user.image){
                fs.unlink(path.join(__dirname,'../../backend/public/images/',user.image),(err)=>{})
                
            }
            userModel.findOneAndUpdate({_id:req.headers.userid},{
                $set:{
                    image:req.file.filename
                }
            },{new:true}).then((response)=>{
            res.status(200).json({ success: true, message:'profile picture updated successfully', user:response})
            }
            )
        } catch (error) {
            res.status(501).json({ success: false, message:error.message})
        }
    },

    // owner authentications

    ownerRegister ( req, res ) {
        try {
            const image = req.body.user?.image
            const { username, email, password} = req.body.owner
            ownerModel.create({ username, email, password, image }).then((response) => {
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
            const { email, password } = req.body.ownerData
            const owner = await ownerModel.findOne({ email })
            if (owner) {
                bcrypt.compare(password, owner.password).then((response) => {
                    if (response) {
                        const token = jwt.sign({ email: owner.email }, process.env.OWNER_JWT_SECRET, { expiresIn: 300 })
                        res.json({ success: true, message: 'login successful', token, owner })
                    } else {
                        res.status(200).json({ success: false, message: 'invalid password' })
                    }
                })
            } else {
                res.status(200).json({ success: false, message: 'invalid email' })
            }
        } catch (error) {
           const err = handleError(error)
           res.status(200).json({ success: false, message: err })
        }
    },
    async adminLogin ( req, res ) {
        try {
            const {email,password} = req.body.admin
           const admin = await adminModel.findOne({email:email})
           if( admin ) {
                bcrypt.compare(password,admin.password).then((response) =>{
                    if(response)  res.status(200).json({success:true,message:"login succesfully"})
                    else res.status(401).json({success:false,message:"email and password not matched"})
                })
           } else {
            res.status(401).json({success:false,message:"email not found"})
           }
        } catch (error) {
            console.log(error.message);
        }
    }

}