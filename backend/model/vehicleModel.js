const mongoose = require('mongoose')
const vehicleSchema = new mongoose.Schema({
    product_name:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('vehicle',vehicleSchema)