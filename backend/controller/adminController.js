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

    addNotifications (req, res, next ) {
        try {
         const {title,message,user,owner} = JSON.parse(req.body.notification)
       notificationModel.create({title, message, user, owner, image:req?.file?.filename}).then((response) => {
        res.status(200).json({success:true,data:response})
       })    
        } catch (e) {
            next()
        }
      
    },

    // for get all notifications

    getAllNotifications (req, res, next ){
        try {
            notificationModel.find({}).sort({_id:-1}).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            next()
        }
    },

    // for get all license verifications

    getAllVerifications (req, res, next ){
        try {
            userModel.find({
                'license.verification': 'pending',
                'license.front': { $ne: '' },
                'license.rear': { $ne: '' }
              }).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            next()
        }
    },

    // for get all user details

    getAllUserDetails ( req, res, next ) {
     try {
        userModel.find({}).then((data) => {
            res.status(200).json({ success: true, data})
        })
     } catch (e) {
        next()
     }
    },

    // for verify license

    verifyLisence ( req, res, next ) {
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
            next()
        }
    },

    // for block and unblock user

    blockUnblock ( req, res, next ) {
        try{
           const { status , userId } = req.body
           const block = status === 'block'
           userModel.findOneAndUpdate({_id:userId},{$set:{block:block}},{new:true}).then( data => {
            res.status(200).json({success:true,data: {_id:data._id, block:data.block}})
           })
        } catch ( e ) {
            next()
        }
    },

    // for get all owner details

    async getAllOwners ( req, res, next) {
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
            next()
        }
    },

   // getting all spams 

   getAllSpams ( req, res, next ) {
    try{
     reportModel.find({}).sort({createdAt:-1}).populate('reportedBy').populate('productId').then((data) => {
        res.status(200).json( {success:true, data})
     })
    }catch (e) {
        next()
    }
   },

   // get all bookings 

   getAllbookings ( req, res, next ) {
    try{
        bookingModel.find({}).populate('userId').populate('vehicle.ownerId').then((data) => {
            res.status(200).json({succes:true,data})
        })
    } catch (e) {
        next()
    }
   },


   // get all sales report

   getAllSales ( req, res, next ) {
    try{
        bookingModel.find({status:'completed'}).populate('userId').populate('vehicle.ownerId').then((data) => {
            res.status(200).json({succes:true,data})
        })
    } catch (e) {
        next()
    }
   },

   // add coupon

   addCoupon ( req, res, next ) {
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
        next()
    }
   },

   // get coupon

   getCoupon ( req, res, next ) {
    try{
        couponModel.find({}).then((data) => {
            res.status(200).json({success:true,data})
        })
    } catch (e) {
        next()
    }
   },

   // get all vehicles

   getVehicles ( req, res, next ) {
    try{
        vehicleModel.find({}).then((data) => {
            res.status(200).json({success:true,data})
        })
    } catch (e) {
        next()
    }
   },

   // getting all sales data for graph

   getAllSalesData ( req, res, next ) {
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
        next()
    }
   },

   // add banner

   addBanner ( req, res, next ) {
    try{
       bannerModel.create({image:req.file.filename}).then(() => {
        bannerModel.find({}).then(data => {
            res.status(200).json({succes:true,data,message:'banner added successfully'})
        })
       }) 
    } catch (e) {
        next()
    }
   },

   // get all banners

   getBanners ( req, res, next ) {
    try{
       bannerModel.find({}).then((data) => {
       res.status(200).json({succes:true,data})
       }) 
    } catch (e) {
        next()
    }
   },

   // delete banner

   DeleteBanner ( req, res, next ) {
    try{
      const { bannerId } = req.params
      bannerModel.findOneAndDelete({_id:bannerId}).then((response) => {
        fs.unlink(path.join(__dirname,'../../backend/public/images/banner/',response?.image),(err)=>{})
        bannerModel.find({}).then((data) => {
            res.status(200).json({success:true,message:'banner deleted successfully',data})
        })
      })
    } catch (e) {
        next()
    }
   }
}