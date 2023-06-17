const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    
vehicle:{
       _id:{
        type:String
    },
    vehicleName:{
        type:String
    },
    image:{
        type:Array
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
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'owner'
    }
},
deposite:{
    type:Number,
    default:0
},
userId : {
    type:String
},
totalAmount : {
    type: Number,
    default:0
},
payment : {
    method :{
        type: String,
        default:''
    },
    paymentId :{
        type:String,
        default:''
    }
},
address : {
    pickUp : {
        type: Object
    },
    dropOff : {
        type: Object
    }
},
approvel:{
  approved : { 
    type:Boolean,
    default:false 
  },
  declined : { 
    type:Boolean,
    default:false 
  },
  message : {
        type : String,
        default:''
  }
},
paid : {
    type: Boolean ,
    default : false
},
status:{
    type: String,
    default:'pending'
}
    
})


module.exports = mongoose.model('bookings',bookingSchema)
