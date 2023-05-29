const { response } = require("express");
const vehicleModel = require("../model/vehicleModel");



module.exports = {
    addVehicle(req, res) {
        try {
            const { product_name, category, price, description, brand, year, model } = JSON.parse(req.body.product);
            const proPrice = price - ''
            vehicleModel.create({ product_name, category, price: proPrice, description, image: req.file.filename,brand, year, model }).then((response) => {
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
            const allVehicle = await vehicleModel.find({})
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
    }
}

