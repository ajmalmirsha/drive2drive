const vehicleModel = require("../model/vehicleModel");



module.exports = {
    addVehicle(req, res) {
        try {
            const { product_name, category, price, description } = JSON.parse(req.body.product);
            const proPrice = price - ''
            vehicleModel.create({ product_name, category, price: proPrice, description, image: req.file.filename }).then((response) => {
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
    }
}

