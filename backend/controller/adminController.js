const notificationModel = require("../model/notificationModel");
const ownerModel = require("../model/ownerModel");
const userModel = require("../model/userModel");
const vehicleModel = require('../model/vehicleModel')
const reportModel = require('../model/reportModel');
const bookingModel = require('../model/bookingModel');
const couponModel = require("../model/couponModel");
const bannerModel = require("../model/bannerModel");
const fs = require('fs');
const path = require("path");

module.exports = {
      
    // for add notifications

    addNotifications (req, res) {
        try {
            console.log('on add');
         const {title,message,user,owner} = JSON.parse(req.body.notification)
       notificationModel.create({title, message, user, owner, image:req?.file?.filename}).then((response) => {
        res.status(200).json({success:true,data:response})
       })    
        } catch (e) {
           console.log(e.message); 
        }
      
    },

    // for get all notifications

    getAllNotifications (req, res ){
        try {
            notificationModel.find({}).sort({_id:-1}).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
        }
    },


    // for get all license verifications

    getAllVerifications (req, res ){
        try {
            userModel.find({
                'license.verification': 'pending',
                'license.front': { $ne: '' },
                'license.rear': { $ne: '' }
              }).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
        }
    },


    // for get all user details

    getAllUserDetails ( req, res) {
     try {
        userModel.find({}).then((data) => {
            res.status(200).json({ success: true, data})
        })
     } catch (e) {
        console.log(e.message);
     }
    },


    // for verify license

    verifyLisence ( req, res) {
        try {
            const { id, status } = req.body
            userModel.findByIdAndUpdate(id,{$set:{'license.verification':status}},{new:true}).then(()=>{
                 userModel.find({
                'license.verification': 'pending',
                'license.front': { $ne: '' },
                'license.rear': { $ne: '' }
              }).then((response)=>{
                res.status(200).json({succes:true,data:response})
              })
            })
           
        } catch (e) {
            console.log(e.message);
        }
    },

    // for block and unblock user

    blockUnblock ( req, res) {
        try{
           const { status , userId } = req.body
           const block = status === 'block'
           userModel.findOneAndUpdate({_id:userId},{$set:{block:block}},{new:true}).then( data => {
            res.status(200).json({success:true,data: {_id:data._id, block:data.block}})
           })
        } catch ( e ) {
            console.log(e.message);
        }
    },

    // for get all owner details

    async getAllOwners ( req, res) {
        try{
            
           const ownerDetails = await ownerModel.find({})
           const vehicleDetails = await vehicleModel.find({})
           const updatedVehicleDetails = ownerDetails.map(owner => {
            const vehicles = vehicleDetails.filter(vehicle => vehicle.ownerId.toString() === owner._id.toString());
            return { ...owner, vehicles };
          });

          const data = updatedVehicleDetails.map(owner => {
            const { _id, username, email, password, phone, image, dob, adminVerify, __v } = owner._doc;
            return {
              _id,
              username,
              email,
              password,
              phone,
              image,
              dob,
              adminVerify,
              __v,
              vehicle: owner.vehicles
            };
          });

          res.status(200).json( {succes:true , data})
        } catch (e) {
            console.log(e.message);
        }
    },

   // getting all spams 

   getAllSpams ( req, res ) {
    try{
     reportModel.find({}).sort({createdAt:-1}).populate('reportedBy').populate('productId').then((data) => {
        res.status(200).json( {success:true, data})
     })
    }catch (e) {
     console.log(e.message);
    }
   },

   // get all bookings 

   getAllbookings ( req, res ) {
    try{
        bookingModel.find({}).populate('userId').populate('vehicle.ownerId').then((data) => {
            res.status(200).json({succes:true,data})
        })
    } catch (e) {
        console.log(e)
    }
   },


   // get all sales report

   getAllSales ( req, res ) {
    try{
        bookingModel.find({status:'completed'}).populate('userId').populate('vehicle.ownerId').then((data) => {
            res.status(200).json({succes:true,data})
        })
    } catch (e) {
        console.log(e)
    }
   },

   // add coupon

   addCoupon ( req, res ) {
    try{
        couponModel.create(req.body).then((response) => {
            res.status(200).json({success:true,message:'coupon added'})
        }).catch(e => {
        if( e._message === 'coupon validation failed' ){
        return res.status(409).json({success:false,message:'discout percentage should be lessthan 100'})
       } 
        if( e.code === 11000 ){
        return res.status(409).json({success:false,message:'coupon code exist'})
       } 
        })
    } catch (e) {
       
        console.log(e)
    }
   },
   // get coupon

   getCoupon ( req, res ) {
    try{
        couponModel.find({}).then((data) => {
            res.status(200).json({success:true,data})
        })
    } catch (e) {
        console.log(e.message)
    }
   },
   // get all vehicles

   getVehicles ( req, res ) {
    try{
        vehicleModel.find({}).then((data) => {
            res.status(200).json({success:true,data})
        })
    } catch (e) {
        console.log(e.message)
    }
   }
   ,
   // getting all sales data for graph

   getAllSalesData ( req, res ) {
    try{
        bookingModel.find({status:'completed'}).then((data) => {
         const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const revenue = [0, 0, 0, 0, 0, 0, 0];
           data.forEach((item) => {
            const updatedAt = new Date(item.updatedAt);
             const dayIndex = updatedAt.getDay();
              const totalAmount = item.totalAmount;
               revenue[dayIndex] += totalAmount;
            });
          res.status(200).json({succes:true,days,revenue})
        })
    } catch (e) {
        console.log(e.message)
    }
   },
   // add banner

   addBanner ( req, res ) {
    try{
       bannerModel.create({image:req.file.filename}).then(() => {
        bannerModel.find({}).then(data => {
            res.status(200).json({succes:true,data,message:'banner added successfully'})
        })
       }) 
    } catch (e) {
        console.log(e.message)
    }
   },
   // get all banners

   getBanners ( req, res ) {
    try{
       bannerModel.find({}).then((data) => {
       res.status(200).json({succes:true,data})
       }) 
    } catch (e) {
        console.log(e.message)
    }
   },
   // delete banner

   DeleteBanner ( req, res ) {
    try{
      const { bannerId } = req.params
      bannerModel.findOneAndDelete({_id:bannerId}).then((response) => {
        fs.unlink(path.join(__dirname,'../../backend/public/images/banner/',response?.image),(err)=>{})
        bannerModel.find({}).then((data) => {
            res.status(200).json({success:true,message:'banner deleted successfully',data})
        })
      })
    } catch (e) {
        console.log(e.message)
    }
   }
}