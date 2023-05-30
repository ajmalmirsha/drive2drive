
const vehicleModel = require("../model/vehicleModel");



module.exports = {
    addVehicle(req, res) {
        try {
            const { product_name, category, price, description, brand, year, model, ownerId } = JSON.parse(req.body.product);
            const proPrice = price - ''
            vehicleModel.create({ product_name, category, price: proPrice, description, image: req.file.filename,brand, year, model, ownerId }).then((response) => {
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
            const id = req.params.id
           const data = await vehicleModel.findById(id)
           res.status(200).json({success:true,data})
        } catch (error) {
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
    }
}

