 const { json } = require('express');
const userModel = require('../model/userModel')
const vehicleModel = require('../model/vehicleModel')
const notificationModel = require('../model/notificationModel')
const mongoose = require('mongoose');
const bookingModel = require('../model/bookingModel');
const chatModel = require('../model/chatModel');
const ownerModel = require('../model/ownerModel');
module.exports = {
    uploadLisence (req,res) {
        try {
            const id = req.headers.userid
                    
            if (req.files && req.files['license[front]'] && req.files['license[front]'][0] || req.files['license[back]'] && req.files['license[back]'][0]) {
                userModel.findOneAndUpdate({_id:id},{$set:
                {
                    'license.front': req.files?.['license[front]']?.[0]?.filename,
                    'license.rear': req.files?.['license[back]']?.[0]?.filename
                }
                },{new:true}).then((response)=>{
                    res.status(200).json({user:response}) 
                })
              } 
        } catch (error) {
            console.log(error.message);
        }
    },
    async addReview ( req, res) {
        try {
            const {vehicleId,rating,review,userImage,username} = JSON.parse(req.body.reviewData)
            
            vehicleModel.findOneAndUpdate(
                { _id: vehicleId }, 
                {
                  $push: {
                    reviews: {
                      rating,
                      review,
                      userimage:userImage,
                      username,
                      image:req?.file?.filename
                    }
                  }
                },
                { new: true }
              ).then((response)=>{
                console.log(response);
                res.status(200).json({success:true,message:'review added succesfully',data:response})
              })
                    } catch (error) {
            console.log(error.message);
        }
    },
    async getVehicleData (req,res) {
      try {
       const data = await vehicleModel.find({category:req.params.vehicle})
       res.status(200).json({success:true,data})
      } catch (error) {
        console.log(error.message);
      }
    },
    async getAllVehicleDetails (req,res) {
      try {
        const allVehicle = await vehicleModel.find({})
        res.status(200).json({ success: true, allVehicle })
    } catch (error) {
        console.log(error.message);
    }
    },

  getAllNotifications ( req, res) {
    try {
      const { role } = req.params
      console.log(role);
      const filterCriteria = {};
      filterCriteria[role] = true;
      notificationModel.find(filterCriteria).then((response) => {
        res.status(200).json({success:true,notifications:response})
      })
    } catch (e) {
      console.log(e.message);
    }
  },

  addBooking ( req, res) {
    try {
      // console.log(req.body);
      // console.log(req.body.data.address);
      req.body.data.userId = req.headers?.userId
      console.log(req.headers?.userId);
      console.log(req.body);
      bookingModel.create({...req.body.data}).then((response)=> {
        console.log(response);
        res.status(200).json({success:true,message:'your booking request sent to owner wait for response !'})
      })
    } catch (e) {
      console.log(e.message);
    }
  },
  paymentUpdation (req, res) {
     try {
      console.log(req.body);
      const {paymentId,bookingId,paymentMethod} = req.body
      bookingModel.findByIdAndUpdate({_id:bookingId},{$set:{paid:true,'payment.paymentId':paymentId,'payment.method':paymentMethod}},{new:true}).then((response) => {
        const userId = req.headers?.userId
        bookingModel.find({userId}).then((response) => {
          res.status(200).json({success:true,data:response})
        }) 
      })
     } catch (e) {
      console.log(e.message);
     }
  },
    getApprovedBookings (req,res) {
        try {
          const userId = req.headers?.userId
          console.log('user Id',userId);
            bookingModel.find({userId}).then((response) => {
              console.log(response);
              res.status(200).json({success:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
        }
    },
    getSenderDetails ( req, res) {
      try {
        const {userId} = req.params
        console.log(userId,'sdjfhds');
        ownerModel.findById(userId).select('-password -_id') .then( data => {
          res.status(200).json({success:true, data})
        })
      } catch (e) {
        console.log(e.message);
      }
    },


    // chat functions 

    async setMessage ( req, res) {
      try {
         console.log(req.body);
         const { msg, to} = req.body
         const from = req.headers?.userId ?? req.headers?.ownerId
         console.log(from);
        const data = await chatModel.create ({
          message: { text: msg },
          users: [from, to],
          sender: from,
         })
         if (data) return res.status(200).json({ msg: "Message added successfully." });
         else return res.status(500).json({ msg: "Failed to add message to the database" });
      } catch (e) {
        console.log(e.message);
      }
    },

    async getMessages ( req, res) {
      try{
        console.log('on get messages');
        const { to } = req.body
        const from = req.headers?.userId ?? req.headers?.ownerId
        console.log(to,from);
        const messages = await chatModel.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        console.log(projectedMessages);
        res.status(200).json({messages:projectedMessages});
      } catch (e) {
        console.log(e.message);
      }
    }
}