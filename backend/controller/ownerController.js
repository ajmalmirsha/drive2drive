
const vehicleModel = require("../model/vehicleModel");
const fs = require('fs')
const path = require('path');
const bookingModel = require("../model/bookingModel");

module.exports = {

    // add vehicles

    addVehicle(req, res, next) {
        try {
            const { product_name, category, price, description, brand, year,
                 model, ownerId, type, places, segment, mileage, seats } = JSON.parse(req.body.product);

            const proPrice = price - ''
            const images = []

            for(const file of req.files.images){
                images.push(file.filename)
            }

            const rc = {
                front :  req.files['rc[front]'][0].filename ,
                back : req.files['rc[back]'][0].filename
            }

            vehicleModel.create({ product_name, category, price: proPrice, description, image:images ,brand, year, model,rc , ownerId , type, places, segment, mileage, seats}).then((response) => {
                res.status(200).json({ success: true, message: 'vehicle added successfully' })

            }).catch((err) => {
                next()
            })
        } catch (error) {
           next()
        }
    },

    // get all vehicles

    async allVehicles(req, res, next) {
        try {
            const allVehicle = await vehicleModel.find({ownerId:req.params.id})
            res.status(200).json({ success: true, allVehicle })
        } catch (error) {
            next()
        }
    },

    // get specific vehicle details by the params

    async getVehiclesDetails ( req, res, next) {
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
            next()
        }
    },

    // get reviews product wise

    async getReviews ( req, res, next ) {
        try {
          const data = await  vehicleModel.find({ownerId:req.params.id},{reviews:1,product_name:1,_id:0,image:1})
          res.status(200).json({success:true,data})
        } catch (error) {
            next()
        }
    },

    // delete vehicle image
    
    async deleteVehicleImage ( req, res, next) {
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
                fs.unlink(path.join(__dirname,'../../backend/public/images/',id),(err)=>{})
                res.status(200).json({success:true,data:response})
             })
        } catch (error) {
            next()
        }
    },

    // edit vehicle details 

    EditVehicleDetials ( req, res, next ) {
        try {
            const {data} = req.body
            vehicleModel.findOneAndUpdate({_id:data.id},{...data},{new:true}).then((response)=>{
                res.status(200).json({success:true,message:"details updated successfully"})
            })
        } catch (error) {
            next()
        }
    },

    // add vehicle images

    async addVehicleImages ( req, res, next ) {
        try {
            let images = []
            for(const file of req.files){
                images.push(file.filename)
            }
            vehicleModel.findOneAndUpdate({_id:req.headers['vehcleid']},
            { $push: { image: { $each: [...images] } } },{new:true}).then((response)=>{
                res.status(200).json({success:true,data:response})
            })
        } catch (error) {
            next()
        }
    },

    // verify bookings

    bookingVerifications ( req, res, next) {
        try {
            const { ownerId } = req.headers
            bookingModel.find({$and: [{'approvel.approved': false}, {'approvel.declined': false},{'vehicle.ownerId': ownerId}]}).then((response) => {
                res.status(200).json({success:true,data:response})
            })
        } catch (e) {
            next()
        }
    },
    
    // edit product details 

    async editProductDetails ( {params:{id}}, res, next) {
    try {
      const data = await vehicleModel.findById(id)
      res.status(200).json({success:true,data})
    } catch (error) {
      next()
    }
    },

    // verify bookings

    verifyBooking (req, res, next ) {
        try {
            const {id,verify} = req.body
            const query = `approvel.${verify}`
            bookingModel.findByIdAndUpdate({_id:id},{$set:{[query]:true},status:verify}).then((response)=>{
                bookingModel.find({$and: [{'approvel.approved': false}, {'approvel.declined': false}]}).then((response) => {
                    res.status(200).json({success:true,data:response})
                })
            })
        } catch (e) {
            next()
        }
    },

    // get owner sales report

    ownerSalesReport ( req, res, next ) {
        try{
           bookingModel.find({'vehicle.ownerId':req?.headers?.ownerId,status:'completed'})
           .populate('userId').populate('vehicle.ownerId').then((data) => {
              res.status(200).json({success:true,data})
           })
        } catch (e) {
            next()
        }
    },

    // get all sales of owner  

    getOwnerSales ( req, res, next ) {
        try{
            const { ownerId } = req.headers
            bookingModel.find({status:'completed','vehicle.ownerId':ownerId}).then((data) => {
                
                const revenue = [0, 0, 0, 0, 0, 0, 0];
                 data.forEach((item) => {
                  const updatedAt = new Date(item.updatedAt);
                   const dayIndex = updatedAt.getDay();
                    const totalAmount = item.totalAmount;
                     revenue[dayIndex] += totalAmount;
                  });
                  res.status(200).json({success:true,revenue})
            })
        } catch (e) {
            next()
        }
    }
}

