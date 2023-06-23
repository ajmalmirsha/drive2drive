const notificationModel = require("../model/notificationModel");
const ownerModel = require("../model/ownerModel");
const userModel = require("../model/userModel");
const vehicleModel = require('../model/vehicleModel')
const reportModel = require('../model/reportModel');

module.exports = {
      
    addNotifications (req, res) {
        try {
         const {title,message,user,owner} = JSON.parse(req.body.notification)
       notificationModel.create({title, message, user, owner, image:req?.file?.filename}).then((response) => {
        console.log('notification added',response);
        res.status(200).json({success:true,data:response})
       })    
        } catch (e) {
           console.log(e.message); 
        }
      
    },

    getAllNotifications (req, res ){
        try {
            console.log('sfsd');
            notificationModel.find({}).sort({_id:-1}).then((response)=>{
                res.status(200).json({succes:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
        }
    },

    getAllVerifications (req, res ){
        try {
            console.log('sfsd');
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

    getAllUserDetails ( req, res) {
     try {
        userModel.find({}).then((data) => {
            res.status(200).json({ success: true, data})
        })
     } catch (e) {
        console.log(e.message);
     }
    },

    verifyLisence ( req, res) {
        try {
            console.log(req.body);
            const { id, status } = req.body
            console.log( status );
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

    blockUnblock ( req, res) {
        try{
            console.log('on block un block');
           const { status , userId } = req.body
           const block = status === 'block'
           console.log('block',block,status);
           userModel.findOneAndUpdate({_id:userId},{$set:{block:block}},{new:true}).then( data => {
            res.status(200).json({success:true,data: {_id:data._id, block:data.block}})
           })
        } catch ( e ) {
            console.log(e.message);
        }
    },


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
          console.log(data );

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
   }
}