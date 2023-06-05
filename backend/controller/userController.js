 const { json } = require('express');
const userModel = require('../model/userModel')
const vehicleModel = require('../model/vehicleModel')
const mongoose = require('mongoose');
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
  async editProductDetails ({params:{id}},res) {
    try {
      console.log(id);
      const data = await vehicleModel.findById(id)
      res.status(200).json({success:true,data})
    } catch (error) {
      console.log(error.message);
    }
  }
}