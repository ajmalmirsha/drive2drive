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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Users',
      default:null
    },
    image: {
      type: Object,
      default:{}
    }
  });
  
const vehicleSchema = new mongoose.Schema({
    product_name:{
        type:String
    },
    display : {
      type: Boolean,
      default : false
    },
    category:{
        type:String
    },
    type: {
      type:String
    },
    segment: {
      type: String
    },
    free: {
      type: Boolean,
      default: true
    },
    seats : {
      type: Number,
      default: null
    },
    mileage: {
      type: Number,
      default: null
    },
    hashTags: {
      type: Array,
      default: []
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
    places: {
      type: Array
    },
    image:{
        type:Array
    },
    rc:{
        front : {
          type: Object,
          default:{}
        },
        back : {
          type: Object,
          default:{}
        },
        verified :  {
          type: Boolean,
          default: false
        }
    },
    bookings: [
      {
        from: {
          type: Date
        },
        to: {
          type: Date
        }
      }
    ],
    bookedUsers : {
      type: Array,
      default:[]
    },
    ownerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'owner'
    },
    reviews:[reviewSchema],
})

module.exports = mongoose.model('vehicle',vehicleSchema)