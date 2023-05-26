const vehicleModel = require("../model/vehicleModel");



module.exports = {
    addVehicle (req,res) {
        // console.log(req.body);
       try {
        const {product_name,category,price,description} = JSON.parse(req.body.product);
        const proPrice = price - ''
        console.log(typeof proPrice,888);
        console.log(typeof price,888);
        console.log(req.file.filename);
        vehicleModel.create({product_name,category,price:proPrice,description,image:req.file.filename}).then((response) => {
            console.log(response);
            res.status(200).json({success:true,message:'vehicle added successfully'})
        }).catch((err) => {
            console.log(err);
        })
       } catch (error) {
        console.log(error.message);
       }
    },
    async allVehicles ( req, res) {
        try {
            const allusers = await vehicleModel.find({})
            res.status(200).json({success:true,allusers})
        } catch (error) {
            console.log(error.message);
        }
    }
}

