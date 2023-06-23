
const vehicleModel = require("../model/vehicleModel");
const fs = require('fs')
const path = require('path');
const bookingModel = require("../model/bookingModel");

module.exports = {
    addVehicle(req, res) {
        try {
            const { product_name, category, price, description, brand, year, model, ownerId, type, places, segment, mileage, seats } = JSON.parse(req.body.product);
            const proPrice = price - ''
            console.log('req.owner idfiles:' , ownerId);
            const images = []

            for(const file of req.files.images){
                images.push(file.filename)
            }
            const rcFront = req.files['rc[front]'][0].filename; // Get the filename of the rcFront image
            const rcBack = req.files['rc[back]'][0].filename; // Get the filename of the rcBack image
            const rc = {
                front :  req.files['rc[front]'][0].filename ,
                back : req.files['rc[back]'][0].filename
            }
            console.log('images:' , images);
            console.log('rc front:' , rcFront);
            console.log('rc back:' , rcBack);
            vehicleModel.create({ product_name, category, price: proPrice, description, image:images ,brand, year, model,rc , ownerId , type, places, segment, mileage, seats}).then((response) => {
                res.status(200).json({ success: true, message: 'vehicle added successfully' })
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    async allVehicles(req, res) {
        try {
            const allVehicle = await vehicleModel.find({ownerId:req.params.id})
            res.status(200).json({ success: true, allVehicle })
        } catch (error) {
            console.log(error.message);
        }
    },
    async getVehiclesDetails (req,res) {
        try {
            const {id} = req.params
           const data = await vehicleModel.findById(id).populate({
            path: 'reviews',
            populate: {
              path: 'userId'
            }
          })
           res.status(200).json({success:true,data})
        } catch (error) {
            console.log('on erro');
            console.log(error.message);
        }
    },
    async getReviews (req,res) {
        try {
            console.log(req.params.id);
          const data = await  vehicleModel.find({ownerId:req.params.id},{reviews:1,product_name:1,_id:0,image:1})
          console.log(data,11111);
          console.log(data[0].reviews,11111);
          res.status(200).json({success:true,data})
        } catch (error) {
            console.log(error.message);
        }
    },
    async deleteVehicleImage (req,res) {
        try {
            const {id,vehicleId} = req.params 
            vehicleModel
            .findOneAndUpdate(
            { _id: vehicleId, $expr: { $gt: [{ $size: '$image' }, 1] } },
            { $pull: { image: id } },
            { new: true }
            ).then((response) => {
            if (!response) {
            return res.status(400).json({ success: false, message: 'Image array should have at least one element' });
             }
                console.log(response,656);
                fs.unlink(path.join(__dirname,'../../backend/public/images/',id),(err)=>{})
                res.status(200).json({success:true,data:response})
             })
        } catch (error) {
            console.log(error.message);
        }
    },
    EditVehicleDetials (req,res) {
        try {
            console.log(req.body,78);
            const {data} = req.body
            vehicleModel.findOneAndUpdate({_id:data.id},{...data},{new:true}).then((response)=>{
                console.log(response,87);
                res.status(200).json({success:true,message:"details updated successfully"})
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    async addVehicleImages (req,res) {
        try {
            console.log('req.files:', req.headers['vehcleid']);

            let images = []
            for(const file of req.files){
                images.push(file.filename)
            }
            console.log('images:' , images);
            vehicleModel.findOneAndUpdate({_id:req.headers['vehcleid']},{ $push: { image: { $each: [...images] } } },{new:true}).then((response)=>{
                console.log(response,899);
                res.status(200).json({success:true,data:response})
            })
        } catch (error) {
            console.log(error.message);
        }
    },

    bookingVerifications ( req, res) {
        try {
            bookingModel.find({$and: [{'approvel.approved': false}, {'approvel.declined': false}]}).then((response) => {
                res.status(200).json({success:true,data:response})
            })
        } catch (e) {
            console.log(e.message);
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
    ,
    verifyBooking (req, res) {
        try {
            const {id,verify} = req.body
            const query = `approvel.${verify}`
            bookingModel.updateOne({_id:id},{$set:{[query]:true}}).then(()=>{
                bookingModel.find({$and: [{'approvel.approved': false}, {'approvel.declined': false}]}).then((response) => {
                    res.status(200).json({success:true,data:response})
                })
            })
        } catch (e) {
            console.log(e.message);
        }
    }
}

