const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    rating: {
      type: Number,
      default:0
    },
    review: {
      type: String,
      default:''
    },
    userimage: {
      type: String,
      default:'',
    },
    username: {
      type: String,
      default:'',
    },
  });
  
const vehicleSchema = new mongoose.Schema({
    product_name:{
        type:String
    },
    category:{
        type:String
    },
    model:{
        type:String
    },
    year:{
        type:String
    },
    brand:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:Array
    },
    ownerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'owner'
    },
    reviews:[reviewSchema],
})

module.exports = mongoose.model('vehicle',vehicleSchema)