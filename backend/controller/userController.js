const userModel = require('../model/userModel')
const vehicleModel = require('../model/vehicleModel')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
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
            console.log('reached add review');
            console.log(req.body,998);
            const {vehicleId,rating,review,selectedImages,userImage,username} = req.body
            
            vehicleModel.findOneAndUpdate(
                { _id: vehicleId }, // Filter condition to find the vehicle by its ID
                {
                  $push: {
                    reviews: {
                      rating,
                      review,
                      userimage:userImage,
                      username
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
    }
}