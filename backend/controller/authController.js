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
    
    // signup for user

    signup( req, res, next ) {
       try {
        const { username, email, password } = req.body.user
        const image = req.body.user?.image
        userModel.create({ username, email, password, image }).then((response) => {
            const token = jwt.sign({ userId: response._id }, process.env.USER_JWT_SECRET, { expiresIn: '1day' })
            res.status(200).json({ success: true, message: 'user registered successfully', token , user:response})
        }).catch((err) => {
           const error = handleError(err)
            res.status(401).json({ success: false, message: error })
        })
       } catch (error) {
        next()
       }
    },

    // login for user

    async login( req, res, next ) {
        try{
        const { email, password } = req.body.users
        const user = await userModel.findOne({ email })
        if (user) {
            if ( user.block ) {
              return  res.json( {success:false , message: 'you blocked by admin'} )
            }
            bcrypt.compare(password, user.password).then((response) => {
                if (response) {
                    const token = jwt.sign({ userId: user._id }, process.env.USER_JWT_SECRET, { expiresIn: '1day' })
                    res.json({ success: true, message: 'login successful', token , user})
                } else {
                    res.json({ success: false, message: 'invalid password' })
                }
            })
        } else {
            res.json({ success: false, message: 'invalid email' })
        }
      } catch (e) {
        next()
      }
    },

    // update  user

    async updateUser ( req, res, next ) {
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
                }).catch((err)=>{
                    const error = handleError(err)
                    res.status(501).json({ success: false, message: error })
                })   

        } catch (error) {
            next()
        }
    },

    // update profile image 

     async uploadProfileImage ( req, res, next) {
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
            next()
        }
    },

    // owner register

    ownerRegister ( req, res, next ) {
        try {
            const image = req.body.user?.image
            const { username, email, password} = req.body.owner
            ownerModel.create({ username, email, password, image }).then((response) => {
              const token =  jwt.sign({ ownerId:response._id }, process.env.OWNER_JWT_SECRET, { expiresIn: '1day'})
                res.status(200).json({ success:true, owner:response, token})
            }).catch ((err) =>{
                let errorMessage = handleError(err)
                res.status(401).json({ success: false, message: errorMessage })
            })
        } catch (error) {
            const err = handleError(error)
            if( err ) {
            res.status(401).json({ success: false, message: err })
            } else {
                next()
            }
        }
    },

    // owner login 

    async ownerLogin  ( req, res, next ) {
        try {
            const { email, password } = req.body.ownerData
            const owner = await ownerModel.findOne({ email })
            if (owner) {
                bcrypt.compare(password, owner.password).then((response) => {
                    if (response) {
                        const token = jwt.sign({ ownerId: owner._id }, process.env.OWNER_JWT_SECRET, { expiresIn: '1day' })
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
           err ? res.status(200).json({ success: false, message: err }) : next()
        }
    },

    // admin login

    async adminLogin ( req, res, next ) {
        try {
            const {email,password} = req.body.admin
           const admin = await adminModel.findOne({email:email})
           if( admin ) {
                bcrypt.compare(password,admin.password).then((response) =>{
                    if(response){
                      const token = jwt.sign( {adminId:admin._id} ,process.env.ADMIN_JWT_SECRET, { expiresIn: '1day' })
                      res.status(200).json({success:true,message:"login succesfully", token,data:admin})
                    }else res.status(401).json({success:false,message:"email and password not matched"})
                })
           } else {
            res.status(401).json({success:false,message:"email not found"})
           }
        } catch (error) {
            next()
        }
    }

}